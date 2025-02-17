import { AssessmentQuestion } from '../../../types/assessment';

export const technicalQuestions: AssessmentQuestion[] = [
  {
    id: 4,
    text: "What tools and technologies are you most experienced with?",
    type: "multiSelect",
    category: "technical",
    options: [
      "Network Infrastructure",
      "System Administration",
      "Cloud Platforms (AWS, Azure)",
      "Database Management",
      "Cybersecurity Tools",
      "Programming/Scripting",
      "Virtualization",
      "IT Service Management"
    ]
  },
  {
    id: 5,
    text: "What certifications or training would you like to pursue?",
    type: "multiSelect",
    category: "technical",
    options: [
      "CompTIA (A+, Network+, Security+)",
      "Cisco Certifications",
      "AWS Certifications",
      "Microsoft Certifications",
      "Project Management (PMP, CAPM)",
      "ITIL Certification",
      "Cybersecurity Certifications",
      "Cloud Computing Certifications"
    ]
  }
];