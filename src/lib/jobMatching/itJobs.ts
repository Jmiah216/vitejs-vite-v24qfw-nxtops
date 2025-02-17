import { Job } from '../../types';

// Comprehensive list of IT jobs with detailed information
export const itJobs: Job[] = [
  {
    title: "Information Security Analyst",
    code: "15-1212.00",
    description: "Plan and implement security measures to protect computer systems and networks",
    skills: [
      "Cybersecurity",
      "Network Security",
      "Risk Analysis",
      "Security Operations",
      "Incident Response",
      "Vulnerability Assessment",
      "Security Compliance"
    ],
    tasks: [
      "Monitor security threats",
      "Implement security protocols",
      "Conduct security assessments",
      "Develop security standards",
      "Investigate security breaches"
    ],
    salary: {
      median: "$102,600",
      range: "$61,520 - $165,920"
    },
    certifications: {
      novice: ["Security+", "CEH"],
      intermediate: ["CISSP Associate", "CCNA Security"],
      expert: ["CISSP", "CISM"]
    },
    outlook: "Much faster than average"
  },
  {
    title: "Systems Administrator",
    code: "15-1244.00",
    description: "Install, configure, and maintain computer systems and networks",
    skills: [
      "System Administration",
      "Network Management",
      "Infrastructure Support",
      "Cloud Services",
      "Troubleshooting",
      "Server Management"
    ],
    tasks: [
      "Maintain system security",
      "Configure networks",
      "Manage user accounts",
      "Monitor system performance",
      "Install and update software"
    ],
    salary: {
      median: "$85,990",
      range: "$52,830 - $134,970"
    },
    certifications: {
      novice: ["CompTIA A+", "Network+"],
      intermediate: ["MCSA", "Linux+"],
      expert: ["MCSE", "Red Hat Certified Engineer"]
    },
    outlook: "Growing steadily"
  },
  {
    title: "Network Engineer",
    code: "15-1241.00",
    description: "Design and implement computer and information networks",
    skills: [
      "Network Architecture",
      "Routing & Switching",
      "Network Security",
      "WAN/LAN",
      "Cloud Networking",
      "Network Protocols"
    ],
    tasks: [
      "Design network configurations",
      "Install network equipment",
      "Optimize network performance",
      "Implement security protocols",
      "Troubleshoot network issues"
    ],
    salary: {
      median: "$95,450",
      range: "$58,860 - $153,730"
    },
    certifications: {
      novice: ["Network+", "CCNA"],
      intermediate: ["CCNP", "AWS Network Specialty"],
      expert: ["CCIE", "Advanced Network Architect"]
    },
    outlook: "Faster than average"
  },
  {
    title: "IT Project Manager",
    code: "15-1199.09",
    description: "Plan and coordinate IT projects and team activities",
    skills: [
      "Project Management",
      "Team Leadership",
      "Risk Management",
      "Agile Methodologies",
      "Stakeholder Management",
      "Technical Planning"
    ],
    tasks: [
      "Lead technical teams",
      "Manage project timelines",
      "Coordinate resources",
      "Monitor project budgets",
      "Report project status"
    ],
    salary: {
      median: "$98,420",
      range: "$57,440 - $159,140"
    },
    certifications: {
      novice: ["CAPM", "Scrum Master"],
      intermediate: ["PMP", "PMI-ACP"],
      expert: ["PgMP", "PMI-PBA"]
    },
    outlook: "Growing faster than average"
  }
];

export async function getITJobs(): Promise<Job[]> {
  // In a real application, this would fetch from an API
  return itJobs;
}