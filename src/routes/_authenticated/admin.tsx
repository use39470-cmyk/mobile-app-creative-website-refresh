import { createFileRoute, Link, Outlet, useNavigate } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Inbox, MessagesSquare, LogOut, ExternalLink, ShieldCheck, UserRound } from 'lucide-react';
import { adminRoleOptions } from '@/lib/support/admin-queries';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { supportHead } from '@/lib/support/head';
export const Route = createFileRoute('/_authenticated/admin')({ head:()=>supportHead('Admin workspace','Manage Mobile App Creative customer inquiries and visitor chats.'), loader:({context})=>context.queryClient.ensureQueryData(adminRoleOptions), component: AdminShell,
 errorComponent:({error})=><main className="support-theme auth-layout"><div className="auth-content"><h1>Access restricted</h1><p>{error instanceof Error ? error.message : 'Unable to open this workspace.'}</p><Button onClick={async()=>{await supabase.auth.signOut();window.location.href='/auth';}}>Back to sign in</Button></div></main>
});
function AdminShell(){const {data:email}=useSuspenseQuery(adminRoleOptions);const navigate=useNavigate();return <div className="support-theme admin-layout">
 <aside className="admin-sidebar"><Link to="/" className="admin-logo"><img src="/nuuke/brand/badges/mobile-app-creative-logo-hd.png" alt="Mobile App Creative"/></Link><p className="support-eyebrow">WORKSPACE</p><nav>
 <Button asChild variant="ghost"><Link to="/admin" search={{page:0,search:''}} activeOptions={{exact:true}} activeProps={{className:'admin-nav-active'}}><Inbox/>Inquiries</Link></Button>
 <Button asChild variant="ghost"><Link to="/admin/chats" search={{page:0,id:''}} activeProps={{className:'admin-nav-active'}}><MessagesSquare/>Chats</Link></Button>
 <Button asChild variant="ghost"><Link to="/admin/profile" activeProps={{className:'admin-nav-active'}}><UserRound/>Profile</Link></Button>
 </nav><div className="admin-account"><ShieldCheck size={18}/><span>{email}</span><Button title="Sign out" aria-label="Sign out" variant="ghost" size="icon" onClick={async()=>{await supabase.auth.signOut();await navigate({to:'/auth'});}}><LogOut/></Button></div></aside>
 <div className="admin-body"><header className="admin-topbar"><span>Mobile App Creative <span className="text-muted-foreground">/ Admin</span></span><Button asChild variant="ghost" size="sm"><Link to="/">View website<ExternalLink/></Link></Button></header><Outlet/></div>
 </div>;}
