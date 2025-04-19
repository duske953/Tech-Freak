'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { cn } from '../lib/utils';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';
export default function Pagination({ totalPages }: { totalPages: number }) {
  const params = useSearchParams();
  const pathname = usePathname();
  let queries = '?';
  params.forEach((value, key) => {
    if (key !== 'page') {
      queries += `${key}=${value}&`;
    }
  });

  const page = params.get('page');
  const inValidPage = page === null || page === undefined || isNaN(+page);
  const goBackInvalidPage = inValidPage || +page <= 1;
  const goForwardInvalidPage = inValidPage || +page >= totalPages;
  return (
    <div className="flex justify-center items-center my-8">
      <div className="bg-slate-600 text-white flex justify-between rounded-md items-center h-9 w-32 px-4">
        <Link
          className={cn(goBackInvalidPage && 'pointer-events-none opacity-20')}
          tabIndex={goBackInvalidPage ? -1 : 0}
          href={`${pathname}${queries}&page=${
            goBackInvalidPage ? 1 : +page - 1
          }`}
        >
          <FaArrowLeft />
        </Link>

        <p>{page}</p>
        <Link
          className={cn(
            goForwardInvalidPage && 'pointer-events-none opacity-20'
          )}
          tabIndex={goForwardInvalidPage ? -1 : 0}
          href={`${pathname}${queries}page=${
            goForwardInvalidPage ? totalPages : +page + 1
          }`}
        >
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
}
