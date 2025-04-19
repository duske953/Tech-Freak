import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from './ui/button';

export default function ErrorPage({
  msg = 'Oops! Looks like this page packed its bags and left. Maybe try another route?',
}: {
  msg?: string;
}) {
  return (
    <div className="flex justify-center flex-col gap-4 items-center py-4 px-2">
      <Image
        src="/err.svg"
        alt="Something went wrong with this request"
        height={500}
        width={500}
      />
      <p className="relative text-2xl font-bold text-center">{msg}</p>
      <Link
        href="/"
        className={`${buttonVariants({
          size: 'lg',
          variant: 'secondary',
        })} mt-4`}
      >
        Home
      </Link>
    </div>
  );
}
