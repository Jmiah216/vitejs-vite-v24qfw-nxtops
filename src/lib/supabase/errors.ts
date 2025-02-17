import { AuthError } from '@supabase/supabase-js';

export function getAuthErrorMessage(error: AuthError): string {
  switch (error.message) {
    case 'Invalid login credentials':
      return 'Invalid email or password';
    case 'Email not confirmed':
      return 'Please verify your email address';
    case 'Password is too short':
      return 'Password must be at least 6 characters';
    case 'User already registered':
      return 'An account with this email already exists';
    default:
      return error.message;
  }
}