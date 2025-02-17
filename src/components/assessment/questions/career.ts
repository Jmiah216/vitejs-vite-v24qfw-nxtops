import { AssessmentQuestion } from '../../../types/assessment';

export const careerQuestions: AssessmentQuestion[] = [
  {
    id: 8,
    text: "What are your salary expectations for your civilian career?",
    type: "select",
    category: "career",
    options: [
      "Under $50,000",
      "$50,000 - $75,000",
      "$75,000 - $100,000",
      "$100,000 - $125,000",
      "$125,000 - $150,000",
      "Over $150,000"
    ]
  },
  {
    id: 9,
    text: "What type of work environment do you prefer?",
    type: "multiSelect",
    category: "career",
    options: [
      "Office/Corporate",
      "Remote/Work from Home",
      "Hybrid",
      "Field Operations",
      "Government/Public Sector",
      "Defense Contractor"
    ]
  },
  {
    id: 10,
    text: "Which IT career paths align with your interests and experience?",
    type: "multiSelectLimited",
    category: "career",
    maxSelections: 3,
    description: "Select up to 3 areas that match your skills and career goals",
    options: [
      "Information Security/Cybersecurity",
      "Network Engineering",
      "Systems Administration",
      "Cloud Computing",
      "Software Development",
      "IT Project Management",
      "Database Administration",
      "DevOps Engineering",
      "IT Training/Education",
      "Technical Support/Help Desk"
    ]
  }
];