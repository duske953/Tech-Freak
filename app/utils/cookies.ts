'use server';

import { cookies } from 'next/headers';
export async function setCookie(cookie: string) {
  const cookieStore = await cookies();
  cookieStore.set('jwt', cookie);
}

export async function clearJwtCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('jwt');
}
