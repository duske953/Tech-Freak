import { Metadata } from 'next';
import UpdatePassword from '../components/UpdatePassword';

export const metadata: Metadata = {
  title: 'Update Password – Tech-Freak',
  description:
    'Change your account password to keep your Tech-Freak profile secure. Use a strong password you haven’t used before.',
  keywords: [
    'update password',
    'change password',
    'Tech-Freak password',
    'account security',
    'user settings',
    'secure password',
    'password change page',
    'edit password',
    'profile update',
    'manage account',
    'new password',
    'account protection',
  ],
};

export default function Page() {
  return (
    <div>
      <UpdatePassword />
    </div>
  );
}
