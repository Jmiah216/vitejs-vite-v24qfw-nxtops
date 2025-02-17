/*
  # Add Military Skills and Command History

  1. New Tables
    - `military_skills` - Stores categorized skills for each service member
    - `command_responsibilities` - Stores responsibilities for each command

  2. Changes
    - Add `has_certifications` boolean to military_service table
    - Add `certifications_and_training` table

  3. Security
    - Enable RLS on new tables
    - Add policies for authenticated users
*/

-- Add has_certifications flag to military_service
ALTER TABLE military_service
ADD COLUMN has_certifications boolean DEFAULT false;

-- Create certifications_and_training table
CREATE TABLE IF NOT EXISTS certifications_and_training (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  military_service_id uuid REFERENCES military_service(id) NOT NULL,
  name text NOT NULL,
  issuing_org text NOT NULL,
  date_issued date NOT NULL,
  date_expires date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create military_skills table
CREATE TABLE IF NOT EXISTS military_skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  military_service_id uuid REFERENCES military_service(id) NOT NULL,
  category text NOT NULL,
  skill text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(military_service_id, category, skill)
);

-- Create command_responsibilities table
CREATE TABLE IF NOT EXISTS command_responsibilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  command_id uuid REFERENCES military_service(id) NOT NULL,
  responsibility text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE certifications_and_training ENABLE ROW LEVEL SECURITY;
ALTER TABLE military_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE command_responsibilities ENABLE ROW LEVEL SECURITY;

-- Create policies for certifications_and_training
CREATE POLICY "Users can read own certifications"
  ON certifications_and_training FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM military_service
    WHERE military_service.id = military_service_id
    AND military_service.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own certifications"
  ON certifications_and_training FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM military_service
    WHERE military_service.id = military_service_id
    AND military_service.user_id = auth.uid()
  ));

-- Create policies for military_skills
CREATE POLICY "Users can read own military skills"
  ON military_skills FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM military_service
    WHERE military_service.id = military_service_id
    AND military_service.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own military skills"
  ON military_skills FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM military_service
    WHERE military_service.id = military_service_id
    AND military_service.user_id = auth.uid()
  ));

-- Create policies for command_responsibilities
CREATE POLICY "Users can read own command responsibilities"
  ON command_responsibilities FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM military_service
    WHERE military_service.id = command_id
    AND military_service.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own command responsibilities"
  ON command_responsibilities FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM military_service
    WHERE military_service.id = command_id
    AND military_service.user_id = auth.uid()
  ));

-- Create indexes for better performance
CREATE INDEX idx_military_skills_service_id ON military_skills(military_service_id);
CREATE INDEX idx_command_responsibilities_command_id ON command_responsibilities(command_id);
CREATE INDEX idx_certifications_service_id ON certifications_and_training(military_service_id);