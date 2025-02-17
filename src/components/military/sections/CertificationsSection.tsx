import { useState } from 'react';
import { Button } from '../../ui/button';
import { Certification } from '../../../types/military';

interface Props {
  certifications: Certification[];
  onChange: (certifications: Certification[]) => void;
}

export function CertificationsSection({ certifications, onChange }: Props) {
  const [hasCertifications, setHasCertifications] = useState<boolean | null>(null);
  const [newCert, setNewCert] = useState<Certification>({
    name: '',
    issuingOrg: '',
    dateIssued: ''
  });

  const handleNoCertifications = () => {
    setHasCertifications(false);
    onChange([]);
  };

  const handleHasCertifications = () => {
    setHasCertifications(true);
  };

  const handleAdd = () => {
    if (newCert.name && newCert.issuingOrg && newCert.dateIssued) {
      onChange([...certifications, newCert]);
      setNewCert({
        name: '',
        issuingOrg: '',
        dateIssued: ''
      });
    }
  };

  const handleRemove = (index: number) => {
    onChange(certifications.filter((_, i) => i !== index));
  };

  if (hasCertifications === null) {
    return (
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Certifications & Training</h2>
        <div className="flex gap-4">
          <Button onClick={handleHasCertifications}>
            Yes, I have certifications/training
          </Button>
          <Button variant="outline" onClick={handleNoCertifications}>
            No certifications/training
          </Button>
        </div>
      </div>
    );
  }

  if (!hasCertifications) {
    return (
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Certifications & Training</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600">No certifications or training to add</p>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setHasCertifications(null)}
            className="mt-4"
          >
            Change Selection
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Certifications & Training</h2>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setHasCertifications(null)}
          size="sm"
        >
          Change Selection
        </Button>
      </div>

      {/* Existing Certifications */}
      {certifications.map((cert, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Certification/Training Name</label>
              <p className="mt-1 text-gray-900">{cert.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Issuing Organization</label>
              <p className="mt-1 text-gray-900">{cert.issuingOrg}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date Issued</label>
              <p className="mt-1 text-gray-900">{new Date(cert.dateIssued).toLocaleDateString()}</p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleRemove(index)}
            className="text-red-600 hover:text-red-700"
          >
            Remove
          </Button>
        </div>
      ))}

      {/* Add New Certification */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Certification/Training Name *</label>
            <input
              type="text"
              value={newCert.name}
              onChange={(e) => setNewCert(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., Security+"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Issuing Organization *</label>
            <input
              type="text"
              value={newCert.issuingOrg}
              onChange={(e) => setNewCert(prev => ({ ...prev, issuingOrg: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., CompTIA"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date Issued *</label>
            <input
              type="date"
              value={newCert.dateIssued}
              onChange={(e) => setNewCert(prev => ({ ...prev, dateIssued: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>
        <Button
          type="button"
          onClick={handleAdd}
          disabled={!newCert.name || !newCert.issuingOrg || !newCert.dateIssued}
          className="w-full"
        >
          Add Certification/Training
        </Button>
      </div>
    </div>
  );
}