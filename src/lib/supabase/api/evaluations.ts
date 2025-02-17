import { supabase } from '../client';
import type { Database } from '../types';
import type { Job } from '../../../types';

type Tables = Database['public']['Tables'];

export async function createEvaluation(
  evaluation: Omit<Tables['evaluations']['Insert'], 'id' | 'created_at' | 'updated_at'>
) {
  const { data, error } = await supabase
    .from('evaluations')
    .insert([evaluation])
    .select();

  if (error) throw error;
  return data;
}

export async function saveJobMatches(evaluationId: string, jobs: Job[]) {
  const jobMatches = jobs.map(job => ({
    evaluation_id: evaluationId,
    onet_code: job.code,
    job_title: job.title,
    match_score: job.matchScore || null,
    selected: true
  }));

  const { data, error } = await supabase
    .from('job_matches')
    .insert(jobMatches)
    .select();

  if (error) throw error;
  return data;
}