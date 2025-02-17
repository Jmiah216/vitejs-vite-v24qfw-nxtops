-- Drop existing policies if they exist
DO $$ 
BEGIN
    -- Users policies
    DROP POLICY IF EXISTS "Users can read own data" ON users;
    DROP POLICY IF EXISTS "Users can update own data" ON users;
    
    -- Military service policies
    DROP POLICY IF EXISTS "Users can read own military service" ON military_service;
    DROP POLICY IF EXISTS "Users can insert own military service" ON military_service;
    
    -- Evaluations policies
    DROP POLICY IF EXISTS "Users can read own evaluations" ON evaluations;
    
    -- Job matches policies
    DROP POLICY IF EXISTS "Users can read own job matches" ON job_matches;
    
    -- Resume templates policies
    DROP POLICY IF EXISTS "Resume templates are viewable by all" ON resume_templates;
    
    -- User preferences policies
    DROP POLICY IF EXISTS "Users can manage their preferences" ON user_preferences;
END $$;

-- Create tables if they don't exist
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  email text UNIQUE,
  phone text,
  location text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS military_service (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  rank text NOT NULL,
  branch text NOT NULL,
  primary_mos text NOT NULL,
  unit text,
  start_date date NOT NULL,
  end_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  military_service_id uuid REFERENCES military_service(id) NOT NULL,
  evaluation_type text NOT NULL,
  evaluation_date date NOT NULL,
  responsibilities text[] DEFAULT '{}',
  skills text[] DEFAULT '{}',
  awards text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS job_matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id uuid REFERENCES evaluations(id) NOT NULL,
  onet_code text NOT NULL,
  job_title text NOT NULL,
  match_score integer,
  selected boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS resume_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  style text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  default_template_id uuid REFERENCES resume_templates(id),
  notification_settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE military_service ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can read own military service"
  ON military_service FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own military service"
  ON military_service FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can read own evaluations"
  ON evaluations FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM military_service
    WHERE military_service.id = evaluations.military_service_id
    AND military_service.user_id = auth.uid()
  ));

CREATE POLICY "Users can read own job matches"
  ON job_matches FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM evaluations
    JOIN military_service ON evaluations.military_service_id = military_service.id
    WHERE evaluations.id = job_matches.evaluation_id
    AND military_service.user_id = auth.uid()
  ));

CREATE POLICY "Resume templates are viewable by all"
  ON resume_templates FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their preferences"
  ON user_preferences FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Insert default templates
INSERT INTO resume_templates (name, style) VALUES
  ('Technical', 'technical'),
  ('Management', 'management'),
  ('Corporate', 'corporate')
ON CONFLICT DO NOTHING;