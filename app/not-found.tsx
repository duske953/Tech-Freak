import Image from 'next/image';
import Link from 'next/link';
import { cn } from './lib/utils';
import { buttonVariants } from './components/ui/button';

export default function NotFound() {
  return (
    <section className="py-2 px-4">
      <div className="flex flex-col items-center">
        <Image
          src="./not-found.svg"
          width={500}
          height={500}
          alt="The page does not exist"
        />
        <div className="relative -top-14 flex flex-col gap-4">
          <p className="font-bold text-3xl text-gray-600 text-center">
            Oops, this page does not exist!
          </p>
          <Link
            href="/"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
          >
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
