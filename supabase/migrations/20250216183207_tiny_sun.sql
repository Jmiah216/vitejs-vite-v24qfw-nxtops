/*
  # Add Military Service Related Tables
  
  1. New Tables
    - `commands` - Stores command history
    - `command_responsibilities` - Stores responsibilities for each command
    - `education` - Stores education history
    - `certifications` - Stores certification information

  2. Changes
    - Create tables first
    - Add indexes for better performance
    - Enable RLS
    - Add policies for authenticated users
*/

-- Create commands table
CREATE TABLE IF NOT EXISTS commands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  military_service_id uuid REFERENCES military_service(id) NOT NULL,
  unit text NOT NULL,
  job_title text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create command responsibilities table
CREATE TABLE IF NOT EXISTS command_responsibilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  command_id uuid REFERENCES commands(id) NOT NULL,
  responsibility text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create education table
CREATE TABLE IF NOT EXISTS education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  military_service_id uuid REFERENCES military_service(id) NOT NULL,
  institution text NOT NULL,
  degree text NOT NULL,
  field_of_study text NOT NULL,
  completion_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  military_service_id uuid REFERENCES military_service(id) NOT NULL,
  name text NOT NULL,
  issuing_org text NOT NULL,
  date_obtained date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_commands_military_service_id ON commands(military_service_id);
CREATE INDEX IF NOT EXISTS idx_command_responsibilities_command_id ON command_responsibilities(command_id);
CREATE INDEX IF NOT EXISTS idx_education_military_service_id ON education(military_service_id);
CREATE INDEX IF NOT EXISTS idx_certifications_military_service_id ON certifications(military_service_id);

-- Enable RLS
ALTER TABLE commands ENABLE ROW LEVEL SECURITY;
ALTER TABLE command_responsibilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Now that tables exist, we can safely drop any existing policies
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Users can read own command responsibilities" ON command_responsibilities;
    DROP POLICY IF EXISTS "Users can insert own command responsibilities" ON command_responsibilities;
    DROP POLICY IF EXISTS "Users can read own commands" ON commands;
    DROP POLICY IF EXISTS "Users can insert own commands" ON commands;
    DROP POLICY IF EXISTS "Users can read own education" ON education;
    DROP POLICY IF EXISTS "Users can insert own education" ON education;
    DROP POLICY IF EXISTS "Users can read own certifications" ON certifications;
    DROP POLICY IF EXISTS "Users can insert own certifications" ON certifications;
EXCEPTION
    WHEN undefined_object THEN null;
END $$;

-- Create policies for commands
CREATE POLICY "Users can read own commands"
  ON commands FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM military_service
    WHERE military_service.id = military_service_id
    AND military_service.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own commands"
  ON commands FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM military_service
    WHERE military_service.id = military_service_id
    AND military_service.user_id = auth.uid()
  ));

-- Create policies for command responsibilities
CREATE POLICY "Users can read own command responsibilities"
  ON command_responsibilities FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM commands
    JOIN military_service ON commands.military_service_id = military_service.id
    WHERE command_responsibilities.command_id = commands.id
    AND military_service.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own command responsibilities"
  ON command_responsibilities FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM commands
    JOIN military_service ON commands.military_service_id = military_service.id
    WHERE command_responsibilities.command_id = commands.id
    AND military_service.user_id = auth.uid()
  ));

-- Create policies for education
CREATE POLICY "Users can read own education"
  ON education FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM military_service
    WHERE military_service.id = military_service_id
    AND military_service.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own education"
  ON education FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM military_service
    WHERE military_service.id = military_service_id
    AND military_service.user_id = auth.uid()
  ));

-- Create policies for certifications
CREATE POLICY "Users can read own certifications"
  ON certifications FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM military_service
    WHERE military_service.id = military_service_id
    AND military_service.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own certifications"
  ON certifications FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM military_service
    WHERE military_service.id = military_service_id
    AND military_service.user_id = auth.uid()
  ));

-- Add update trigger for timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_commands_updated_at
    BEFORE UPDATE ON commands
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_command_responsibilities_updated_at
    BEFORE UPDATE ON command_responsibilities
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_education_updated_at
    BEFORE UPDATE ON education
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at
    BEFORE UPDATE ON certifications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();