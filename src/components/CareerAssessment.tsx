import React, { useState } from 'react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import type { CareerAssessment as ICareerAssessment } from '../types';

interface Props {
  onComplete: (assessment: ICareerAssessment) => void;
}

const questions = [
  {
    id: 1,
    text: "How comfortable are you with leading and managing teams?",
    category: "leadership" as const
  },
  {
    id: 2,
    text: "How much do you enjoy working with technology and technical systems?",
    category: "technical" as const
  },
  {
    id: 3,
    text: "How strong are your problem-solving and analytical skills?",
    category: "analytical" as const
  },
  {
    id: 4,
    text: "How effective are you at communicating with different audiences?",
    category: "communication" as const
  },
  {
    id: 5,
    text: "How experienced are you in planning and executing projects?",
    category: "projectManagement" as const
  }
];

export default function CareerAssessmentForm({ onComplete }: Props) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (score: number) => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: score }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const assessment = calculateAssessment();
      onComplete(assessment);
    }
  };

  const calculateAssessment = (): ICareerAssessment => {
    const initial: ICareerAssessment = {
      leadership: 0,
      technical: 0,
      analytical: 0,
      communication: 0,
      projectManagement: 0
    };

    return questions.reduce((acc, question) => {
      acc[question.category] = answers[question.id] || 0;
      return acc;
    }, initial);
  };

  if (currentQuestion >= questions.length) {
    return null;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Career Assessment</h2>
      <div className="mb-6">
        <p className="text-lg mb-4">{questions[currentQuestion].text}</p>
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((score) => (
            <Button
              key={score}
              onClick={() => handleAnswer(score)}
              variant="outline"
              className={cn(
                'h-auto p-4 flex flex-col items-center',
                answers[questions[currentQuestion].id] === score && 'bg-indigo-50 border-indigo-500'
              )}
            >
              {score}
              <div className="text-sm text-gray-500">
                {score === 1 ? 'Not at all' : score === 5 ? 'Very much' : ''}
              </div>
            </Button>
          ))}
        </div>
      </div>
      <div className="text-sm text-gray-500 text-center">
        Question {currentQuestion + 1} of {questions.length}
      </div>
    </div>
  );
}