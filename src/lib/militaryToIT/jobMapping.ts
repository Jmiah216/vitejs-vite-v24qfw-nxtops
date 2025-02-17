import { ONET_API_KEY } from '../config';

interface CivilianJob {
  title: string;
  code: string;
}

const militaryJobCache = new Map<string, CivilianJob>();

export async function getMilitaryToCivilianJob(branch: string, mos: string): Promise<CivilianJob> {
  const cacheKey = `${branch}-${mos}`;
  
  if (militaryJobCache.has(cacheKey)) {
    return militaryJobCache.get(cacheKey)!;
  }

  try {
    if (!ONET_API_KEY) {
      throw new Error('O*NET API key not configured');
    }

    const response = await fetch(
      `https://services.onetcenter.org/ws/mnm/search?military=${encodeURIComponent(branch)}&code=${encodeURIComponent(mos)}`,
      {
        headers: {
          'Authorization': `Basic ${btoa(`${ONET_API_KEY}:`)}`,
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from O*NET');
    }

    const data = await response.json();
    const match = data.occupation_list?.[0];

    if (!match) {
      throw new Error('No matching civilian job found');
    }

    const civilianJob = {
      title: match.title,
      code: match.code
    };

    militaryJobCache.set(cacheKey, civilianJob);
    return civilianJob;
  } catch (error) {
    console.error('Error fetching civilian job:', error);
    // Fallback mapping for common military jobs
    const fallbackJob = getFallbackCivilianJob(mos);
    militaryJobCache.set(cacheKey, fallbackJob);
    return fallbackJob;
  }
}

function getFallbackCivilianJob(mos: string): CivilianJob {
  const fallbackMappings: Record<string, CivilianJob> = {
    '25B': { title: 'Information Technology Specialist', code: '15-1212.00' },
    '17C': { title: 'Information Security Analyst', code: '15-1212.00' },
    '35T': { title: 'Computer Systems Analyst', code: '15-1211.00' },
    'IT': { title: 'Network Administrator', code: '15-1244.00' },
    'CTN': { title: 'Cybersecurity Engineer', code: '15-1212.00' },
    '3D0X2': { title: 'Systems Administrator', code: '15-1244.00' },
    // Add more fallback mappings as needed
  };

  // Extract MOS code from full string (e.g., "25B - IT Specialist" -> "25B")
  const mosCode = mos.split(' - ')[0];
  
  return fallbackMappings[mosCode] || { 
    title: 'Information Technology Professional',
    code: '15-1299.00'
  };
}