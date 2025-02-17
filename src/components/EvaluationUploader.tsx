import React, { useCallback, useState } from 'react';
import { Button } from './ui/button';
import { MilitaryEvaluation } from '../types';
import { parseEvaluation } from '../lib/evaluationParser';

interface Props {
  onEvaluationExtracted: (evaluation: MilitaryEvaluation) => void;
  onManualEntry: () => void;
}

export function EvaluationUploader({ onEvaluationExtracted, onManualEntry }: Props) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processFile(file);
    }
  }, []);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await processFile(file);
    }
  }, []);

  const processFile = async (file: File) => {
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const evaluation = await parseEvaluation(file);
      
      if (evaluation) {
        onEvaluationExtracted(evaluation);
      } else {
        setError('Unable to extract information from the evaluation. Please try entering your information manually.');
      }
    } catch (error) {
      console.error('Error processing file:', error);
      setError('An error occurred while processing the file. Please try again or enter your information manually.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Upload Military Evaluation</h2>
      
      <div className="space-y-4">
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive 
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-300 hover:border-indigo-400'
          }`}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="evaluation-upload"
            disabled={isProcessing}
          />
          <label
            htmlFor="evaluation-upload"
            className="cursor-pointer"
          >
            <div className="space-y-2">
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  <span className="ml-2">Processing evaluation...</span>
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
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-indigo-600 hover:text-indigo-500">
                      Upload your evaluation
                    </span>
                    {' '}or drag and drop
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF files only, up to 10MB
                  </p>
                </>
              )}
            </div>
          </label>
        </div>

        {error && (
          <div className="text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <div className="text-center">
          <span className="text-sm text-gray-500">or</span>
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            onClick={onManualEntry}
            className="w-full"
          >
            Enter Information Manually
          </Button>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-500">
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
  );
}