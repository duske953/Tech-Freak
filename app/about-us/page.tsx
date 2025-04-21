import Image from 'next/image';
import Link from 'next/link';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { buttonVariants } from '../components/ui/button';
import { cn } from '../lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us – ByteCart',
  description:
    'Learn about ByteCart, our mission, and the team behind the tech store. We’re here to make quality tech accessible to everyone.',
  keywords: [
    'about ByteCart',
    'ByteCart team',
    'tech mission',
    'our story',
    'tech company',
    'about us',
    'tech values',
    'why ByteCart',
    'tech for everyone',
    'meet the team',
    'company background',
    'tech-driven company',
    'digital products',
    'customer-first approach',
  ],
};

export default function Page() {
  return (
    <section className="py-20 px-12 max-sm:px-6">
      <AboutInfo />
      <AboutCeo />
      <AboutTeam />
      <div className="text-center">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: 'secondary', size: 'lg' }),
            'rounded-none'
          )}
        >
          Shop with us today
        </Link>
      </div>
    </section>
  );
}

function AboutInfo() {
  return (
    <div>
      <div className="grid grid-cols-[0.4fr_1fr] gap-6 max-md:grid-cols-1">
        <p className="content-center">
          <span className="font-bold">Our Team</span> <br /> A small group with
          a clear focus <br />
          —tech made simple.
        </p>
        <div>
          <h1 className="text-5xl mb-5 font-bold text-gray-600 uppercase">
            About us
          </h1>
          <p className="leading-loose">
            We’re a small team with a simple goal: to make buying tech products
            easier and more straightforward. We focus on curating a selection of
            phones, laptops, earphones, and other devices that offer real value.
            We don’t list everything—only the products we believe are worth your
            time and money. Each item comes with clear information, so you can
            make informed decisions without having to dig through endless
            reviews. We also aim to keep the experience smooth, from browsing to
            checkout. Whether you're upgrading your laptop, replacing your
            phone, or picking out a gift, we want this to be a place you can
            rely on. We’re not here to overwhelm you with options. We’re here to
            offer a better way to shop for tech—honest, focused, and helpful.
          </p>
        </div>
      </div>

      <div className="py-20">
        <Image
          className="w-full h-[30rem] object-cover rounded-md max-sm:h-auto"
          src="/about-us/tech-team.jpg"
          alt="Meeting of team members @ByteCart"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
}

function AboutCeo() {
  return (
    <div className="px-12 py-16 max-sm:px-4">
      <div className="grid grid-cols-[1fr_0.8fr] gap-12 items-center max-lg:grid-cols-1">
        <p className="flex flex-col gap-3 relative">
          <span className="text-xl font-bold italic text-gray-700">
            We started this store because tech shopping didn’t need to be
            complicated. Our focus is on clarity, trust, and products that speak
            for themselves.
          </span>
          <span className="mt-4 text-gray-500">
            Eloho Kennedy, Founder & CEO
          </span>
          <FaQuoteLeft className="absolute -top-10 -left-8 text-xl" />
          <FaQuoteRight className="absolute -bottom-0 -right-0 text-xl" />
        </p>
        <Image
          className="rounded-md"
          src="/about-us/ceo.jpg"
          alt="Eloho Kennedy, Founder & CEO"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
}

function AboutTeam() {
  return (
    <div className="grid grid-cols-2 items-center gap-11 py-16 max-lg:grid-cols-1">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Image
            className=""
            src="/about-us/pr.jpg"
            alt="The product researcher"
            width={2000}
            height={2000}
          />
        </div>

        <div className="row-[2_/_-2] col-[2_/_-1] self-center">
          <Image
            src="/about-us/cs.jpg"
            alt="The customer support lead"
            width={2000}
            height={2000}
          />
        </div>

        <div>
          <Image
            className=""
            src="/about-us/cw.jpg"
            alt="The content writer"
            width={2000}
            height={2000}
          />
        </div>
      </div>
      <div>
        <h2 className="uppercase text-2xl text-gray-700 mb-4 font-bold">
          The team
        </h2>
        <p className="text-lg leading-loose">
          We’re a small team with clear roles and a shared focus—making tech
          shopping simple and trustworthy. Our Product Researcher (PR) finds and
          reviews products worth listing. The Customer Support Lead (CS) handles
          all questions and issues with care. The Content Writer (CW) explains
          products in plain language so you can make informed choices. We work
          closely to keep things honest, helpful, and easy to navigate.
        </p>
      </div>
    </div>
  );
}
