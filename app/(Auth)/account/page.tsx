import { cookies } from 'next/headers';
import InitAccount from '../components/InitAccount';
import tryCatch from '@/app/utils/tryCatch';
import axios from 'axios';
import { redirect } from 'next/navigation';
import getLoggedUser from '@/app/utils/getLoggedUser';

export default async function Page() {
  const [response, err] = await getLoggedUser();
  if (response) redirect('/');
  return <InitAccount />;
}
