import { MdWarning } from 'react-icons/md';
import TerminateAccount from '../components/TerminateAccount';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete Account – ByteCart',
  description:
    'Permanently delete your ByteCart account and all associated data. This action cannot be undone.',
  keywords: [
    'delete account',
    'terminate account',
    'ByteCart account removal',
    'close account',
    'remove user data',
    'account deletion',
    'cancel account',
    'user settings',
    'data removal',
    'permanent deletion',
    'account termination',
    'user privacy',
  ],
};

export default function Page() {
  return (
    <div>
      <p className="flex items-center text-red-600 font-bold gap-2 mb-7">
        <span>
          <MdWarning />
        </span>
        <span>This action cannot be reversed</span>
      </p>
      <TerminateAccount />
    </div>
  );
}
