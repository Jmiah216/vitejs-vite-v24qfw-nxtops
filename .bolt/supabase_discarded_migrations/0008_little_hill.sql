/*
  # Add Updated At Triggers
  
  Adds triggers to automatically update the updated_at timestamp when records are modified.
  
  1. Creates trigger function for timestamp updates
  2. Adds triggers to tables:
    - military_service
    - evaluations
    - job_matches
*/

-- Create or replace trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers safely
DO $$
BEGIN
    DROP TRIGGER IF EXISTS update_military_service_updated_at ON military_service;
    DROP TRIGGER IF EXISTS update_evaluations_updated_at ON evaluations;
    DROP TRIGGER IF EXISTS update_job_matches_updated_at ON job_matches;

    CREATE TRIGGER update_military_service_updated_at
        BEFORE UPDATE ON military_service
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();

    CREATE TRIGGER update_evaluations_updated_at
        BEFORE UPDATE ON evaluations
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();

    CREATE TRIGGER update_job_matches_updated_at
        BEFORE UPDATE ON job_matches
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
END $$;