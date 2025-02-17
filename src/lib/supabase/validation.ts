export function validateSupabaseConfig() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url?.startsWith('https://')) {
    throw new Error('Invalid Supabase URL format');
  }

  if (!key?.match(/^eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9\./)) {
    throw new Error('Invalid Supabase anon key format');
  }

  return { url, key };
}