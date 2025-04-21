import ErrorPage from '../components/ErrorPage';
import { pageProps } from '../utils/interfaces';
import { tryCatchGet } from '../utils/tryCatch';
import ResetPassword from './components/ResetPassword';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props) {
  const { token } = await searchParams;
  const [response] = await tryCatchGet(
    `users/valid-reset-password-token?token=${token}`
  );

  return {
    title: !response ? 'something went wrong' : 'Reset Password – ByteCart',
    description: !response
      ? 'something went wrong'
      : 'Enter a new password to regain access to your ByteCart account. Make sure to choose something secure and easy to remember.',
    keywords: [
      'reset password',
      'ByteCart password change',
      'update password',
      'account security',
      'new password',
      'change password',
      'secure login',
      'password reset page',
      'tech account access',
      'recover account',
      'forgot password',
      'password help',
    ],
  };
}

export default async function Page({ searchParams }: pageProps) {
  const { token } = await searchParams;
  const [response] = await tryCatchGet(
    `users/valid-reset-password-token?token=${token}`
  );
  if (!response) return <ErrorPage />;
  return (
    <section className="py-20 px-6">
      <div className="max-w-sm mx-auto">
        <ResetPassword token={token as string} />
      </div>
    </section>
  );
}
