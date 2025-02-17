import { useState, useEffect } from 'react';
import { militaryJobs, MilitaryBranch } from '../lib/constants';

export function useMilitaryJobs(branch: MilitaryBranch | '') {
  const [availableJobs, setAvailableJobs] = useState<string[]>([]);

  useEffect(() => {
    if (branch && branch in militaryJobs) {
      setAvailableJobs(militaryJobs[branch as MilitaryBranch]);
    } else {
      setAvailableJobs([]);
    }
  }, [branch]);

  return { availableJobs };
}