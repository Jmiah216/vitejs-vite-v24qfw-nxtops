import { supabase } from '../client';
import type { MilitaryInfo } from '../../../types/military';

export async function saveMilitaryInfo(info: Partial<MilitaryInfo>) {
  try {
    // For development, always use the mock user ID
    const mockUserId = '00000000-0000-0000-0000-000000000000';

    // Validate required fields
    if (!info.branch) throw new Error('Branch is required');
    if (!info.rank) throw new Error('Rank is required');
    if (!info.jobTitle) throw new Error('Job title is required');

    const militaryService = {
      user_id: mockUserId,
      rank: info.rank,
      branch: info.branch,
      primary_mos: info.jobTitle,
      unit: info.unit || null,
      start_date: info.startDate || null,
      end_date: info.endDate || null,
      has_certifications: info.certifications?.length > 0 || false
    };

    const { data, error } = await supabase
      .from('military_service')
      .insert([militaryService])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      throw new Error('Failed to save military information');
    }

    // Save additional data if provided
    if (data) {
      const militaryServiceId = data.id;

      // Save education records
      if (info.education?.length) {
        const { error: eduError } = await supabase
          .from('education')
          .insert(info.education.map(edu => ({
            military_service_id: militaryServiceId,
            institution: edu.institution,
            degree: edu.degree,
            field_of_study: edu.fieldOfStudy,
            completion_date: edu.completionDate
          })));

        if (eduError) throw eduError;
      }

      // Save certification records
      if (info.certifications?.length) {
        const { error: certError } = await supabase
          .from('certifications')
          .insert(info.certifications.map(cert => ({
            military_service_id: militaryServiceId,
            name: cert.name,
            issuing_org: cert.issuingOrg,
            date_obtained: cert.dateObtained
          })));

        if (certError) throw certError;
      }
    }

    return data;
  } catch (error) {
    console.error('Error saving military info:', error);
    throw error instanceof Error ? error : new Error('An unexpected error occurred');
  }
}

export async function getMilitaryService(userId: string) {
  const { data, error } = await supabase
    .from('military_service')
    .select(`
      *,
      evaluations (
        *,
        job_matches (*)
      )
    `)
    .eq('user_id', userId);

  if (error) throw error;
  return data;
}

export async function createMilitaryService(service: Partial<MilitaryInfo>) {
  const { data, error } = await supabase
    .from('military_service')
    .insert([{
      user_id: service.user_id,
      rank: service.rank,
      branch: service.branch,
      primary_mos: service.jobTitle,
      unit: service.unit,
      start_date: service.startDate,
      end_date: service.endDate,
      has_certifications: service.certifications?.length > 0
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}