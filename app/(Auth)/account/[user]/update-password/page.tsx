import { Metadata } from 'next';
import UpdatePassword from '../components/UpdatePassword';

export const metadata: Metadata = {
  title: 'Update Password – ByteCart',
  description:
    'Change your account password to keep your ByteCart profile secure. Use a strong password you haven’t used before.',
  keywords: [
    'update password',
    'change password',
    'ByteCart password',
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
