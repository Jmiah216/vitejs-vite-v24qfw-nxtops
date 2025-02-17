import { ONET_API_KEY } from '../../config';
import { CivilianJob } from '../../../types';

export async function fetchFromONET(branch: string, mos: string): Promise<CivilianJob> {
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

  return {
    title: match.title,
    code: match.code
  };
}