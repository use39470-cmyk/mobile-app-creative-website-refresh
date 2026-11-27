import { queryOptions } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
export const adminRoleOptions = queryOptions({ queryKey: ['admin-role'], queryFn: async () => {
  const { data: user, error: authError } = await supabase.auth.getUser();
  if (authError || !user.user) throw new Error('Please sign in.');
  const { data, error } = await supabase.rpc('has_role', { _user_id: user.user.id, _role: 'admin' });
  if (error || !data) throw new Error('This account does not have admin access.');
  return user.user.email ?? '';
}, staleTime: 0 });
export function inquiryOptions(page: number, search: string) { return queryOptions({
  queryKey: ['inquiries', page, search], refetchInterval: 8000,
  queryFn: async () => {
    let query = supabase.from('contact_submissions').select('*', { count: 'exact' }).order('created_at', { ascending: false });
    if (search) query = query.ilike('name', `%${search.replace(/[%_]/g, '')}%`);
    const { data, error, count } = await query.range(page * 25, page * 25 + 24);
    if (error) throw new Error('Could not load inquiries.');
    return { rows: data ?? [], total: count ?? 0 };
  },
}); }
export const conversationOptions = queryOptions({ queryKey: ['conversations'], refetchInterval: 4000, queryFn: async () => {
  const { data, error } = await supabase.from('chat_conversations').select('id,visitor_name,visitor_email,status,last_message,last_sender,created_at,updated_at').order('updated_at', { ascending: false }).limit(100);
  if (error) throw new Error('Could not load chats.');
  return data ?? [];
} });
export function messageOptions(id: string, page = 0) { return queryOptions({ queryKey: ['messages', id, page], refetchInterval: 4000, queryFn: async () => {
  const { data, error } = await supabase.from('chat_messages').select('*').eq('conversation_id', id).order('created_at', { ascending: false }).range(page * 100, page * 100 + 99);
  if (error) throw new Error('Could not load messages.');
  return (data ?? []).reverse();
} }); }
