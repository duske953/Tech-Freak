// import { API_URL } from './constants';
'use server';

import { cookies } from 'next/headers';
const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/v1'
    : 'https://ecommerce-backend-v2-pie.vercel.app/api/v1';
export async function tryCatchGet(
  route: string,
  revalidate: number = 0,
  cookie: string = '',
  externalUrl: boolean = false
) {
  try {
    const response = await fetch(externalUrl ? route : `${API_URL}/${route}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        cookie,
      },
      next: {
        revalidate,
      },
    });
    if (response.status === 429) {
      throw new Error('Too many requests, try again later');
    }
    const data = await response.json();
    if (response.status !== 200) throw new Error(data.message);
    return [data, null];
  } catch (err: any) {
    return [null, err?.message];
  }
}

export default async function tryCatchPost(
  route: string,
  method: 'post' | 'delete' | 'patch' = 'post',
  body: any = {}
) {
  try {
    const cookieStore = cookies();
    const cookieHeader = (await cookieStore).toString();
    const response = await fetch(`${API_URL}/${route}`, {
      method,
      body: JSON.stringify(body),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        cookie: cookieHeader,
      },
    });
    if (response.status === 429) {
      throw new Error('Too many requests, try again later');
    }
    const data = await response.json();
    if (response.status >= 400) throw new Error(data.message);

    return [data, null];
  } catch (err: any) {
    return [null, err?.message];
  }
}
