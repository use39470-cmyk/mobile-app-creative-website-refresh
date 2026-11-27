import { describe,it,expect } from 'vitest';
import { contactSchema,chatSchema,messageSchema } from '@/lib/support/validation';
import {resolvePackage} from '@/lib/support/packages';
describe('Inquiry and chat rules',()=>{
 it('keeps the selected mobile app package quote at $7,500',()=>{expect(resolvePackage('mobile-app-starter')?.price).toBe(7500);});
 it('keeps Paid Ads Premium at $3,500 monthly',()=>{expect(resolvePackage('paid-ads-premium')).toMatchObject({price:3500,billing:'month'});});
 it('never resolves invented package prices or prototype names',()=>{expect(resolvePackage('toString')).toBeUndefined();expect(resolvePackage('free-admin-package')).toBeUndefined();});
 it('requires valid contact details before recording an inquiry',()=>{expect(contactSchema.safeParse({name:'',email:'invalid',details:'Hello'}).success).toBe(false);expect(contactSchema.safeParse({name:'Customer',email:'customer@example.com',details:'An app project'}).success).toBe(true);});
 it('requires a private 256-bit chat key to read a conversation',()=>{expect(chatSchema.safeParse({action:'read',id:'5a48c183-47ad-4a94-bcd0-6f2e0f4cb559',token:'short'}).success).toBe(false);expect(chatSchema.safeParse({action:'read',id:'5a48c183-47ad-4a94-bcd0-6f2e0f4cb559',token:'a'.repeat(64)}).success).toBe(true);});
 it('does not accept an admin sender through visitor chat input',()=>{expect(chatSchema.safeParse({action:'reply',sender:'admin',body:'Forged reply'}).success).toBe(false);});
 it('validates chat message text',()=>{expect(messageSchema.safeParse(' ').success).toBe(false);expect(messageSchema.safeParse('Project question').success).toBe(true);});
});
