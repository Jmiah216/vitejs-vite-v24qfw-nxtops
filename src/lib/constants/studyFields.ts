export const studyFields = [
  "Computer Science",
  "Information Technology",
  "Cybersecurity",
  "Network Administration",
  "Software Engineering",
  "Information Systems",
  "Data Analytics",
  "Cloud Computing",
  "IT Project Management",
  "Artificial Intelligence",
  "Machine Learning",
  "Database Administration",
  "Web Development",
  "Mobile Development",
  "DevOps Engineering",
  "Systems Administration",
  "Network Security",
  "Digital Forensics",
  "Business Intelligence",
  "IT Infrastructure"
] as const;

export type StudyField = typeof studyFields[number];