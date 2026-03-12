import type { APIRoute } from 'astro';
import { createHmac } from 'node:crypto';

const SESSION_COOKIE = 'session';
const SESSION_PAYLOAD = 'auth';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const secret = import.meta.env.AUTH_SECRET;
  const password = import.meta.env.AUTH_PASSWORD;
  if (!secret || !password) {
    return new Response(JSON.stringify({ error: 'Auth no configurado' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const body = await request.formData().catch(() => null);
  const submitted = body?.get('password')?.toString() ?? '';

  if (submitted !== password) {
    return redirect('/login?error=1', 302);
  }

  const token = createHmac('sha256', secret).update(SESSION_PAYLOAD).digest('hex');
  cookies.set(SESSION_COOKIE, token, {
    path: '/',
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7
  });

  return redirect('/admin', 302);
};
