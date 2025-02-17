import { useState } from 'react';
import { useAuthContext } from '../auth/AuthProvider';
import { saveMilitaryInfo, createEvaluation, saveJobMatches } from '../../lib/supabase/api';
import { Button } from '../ui/button';
import type { MilitaryEvaluation } from '../../types';

export function EvaluationForm() {
  const { user } = useAuthContext();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (evaluation: MilitaryEvaluation) => {
    if (!user) return;

    setSaving(true);
    setError(null);

    try {
      // Save military service record
      const militaryService = await saveMilitaryInfo({
        user_id: user.id,
        rank: evaluation.rank,
        branch: evaluation.branch,
        primary_mos: evaluation.jobTitle,
        unit: evaluation.unit,
        start_date: evaluation.startDate,
        end_date: evaluation.endDate
      });

      // Save evaluation
      const [evaluationRecord] = await createEvaluation({
        military_service_id: militaryService.id,
        evaluation_type: 'performance',
        evaluation_date: new Date().toISOString(),
        responsibilities: evaluation.responsibilities,
        skills: evaluation.skills,
        awards: evaluation.awards
      });

      // Save job matches if available
      if (evaluation.selectedJobs) {
        await saveJobMatches(evaluationRecord.id, evaluation.selectedJobs);
      }

      // Continue with job matching...
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save evaluation');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Form content */}
    </div>
  );
}