import React, { useState } from 'react';
import { Button } from './ui/button';
import type { Certification } from '../types';

interface Props {
  onAdd: (certification: Certification) => void;
}

export function CertificationInput({ onAdd }: Props) {
  const [certification, setCertification] = useState<Certification>({
    name: '',
    issuer: '',
    fieldOfStudy: '',
    date: '',
    expirationDate: '',
    credentialId: '',
    level: 'Beginner'
  });

  const handleAdd = () => {
    if (certification.name && certification.issuer) {
      onAdd(certification);
      setCertification({
        name: '',
        issuer: '',
        fieldOfStudy: '',
        date: '',
        expirationDate: '',
        credentialId: '',
        level: 'Beginner'
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Certification Name</label>
        <input
          type="text"
          value={certification.name}
          onChange={(e) => setCertification(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Issuing Organization</label>
        <input
          type="text"
          value={certification.issuer}
          onChange={(e) => setCertification(prev => ({ ...prev, issuer: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Field of Study</label>
        <input
          type="text"
          value={certification.fieldOfStudy}
          onChange={(e) => setCertification(prev => ({ ...prev, fieldOfStudy: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date Earned</label>
          <input
            type="date"
            value={certification.date}
            onChange={(e) => setCertification(prev => ({ ...prev, date: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
          <input
            type="date"
            value={certification.expirationDate}
            onChange={(e) => setCertification(prev => ({ ...prev, expirationDate: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Credential ID</label>
        <input
          type="text"
          value={certification.credentialId}
          onChange={(e) => setCertification(prev => ({ ...prev, credentialId: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Proficiency Level</label>
        <select
          value={certification.level}
          onChange={(e) => setCertification(prev => ({ ...prev, level: e.target.value as Certification['level'] }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Expert">Expert</option>
        </select>
      </div>

      <Button 
        type="button"
        onClick={handleAdd}
        disabled={!certification.name || !certification.issuer}
      >
        Add Certification
      </Button>
    </div>
  );
}