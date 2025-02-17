import { AssessmentQuestion } from '../../../types/assessment';

export const backgroundQuestions: AssessmentQuestion[] = [
  {
    id: 1,
    text: "How many years did you serve in the military?",
    type: "select",
    category: "background",
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
    text: "What was your highest rank achieved?",
    type: "select",
    category: "background",
    options: [
      "E1-E4 (Junior Enlisted)",
      "E5-E6 (NCO)",
      "E7-E9 (Senior NCO)",
      "O1-O3 (Junior Officer)",
      "O4-O6 (Field Grade Officer)",
      "O7+ (General/Flag Officer)",
      "W1-W5 (Warrant Officer)"
    ]
  },
  {
    id: 3,
    text: "Select your primary military roles",
    type: "multiSelectLimited",
    category: "experience",
    maxSelections: 3,
    options: [
      "Infantry/Combat Arms",
      "Intelligence/Security",
      "Logistics/Supply Chain",
      "Communications/IT",
      "Medical/Healthcare",
      "Engineering",
      "Aviation/Aircraft Maintenance",
      "Vehicle/Equipment Maintenance",
      "Administration/Personnel",
      "Security Forces/Military Police",
      "Special Operations",
      "Training/Instruction",
      "Software/Microsoft Suite Training"
    ]
  }
];