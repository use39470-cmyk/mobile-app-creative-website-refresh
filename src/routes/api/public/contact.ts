import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/api/public/contact')({ server: { handlers: {
  POST: async ({ request }) => {
    const { submitContact } = await import('@/lib/support/public.server');
    return submitContact(request);
  },
} } });
