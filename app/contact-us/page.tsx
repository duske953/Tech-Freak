import Image from 'next/image';
import { ReactNode } from 'react';
import { FaHome, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { cn } from '../lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us – ByteCart',
  description:
    'Have questions or need support? Reach out to us through our contact page. We’re here to assist you with any inquiries or issues.',
  keywords: [
    'contact us',
    'ByteCart support',
    'customer support',
    'contact page',
    'tech store help',
    'inquiries',
    'customer service',
    'tech support',
    'get in touch',
    'contact ByteCart',
    'support team',
    'feedback',
    'ask questions',
  ],
};

export default function Page() {
  return (
    <section>
      <div>
        <div className="relative">
          <div className="absolute top-2/4 left-2/4 text-white -translate-y-2/4 -translate-x-2/4 z-30 w-full text-center px-4">
            <h1 className="text-7xl font-bold uppercase max-sm:text-4xl">
              Contact us today
            </h1>
            <p className="mt-4 text-xl w-3/4 mx-auto max-sm:w-full">
              We're here to assist you with anything—from product info to order
              issues. Just reach out and we'll get back to you as soon as
              possible.
            </p>
          </div>

          <Image
            className="w-full h-[35rem] object-cover"
            src="/contact-us/contact.jpg"
            alt="Contact us"
            width={1000}
            height={1000}
          />
          <div className="absolute bg-gray-600/65 size-full top-0 left-0">
            &nbsp;
          </div>
        </div>

        <ul className="grid grid-cols-3 gap-5 py-24 px-6 max-lg:grid-cols-2 max-lg:justify-items-center max-sm:grid-cols-1">
          <ContactList
            tag="Visit us"
            detail="We’re always open to walk-ins. Come by, ask questions, or just see what we’re working on."
            address="42 Maple Drive, Suite B
                      Lakeside, NY 11223
                      United States"
          >
            <FaHome />
          </ContactList>

          <ContactList
            tag="call us"
            detail="Have a quick question? Give us a call and we’ll help you right away."
            address="+1 (555) 734-9821"
          >
            <FaPhone />
          </ContactList>

          <ContactList
            className="max-lg:col-[-3_/_-1] max-sm:col-auto"
            tag="Email us"
            detail="For inquiries, feedback, or support, feel free to send us an email. We usually reply within 24 hours."
            address="support@bytecart.com"
          >
            <MdEmail />
          </ContactList>
        </ul>
      </div>
    </section>
  );
}

function ContactList({
  tag,
  detail,
  address,
  className,
  children,
}: {
  tag: string;
  detail: string;
  address: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <li
      className={cn(
        'shadow-xl shadow-gray-200 flex flex-col items-center gap-4 py-8 px-3 rounded-md',
        className
      )}
    >
      <span className="text-3xl text-blue-700">{children}</span>
      <p className="uppercase text-lg font-bold">{tag}</p>
      <p className="text-center">{detail}</p>
      <p className="text-blue-600 text-center">{address}</p>
    </li>
  );
}
