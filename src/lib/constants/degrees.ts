export const degrees = [
  "Associate of Science",
  "Associate of Arts",
  "Bachelor of Science",
  "Bachelor of Arts",
  "Master of Business Administration",
  "Master of Science"
] as const;

export type Degree = typeof degrees[number];