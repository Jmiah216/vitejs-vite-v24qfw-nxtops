import { Job } from '../types';

// Comprehensive mapping of military skills to IT roles
const militaryToITSkillsMap = {
  // Communications/Electronics
  'communications': ['Network Administration', 'Telecommunications', 'IT Infrastructure'],
  'radio operator': ['Network Operations', 'Systems Administration'],
  'signal': ['Network Engineering', 'Telecommunications'],
  
  // Intelligence/Cyber
  'intelligence': ['Data Analysis', 'Cybersecurity', 'Information Security'],
  'cyber': ['Information Security', 'Network Security', 'Security Operations'],
  'cryptologic': ['Cryptography', 'Information Security'],
  
  // Technical Maintenance
  'maintenance': ['Systems Administration', 'Hardware Support', 'Technical Support'],
  'electronics': ['Hardware Engineering', 'Systems Engineering'],
  'equipment': ['Technical Support', 'Systems Administration'],
  
  // Leadership/Management
  'supervisor': ['IT Project Management', 'Team Leadership'],
  'commander': ['IT Management', 'Program Management'],
  'instructor': ['Technical Training', 'IT Education'],
  
  // Analysis/Operations
  'analyst': ['Systems Analysis', 'Data Analysis', 'Business Analysis'],
  'operations': ['Operations Management', 'Systems Operations'],
  'planning': ['Project Planning', 'Systems Architecture']
};

// Comprehensive IT job roles with detailed information
export const itJobs: Job[] = [
  {
    title: "Software Developer",
    code: "15-1252.00",
    description: "Design, develop, and maintain software applications",
    skills: [
      "Programming",
      "Software Design",
      "Problem Solving",
      "Version Control",
      "Testing",
      "Agile Development"
    ],
    tasks: [
      "Write clean, maintainable code",
      "Debug software issues",
      "Collaborate with team members",
      "Implement software features",
      "Optimize application performance",
      "Conduct code reviews"
    ],
    salary: {
      median: "$110,140",
      range: "$65,210 - $168,570"
    },
    certifications: {
      novice: ["CompTIA A+", "MTA (Microsoft Technology Associate)"],
      intermediate: ["Oracle Certified Associate", "AWS Developer Associate"],
      expert: ["AWS Solutions Architect", "Oracle Certified Professional"]
    },
    outlook: "Much faster than average"
  },
  {
    title: "Systems Administrator",
    code: "15-1244.00",
    description: "Install, configure, and maintain computer systems and networks",
    skills: [
      "Network Administration",
      "System Security",
      "Troubleshooting",
      "Server Management",
      "Cloud Services",
      "Infrastructure Management"
    ],
    tasks: [
      "Maintain system security",
      "Monitor system performance",
      "Install and configure software",
      "Manage user accounts",
      "Perform system backups",
      "Implement security protocols"
    ],
    salary: {
      median: "$85,990",
      range: "$52,830 - $134,970"
    },
    certifications: {
      novice: ["CompTIA Network+", "Microsoft Technology Associate"],
      intermediate: ["MCSA", "Red Hat Certified System Administrator"],
      expert: ["MCSE", "Red Hat Certified Engineer"]
    },
    outlook: "Average"
  },
  {
    title: "Cybersecurity Analyst",
    code: "15-1212.00",
    description: "Protect computer networks from security breaches",
    skills: [
      "Network Security",
      "Threat Analysis",
      "Security Tools",
      "Incident Response",
      "Risk Assessment",
      "Security Operations"
    ],
    tasks: [
      "Monitor security threats",
      "Implement security measures",
      "Investigate security breaches",
      "Conduct security assessments",
      "Update security protocols",
      "Perform vulnerability testing"
    ],
    salary: {
      median: "$102,600",
      range: "$61,520 - $165,920"
    },
    certifications: {
      novice: ["CompTIA Security+", "CEH (Certified Ethical Hacker)"],
      intermediate: ["CISSP Associate", "CCNA Security"],
      expert: ["CISSP", "CISM"]
    },
    outlook: "Much faster than average"
  },
  {
    title: "IT Project Manager",
    code: "15-1199.09",
    description: "Plan and coordinate IT projects and team activities",
    skills: [
      "Project Management",
      "Team Leadership",
      "Risk Management",
      "Budget Planning",
      "Stakeholder Management",
      "Agile Methodologies"
    ],
    tasks: [
      "Lead IT project teams",
      "Develop project plans",
      "Manage project budgets",
      "Coordinate resources",
      "Track project progress",
      "Report to stakeholders"
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

interface MatchCriteria {
  selectedSkills: string[];
  itInterests: string[];
  yearsOfService: number;
  desiredSalaryRange?: string;
}

export function findMatchingITJobs(criteria: MatchCriteria): Job[] {
  if (!criteria || !criteria.selectedSkills || !criteria.itInterests) {
    console.error('Invalid match criteria');
    return [];
  }

  try {
    const { selectedSkills, itInterests, yearsOfService, desiredSalaryRange } = criteria;

    // Map military skills to IT skills
    const mappedITSkills = selectedSkills.flatMap(skill => {
      const lowerSkill = skill.toLowerCase();
      for (const [military, itSkills] of Object.entries(militaryToITSkillsMap)) {
        if (lowerSkill.includes(military)) {
          return itSkills;
        }
      }
      return [];
    });

    return itJobs.map(job => {
      let matchScore = 0;

      // Skills match (40%)
      const skillMatches = job.skills.filter(skill => 
        mappedITSkills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
      ).length;
      matchScore += (skillMatches / job.skills.length) * 40;

      // Interest match (30%)
      const interestMatch = itInterests.some(interest => 
        job.title.toLowerCase().includes(interest.toLowerCase())
      );
      matchScore += interestMatch ? 30 : 0;

      // Experience consideration (20%)
      const experienceScore = Math.min(yearsOfService * 2, 20);
      matchScore += experienceScore;

      // Salary range match (10%)
      if (desiredSalaryRange) {
        const [min] = job.salary.range.match(/\d+/g) || [];
        const desiredMin = parseInt(desiredSalaryRange.match(/\d+/)?.[0] || '0');
        if (parseInt(min) >= desiredMin) {
          matchScore += 10;
        }
      }

      return {
        ...job,
        matchScore: Math.round(matchScore)
      };
    }).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  } catch (error) {
    console.error('Error finding matching IT jobs:', error);
    return [];
  }
}

export function generateITSummary(evaluation: any, selectedSkills: string[]): string {
  try {
    const yearsOfService = evaluation.endDate && evaluation.startDate
      ? Math.floor((new Date(evaluation.endDate).getTime() - new Date(evaluation.startDate).getTime()) / (1000 * 60 * 60 * 24 * 365))
      : 0;

    const mappedITSkills = selectedSkills.flatMap(skill => {
      const lowerSkill = skill.toLowerCase();
      for (const [military, itSkills] of Object.entries(militaryToITSkillsMap)) {
        if (lowerSkill.includes(military)) {
          return itSkills;
        }
      }
      return [];
    });

    const uniqueITSkills = [...new Set(mappedITSkills)];
    const skillsText = uniqueITSkills.length > 0
      ? `Skilled in ${uniqueITSkills.slice(0, 3).join(', ')}`
      : 'Strong technical background';

    return `${evaluation.rank} veteran with ${yearsOfService} years of military service. ${skillsText}. Seeking to leverage military leadership and technical expertise in a civilian IT role.`;
  } catch (error) {
    console.error('Error generating IT summary:', error);
    return 'Experienced military veteran seeking to transition into an IT career.';
  }
}