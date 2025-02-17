import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../auth/AuthProvider';
import { saveMilitaryInfo } from '../../lib/supabase/api/military';
import { Button } from '../ui/button';
import { militaryBranches } from '../../lib/constants';
import { militaryRanks } from '../../lib/constants/ranks';
import { militaryJobs } from '../../lib/constants/militaryJobs';
import type { MilitaryInfo, Command } from '../../types/military';

export function MilitaryInfoPage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [activeStep, setActiveStep] = useState(1);
  const [showCustomJob, setShowCustomJob] = useState(false);
  const [customJob, setCustomJob] = useState('');
  const [info, setInfo] = useState<Partial<MilitaryInfo>>({
    branch: '',
    rank: '',
    jobTitle: '',
    unit: '',
    startDate: '',
    endDate: '',
    commands: [],
    responsibilities: [],
    education: [],
    certifications: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddCommand = () => {
    setInfo(prev => ({
      ...prev,
      commands: [
        ...(prev.commands || []),
        {
          unit: '',
          jobTitle: '',
          startDate: '',
          endDate: '',
          responsibilities: []
        }
      ]
    }));
  };

  const handleRemoveCommand = (index: number) => {
    setInfo(prev => ({
      ...prev,
      commands: prev.commands?.filter((_, i) => i !== index) || []
    }));
  };

  const handleUpdateCommand = (index: number, field: keyof Command, value: string) => {
    setInfo(prev => {
      const newCommands = [...(prev.commands || [])];
      newCommands[index] = {
        ...newCommands[index],
        [field]: value
      };
      return { ...prev, commands: newCommands };
    });
  };

  const handleAddCommandResponsibility = (commandIndex: number) => {
    setInfo(prev => {
      const newCommands = [...(prev.commands || [])];
      newCommands[commandIndex] = {
        ...newCommands[commandIndex],
        responsibilities: [...(newCommands[commandIndex].responsibilities || []), '']
      };
      return { ...prev, commands: newCommands };
    });
  };

  const handleRemoveCommandResponsibility = (commandIndex: number, respIndex: number) => {
    setInfo(prev => {
      const newCommands = [...(prev.commands || [])];
      newCommands[commandIndex] = {
        ...newCommands[commandIndex],
        responsibilities: newCommands[commandIndex].responsibilities.filter((_, i) => i !== respIndex)
      };
      return { ...prev, commands: newCommands };
    });
  };

  const handleUpdateCommandResponsibility = (commandIndex: number, respIndex: number, value: string) => {
    setInfo(prev => {
      const newCommands = [...(prev.commands || [])];
      newCommands[commandIndex] = {
        ...newCommands[commandIndex],
        responsibilities: newCommands[commandIndex].responsibilities.map((resp, i) => 
          i === respIndex ? value : resp
        )
      };
      return { ...prev, commands: newCommands };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!info.branch || !info.rank || !info.jobTitle) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await saveMilitaryInfo({
        ...info,
        user_id: user?.id
      });
      navigate('/evaluation');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save information');
    } finally {
      setLoading(false);
    }
  };

  const handleAddResponsibility = () => {
    setInfo(prev => ({
      ...prev,
      responsibilities: [...(prev.responsibilities || []), '']
    }));
  };

  const availableRanks = info.branch ? militaryRanks[info.branch] || [] : [];
  
  const availableJobs = info.branch ? militaryJobs[info.branch] || [] : [];

  const handleJobChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'custom') {
      setShowCustomJob(true);
      setInfo(prev => ({ ...prev, jobTitle: '' }));
    } else {
      setShowCustomJob(false);
      setInfo(prev => ({ ...prev, jobTitle: value }));
    }
  };

  const handleCustomJobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomJob(value);
    setInfo(prev => ({ ...prev, jobTitle: value }));
  };

  const handleAddEducation = () => {
    setInfo(prev => ({
      ...prev,
      education: [
        ...(prev.education || []),
        { institution: '', degree: '', fieldOfStudy: '', completionDate: '' }
      ]
    }));
  };

  const handleRemoveEducation = (index: number) => {
    setInfo(prev => ({
      ...prev,
      education: prev.education?.filter((_, i) => i !== index) || []
    }));
  };

  const handleAddCertification = () => {
    setInfo(prev => ({
      ...prev,
      certifications: [
        ...(prev.certifications || []),
        { name: '', issuingOrg: '', dateObtained: '' }
      ]
    }));
  };

  const handleRemoveCertification = (index: number) => {
    setInfo(prev => ({
      ...prev,
      certifications: prev.certifications?.filter((_, i) => i !== index) || []
    }));
  };

  return (
    <div className="min-h-screen bg-military-lightest">
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-wider uppercase">Military Service Profile</h1>
              <p className="mt-1 text-gray-400">Document Your Service Experience</p>
            </div>
            <div className="h-16 w-16">
              <div className="h-full w-full rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center">
                <span className="text-2xl">★</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            {[
              { step: 1, label: 'Service Information', icon: '📋' },
              { step: 2, label: 'Skills Assessment', icon: '📊' },
              { step: 3, label: 'Career Matching', icon: '🎯' }
            ].map(({ step, label, icon }) => (
              <div key={step} className="flex items-center">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-bold ${
                  step === activeStep ? 'bg-military-accent' : 'bg-gray-300'
                }`}>
                  {icon}
                </div>
                <span className={`ml-2 ${
                  step === activeStep ? 'font-semibold text-military-dark' : 'text-gray-500'
                }`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-military-accent h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(activeStep / 3) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-military-dark px-4 py-3">
              <h2 className="text-lg font-semibold text-white">Basic Service Information</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Branch of Service <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={info.branch}
                    onChange={(e) => {
                      const newBranch = e.target.value;
                      setInfo(prev => ({
                        ...prev,
                        branch: newBranch,
                        rank: '',
                        jobTitle: ''
                      }));
                      setShowCustomJob(false);
                      setCustomJob('');
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent"
                    required
                  >
                    <option value="">Select Branch...</option>
                    {militaryBranches.map(branch => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Rank <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={info.rank}
                    onChange={(e) => setInfo(prev => ({ ...prev, rank: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent"
                    required
                    disabled={!info.branch}
                  >
                    <option value="">Select rank...</option>
                    {availableRanks.map(rank => (
                      <option key={rank.id} value={rank.rank}>
                        {rank.rank} ({rank.grade})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Job Title/MOS <span className="text-red-600">*</span>
                  </label>
                  {showCustomJob ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={customJob}
                        onChange={handleCustomJobChange}
                        placeholder="Enter custom job title/MOS..."
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setShowCustomJob(false);
                          setCustomJob('');
                          setInfo(prev => ({ ...prev, jobTitle: '' }));
                        }}
                        className="text-sm text-military-accent hover:text-military-accent-dark"
                      >
                        Back to list
                      </button>
                    </div>
                  ) : (
                    <select
                      value={info.jobTitle}
                      onChange={handleJobChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent"
                      required
                      disabled={!info.branch}
                    >
                      <option value="">Select Job Title/MOS...</option>
                      {availableJobs.map(job => (
                        <option key={job} value={job}>{job}</option>
                      ))}
                      <option value="custom">Enter Custom Job Title/MOS...</option>
                    </select>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Unit/Command</label>
                  <input
                    type="text"
                    value={info.unit}
                    onChange={(e) => setInfo(prev => ({ ...prev, unit: e.target.value }))}
                    placeholder="e.g., USS Enterprise, 2nd Battalion"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={info.startDate}
                    onChange={(e) => setInfo(prev => ({ ...prev, startDate: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    value={info.endDate}
                    onChange={(e) => setInfo(prev => ({ ...prev, endDate: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Primary Duties and Responsibilities
                </label>
                <div className="mt-1 space-y-4">
                  {(info.responsibilities || []).map((resp, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={resp}
                        onChange={(e) => {
                          const newResps = [...(info.responsibilities || [])];
                          newResps[index] = e.target.value;
                          setInfo(prev => ({ ...prev, responsibilities: newResps }));
                        }}
                        placeholder="Describe your duties, responsibilities, and key accomplishments..."
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const newResps = [...(info.responsibilities || [])];
                          newResps.splice(index, 1);
                          setInfo(prev => ({ ...prev, responsibilities: newResps }));
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddResponsibility}
                    className="w-full"
                  >
                    Add Responsibility
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-military-dark px-4 py-3 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Command History</h2>
              <Button
                type="button"
                onClick={handleAddCommand}
                className="bg-military-accent hover:bg-military-accent-dark text-white"
              >
                Add Another Command
              </Button>
            </div>
            <div className="p-6 space-y-6">
              {info.commands?.map((command, commandIndex) => (
                <div key={commandIndex} className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Unit/Command</label>
                      <input
                        type="text"
                        value={command.unit}
                        onChange={(e) => handleUpdateCommand(commandIndex, 'unit', e.target.value)}
                        placeholder="e.g., USS Enterprise, 2nd Battalion"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Job Title/MOS</label>
                      <input
                        type="text"
                        value={command.jobTitle}
                        onChange={(e) => handleUpdateCommand(commandIndex, 'jobTitle', e.target.value)}
                        placeholder="e.g., Platoon Leader, IT Specialist"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Date</label>
                      <input
                        type="date"
                        value={command.startDate}
                        onChange={(e) => handleUpdateCommand(commandIndex, 'startDate', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <input
                        type="date"
                        value={command.endDate}
                        onChange={(e) => handleUpdateCommand(commandIndex, 'endDate', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Duties and Responsibilities</label>
                    <div className="mt-1 space-y-4">
                      {command.responsibilities.map((resp, respIndex) => (
                        <div key={respIndex} className="flex gap-2">
                          <input
                            type="text"
                            value={resp}
                            onChange={(e) => handleUpdateCommandResponsibility(commandIndex, respIndex, e.target.value)}
                            placeholder="Describe your duties, responsibilities, and key accomplishments..."
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleRemoveCommandResponsibility(commandIndex, respIndex)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <div className="flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleAddCommandResponsibility(commandIndex)}
                        >
                          Add Responsibility
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleRemoveCommand(commandIndex)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove Command
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-military-dark px-4 py-3">
              <h2 className="text-lg font-semibold text-white">Education</h2>
            </div>
            <div className="p-6 space-y-6">
              {info.education?.map((edu, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => {
                          const newEducation = [...(info.education || [])];
                          newEducation[index] = { ...edu, institution: e.target.value };
                          setInfo(prev => ({ ...prev, education: newEducation }));
                        }}
                        placeholder="e.g., Naval Academy, Community College"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Degree</label>
                      <select
                        value={edu.degree}
                        onChange={(e) => {
                          const newEducation = [...(info.education || [])];
                          newEducation[index] = { ...edu, degree: e.target.value };
                          setInfo(prev => ({ ...prev, education: newEducation }));
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent"
                      >
                        <option value="">Select degree...</option>
                        <option value="Associates">Associate's Degree</option>
                        <option value="Bachelors">Bachelor's Degree</option>
                        <option value="Masters">Master's Degree</option>
                        <option value="Doctorate">Doctorate</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Field of Study</label>
                      <input
                        type="text"
                        value={edu.fieldOfStudy}
                        onChange={(e) => {
                          const newEducation = [...(info.education || [])];
                          newEducation[index] = { ...edu, fieldOfStudy: e.target.value };
                          setInfo(prev => ({ ...prev, education: newEducation }));
                        }}
                        placeholder="e.g., Computer Science, Cybersecurity"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Completion Date</label>
                      <input
                        type="date"
                        value={edu.completionDate}
                        onChange={(e) => {
                          const newEducation = [...(info.education || [])];
                          newEducation[index] = { ...edu, completionDate: e.target.value };
                          setInfo(prev => ({ ...prev, education: newEducation }));
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleRemoveEducation(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove Education
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={handleAddEducation}
                className="w-full"
              >
                Add Education
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-military-dark px-4 py-3">
              <h2 className="text-lg font-semibold text-white">Certifications</h2>
            </div>
            <div className="p-6 space-y-6">
              {info.certifications?.map((cert, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Certification Name</label>
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => {
                          const newCertifications = [...(info.certifications || [])];
                          newCertifications[index] = { ...cert, name: e.target.value };
                          setInfo(prev => ({ ...prev, certifications: newCertifications }));
                        }}
                        placeholder="e.g., CompTIA Security+, Surface Warfare Officer"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Issuing Organization</label>
                      <input
                        type="text"
                        value={cert.issuingOrg}
                        onChange={(e) => {
                          const newCertifications = [...(info.certifications || [])];
                          newCertifications[index] = { ...cert, issuingOrg: e.target.value };
                          setInfo(prev => ({ ...prev, certifications: newCertifications }));
                        }}
                        placeholder="e.g., US Navy, CompTIA"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date Obtained</label>
                      <input
                        type="date"
                        value={cert.dateObtained}
                        onChange={(e) => {
                          const newCertifications = [...(info.certifications || [])];
                          newCertifications[index] = { ...cert, dateObtained: e.target.value };
                          setInfo(prev => ({ ...prev, certifications: newCertifications }));
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-military-accent focus:ring-military-accent"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleRemoveCertification(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove Certification
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={handleAddCertification}
                className="w-full"
              >
                Add Certification
              </Button>
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex justify-between pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/')}
            >
              Return to Welcome
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-military-accent hover:bg-military-accent-dark text-white"
            >
              {loading ? 'Saving...' : 'Continue to Skills Assessment'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}