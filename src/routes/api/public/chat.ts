import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/api/public/chat')({ server: { handlers: {
  POST: async ({ request }) => {
    const { handleVisitorChat } = await import('@/lib/support/public.server');
    return handleVisitorChat(request);
  },
} } });
