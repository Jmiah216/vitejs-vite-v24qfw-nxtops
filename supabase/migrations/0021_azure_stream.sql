-- Add developer role if not exists
INSERT INTO roles (name, description)
VALUES (
  'developer',
  'Full system access with development capabilities'
) ON CONFLICT (name) DO NOTHING;

-- Create or replace is_developer function
CREATE OR REPLACE FUNCTION is_developer(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = user_id
    AND r.name = 'developer'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Disable RLS for development
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE military_service DISABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations DISABLE ROW LEVEL SECURITY;
ALTER TABLE job_matches DISABLE ROW LEVEL SECURITY;
ALTER TABLE resume_templates DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences DISABLE ROW LEVEL SECURITY;