'use server';

import { cookies } from 'next/headers';
export default async function Ken() {
  const cookie = await cookies();
  cookie.set('name', 'ken');
}
