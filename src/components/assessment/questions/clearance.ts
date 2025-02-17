import { AssessmentQuestion } from '../../../types/assessment';

export const clearanceQuestions: AssessmentQuestion[] = [
  {
    id: 6,
    text: "Are you eligible for a security clearance?",
    type: "select",
    category: "clearance",
    options: [
      "Yes",
      "No",
      "Unsure"
    ]
  },
  {
    id: 7,
    text: "What level of security clearance do you currently hold?",
    type: "select",
    category: "clearance",
    options: [
      "None",
      "Public Trust",
      "Secret",
      "Top Secret (TS)",
      "Top Secret/SCI (TS/SCI)"
    ],
    customOption: {
      label: "Other",
      placeholder: "Please specify"
    },
    dependsOn: {
      questionId: 6,
      value: "Yes"
    }
  }
];