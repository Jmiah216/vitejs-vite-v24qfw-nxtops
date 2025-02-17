import { useState } from 'react';
import HomePage from './components/HomePage';
import EvaluationForm from './components/EvaluationForm';
import ResumePreview from './components/ResumePreview';
import { AssessmentForm } from './components/assessment';
import CareerRecommendations from './components/CareerRecommendations';
import { ONETJobSelector } from './ONETJobSelector';
import { MilitaryEvaluation, Resume, CareerAssessment } from '../types';

interface SelectedJob {
  title: string;
  skills: string[];
  tasks: string[];
  onetCode: string;
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [resume, setResume] = useState<Resume>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: ''
    },
    evaluations: []
  });
  const [showAssessment, setShowAssessment] = useState(true);
  const [assessment, setAssessment] = useState<CareerAssessment | null>(null);
  const [selectedJobs, setSelectedJobs] = useState<SelectedJob[]>([]);
  const [currentEvaluation, setCurrentEvaluation] = useState<MilitaryEvaluation | null>(null);

  const handleEvaluationSubmit = (evaluation: MilitaryEvaluation) => {
    setCurrentEvaluation(evaluation);
    setResume(prev => ({
      ...prev,
      evaluations: [...prev.evaluations, evaluation]
    }));
  };

  const handleAssessmentComplete = (results: CareerAssessment) => {
    setAssessment(results);
    setShowAssessment(false);
  };

  const handleJobsSelected = async (jobs: SelectedJob[]) => {
    setSelectedJobs(jobs);
    
    try {
      // Fetch detailed information for each selected job from O*NET
      const jobsWithDetails = await Promise.all(jobs.map(async (job) => {
        if (job.onetCode.startsWith('manual-')) {
          return job; // Skip API call for manually entered jobs
        }

        try {
          const response = await fetch(
            `https://services.onetcenter.org/ws/online/occupations/${job.onetCode}`,
            {
              headers: {
                'Authorization': 'Basic ' + btoa('YOUR_ONET_API_KEY:'),
                'Accept': 'application/json'
              }
            }
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch details for ${job.title}`);
          }

          const data = await response.json();
          
          return {
            ...job,
            skills: data.skills?.map((s: any) => s.name) || [],
            tasks: data.tasks?.map((t: any) => t.name) || []
          };
        } catch (error) {
          console.error(`Error fetching details for ${job.title}:`, error);
          return job;
        }
      }));

      generateEnhancedResume(jobsWithDetails);
    } catch (error) {
      console.error('Error processing selected jobs:', error);
      // Fallback to using jobs without additional details
      generateEnhancedResume(jobs);
    }
  };

  const generateEnhancedResume = (jobs: SelectedJob[]) => {
    const enhancedResume = {
      ...resume,
      civilianJobs: jobs,
      skills: [...new Set([
        ...resume.evaluations.flatMap(eval => eval.skills),
        ...jobs.flatMap(job => job.skills)
      ])],
      relevantTasks: jobs.flatMap(job => job.tasks)
    };
    setResume(enhancedResume);
  };

  if (!started) {
    return <HomePage onStart={() => setStarted(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Military to Civilian Career Translator
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {showAssessment ? (
            <div className="max-w-2xl mx-auto">
              <p className="text-lg mb-6">
                Let's start by understanding your skills and preferences to find the best civilian career path for you.
              </p>
              <AssessmentForm onComplete={handleAssessmentComplete} />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {assessment && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Your Career Matches</h2>
                  <CareerRecommendations assessment={assessment} />
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold mb-4">Create Your Resume</h2>
                {!currentEvaluation ? (
                  <EvaluationForm onSubmit={handleEvaluationSubmit} />
                ) : (
                  <ONETJobSelector 
                    militaryInfo={currentEvaluation}
                    onJobsSelected={handleJobsSelected}
                  />
                )}
                
                {resume.evaluations.length > 0 && selectedJobs.length === 3 && (
                  <div className="space-y-8 mt-8">
                    <ResumePreview resume={resume} variant="corporate" />
                    <ResumePreview resume={resume} variant="technical" />
                    <ResumePreview resume={resume} variant="management" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}