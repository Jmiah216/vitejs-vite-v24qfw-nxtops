import { useState, useEffect } from 'react';
import { MilitaryService } from '../types';
import { getMilitaryToCivilianJob } from '../lib/militaryToIT/jobMapping';

export function useCivilianJobTitle(militaryService: MilitaryService) {
  const [civilianJobTitle, setCivilianJobTitle] = useState('');

  useEffect(() => {
    async function fetchCivilianJob() {
      if (militaryService?.primaryCommand?.jobTitle) {
        const { title } = await getMilitaryToCivilianJob(
          militaryService.branch,
          militaryService.primaryCommand.jobTitle
        );
        setCivilianJobTitle(title);
      }
    }
    fetchCivilianJob();
  }, [militaryService]);

  return { civilianJobTitle };
}