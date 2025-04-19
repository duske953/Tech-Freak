import { cookies } from 'next/headers';
import { tryCatchGet } from './tryCatch';

export default async function getLoggedUser() {
  const cookieStore = cookies();
  const cookieHeader = (await cookieStore).toString();
  const [response, err] = await tryCatchGet(
    'users/isLoggedIn',
    0,
    cookieHeader
  );
  return [response, err];
}
