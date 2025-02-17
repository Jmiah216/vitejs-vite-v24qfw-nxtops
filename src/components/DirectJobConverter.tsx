import React, { useState } from 'react';
import { Button } from './ui/button';
import { ONET_API_KEY } from '../lib/config';
import ResumePreview from './ResumePreview';
import { Resume, Job } from '../types';

const militaryBranches = {
  army: 'Army',
  navy: 'Navy',
  airforce: 'Air Force',
  marines: 'Marine Corps',
  coastguard: 'Coast Guard',
  spaceforce: 'Space Force'
};

export function DirectJobConverter() {
  const [branch, setBranch] = useState('');
  const [jobCode, setJobCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<Job[]>([]);
  const [showResume, setShowResume] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });

  const fetchJobDetails = async (onetCode: string): Promise<Job> => {
    const response = await fetch(
      `https://services.onetcenter.org/ws/online/occupations/${onetCode}/details`,
      {
        headers: {
          'Authorization': 'Basic ' + btoa(`${ONET_API_KEY}:`),
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch job details');
    }

    const data = await response.json();
    
    return {
      title: data.title,
      code: onetCode,
      description: data.description,
      skills: data.skills?.map((s: any) => s.name) || [],
      tasks: data.tasks?.map((t: any) => t.name) || [],
      salary: {
        median: data.wage?.median_annual || 'Not available',
        range: `${data.wage?.annual_10th || 'N/A'} - ${data.wage?.annual_90th || 'N/A'}`
      },
      outlook: data.outlook?.category || 'Not available'
    };
  };

  const handleSearch = async () => {
    if (!branch || !jobCode) {
      setError('Please enter both branch and job code');
      return;
    }

    setLoading(true);
    setError(null);
    setJobs([]);
    setSelectedJobs([]);
    setShowResume(false);

    try {
      const crosswalkResponse = await fetch(
        `https://services.onetcenter.org/ws/mnm/search?military=${branch}&code=${jobCode}`,
        {
          headers: {
            'Authorization': 'Basic ' + btoa(`${ONET_API_KEY}:`),
            'Accept': 'application/json'
          }
        }
      );

      if (!crosswalkResponse.ok) {
        throw new Error('Failed to fetch job matches');
      }

      const crosswalkData = await crosswalkResponse.json();
      const civilianJobs = crosswalkData.occupation_list || [];

      const jobsWithDetails = await Promise.all(
        civilianJobs.map(async (job: any) => {
          try {
            return await fetchJobDetails(job.code);
          } catch (error) {
            console.error(`Error fetching details for ${job.title}:`, error);
            return null;
          }
        })
      );

      setJobs(jobsWithDetails.filter((job): job is Job => job !== null));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleJobSelection = (job: Job) => {
    setSelectedJobs(prev => {
      const isSelected = prev.some(j => j.code === job.code);
      if (isSelected) {
        return prev.filter(j => j.code !== job.code);
      }
      if (prev.length < 3) {
        return [...prev, job];
      }
      return prev;
    });
  };

  const handleCreateResume = () => {
    if (!personalInfo.name || !personalInfo.email) {
      setError('Please fill in your personal information');
      return;
    }
    setShowResume(true);
  };

  if (showResume) {
    const resume: Resume = {
      personalInfo,
      evaluations: [{
        rank: '',
        branch,
        jobTitle: jobCode,
        unit: '',
        startDate: '',
        endDate: '',
        responsibilities: [],
        awards: [],
        skills: []
      }],
      civilianJobs: selectedJobs.map(job => ({
        title: job.title,
        skills: job.skills,
        tasks: job.tasks
      }))
    };

    return (
      <div className="space-y-6">
        <Button onClick={() => setShowResume(false)} variant="outline">
          ← Back to Job Selection
        </Button>
        <div className="grid gap-8">
          <ResumePreview resume={resume} variant="corporate" />
          <ResumePreview resume={resume} variant="technical" />
          <ResumePreview resume={resume} variant="management" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Military Branch</label>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Branch</option>
            {Object.entries(militaryBranches).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Military Job Code</label>
          <input
            type="text"
            value={jobCode}
            onChange={(e) => setJobCode(e.target.value)}
            placeholder="Enter MOS/AFSC/Rating"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <Button
        onClick={handleSearch}
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Searching...' : 'Find Civilian Jobs'}
      </Button>

      {jobs.length > 0 && (
        <>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={personalInfo.name}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={personalInfo.location}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, location: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-medium">Select up to 3 jobs for your resume:</h3>
            {jobs.map((job) => (
              <div 
                key={job.code} 
                className={`bg-white p-6 rounded-lg shadow-lg space-y-4 cursor-pointer transition-colors ${
                  selectedJobs.some(j => j.code === job.code) ? 'ring-2 ring-indigo-500' : ''
                }`}
                onClick={() => toggleJobSelection(job)}
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-xl font-semibold text-indigo-600">{job.title}</h4>
                  <span className="text-sm text-gray-500">O*NET Code: {job.code}</span>
                </div>

                <p className="text-gray-700">{job.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Key Skills</h5>
                    <ul className="list-disc list-inside space-y-1">
                      {job.skills.slice(0, 5).map((skill, index) => (
                        <li key={index} className="text-gray-600">{skill}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Common Tasks</h5>
                    <ul className="list-disc list-inside space-y-1">
                      {job.tasks.slice(0, 5).map((task, index) => (
                        <li key={index} className="text-gray-600">{task}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <h5 className="font-medium text-gray-900">Salary Information</h5>
                    <p className="text-gray-600">Median: {job.salary.median}</p>
                    <p className="text-gray-600">Range: {job.salary.range}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">Job Outlook</h5>
                    <p className="text-gray-600">{job.outlook}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Selected: {selectedJobs.length}/3 jobs
            </p>
            <Button
              onClick={handleCreateResume}
              disabled={selectedJobs.length === 0}
            >
              Create Resume
            </Button>
          </div>
        </>
      )}

      {jobs.length === 0 && !loading && !error && (
        <div className="text-center text-gray-500 py-8">
          Enter your military job code to find matching civilian careers
        </div>
      )}

      <div className="text-center text-sm text-gray-500">
        Data provided by O*NET Online
      </div>
    </div>
  );
}