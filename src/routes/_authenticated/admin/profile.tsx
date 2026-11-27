import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Upload, Save, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { profileOptions } from '@/lib/support/admin-queries';
import { supabase } from '@/integrations/supabase/client';
import { supportHead } from '@/lib/support/head';
export const Route=createFileRoute('/_authenticated/admin/profile')({head:()=>supportHead('Admin profile','Manage your Mobile App Creative admin display name, avatar and password.'),loader:({context})=>context.queryClient.ensureQueryData(profileOptions),component:Profile});
function Profile(){const {data:profile}=useSuspenseQuery(profileOptions);const [name,setName]=useState(profile.display_name);const [file,setFile]=useState<File|null>(null);const [notice,setNotice]=useState('');const [busy,setBusy]=useState(false);const client=useQueryClient();
 const [current,setCurrent]=useState('');const [password,setPassword]=useState('');const [confirm,setConfirm]=useState('');const [passwordNotice,setPasswordNotice]=useState('');const [passwordBusy,setPasswordBusy]=useState(false);
 async function save(e:React.FormEvent){e.preventDefault();setBusy(true);setNotice('');let newPath='';try{
  if(file){if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>2*1024*1024){setNotice('Choose a PNG, JPG or WebP image under 2 MB.');return;}
   const extension=file.type==='image/png'?'png':file.type==='image/webp'?'webp':'jpg';newPath=`${profile.id}/${crypto.randomUUID()}.${extension}`;
   const {error}=await supabase.storage.from('admin-avatars').upload(newPath,file);if(error)throw error;
  }
  const {error}=await supabase.from('profiles').update({display_name:name.trim(),avatar_path:newPath||profile.avatar_path}).eq('id',profile.id);if(error)throw error;
  if(newPath&&profile.avatar_path)await supabase.storage.from('admin-avatars').remove([profile.avatar_path]);setFile(null);await client.invalidateQueries({queryKey:['profile']});setNotice('Profile saved.');
 }catch{if(newPath)await supabase.storage.from('admin-avatars').remove([newPath]);setNotice('Could not save your profile. Please try again.');}finally{setBusy(false);}}
 async function changePassword(e:React.FormEvent){e.preventDefault();if(password!==confirm){setPasswordNotice('Passwords do not match.');return;}setPasswordBusy(true);setPasswordNotice('');try{const {error}=await supabase.auth.updateUser({password,current_password:current});if(error){setPasswordNotice(error.message);return;}setCurrent('');setPassword('');setConfirm('');setPasswordNotice('Password updated.');}catch{setPasswordNotice('Could not update password.');}finally{setPasswordBusy(false);}}
 return <main className="admin-main"><div className="workspace-heading"><div><p className="support-eyebrow">YOUR ACCOUNT</p><h1>Profile</h1></div></div><div className="profile-layout"><form className="support-form" onSubmit={save}><div className="profile-avatar">{profile.avatarUrl?<img src={profile.avatarUrl} alt="Your avatar"/>:<UserRound size={32}/>}</div><label>Profile photo<span className="profile-upload"><Upload size={16}/><input type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>setFile(e.target.files?.[0]??null)}/></span></label><label>Display name<Input maxLength={100} value={name} onChange={e=>setName(e.target.value)}/></label><label>Email<Input value={profile.email} readOnly/></label><p role="status">{notice}</p><Button type="submit" disabled={busy}><Save/>{busy?'Saving…':'Save profile'}</Button></form><section><h2>Change password</h2><form className="support-form" onSubmit={changePassword}><label>Current password<Input type="password" autoComplete="current-password" required value={current} onChange={e=>setCurrent(e.target.value)}/></label><label>New password<Input type="password" autoComplete="new-password" minLength={12} required value={password} onChange={e=>setPassword(e.target.value)}/></label><label>Confirm new password<Input type="password" autoComplete="new-password" required value={confirm} onChange={e=>setConfirm(e.target.value)}/></label><p role="status">{passwordNotice}</p><Button disabled={passwordBusy} type="submit">{passwordBusy?'Updating…':'Update password'}</Button></form></section></div></main>;
}
