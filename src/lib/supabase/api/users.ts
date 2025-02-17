import { supabase } from '../client';
import type { Database } from '../types';

type Tables = Database['public']['Tables'];

export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .maybeSingle(); // Use maybeSingle instead of single to handle no results

    if (error) throw error;
    
    // Return default profile if none exists
    return data || {
      id: userId,
      full_name: '',
      email: '',
      phone: '',
      location: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<Tables['users']['Update']>
) {
  const { data, error } = await supabase
    .from('users')
    .upsert({ // Use upsert to create profile if it doesn't exist
      id: userId,
      ...updates,
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}