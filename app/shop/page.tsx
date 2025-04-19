import { tryCatchGet } from '../utils/tryCatch';
import ProductCategories from './components/ProductCategories';
import Image from 'next/image';
import ProductsList from '../components/ProductsList';
import Pagination from '../components/Pagination';
import { buttonVariants } from '../components/ui/button';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop – Tech-Freak',
  description:
    'Explore a wide range of tech products including laptops, phones, and accessories. Quality tech at honest prices.',
  keywords: [
    'tech',
    'electronics',
    'gadgets',
    'online shopping',
    'tech store',
    'laptops',
    'smartphones',
    'tech accessories',
    'buy tech products',
    'affordable tech',
    'latest gadgets',
    'electronics shop',
    'tech gear',
    'digital devices',
  ],
};

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const page = (await searchParams).page;
  const categoryId = (await searchParams).id;
  const categoryType = (await searchParams).category;
  const [response, err] = await tryCatchGet(
    `products/getProductsFromCategory?id=${categoryId}&page=${page}`,
    300
  );
  console.log(err);

  if (err) {
    return (
      <div className="flex justify-center flex-col items-center py-8">
        <Image
          src="/not-found.svg"
          alt="we could not find the requested resource"
          height={500}
          width={500}
        />
        <p className="relative text-2xl font-bold">
          Oops! Looks like this page packed its bags and left. Maybe try another
          route?
        </p>
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
  return (
    <section>
      <div className="relative px-8 py-11 flex items-center my-8 gap-4 bg-gray-50 max-lg:flex-col max-lg:gap-8">
        <h1 className="text-7xl font-bold leading-normal text-center max-md:text-5xl max-sm:text-3xl max-md:leading-snug">
          Start shopping with us today
        </h1>

        <Image
          alt="Image of woman shopping"
          src="shop/shop-img.svg"
          height={300}
          width={500}
        />
      </div>
      <ProductCategories id={categoryType} />
      <div className="my-7 px-6">
        <ProductsList products={response.data.foundProducts} key={categoryId} />
      </div>

      <Pagination totalPages={response.data.totalPages} />
    </section>
  );
}
