-- Disable RLS for development environment
DO $$ 
BEGIN
    -- Disable RLS on all tables for development
    ALTER TABLE users DISABLE ROW LEVEL SECURITY;
    ALTER TABLE military_service DISABLE ROW LEVEL SECURITY;
    ALTER TABLE evaluations DISABLE ROW LEVEL SECURITY;
    ALTER TABLE job_matches DISABLE ROW LEVEL SECURITY;
    ALTER TABLE resume_templates DISABLE ROW LEVEL SECURITY;
    ALTER TABLE user_preferences DISABLE ROW LEVEL SECURITY;
    
    -- Create development user if not exists
    INSERT INTO auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        raw_app_meta_data,
        raw_user_meta_data,
        is_super_admin
    )
    VALUES (
        '00000000-0000-0000-0000-000000000000',
        '00000000-0000-0000-0000-000000000000',
        'authenticated',
        'authenticated',
        'dev@example.com',
        '{"provider":"email","providers":["email"]}',
        '{"full_name":"Development User"}',
        true
    )
    ON CONFLICT (id) DO NOTHING;

    -- Create public user profile
    INSERT INTO public.users (
        id,
        full_name,
        email,
        created_at,
        updated_at
    )
    VALUES (
        '00000000-0000-0000-0000-000000000000',
        'Development User',
        'dev@example.com',
        now(),
        now()
    )
    ON CONFLICT (id) DO NOTHING;
END $$;