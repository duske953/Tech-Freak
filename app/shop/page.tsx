import { tryCatchGet } from '../utils/tryCatch';
import ProductCategories from './components/ProductCategories';
import Image from 'next/image';
import ProductsList from '../components/ProductsList';
import Pagination from '../components/Pagination';
import { Metadata } from 'next';
import { pageProps } from '../utils/interfaces';
import ErrorPage from '../components/ErrorPage';

export const metadata: Metadata = {
  title: 'Shop – ByteCart',
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

export default async function Page({ searchParams }: pageProps) {
  const { page } = await searchParams;
  const { id } = await searchParams;
  const { category } = await searchParams;
  const [response, err] = await tryCatchGet(
    `products/getProductsFromCategory?id=${id}&page=${page}`,
    300
  );

  if (err) return <ErrorPage />;
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
      <ProductCategories id={category as string} />
      <div className="my-7 px-6">
        <ProductsList
          products={response.data.foundProducts}
          key={id as string}
        />
      </div>

      <Pagination totalPages={response.data.totalPages} />
    </section>
  );
}
