import { useState } from 'react';
import { AssessmentForm } from './AssessmentForm';
import { MilitaryInfoPage } from '../military/MilitaryInfoPage';
import { CareerAssessment } from '../../types/assessment';
import { MilitaryInfo } from '../../types/military';

interface Props {
  onComplete: (assessment: CareerAssessment, militaryInfo: MilitaryInfo) => void;
}

export function AssessmentContainer({ onComplete }: Props) {
  const [step, setStep] = useState<'assessment' | 'military'>('assessment');
  const [assessment, setAssessment] = useState<CareerAssessment | null>(null);

  const handleAssessmentComplete = (results: CareerAssessment) => {
    setAssessment(results);
    setStep('military');
  };

  const handleMilitaryComplete = (militaryInfo: MilitaryInfo) => {
    if (assessment) {
      onComplete(assessment, militaryInfo);
    }
  };

  return (
    <div className="space-y-6">
      {step === 'assessment' ? (
        <AssessmentForm onComplete={handleAssessmentComplete} />
      ) : assessment ? (
        <MilitaryInfoPage
          assessment={assessment}
          onComplete={handleMilitaryComplete}
        />
      ) : null}
    </div>
  );
}