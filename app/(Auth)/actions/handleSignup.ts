'use server';
import tryCatch from '@/app/utils/tryCatch';
import axios, { AxiosPromise } from 'axios';
import { cookies } from 'next/headers';

export default async function handleSignup(data) {
  const cookieStore = await cookies();
  const [response, err] = await tryCatch(
    axios.post('http://localhost:3000/api/v1/users/signup', data, {
      withCredentials: true,
    })
  );
}
