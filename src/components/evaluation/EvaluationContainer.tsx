import { useState } from 'react';
import { EvaluationUploader } from './EvaluationUploader';
import { ManualEntryForm } from './ManualEntryForm';
import { ResumePreview } from '../ResumePreview';
import type { MilitaryEvaluation } from '../../types';

interface Props {
  onBack: () => void;
}

export function EvaluationContainer({ onBack }: Props) {
  const [step, setStep] = useState<'upload' | 'manual' | 'preview'>('upload');
  const [evaluation, setEvaluation] = useState<MilitaryEvaluation | null>(null);

  const handleEvaluationExtracted = (extractedEvaluation: MilitaryEvaluation) => {
    setEvaluation(extractedEvaluation);
    setStep('preview');
  };

  const handleManualSubmit = (manualEvaluation: MilitaryEvaluation) => {
    setEvaluation(manualEvaluation);
    setStep('preview');
  };

  return (
    <div>
      {step === 'upload' && (
        <EvaluationUploader
          onEvaluationExtracted={handleEvaluationExtracted}
          onManualEntry={() => setStep('manual')}
        />
      )}

      {step === 'manual' && (
        <ManualEntryForm
          onSubmit={handleManualSubmit}
          onBack={() => setStep('upload')}
        />
      )}

      {step === 'preview' && evaluation && (
        <ResumePreview
          evaluation={evaluation}
          onBack={() => setStep(step === 'manual' ? 'manual' : 'upload')}
        />
      )}
    </div>
  );
}