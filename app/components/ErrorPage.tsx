import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from './ui/button';

export default function ErrorPage({
  msg = "Something went wrong. That's all we know",
}: {
  msg?: string;
}) {
  return (
    <div className="flex justify-center flex-col gap-4 items-center py-12 px-2">
      <Image
        src="/err.svg"
        alt="Something went wrong with this request"
        height={500}
        width={500}
      />
      <div className="flex flex-col gap-3">
        <p className="relative text-3xl font-bold text-center text-gray-600">
          {msg}
        </p>
        <Link
          href="/"
          className={`${buttonVariants({
            size: 'lg',
            variant: 'outline',
          })} mt-4`}
        >
          Home
        </Link>
      </div>
    </div>
  );
}
