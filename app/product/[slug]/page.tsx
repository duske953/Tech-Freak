import { pageProps, productTypes } from '@/app/utils/interfaces';
import { tryCatchGet } from '@/app/utils/tryCatch';
import ProductDetails from './components/ProductDetails';
import ProductImage from './components/ProductImage';
import ProductMetadata from './components/ProductMetadata';
import ProductsList from '@/app/components/ProductsList';
import ErrorPage from '@/app/components/ErrorPage';

import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { id } = await searchParams;
  const [response, err] = await tryCatchGet(`products/fetchProduct/${id}`, 600);

  const productTitle = response?.data.product.title;
  return {
    title: err ? 'Something went wrong' : productTitle,
    description: err
      ? 'Something went wrong'
      : `Discover the details of the ${productTitle} at ByteCart. Explore its features, specifications, and pricing. Get yours today!`,
    keywords: [
      'product details',
      'ByteCart product',
      'buy tech products',
      'latest gadgets',
      'tech products',
      'electronics store',
      'product features',
      'product specifications',
      'shop online',
      'ByteCart store',
      'product review',
      'buy now',
    ],
  };
}

export default async function Page({ searchParams }: pageProps) {
  const { id } = await searchParams;
  if (!id) return <ErrorPage />;
  const [response, err] = await tryCatchGet(`products/fetchProduct/${id}`, 0);

  if (err) return <div>{err}</div>;

  const productData = response.data.product as productTypes;
  return (
    <section className="my-8">
      <div className="grid grid-cols-2 gap-7 px-6 max-md:grid-cols-1 max-sm:px-3">
        <ProductImage
          title={productData.title}
          image={productData.image}
          images={productData.images}
        />
        <ProductDetails productData={productData} />
      </div>
      <ProductMetadata
        productSpecs={productData.details.productSpecs}
        aboutProduct={productData.details.aboutProduct}
      />
      <div className="py-20 px-6">
        <p className="mb-6 text-3xl text-gray-600 font-bold uppercase">
          Recommended
        </p>
        <ProductsList
          products={response.data.similarProduct}
          key={id as string}
        />
      </div>
    </section>
  );
}
