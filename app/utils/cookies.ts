'use server';

import { cookies } from 'next/headers';
export default async function setCookie(cookie: string) {
  const cookieStore = await cookies();
  cookieStore.set('jwt', cookie);
}
