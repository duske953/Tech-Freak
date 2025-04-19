import getLoggedUser from '@/app/utils/getLoggedUser';
import UpdateAccountInfo from '../components/UpdateAccountInfo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Update Profile – Tech-Freak',
  description:
    'Change your account name or email address to keep your Tech-Freak profile up to date.',
  keywords: [
    'update profile',
    'edit account details',
    'change email',
    'change name',
    'Tech-Freak user settings',
    'account settings',
    'update user info',
    'edit user profile',
    'manage account',
    'user preferences',
    'profile update',
    'account email change',
  ],
};

export default async function Page() {
  const [response] = await getLoggedUser();
  return (
    <div>
      <h1 className="mb-5 text-xl font-bold">
        Welcome {response.data.user.Name.slice(0, 25)}
      </h1>
      <UpdateAccountInfo
        name={response.data.user.Name}
        email={response.data.user.Email}
      />
    </div>
  );
}
