/*
  # Initial Schema Setup for Military Resume Translator

  1. New Tables
    - `users`
      - Stores user profiles and authentication data
      - Uses Supabase Auth for user management
    
    - `military_service`
      - Stores military service records
      - Links to users table
    
    - `evaluations`
      - Stores military evaluations and assessments
      - Links to military_service table
    
    - `job_matches`
      - Stores matched civilian jobs
      - Links to evaluations table

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
*/

-- Users table extension (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  email text UNIQUE,
  phone text,
  location text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Military service records
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

-- Military evaluations
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

-- Job matches
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

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE military_service ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_matches ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Military service policies
CREATE POLICY "Users can read own military service"
  ON military_service
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own military service"
  ON military_service
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own military service"
  ON military_service
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Evaluations policies
CREATE POLICY "Users can read own evaluations"
  ON evaluations
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM military_service
      WHERE military_service.id = evaluations.military_service_id
      AND military_service.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own evaluations"
  ON evaluations
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM military_service
      WHERE military_service.id = evaluations.military_service_id
      AND military_service.user_id = auth.uid()
    )
  );

-- Job matches policies
CREATE POLICY "Users can read own job matches"
  ON job_matches
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM evaluations
      JOIN military_service ON evaluations.military_service_id = military_service.id
      WHERE evaluations.id = job_matches.evaluation_id
      AND military_service.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own job matches"
  ON job_matches
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM evaluations
      JOIN military_service ON evaluations.military_service_id = military_service.id
      WHERE evaluations.id = job_matches.evaluation_id
      AND military_service.user_id = auth.uid()
    )
  );