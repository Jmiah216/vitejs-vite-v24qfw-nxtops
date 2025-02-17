import { AssessmentQuestion } from '../../../types/assessment';
import { backgroundQuestions } from './background';
import { technicalQuestions } from './technical';
import { clearanceQuestions } from './clearance';
import { careerQuestions } from './career';

// Combine all question sections in a logical order
export const assessmentQuestions: AssessmentQuestion[] = [
  ...backgroundQuestions,       // Questions 1-3: Military background
  ...technicalQuestions,        // Questions 4-5: Technical skills and certifications
  ...clearanceQuestions,        // Questions 6-7: Security clearance info
  ...careerQuestions           // Questions 8-10: Career preferences
];

// Verify we have exactly 10 questions
if (assessmentQuestions.length !== 10) {
  console.warn(`Expected 10 questions, but found ${assessmentQuestions.length}`);
}