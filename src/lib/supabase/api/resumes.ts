import { supabase } from '../client';

export async function getUserResumes(userId: string) {
  const { data, error } = await supabase
    .from('resumes')
    .select(`
      *,
      military_service (
        *,
        evaluations (
          *,
          job_matches (*)
        )
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}