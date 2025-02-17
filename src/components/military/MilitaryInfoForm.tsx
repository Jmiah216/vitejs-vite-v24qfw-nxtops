import { useState } from 'react';
import { Button } from '../ui/button';
import { ServiceDetailsSection } from './sections/ServiceDetailsSection';
import { CommandSection } from './sections/CommandSection';
import { AwardsSection } from './sections/AwardsSection';
import { SecurityClearance, MilitaryInfo } from '../../types/military';

interface Props {
  initialSecurityClearance?: SecurityClearance;
  onSubmit: (info: MilitaryInfo) => void;
}

export function MilitaryInfoForm({ initialSecurityClearance, onSubmit }: Props) {
  const [info, setInfo] = useState<MilitaryInfo>({
    branch: '',
    rank: '',
    serviceStartDate: '',
    serviceEndDate: '',
    primaryMOS: '',
    unit: '',
    commands: [],
    awards: [],
    securityClearance: initialSecurityClearance || {
      eligible: 'Unsure',
      current: 'None'
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(info);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <ServiceDetailsSection
        value={info}
        onChange={(updates) => setInfo(prev => ({ ...prev, ...updates }))}
      />

      <CommandSection
        commands={info.commands}
        onChange={(commands) => setInfo(prev => ({ ...prev, commands }))}
      />

      <AwardsSection
        awards={info.awards}
        onChange={(awards) => setInfo(prev => ({ ...prev, awards }))}
      />

      <div className="flex justify-end">
        <Button type="submit">
          Continue to Evaluation Upload
        </Button>
      </div>
    </form>
  );
}