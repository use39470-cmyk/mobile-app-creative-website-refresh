import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { LockKeyhole, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supportHead } from '@/lib/support/head';
export const Route = createFileRoute('/auth')({ head: () => supportHead('Admin login','Secure team access to Mobile App Creative inquiries and conversations.'), component: AdminLogin });
function AdminLogin() {
  const navigate = useNavigate();
  const [email,setEmail] = useState(''); const [password,setPassword] = useState('');
  const [busy,setBusy] = useState(false); const [notice,setNotice] = useState(''); const [forgot,setForgot] = useState(false);
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setNotice('');
    try {
      if(forgot) {
        const { error } = await supabase.auth.resetPasswordForEmail(email,{ redirectTo: `${window.location.origin}/reset-password` });
        if(error) throw error;
        setNotice('If this account exists, a password reset link has been sent.'); return;
      }
      const { error } = await supabase.auth.signInWithPassword({ email,password });
      if(error) { setNotice('Unable to sign in. Check your email and password.'); return; }
      await navigate({ to: '/admin', search: {page:0,search:''} });
    } catch { setNotice('Unable to continue. Please try again.'); } finally { setBusy(false); }
  }
  return <main className="support-theme auth-layout"><div className="auth-content">
    <Link to="/" className="auth-brand"><img src="/nuuke/brand/badges/mobile-app-creative-logo-hd.png" alt="Mobile App Creative" /></Link>
    <div className="auth-heading"><LockKeyhole size={24}/><p className="support-eyebrow">TEAM ACCESS</p><h1>{forgot?'Reset your password':'Welcome back.'}</h1></div>
    <form onSubmit={submit} className="support-form">
      <label>Email<Input type="email" required autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)}/></label>
      {!forgot && <label>Password<Input type="password" required autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)}/></label>}
      <p role="status" className="support-notice">{notice}</p>
      <Button type="submit" disabled={busy}>{busy?'Please wait…':forgot?'Send reset link':'Sign in'}<ArrowRight/></Button>
      <Button type="button" variant="ghost" onClick={()=>{setForgot(!forgot);setNotice('');}}>{forgot?'Back to sign in':'Forgot password?'}</Button>
    </form><Link to="/" className="support-back">Back to website</Link>
  </div></main>;
}
