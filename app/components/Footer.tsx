import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="">
      <div className="grid grid-cols-4 gap-4 bg-gray-100 py-14 px-6 max-lg:grid-cols-3 max-md:grid-cols-2 max-md:gap-x-10 max-md:gap-y-20 max-sm:grid-cols-1">
        <div>
          <p className="text-lg mb-3 font-bold">Tech-Freak</p>
          <span>Shop interesting tech products</span>

          <div className="flex gap-8 mt-7 text-2xl text-blue-800">
            <FaTwitter />
            <FaFacebook />
            <FaInstagram />
            <FaYoutube />
          </div>
        </div>

        <div>
          <p className="mb-3 font-bold">Shop</p>
          <ul className="flex flex-col gap-4">
            <li>
              <Link href="/">Laptops</Link>
            </li>
            <li>
              <Link href="/">Smartphones</Link>
            </li>

            <li>
              <Link href="/">Headphones</Link>
            </li>

            <li>
              <Link href="/">Accessories</Link>
            </li>

            <li>
              <Link href="/">Camera</Link>
            </li>

            <li>
              <Link href="/">Computer</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 font-bold">Customer Support</p>
          <ul className="flex flex-col gap-4">
            <li>
              <Link href="/">FAQs</Link>
            </li>
            <li>
              <Link href="/">Shipping & Returns</Link>
            </li>

            <li>
              <Link href="/">Warranty Policy</Link>
            </li>

            <li>
              <Link href="/">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 font-bold">Company</p>
          <ul className="flex flex-col gap-4">
            <li>
              <Link href="/">About Us</Link>
            </li>
            <li>
              <Link href="/">Blog</Link>
            </li>

            <li>
              <Link href="/">Careers</Link>
            </li>

            <li>
              <Link href="/">Terms & Privacy</Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center py-8">
        Created with love by{' '}
        <Link
          className="text-blue-800 font-bold"
          href="https://eloho.vercel.app"
        >
          Eloho Kennedy
        </Link>
      </p>
    </footer>
  );
}
