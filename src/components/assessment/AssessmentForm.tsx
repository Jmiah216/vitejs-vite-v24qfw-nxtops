import React, { useState } from 'react';
import { Button } from '../ui/button';
import { assessmentQuestions } from './questions';
import { AssessmentQuestion } from './AssessmentQuestion';
import type { CareerAssessment } from '../../types';

interface Props {
  onComplete: (assessment: CareerAssessment) => void;
}

export function AssessmentForm({ onComplete }: Props) {
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({ ...prev, [assessmentQuestions[currentQuestion].id]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const assessment = calculateAssessment();
      onComplete(assessment);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateAssessment = (): CareerAssessment => {
    const scores: Record<string, number[]> = {
      leadership: [],
      technical: [],
      analytical: [],
      communication: [],
      projectManagement: []
    };

    // Calculate scores from answers
    assessmentQuestions.forEach(question => {
      if (answers[question.id] && question.category in scores) {
        scores[question.category].push(
          typeof answers[question.id] === 'number' ? answers[question.id] : 0
        );
      }
    });

    // Build assessment object
    const assessment: CareerAssessment = {
      ...Object.entries(scores).reduce((acc, [category, values]) => {
        const average = values.length > 0
          ? values.reduce((sum, val) => sum + val, 0) / values.length
          : 0;
        return {
          ...acc,
          [category]: Math.round(average)
        };
      }, {} as CareerAssessment),
      selectedSkills: answers[3] || [],
      securityClearance: {
        eligible: answers[3] || 'Unsure',
        current: answers[4] || 'None'
      },
      toolsAndCertifications: {
        tools: answers[9] || [],
        interestedInCertifications: answers[10] === 'Yes',
        desiredCertifications: answers[10] === 'Yes' ? [answers[10]?.customValue || ''] : []
      }
    };

    return assessment;
  };

  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;
  const currentAnswer = answers[assessmentQuestions[currentQuestion].id];
  const canAdvance = currentAnswer !== undefined && currentAnswer !== null;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Career Assessment</h2>
      
      <div className="mb-4">
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-2 bg-military-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-sm text-gray-500 text-center mt-2">
          Question {currentQuestion + 1} of {assessmentQuestions.length}
        </div>
      </div>

      <AssessmentQuestion
        question={assessmentQuestions[currentQuestion]}
        currentAnswer={currentAnswer}
        onAnswer={handleAnswer}
      />

      <div className="flex justify-between mt-6">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          variant="outline"
        >
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canAdvance}
        >
          {currentQuestion === assessmentQuestions.length - 1 ? 'Complete' : 'Next'}
        </Button>
      </div>
    </div>
  );
}