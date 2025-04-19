import InitAccount from '../components/InitAccount';
import { redirect } from 'next/navigation';
import getLoggedUser from '@/app/utils/getLoggedUser';
import ErrorPage from '@/app/components/ErrorPage';

export default async function Page() {
  const [response] = await getLoggedUser();
  if (response) redirect('/');
  return <InitAccount />;
}
