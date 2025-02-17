// Map military skills to IT domains
export const militaryToITSkills: Record<string, string[]> = {
  // Communications/Electronics
  communications: ['Network Administration', 'Telecommunications', 'IT Infrastructure'],
  radio: ['Network Operations', 'Systems Administration'],
  signal: ['Network Engineering', 'Telecommunications'],
  
  // Intelligence/Cyber
  intelligence: ['Data Analysis', 'Cybersecurity', 'Information Security'],
  cyber: ['Information Security', 'Network Security', 'Security Operations'],
  cryptologic: ['Cryptography', 'Information Security'],
  
  // Technical Maintenance
  maintenance: ['Systems Administration', 'Hardware Support', 'Technical Support'],
  electronics: ['Hardware Engineering', 'Systems Engineering'],
  equipment: ['Technical Support', 'Systems Administration'],
  
  // Leadership/Management
  supervisor: ['IT Project Management', 'Team Leadership'],
  commander: ['IT Management', 'Program Management'],
  instructor: ['Technical Training', 'IT Education'],
  
  // Analysis/Operations
  analyst: ['Systems Analysis', 'Data Analysis', 'Business Analysis'],
  operations: ['Operations Management', 'Systems Operations'],
  planning: ['Project Planning', 'Systems Architecture']
};