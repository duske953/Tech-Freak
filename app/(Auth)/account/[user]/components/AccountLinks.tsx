'use client';
import { Button, buttonVariants } from '@/app/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/app/lib/utils';
import Link from 'next/link';
import tryCatchPost from '@/app/utils/tryCatch';
import { toastError, toastSuccess } from '@/app/utils/toast';
import { useState } from 'react';
import LoadingBtn from '@/app/components/LoadingBtn';

const accountLinks = [
  {
    text: 'Account Details',
    href: 'account-info',
  },
  {
    text: 'Update Password',
    href: 'update-password',
  },
  {
    text: 'Terminate Account',
    href: 'terminate-account',
  },
];
export default function AccountLinks({ accActive }: { accActive: boolean }) {
  const [activateAccBtn, setActivateAccBtn] = useState<'submitting' | 'idle'>(
    'idle'
  );
  async function renderActivateAccount() {
    if (accActive) return;
    setActivateAccBtn('submitting');
    const [response, err] = await tryCatchPost(
      'users/send-activate-account-email'
    );
    setActivateAccBtn('idle');
    if (err) {
      toastError(err, 'activate-account');
      return;
    }
    toastSuccess(
      "We've sent a link to activate your account. Please check your inbox.",
      'activate-account'
    );
  }

  const pathname = usePathname();
  const path = pathname.split('/')[3];
  return (
    <div className="p-5">
      <ul className="flex gap-7 justify-between overflow-auto">
        {accountLinks.map((link) => (
          <li
            key={link.text}
            className={cn(
              buttonVariants({ variant: 'outline' }),
              path === link.href && 'bg-gray-100',
              link.href === 'terminate-account' && 'order-4'
            )}
          >
            <Link href={link.href}>{link.text}</Link>
          </li>
        ))}
        <li>
          <LoadingBtn
            className="cursor-pointer"
            tabIndex={accActive ? -1 : 1}
            disabled={accActive || activateAccBtn === 'submitting'}
            isSubmitting={activateAccBtn === 'submitting'}
            onClick={renderActivateAccount}
          >
            {accActive ? 'Account active' : 'Confirm Account'}
          </LoadingBtn>
        </li>
      </ul>
    </div>
  );
}
