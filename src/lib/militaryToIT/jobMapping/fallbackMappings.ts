import { CivilianJob } from '../../../types';

export const fallbackMappings: Record<string, CivilianJob> = {
  '25B': { title: 'Information Technology Specialist', code: '15-1212.00' },
  '17C': { title: 'Information Security Analyst', code: '15-1212.00' },
  '35T': { title: 'Computer Systems Analyst', code: '15-1211.00' },
  'IT': { title: 'Network Administrator', code: '15-1244.00' },
  'CTN': { title: 'Cybersecurity Engineer', code: '15-1212.00' },
  '3D0X2': { title: 'Systems Administrator', code: '15-1244.00' }
};

export function getFallbackJob(mos: string): CivilianJob {
  const mosCode = mos.split(' - ')[0];
  return fallbackMappings[mosCode] || {
    title: 'Information Technology Professional',
    code: '15-1299.00'
  };
}