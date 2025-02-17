import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MilitaryInfoForm } from '../military/MilitaryInfoForm';
import { MilitaryInfo } from '../../types/military';

export function MilitaryServicePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (info: MilitaryInfo) => {
    setLoading(true);
    try {
      // Save military info logic here
      navigate('/evaluation'); // Navigate to evaluation page after saving
    } catch (error) {
      console.error('Error saving military info:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-military-lightest py-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-military-dark rounded-lg p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-4">
            Military Service Profile
          </h1>
          <p className="text-military-light text-lg">
            Tell us about your military experience to help us match you with the best IT career opportunities.
            Your service background is valuable - let's translate it into civilian success.
          </p>
        </div>

        {/* Instructions Card */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-lg border-l-4 border-military-accent">
          <h2 className="text-xl font-semibold text-military-dark mb-4">
            Important Instructions
          </h2>
          <ul className="space-y-2 text-military-text">
            <li className="flex items-start">
              <span className="text-military-accent mr-2">•</span>
              Complete all required fields marked with an asterisk (*)
            </li>
            <li className="flex items-start">
              <span className="text-military-accent mr-2">•</span>
              Use official military records for accurate information
            </li>
            <li className="flex items-start">
              <span className="text-military-accent mr-2">•</span>
              Include all relevant commands and assignments
            </li>
            <li className="flex items-start">
              <span className="text-military-accent mr-2">•</span>
              List significant awards and decorations
            </li>
          </ul>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-8">
            <MilitaryInfoForm
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}