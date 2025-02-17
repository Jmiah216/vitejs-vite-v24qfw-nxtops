import { supabase } from './client';

export async function assignRole(userId: string, roleName: 'super_admin' | 'user') {
  const { data: role } = await supabase
    .from('roles')
    .select('id')
    .eq('name', roleName)
    .single();

  if (!role) throw new Error(`Role ${roleName} not found`);

  const { error } = await supabase
    .from('user_roles')
    .insert({
      user_id: userId,
      role_id: role.id
    });

  if (error) throw error;
}

export async function getUserRole(userId: string) {
  const { data, error } = await supabase
    .from('user_roles')
    .select(`
      roles (
        name,
        description
      )
    `)
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data?.roles?.name || 'user';
}

export async function isSuperAdmin(userId: string): Promise<boolean> {
  const role = await getUserRole(userId);
  return role === 'super_admin';
}