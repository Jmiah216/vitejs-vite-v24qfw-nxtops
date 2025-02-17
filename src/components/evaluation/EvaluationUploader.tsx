import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '../ui/button';
import { parseEvaluation } from '../../lib/evaluationParser';
import type { MilitaryEvaluation } from '../../types';

interface Props {
  onEvaluationExtracted: (evaluation: MilitaryEvaluation) => void;
  onManualEntry: () => void;
}

export function EvaluationUploader({ onEvaluationExtracted, onManualEntry }: Props) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setIsProcessing(true);
    setError(null);

    try {
      const evaluation = await parseEvaluation(acceptedFiles[0]);
      if (evaluation) {
        onEvaluationExtracted(evaluation);
      } else {
        setError('Unable to extract information from the evaluation. Please try entering your information manually.');
      }
    } catch (err) {
      setError('Error processing file. Please try again or enter your information manually.');
    } finally {
      setIsProcessing(false);
    }
  }, [onEvaluationExtracted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 1
  });

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Upload or Enter Your Military Evaluation</h2>
      <p className="text-gray-600 mb-6">
        Submit your evaluation details to receive a personalized resume for your transition into the IT industry.
      </p>

      <div className="space-y-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}
        >
          <input {...getInputProps()} />
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
              <span>Processing evaluation...</span>
            </div>
          ) : (
            <>
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                <span className="font-medium text-indigo-600">Upload your evaluation</span>
                {' '}or drag and drop
              </p>
              <p className="mt-1 text-xs text-gray-500">
                PDF, DOC, DOCX, JPG, or PNG
              </p>
            </>
          )}
        </div>

        {error && (
          <div className="text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <div className="text-center">
          <span className="text-sm text-gray-500">or</span>
        </div>

        <Button
          onClick={onManualEntry}
          variant="outline"
          className="w-full"
        >
          Enter Information Manually
        </Button>

        <div className="mt-4 text-sm text-gray-500">
          <h3 className="font-medium mb-2">Supported Evaluation Types:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>NCOER (Army)</li>
            <li>OER (Army)</li>
            <li>FITREP (Navy/Marines)</li>
            <li>EPR (Air Force)</li>
            <li>OPR (Air Force)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}