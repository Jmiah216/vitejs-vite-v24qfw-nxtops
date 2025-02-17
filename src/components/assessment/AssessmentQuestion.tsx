import React from 'react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { cn } from '../../lib/utils';

interface Props {
  question: {
    id: number;
    text: string;
    type: string;
    category: string;
    description?: string;
    options?: string[];
    maxSelections?: number;
    exclusiveOption?: string;
    labels?: Record<number, string>;
  };
  currentAnswer: any;
  onAnswer: (value: any) => void;
}

export function AssessmentQuestion({ question, currentAnswer, onAnswer }: Props) {
  const handleMultiSelect = (option: string, checked: boolean) => {
    const currentSelections = Array.isArray(currentAnswer) ? currentAnswer : [];
    
    if (question.type === 'multiSelectExclusive') {
      if (option === question.exclusiveOption) {
        onAnswer(checked ? [option] : []);
        return;
      } else if (currentSelections.includes(question.exclusiveOption!)) {
        return;
      }
    }

    if (question.type === 'multiSelectLimited') {
      if (checked && currentSelections.length >= (question.maxSelections || 3)) {
        return;
      }
    }

    const newValue = checked 
      ? [...currentSelections, option]
      : currentSelections.filter((item: string) => item !== option);
    onAnswer(newValue);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{question.text}</h3>
      {question.description && (
        <p className="text-gray-600 mb-4">{question.description}</p>
      )}

      {question.type === 'select' && (
        <select
          value={currentAnswer || ''}
          onChange={(e) => onAnswer(e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent"
        >
          <option value="">Select an option</option>
          {question.options?.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      )}

      {question.type === 'scale' && (
        <div className="grid grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((score) => (
            <Button
              key={score}
              onClick={() => onAnswer(score)}
              variant={currentAnswer === score ? 'default' : 'outline'}
              className={cn(
                'h-24 flex flex-col items-center justify-center p-2 text-lg transition-all',
                currentAnswer === score && 'bg-military-accent text-white'
              )}
            >
              <span className="text-2xl mb-2">{score}</span>
              <span className="text-xs text-center line-clamp-2">
                {question.labels?.[score]}
              </span>
            </Button>
          ))}
        </div>
      )}

      {(question.type === 'multiSelect' || 
        question.type === 'multiSelectLimited' || 
        question.type === 'multiSelectExclusive') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options?.map((option) => (
            <label
              key={option}
              className={cn(
                "flex items-center space-x-3 p-4 rounded-lg border-2 transition-all",
                Array.isArray(currentAnswer) && currentAnswer.includes(option)
                  ? "border-military-accent bg-military-accent/5"
                  : "border-gray-200 hover:border-military-accent/50",
                option === question.exclusiveOption && "col-span-full"
              )}
            >
              <Checkbox
                checked={Array.isArray(currentAnswer) && currentAnswer.includes(option)}
                onCheckedChange={(checked) => handleMultiSelect(option, checked as boolean)}
                disabled={
                  (question.type === 'multiSelectLimited' &&
                  !currentAnswer?.includes(option) &&
                  Array.isArray(currentAnswer) &&
                  currentAnswer.length >= (question.maxSelections || 3)) ||
                  (question.type === 'multiSelectExclusive' &&
                  currentAnswer?.includes(question.exclusiveOption!) &&
                  option !== question.exclusiveOption)
                }
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}