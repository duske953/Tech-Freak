import InitAccount from '../components/InitAccount';
import { redirect } from 'next/navigation';
import getLoggedUser from '@/app/utils/getLoggedUser';

export const metadata: Metadata = {
  title: 'Login or Sign Up – Tech-Freak',
  description:
    'Access your Tech-Freak account or create a new one to start shopping for the latest tech products.',
  keywords: [
    'login',
    'sign up',
    'Tech-Freak account',
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
