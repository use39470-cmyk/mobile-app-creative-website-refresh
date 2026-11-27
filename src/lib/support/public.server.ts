import { contactSchema, chatSchema } from './validation';
import { resolvePackage } from './packages';

async function hash(value: string) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, '0')).join('');
}
function reply(data: unknown, status = 200) {
  return Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
}
function validOrigin(request: Request) {
  const origin = request.headers.get('origin');
  return !origin || origin === new URL(request.url).origin;
}
async function readBody(request: Request) {
  if (!validOrigin(request)) throw new Error('origin');
  if (!request.headers.get('content-type')?.includes('application/json')) throw new Error('input');
  const text = await request.text();
  if (text.length > 20000) throw new Error('input');
  return JSON.parse(text) as unknown;
}
async function rateLimit(request: Request, key: string, max: number, seconds: number) {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || 'local';
  const { data, error } = await supabaseAdmin.rpc('consume_request_limit', { _key: await hash(`${ip}:${key}`), _max: max, _seconds: seconds });
  if (error) throw new Error('storage');
  if (!data) throw new Error('rate');
}
function failure(error: unknown) {
  if (error instanceof Error && error.message === 'rate') return reply({ error: 'Too many requests. Please try again shortly.' }, 429);
  if (error instanceof Error && ['input','origin'].includes(error.message)) return reply({ error: 'Please check your details and try again.' }, 400);
  return reply({ error: 'Unable to save right now. Please try again.' }, 503);
}
export async function submitContact(request: Request) {
  try {
    const parsed = contactSchema.safeParse(await readBody(request));
    if (!parsed.success) return reply({ error: 'Please enter your name, valid email and project details.' }, 400);
    await rateLimit(request, 'contact', 10, 3600);
    const pkg = resolvePackage(parsed.data.packageId);
    if (parsed.data.packageId && !pkg) return reply({ error: 'Please select a valid package.' }, 400);
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { name, email, phone, services, budget, details } = parsed.data;
    const { data, error } = await supabaseAdmin.from('contact_submissions').insert({ name, email, phone, services, budget, details,
      package_id: pkg ? (parsed.data.packageId ?? null) : null, package_name: pkg?.name ?? null,
      package_price: pkg?.price ?? null, package_billing: pkg?.billing ?? null,
    }).select('id').single();
    if (error || !data) throw new Error('storage');
    return reply({ success: true, id: data.id });
  } catch (error) { return failure(error); }
}
export async function handleVisitorChat(request: Request) {
  try {
    const parsed = chatSchema.safeParse(await readBody(request));
    if (!parsed.success) return reply({ error: 'Please check your chat details.' }, 400);
    const input = parsed.data;
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    if (input.action === 'start') {
      await rateLimit(request, 'chat-start', 10, 3600);
      const token = Array.from(crypto.getRandomValues(new Uint8Array(32)), b => b.toString(16).padStart(2, '0')).join('');
      const { data, error } = await supabaseAdmin.from('chat_conversations').insert({ visitor_name: input.name, visitor_email: input.email, token_hash: await hash(token) }).select('id').single();
      if (error || !data) throw new Error('storage');
      return reply({ id: data.id, token });
    }
    await rateLimit(request, `${input.action}:${input.id}`, input.action === 'read' ? 120 : 30, 60);
    const { data: conversation, error } = await supabaseAdmin.from('chat_conversations').select('id,status').eq('id', input.id).eq('token_hash', await hash(input.token)).maybeSingle();
    if (error) throw new Error('storage');
    if (!conversation) return reply({ error: 'Chat not found. Please start a new conversation.' }, 403);
    if (input.action === 'send') {
      const { error: sendError } = await supabaseAdmin.from('chat_messages').insert({ conversation_id: conversation.id, sender: 'visitor', body: input.body });
      if (sendError) throw new Error('storage');
    }
    const { data: messages, error: readError } = await supabaseAdmin.from('chat_messages').select('id,sender,body,created_at').eq('conversation_id', conversation.id).order('created_at', { ascending: false }).limit(200);
    if (readError) throw new Error('storage');
    return reply({ messages: (messages ?? []).reverse(), status: conversation.status });
  } catch (error) { return failure(error); }
}
