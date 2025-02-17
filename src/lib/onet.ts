import { ONET_API_KEY } from './config';

export interface OnetJob {
  title: string;
  code: string;
  skills: string[];
  tasks: string[];
  description?: string;
  salary?: {
    median: string;
    range: string;
  };
  outlook?: string;
  matchScore?: number;
}

export function getMOCCrosswalkURL(): string {
  return 'https://www.onetonline.org/crosswalk/MOC/';
}

function getMockJobs(): OnetJob[] {
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
      outlook: "Much faster than average",
      matchScore: 85
    },
    {
      title: "Software Developer",
      code: "15-1252.00",
      description: "Design and develop software applications",
      skills: ["Programming", "Software Development", "Problem Solving"],
      tasks: [
        "Write code",
        "Debug software",
        "Implement features"
      ],
      salary: {
        median: "$110,140",
        range: "$65,210 - $168,570"
      },
      outlook: "Much faster than average",
      matchScore: 80
    }
  ];
}

export async function searchMilitaryToONET(branch: string, mosCode: string): Promise<OnetJob[]> {
  if (!ONET_API_KEY) {
    console.warn('O*NET API key not configured, using mock data');
    return getMockJobs();
  }

  try {
    const response = await fetch(
      `https://services.onetcenter.org/ws/mnm/search?military=${encodeURIComponent(branch)}&code=${encodeURIComponent(mosCode)}`,
      {
        headers: {
          'Authorization': `Basic ${btoa(`${ONET_API_KEY}:`)}`,
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`O*NET API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.occupation_list?.length) {
      return getMockJobs();
    }

    const jobPromises = data.occupation_list
      .slice(0, 5)
      .map(async (job: any) => {
        try {
          return await fetchJobDetails(job.code);
        } catch (error) {
          console.error(`Error fetching details for job ${job.code}:`, error);
          return null;
        }
      });

    const jobs = await Promise.all(jobPromises);
    const validJobs = jobs.filter((job): job is OnetJob => job !== null);
    
    return validJobs.length > 0 ? validJobs : getMockJobs();
  } catch (error) {
    console.error('Error fetching from O*NET:', error);
    return getMockJobs();
  }
}

async function fetchJobDetails(onetCode: string): Promise<OnetJob | null> {
  if (!ONET_API_KEY || !onetCode) {
    return null;
  }

  try {
    const response = await fetch(
      `https://services.onetcenter.org/ws/online/occupations/${onetCode}/details`,
      {
        headers: {
          'Authorization': `Basic ${btoa(`${ONET_API_KEY}:`)}`,
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch job details: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      title: data.title || 'Unknown Title',
      code: onetCode,
      description: data.description || '',
      skills: (data.skills || []).map((s: any) => s.name || '').filter(Boolean),
      tasks: (data.tasks || []).map((t: any) => t.name || '').filter(Boolean),
      salary: {
        median: data.wage?.median_annual ? `$${data.wage.median_annual.toLocaleString()}` : 'Not available',
        range: `$${(data.wage?.annual_10th || 0).toLocaleString()} - $${(data.wage?.annual_90th || 0).toLocaleString()}`
      },
      outlook: data.bright_outlook_category || 'Not available'
    };
  } catch (error) {
    console.error('Error fetching job details:', error);
    return null;
  }
}