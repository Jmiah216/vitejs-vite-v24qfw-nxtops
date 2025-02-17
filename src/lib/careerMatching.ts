import { Job, MilitaryInfo } from '../types';

export async function findMatchingJobs(militaryInfo: MilitaryInfo): Promise<Job[]> {
  // This would typically call an API or database
  // For now, return mock data
  return [
    {
      title: "Information Security Analyst",
      code: "15-1212.00",
      description: "Plan and implement security measures to protect computer systems and networks",
      skills: ["Cybersecurity", "Network Security", "Risk Analysis"],
      tasks: [
        "Monitor security threats",
        "Implement security protocols",
        "Conduct security assessments"
      ],
      salary: {
        median: "$102,600",
        range: "$61,520 - $165,920"
      },
      certifications: {
        novice: ["Security+"],
        intermediate: ["CISSP Associate"],
        expert: ["CISSP"]
      },
      outlook: "Much faster than average",
      matchScore: 85
    },
    {
      title: "IT Project Manager",
      code: "15-1199.09",
      description: "Plan and coordinate IT projects and team activities",
      skills: ["Project Management", "Leadership", "Technical Planning"],
      tasks: [
        "Lead technical teams",
        "Manage project timelines",
        "Coordinate resources"
      ],
      salary: {
        median: "$98,420",
        range: "$57,440 - $159,140"
      },
      certifications: {
        novice: ["CAPM"],
        intermediate: ["PMP"],
        expert: ["PgMP"]
      },
      outlook: "Growing faster than average",
      matchScore: 80
    },
    {
      title: "Systems Administrator",
      code: "15-1244.00",
      description: "Install, configure, and maintain computer systems",
      skills: ["System Administration", "Network Security", "Technical Support"],
      tasks: [
        "Maintain system security",
        "Configure networks",
        "Provide technical support"
      ],
      salary: {
        median: "$85,990",
        range: "$52,830 - $134,970"
      },
      certifications: {
        novice: ["CompTIA A+"],
        intermediate: ["MCSA"],
        expert: ["MCSE"]
      },
      outlook: "Stable growth",
      matchScore: 75
    }
  ];
}