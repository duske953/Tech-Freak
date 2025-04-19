'use client';
import { AnimatePresence, motion } from 'motion/react';
import { FormEvent, useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import Overlay from './Overlay';
import { Input } from '@/app/components/ui/input';
import { cn } from '@/app/lib/utils';
import { useRouter } from 'nextjs-toploader/app';
import { SearchContext } from '../context/SearchContext';
const MotionOverlay = motion.create(Overlay);

export default function Search() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('SearchContext must be used within a SearchProvider');
  }
  const { openSearch, setOpenSearch } = context;
  return (
    <>
      <li>
        <span
          className="cursor-pointer"
          onClick={() => setOpenSearch(!openSearch)}
        >
          <FaSearch className="text-2xl text-blue-600" />
        </span>
      </li>
    </>
  );
}

export function SearchOverlay() {
  const router = useRouter();
  function renderSearchProducts(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOpenSearch(false);
    router.push(`/search/?q=${searchValue}&page=1`);
  }
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('SearchContext must be used within a SearchProvider');
  }

  const { openSearch, setOpenSearch, searchValue, setSearchValue } = context;
  return (
    <form onSubmit={renderSearchProducts}>
      <AnimatePresence>
        {openSearch && (
          <>
            <MotionOverlay
              className="z-[90]"
              renderClick={() => setOpenSearch(!openSearch)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ opacity: 0, translateY: '-100%' }}
              animate={{ opacity: 1, translateY: '-50%' }}
              exit={{ opacity: 0, translateY: '-100%' }}
              className="fixed left-1/2 top-1/2 text-2xl z-[500] -translate-x-1/2 w-3/5 max-sm:w-full px-4"
            >
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                className={cn(
                  'border-blue-800 border-2 focus-visible:border-outline focus-visible:ring-[0px] text-white'
                )}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </form>
  );
}
