import InitAccount from '../components/InitAccount';
import { redirect } from 'next/navigation';
import getLoggedUser from '@/app/utils/getLoggedUser';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login or Sign Up – ByteCart',
  description:
    'Access your ByteCart account or create a new one to start shopping for the latest tech products.',
  keywords: [
    'login',
    'sign up',
    'ByteCart account',
    'user login',
    'register',
    'create account',
    'sign in',
    'authentication',
    'tech store account',
    'account access',
    'user registration',
    'login page',
    'signup page',
  ],
};

export default async function Page() {
  const [response] = await getLoggedUser();
  if (response) redirect('/');
  return <InitAccount />;
}
