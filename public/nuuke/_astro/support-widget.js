// Shared bridge for the original multipage site. Visitor credentials stay on this origin.
const footer = document.querySelector('.footer-bottom');
if (footer && !footer.querySelector('[data-admin-login]')) {
  const link = document.createElement('a');
  link.href = '/auth'; link.target = '_top'; link.textContent = 'Admin login'; link.dataset.adminLogin = '';
  footer.append(link);
}
const launcher = document.createElement('button');
launcher.className = 'mac-chat-launcher'; launcher.type = 'button';
launcher.setAttribute('aria-label', 'Chat with us'); launcher.setAttribute('aria-expanded', 'false');
launcher.innerHTML = '<svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/></svg>';
const panel = document.createElement('section'); panel.className = 'mac-chat-window'; panel.hidden = true;
panel.setAttribute('aria-label','Chat with Mobile App Creative');
const close = document.createElement('button');close.type='button';close.className='mac-chat-close';close.setAttribute('aria-label','Close chat');close.textContent='×';
const frame = document.createElement('iframe');frame.title='Chat with Mobile App Creative';frame.loading='lazy';
panel.append(close,frame);document.body.append(panel,launcher);
function toggle(open){panel.hidden=!open;launcher.setAttribute('aria-expanded',String(open));if(open&&!frame.getAttribute('src'))frame.src='/chat';if(!open)launcher.focus();}
launcher.addEventListener('click',()=>toggle(panel.hidden));close.addEventListener('click',()=>toggle(false));document.addEventListener('keydown',e=>{if(e.key==='Escape')toggle(false);});
const form=document.querySelector('[data-form]');
if(form){
  form.addEventListener('submit',async event=>{
    event.preventDefault();event.stopImmediatePropagation();
    if(!form.checkValidity()){form.reportValidity();return;}
    const button=form.querySelector('button[type="submit"]');if(button?.disabled)return;
    const status=form.querySelector('[data-status]');const fields=new FormData(form);
    const input={name:String(fields.get('name')||''),email:String(fields.get('email')||''),phone:String(fields.get('phone')||''),services:fields.getAll('services').join(', '),budget:String(fields.get('budget')||''),details:String(fields.get('details')||'')};
    const packageId=new URLSearchParams(location.search).get('package');if(packageId)input.packageId=packageId;
    if(button)button.disabled=true;if(status)status.textContent='Sending…';
    try{
      const response=await fetch('/api/public/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(input)});
      const data=await response.json();if(!response.ok)throw new Error(data.error||'Unable to send. Please try again.');
      form.reset();if(status)status.textContent='Thank you! Your inquiry has been received.';
    }catch(error){if(status)status.textContent=error instanceof Error?error.message:'Unable to send. Please try again.';}
    finally{if(button)button.disabled=false;}
  },true);
}
