import { buttonVariants } from '@/app/components/ui/button';
import { cn } from '@/app/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
export default function Hero() {
  return (
    <section>
      <div className="grid grid-cols-2 py-16 gap-5 max-w-screen-xl max-md:grid-cols-1 max-lg:gap-10">
        <div>
          <h1 className="text-7xl font-bold max-lg:text-5xl">
            Your One-Stop Shop for the Latest Gadgets
          </h1>
          <p className="mt-6 text-2xl leading-loose">
            Explore top-tier laptops, smartphones, and accessories, all in one
            place.
          </p>
          <Link
            className={cn(
              buttonVariants({ variant: 'secondary', size: 'lg' }),
              'mt-3'
            )}
            href="/shop?category=monitors&id=1292115011&page=1"
          >
            Shop Now
          </Link>
        </div>

        <div>
          <Image
            width={1000}
            height={1000}
            src="./Hero_Img.svg"
            alt="Tech Products of Smartphone | Laptop | Tablet"
          />
        </div>
      </div>
    </section>
  );
}
