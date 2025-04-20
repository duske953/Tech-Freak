import Link from 'next/link';
import { MdAccountBox } from 'react-icons/md';
import Search from './Search';
import getLoggedUser from '../utils/getLoggedUser';

import AccountDropDown from './AccountDropdown';
import Cart from './Cart';
import { FaShop } from 'react-icons/fa6';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { CgMenuLeft } from 'react-icons/cg';
import { cn } from '../lib/utils';
import { buttonVariants } from './ui/button';

export default async function Navbar() {
  const [response, err] = await getLoggedUser();
  const cart = response?.data.user.productsInCart;
  return (
    <header className="sticky z-10 top-0 bottom-0 bg-gray-50">
      <nav className="flex justify-between px-4 py-8 max-lg:py-4 max-lg:justify-center">
        <Link className="text-3xl text-blue-700 uppercase font-bold" href="/">
          Tech-Freak
        </Link>
        <SecondaryNav />
        <ul className="flex gap-24 items-center max-lg:justify-around max-lg:hidden">
          <li>
            <Link href="/shop?category=monitors&id=16225007011&page=1">
              Shop
            </Link>
          </li>
          <li>
            <Link href="/about-us">About us</Link>
          </li>
          <li>
            <Link href="/contact-us">Contact us</Link>
          </li>
        </ul>

        <ul className="flex gap-24 items-center max-lg:justify-around max-lg:hidden">
          <li>
            {response ? (
              <AccountDropDown
                name={response.data.user.Name}
                id={response.data.user._id}
              />
            ) : (
              <Link href="/account">
                <MdAccountBox className="text-2xl text-blue-600" />
              </Link>
            )}
          </li>

          <Search />
          <li>
            <Cart err={err} cart={cart} />
          </li>
        </ul>
      </nav>
    </header>
  );
}

function SecondaryNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'cursor-pointer ml-auto hidden max-lg:block text-3xl'
        )}
      >
        <CgMenuLeft />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <Link href="/About-us">About us</Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <Link href="/contact-us">Contact us</Link>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export async function BottomNavBar() {
  const [response, err] = await getLoggedUser();
  const cart = response?.data.user.productsInCart;
  return (
    <div className="bg-slate-200 sticky w-full z-[10] bottom-0 hidden max-lg:block">
      <ul className="flex justify-between p-4 items-center">
        <li>
          <Link href="/shop?category=monitors&id=16225007011&page=1">
            <FaShop className="text-3xl text-blue-600" />
          </Link>
        </li>
        <Search />
        <li>
          {response ? (
            <AccountDropDown
              name={response.data.user.Name}
              id={response.data.user._id}
            />
          ) : (
            <Link href="/account">
              <MdAccountBox className="text-2xl text-blue-600" />
            </Link>
          )}
        </li>

        <li>
          <Cart err={err} cart={cart} />
        </li>
      </ul>
    </div>
  );
}
