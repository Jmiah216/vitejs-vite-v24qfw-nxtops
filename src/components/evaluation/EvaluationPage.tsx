import { useState } from 'react';
import { EvaluationUploader } from './EvaluationUploader';
import { ManualEntryForm } from './ManualEntryForm';
import { ResumePreview } from '../ResumePreview';
import type { MilitaryEvaluation } from '../../types';

export function EvaluationPage() {
  const [step, setStep] = useState<'upload' | 'manual' | 'preview'>('upload');
  const [evaluation, setEvaluation] = useState<MilitaryEvaluation | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Upload or Enter Your Military Evaluation</h1>
        <p className="text-gray-600 mb-6">
          Submit your evaluation details to receive a personalized resume for your transition into the IT industry.
        </p>

        {step === 'upload' && (
          <EvaluationUploader
            onEvaluationExtracted={(extractedEval) => {
              setEvaluation(extractedEval);
              setStep('preview');
            }}
            onManualEntry={() => setStep('manual')}
          />
        )}

        {step === 'manual' && (
          <ManualEntryForm
            onSubmit={(manualEval) => {
              setEvaluation(manualEval);
              setStep('preview');
            }}
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
    </div>
  );
}