import Link from 'next/link';
import ErrorPage from '../components/ErrorPage';
import { tryCatchGet } from '../utils/tryCatch';
import { cn } from '../lib/utils';
import { buttonVariants } from '../components/ui/button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account Activation – Tech-Freak',
  description:
    'Activate your Tech-Freak account to start shopping for the latest tech products. If you encounter any issues, please contact support.',
  keywords: [
    'account activation',
    'Tech-Freak account',
    'email confirmation',
    'activate account',
    'tech store signup',
    'verify email',
    'tech products',
    'user registration',
    'online shopping',
    'account setup',
    'support',
    'activation issue',
  ],
};

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { token } = await searchParams;

  const [response] = await tryCatchGet(`users/activate?token=${token}`, 0);
  if (!response) return <ErrorPage />;
  return (
    <section className="py-20 px-6">
      <div className="flex flex-col gap-6 items-center">
        <h1 className="text-3xl font-bold text-gray-600">
          Your account is now active
        </h1>
        <Link href="/" className={cn(buttonVariants({ variant: 'outline' }))}>
          Home
        </Link>
      </div>
    </section>
  );
}
