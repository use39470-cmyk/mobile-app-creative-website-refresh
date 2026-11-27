import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supportHead } from '@/lib/support/head';
export const Route = createFileRoute('/reset-password')({ head: () => supportHead('Set your password','Set a secure password for your Mobile App Creative admin account.'), component: ResetPassword });
function ResetPassword(){
 const navigate=useNavigate();const [ready,setReady]=useState(false);const [password,setPassword]=useState('');const [confirm,setConfirm]=useState('');const [notice,setNotice]=useState('');const [busy,setBusy]=useState(false);
 useEffect(()=>{ const type=new URLSearchParams(window.location.hash.slice(1)).get('type');const saved=sessionStorage.getItem('mac-recovery');
   if(type==='recovery'||type==='invite'){ sessionStorage.setItem('mac-recovery','yes'); setReady(true); } else if(saved==='yes')setReady(true);
   else setNotice('Open the password link from your email to continue.');
 },[]);
 async function submit(e:React.FormEvent){e.preventDefault();if(password!==confirm){setNotice('Passwords do not match.');return;}setBusy(true);
 try {const {data}=await supabase.auth.getUser();if(!data.user){setNotice('This link has expired. Request a new password link.');return;}
 const {error}=await supabase.auth.updateUser({password});if(error){setNotice(error.message);return;}sessionStorage.removeItem('mac-recovery');await navigate({to:'/admin'});
 }catch{setNotice('Could not update your password. Please try again.');}finally{setBusy(false);}}
 return <main className="support-theme auth-layout"><div className="auth-content"><img className="auth-logo" src="/nuuke/brand/badges/mobile-app-creative-logo-hd.png" alt="Mobile App Creative"/><h1>Set your password.</h1><form className="support-form" onSubmit={submit}><label>New password<Input type="password" autoComplete="new-password" minLength={12} required value={password} onChange={e=>setPassword(e.target.value)}/></label><label>Confirm password<Input type="password" autoComplete="new-password" required value={confirm} onChange={e=>setConfirm(e.target.value)}/></label><p role="status">{notice}</p><Button disabled={!ready||busy} type="submit">{busy?'Saving…':'Save password'}</Button></form><Link to="/auth">Back to sign in</Link></div></main>;
}
