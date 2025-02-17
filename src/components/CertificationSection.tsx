import React, { useState } from 'react';
import { Button } from './ui/button';
import { Certification } from '../types';
import { itCertifications } from '../lib/certificationData';

interface Props {
  onAdd: (certification: Certification) => void;
  onRemove: (index: number) => void;
  certificationList: Certification[];
}

export function CertificationSection({ onAdd, onRemove, certificationList }: Props) {
  const [selectedLevel, setSelectedLevel] = useState<keyof typeof itCertifications>('Entry Level');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const handleAdd = () => {
    if (selectedCert) {
      onAdd({
        ...selectedCert,
        date: new Date().toISOString().split('T')[0],
        level: selectedLevel as Certification['level']
      });
      setSelectedCert(null);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">IT Certifications</h3>

      {/* Existing Certifications */}
      {certificationList.length > 0 && (
        <div className="space-y-4">
          {certificationList.map((cert, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">{cert.name}</h4>
                  <p className="text-gray-600">{cert.issuer}</p>
                  <p className="text-sm text-gray-500">
                    Field: {cert.fieldOfStudy}
                    {cert.level && ` • Level: ${cert.level}`}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemove(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Certification */}
      <div className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Certification Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as keyof typeof itCertifications)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {Object.keys(itCertifications).map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Certification</label>
            <select
              value={selectedCert?.name || ''}
              onChange={(e) => {
                const cert = itCertifications[selectedLevel].find(c => c.name === e.target.value);
                setSelectedCert(cert || null);
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select Certification</option>
              {itCertifications[selectedLevel].map(cert => (
                <option key={cert.name} value={cert.name}>{cert.name}</option>
              ))}
            </select>
          </div>
        </div>

        {selectedCert && (
          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium">{selectedCert.name}</h4>
            <p className="text-gray-600">Issuer: {selectedCert.issuer}</p>
            <p className="text-gray-600">Field: {selectedCert.fieldOfStudy}</p>
          </div>
        )}

        <div className="flex justify-end">
          <Button
            onClick={handleAdd}
            disabled={!selectedCert}
          >
            Add Certification
          </Button>
        </div>
      </div>
    </div>
  );
}