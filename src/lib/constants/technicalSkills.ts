export const technicalSkills = [
  'Network Administration',
  'System Administration',
  'Cybersecurity',
  'Information Security',
  'Network Security',
  'Cloud Computing',
  'Database Management',
  'Software Development',
  'IT Infrastructure',
  'Technical Support',
  'System Analysis',
  'Project Management',
  'Data Analysis',
  'Virtualization',
  'DevOps',
  'IT Service Management',
  'Network Engineering',
  'Security Operations',
  'Risk Management',
  'Incident Response'
] as const;

export type TechnicalSkill = typeof technicalSkills[number];