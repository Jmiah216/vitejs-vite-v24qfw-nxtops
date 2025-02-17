/*
  # Create Super Admin User

  1. Changes
    - Creates super admin user safely
    - Adds proper constraints and checks
    - Handles user role assignment
    
  2. Security
    - Uses proper authentication schema
    - Ensures secure password handling
    - Maintains role-based access control
*/

-- Create super admin user and assign role
DO $$ 
DECLARE
  _user_id uuid;
  _role_id uuid;
BEGIN
  -- First try to find existing user
  SELECT id INTO _user_id 
  FROM auth.users 
  WHERE email = 'Jeremiah216@outlook.com';

  -- Create auth user if not exists
  IF _user_id IS NULL THEN
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'Jeremiah216@outlook.com',
      crypt('cleveland', gen_salt('bf')),
      now(),
      now(),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Super Admin"}',
      true
    )
    RETURNING id INTO _user_id;
  END IF;

  -- Create public user profile if not exists
  INSERT INTO public.users (id, full_name, email, created_at, updated_at)
  VALUES (
    _user_id,
    'Super Admin',
    'Jeremiah216@outlook.com',
    now(),
    now()
  )
  ON CONFLICT (id) DO NOTHING;

  -- Get super admin role id
  SELECT id INTO _role_id 
  FROM roles 
  WHERE name = 'super_admin';

  -- Assign super admin role if not already assigned
  IF _role_id IS NOT NULL THEN
    INSERT INTO user_roles (user_id, role_id)
    VALUES (_user_id, _role_id)
    ON CONFLICT (user_id, role_id) DO NOTHING;
  END IF;

END $$;