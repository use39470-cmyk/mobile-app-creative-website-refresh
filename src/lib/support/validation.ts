import { z } from 'zod';
export const contactSchema = z.object({
  name: z.string().trim().min(1).max(100), email: z.string().trim().email().max(254),
  phone: z.string().trim().max(50).default(''), services: z.string().trim().max(500).default(''),
  budget: z.string().trim().max(100).default(''), details: z.string().trim().min(1).max(10000),
  packageId: z.string().max(100).optional(), website: z.string().max(0).optional(),
});
export const messageSchema = z.string().trim().min(1,'Write a message first.').max(4000,'Message is too long.');
const identity = { id: z.string().uuid(), token: z.string().regex(/^[a-f0-9]{64}$/) };
export const chatSchema = z.discriminatedUnion('action',[
  z.object({ action: z.literal('start'), name: z.string().trim().min(1).max(100), email: z.string().trim().email().max(254) }),
  z.object({ action: z.literal('read'), ...identity }),
  z.object({ action: z.literal('send'), ...identity, body: messageSchema }),
]);
