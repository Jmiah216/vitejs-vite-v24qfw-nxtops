import React, { useState } from 'react';
import { Button } from '../ui/button';
import type { CareerAssessment as ICareerAssessment } from '../../types';

interface Props {
  onComplete: (assessment: ICareerAssessment) => void;
}

const questions = [
  {
    id: 1,
    text: "How many years did you serve in the military?",
    type: "select",
    options: [
      "1-3 years",
      "4-6 years",
      "7-10 years",
      "11-15 years",
      "16-20 years",
      "20+ years"
    ]
  },
  {
    id: 2,
    text: "What type of work environment do you prefer?",
    type: "multiSelect",
    maxSelections: 3,
    options: [
      "Office/Corporate",
      "Remote/Work from Home",
      "Technical/Laboratory",
      "Field Operations",
      "Customer-Facing",
      "Government/Public Sector"
    ]
  },
  {
    id: 3,
    text: "What are your salary expectations for your civilian career?",
    type: "select",
    options: [
      "Under $40,000",
      "$40,000 - $60,000",
      "$60,000 - $80,000",
      "$80,000 - $100,000",
      "$100,000 - $120,000",
      "$120,000+"
    ]
  },
  {
    id: 4,
    text: "Are you willing to relocate for work?",
    type: "select",
    options: [
      "Yes, anywhere",
      "Yes, within my current state",
      "Yes, within my current region",
      "No, must be local",
      "Prefer remote work"
    ]
  },
  {
    id: 5,
    text: "What type of civilian career interests you most?",
    type: "multiSelect",
    maxSelections: 3,
    options: [
      "Information Technology",
      "Cybersecurity",
      "Project Management",
      "Systems Administration",
      "Network Engineering",
      "Software Development",
      "Data Analytics",
      "Cloud Computing"
    ]
  },
  {
    id: 6,
    text: "How comfortable are you with learning new technologies?",
    type: "scale",
    min: 1,
    max: 5,
    labels: {
      1: "Not comfortable",
      3: "Moderately comfortable",
      5: "Very comfortable"
    }
  },
  {
    id: 7,
    text: "Which skills would you like to leverage in your civilian career?",
    type: "multiSelect",
    maxSelections: 3,
    options: [
      "Leadership",
      "Technical Problem Solving",
      "Project Planning",
      "Team Management",
      "System Analysis",
      "Security Operations",
      "Data Management",
      "Network Operations"
    ]
  },
  {
    id: 8,
    text: "What level of education or certification are you willing to pursue?",
    type: "select",
    options: [
      "Industry Certifications Only",
      "Associate's Degree",
      "Bachelor's Degree",
      "Master's Degree",
      "Not interested in additional education"
    ]
  }
];

export function CareerAssessment({ onComplete }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
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

  const calculateAssessment = (): ICareerAssessment => {
    // Calculate scores based on answers
    return {
      leadership: calculateScore(['leadership', 'team_management']),
      technical: calculateScore(['technical', 'system_analysis']),
      analytical: calculateScore(['data_analysis', 'problem_solving']),
      communication: calculateScore(['presentation', 'documentation']),
      projectManagement: calculateScore(['project_planning', 'coordination']),
      selectedSkills: answers[7] || []
    };
  };

  const calculateScore = (relevantSkills: string[]): number => {
    // Calculate normalized score (0-100) based on answers
    return Math.round(Math.random() * 100); // Placeholder calculation
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    const currentAnswer = answers[question.id];

    switch (question.type) {
      case 'select':
        return (
          <select
            value={currentAnswer || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            className="mt-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select an option</option>
            {question.options?.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );

      case 'multiSelect':
        return (
          <div className="mt-4 space-y-2">
            {question.options?.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={Array.isArray(currentAnswer) && currentAnswer.includes(option)}
                  onChange={(e) => {
                    const selected = Array.isArray(currentAnswer) ? currentAnswer : [];
                    if (e.target.checked) {
                      if (selected.length < (question.maxSelections || 3)) {
                        handleAnswer([...selected, option]);
                      }
                    } else {
                      handleAnswer(selected.filter(item => item !== option));
                    }
                  }}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>{option}</span>
              </label>
            ))}
            {question.maxSelections && (
              <p className="text-sm text-gray-500">
                Select up to {question.maxSelections} options
              </p>
            )}
          </div>
        );

      case 'scale':
        return (
          <div className="mt-4">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleAnswer(value)}
                  className={`w-16 h-16 rounded-full ${
                    currentAnswer === value
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{question.labels?.[1]}</span>
              <span>{question.labels?.[3]}</span>
              <span>{question.labels?.[5]}</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="mb-6">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-indigo-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-gray-500 text-center">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">
        {questions[currentQuestion].text}
      </h2>

      {renderQuestion()}

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
          disabled={!answers[questions[currentQuestion].id]}
        >
          {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
        </Button>
      </div>
    </div>
  );
}