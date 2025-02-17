import { useState } from 'react';
import { AssessmentButton } from '../assessment/AssessmentButton';
import { AssessmentContainer } from '../assessment/AssessmentContainer';

export function EvaluationPage() {
  const [showAssessment, setShowAssessment] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="bg-military-dark rounded-lg p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-4">
          Military to IT Career Evaluation
        </h1>
        <p className="text-military-light text-lg mb-4">
          Transform your military experience into a successful IT career. Our evaluation process helps you:
        </p>
        <ul className="list-disc list-inside space-y-2 text-military-light">
          <li>Translate your military skills into civilian IT qualifications</li>
          <li>Match your experience with in-demand IT roles</li>
          <li>Create tailored resumes that highlight your relevant experience</li>
          <li>Identify recommended certifications based on your background</li>
        </ul>
      </div>

      {/* Process Steps */}
      <div className="bg-white rounded-lg p-8 mb-8 shadow-lg">
        <h2 className="text-2xl font-bold text-military-dark mb-6">Evaluation Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-l-4 border-military-accent p-4">
            <h3 className="font-bold text-lg mb-2">1. Military Background</h3>
            <p className="text-gray-600">
              Enter your service details, including branch, rank, MOS/Rating, and key responsibilities
            </p>
          </div>
          <div className="border-l-4 border-military-accent p-4">
            <h3 className="font-bold text-lg mb-2">2. Skills Assessment</h3>
            <p className="text-gray-600">
              We'll analyze your military experience to identify transferable IT skills and competencies
            </p>
          </div>
          <div className="border-l-4 border-military-accent p-4">
            <h3 className="font-bold text-lg mb-2">3. Career Matching</h3>
            <p className="text-gray-600">
              Receive personalized IT career recommendations and customized resume templates
            </p>
          </div>
        </div>
      </div>

      {/* Security Clearance Notice */}
      <div className="bg-military-lightest rounded-lg p-6 mb-8 border-l-4 border-military-accent">
        <h3 className="text-lg font-bold text-military-dark mb-2">Security Clearance Advantage</h3>
        <p className="text-military-text">
          If you hold an active security clearance, many IT positions in defense contracting and federal agencies 
          offer excellent opportunities with competitive compensation. We'll help you leverage this valuable credential.
        </p>
      </div>

      {/* Assessment Section */}
      {showAssessment ? (
        <AssessmentContainer onBack={() => setShowAssessment(false)} />
      ) : (
        <div className="flex justify-end mt-8">
          <AssessmentButton onClick={() => setShowAssessment(true)} />
        </div>
      )}
    </div>
  );
}