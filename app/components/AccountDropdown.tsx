'use client';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button, buttonVariants } from './ui/button';
import { FaPowerOff } from 'react-icons/fa6';
import { cn } from '../lib/utils';
import revalidate from '../utils/revalidate';
import { toast } from 'sonner';
import tryCatchPost from '../utils/tryCatch';
export default function AccountDropDown({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  async function renderLogOutUser() {
    toast.loading('Logging out...', {
      position: 'top-right',
      id: 'logout',
    });
    const [response, err] = await tryCatchPost('users/logout');
    if (!response) {
      toast.error(err, { position: 'top-right', id: 'logout' });
      return;
    }
    toast.success('Logged out successfully', {
      position: 'top-right',
      id: 'logout',
    });
    revalidate('/product/[slug]');
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(buttonVariants({ variant: 'outline' }), 'cursor-pointer')}
      >
        Welcome {name.split(' ')[0]}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <Link href={`/account/${id}/account-info`}>My Account</Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <Button
            onClick={renderLogOutUser}
            variant="outline"
            className="text-red-500 hover:text-red-500 cursor-pointer"
          >
            <FaPowerOff />
            Logout
          </Button>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
