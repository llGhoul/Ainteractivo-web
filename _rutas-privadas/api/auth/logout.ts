import type { APIRoute } from 'astro';

const SESSION_COOKIE = 'session';

export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete(SESSION_COOKIE, { path: '/' });
  return redirect('/', 302);
};

export const POST: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete(SESSION_COOKIE, { path: '/' });
  return redirect('/', 302);
};
