import { AssessmentQuestion } from '../../../types/assessment';

export const toolsAndCertificationsQuestions: AssessmentQuestion[] = [
  {
    id: 8,
    text: "Have you used any of the following tools or platforms?",
    type: "multiSelect",
    category: "tools",
    description: "Select all that apply to your experience",
    options: [
      "Microsoft Office Suite",
      "SQL Databases",
      "Salesforce",
      "JIRA or other project management tools",
      "SharePoint",
      "Active Directory",
      "Network monitoring tools",
      "Virtualization platforms"
    ],
    customOption: {
      label: "Other",
      placeholder: "Please specify other tools"
    }
  },
  {
    id: 9,
    text: "Are you interested in pursuing additional certifications or training?",
    type: "select",
    category: "certifications",
    options: ["Yes", "No"],
    customOption: {
      label: "If yes, please specify",
      placeholder: "Enter desired certifications or training"
    }
  }
];