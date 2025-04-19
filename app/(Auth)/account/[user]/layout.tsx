import getLoggedUser from '@/app/utils/getLoggedUser';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import ErrorPage from '@/app/components/ErrorPage';
import AccountLinks from './components/AccountLinks';

export default async function layout({
  params,
  children,
}: {
  params: Promise<{ user: string }>;
  children: ReactNode;
}) {
  const [response, err] = await getLoggedUser();
  const { user } = await params;

  if (err) redirect('/');
  if (user !== response.data.user._id) return <ErrorPage />;

  return (
    <section className="">
      <AccountLinks accActive={response.data.user.active} />
      <section className="py-20">
        <div className="max-w-sm mx-auto px-6">{children}</div>
      </section>
    </section>
  );
}
