import { defineMiddleware } from 'astro:middleware';
import { createHmac } from 'node:crypto';

const SESSION_COOKIE = 'session';
const SESSION_PAYLOAD = 'auth';

function getExpectedToken(): string {
  const secret = import.meta.env.AUTH_SECRET || '';
  if (!secret) return '';
  return createHmac('sha256', secret).update(SESSION_PAYLOAD).digest('hex');
}

export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;

  if (pathname.startsWith('/admin') && pathname !== '/login') {
    const token = context.cookies.get(SESSION_COOKIE)?.value;
    const expected = getExpectedToken();
    if (!expected || token !== expected) {
      return context.redirect('/login');
    }
  }

  return next();
});
