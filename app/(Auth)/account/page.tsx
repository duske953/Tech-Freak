import InitAccount from '../components/InitAccount';
import { redirect } from 'next/navigation';
import getLoggedUser from '@/app/utils/getLoggedUser';

export default async function Page() {
  const [response] = await getLoggedUser();
  if (response) redirect('/');
  return <InitAccount />;
}
