import { Metadata } from 'next';
import ForgotPassword from './components/ForgotPassword';

export const metadata: Metadata = {
  title: 'Forgot Password – Tech-Freak',
  description:
    'Forgot your password? Reset it easily and regain access to your Tech-Freak account. Just enter your email and we’ll send you a reset link.',
  keywords: [
    'forgot password',
    'reset password',
    'Tech-Freak password recovery',
    'account recovery',
    'password reset',
    'email reset link',
    'Tech-Freak login',
    'account access',
    'secure password reset',
    'user account recovery',
    'password help',
    'forgotten password',
  ],
};

export default function Page() {
  return (
    <section className="py-24 max-w-md mx-auto px-6">
      <h1 className="mb-5 text-2xl font-bold text-gray-600">
        Forgot password?
      </h1>
      <ForgotPassword />
    </section>
  );
}
