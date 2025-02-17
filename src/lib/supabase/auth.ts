import { AuthError, User } from '@supabase/supabase-js';
import { supabase } from './client';

export interface AuthResponse {
  user: User | null;
  error: string | null;
}

// Mock successful auth responses for development
export async function signUp(email: string, password: string, fullName: string): Promise<AuthResponse> {
  return {
    user: {
      id: '00000000-0000-0000-0000-000000000000',
      email,
      user_metadata: { full_name: fullName }
    } as User,
    error: null
  };
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  return {
    user: {
      id: '00000000-0000-0000-0000-000000000000',
      email,
      user_metadata: { full_name: 'Development User' }
    } as User,
    error: null
  };
}