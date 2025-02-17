// Environment variables validation and configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate required environment variables
if (!SUPABASE_URL) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable');
}

if (!SUPABASE_ANON_KEY) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable');
}

// Validate URL format
if (!SUPABASE_URL.startsWith('https://')) {
  throw new Error('VITE_SUPABASE_URL must start with https://');
}

// Validate anon key format (JWT format)
if (!SUPABASE_ANON_KEY.startsWith('eyJ')) {
  throw new Error('Invalid VITE_SUPABASE_ANON_KEY format');
}

export const supabaseConfig = {
  url: SUPABASE_URL,
  anonKey: SUPABASE_ANON_KEY,
  options: {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
} as const;