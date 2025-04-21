import { Metadata } from 'next';
import Categories from './components/Categories';
import Features from './components/Features';
import Hero from './components/Hero';
import NewsLetter from './components/NewsLetter';
import ProductOnSale from './components/ProductOnSale';
import { tryCatchGet } from '../utils/tryCatch';
import ProductsList from '../components/ProductsList';
import ErrorPage from '../components/ErrorPage';

export const metadata: Metadata = {
  title: 'Home – ByteCart',
  description:
    'Explore top tech products including phones, laptops, and accessories. Shop online at ByteCart and discover what fits your needs.',
  keywords: [
    'tech store',
    'electronics',
    'online shopping',
    'tech products',
    'phones',
    'laptops',
    'gadgets',
    'headphones',
    'smart devices',
    'computer accessories',
    'latest tech',
    'buy electronics',
    'ByteCart',
    'shop tech online',
  ],
};

export default async function Page() {
  const [response, err] = await tryCatchGet('products/fetchProducts', 600);

  if (err) return <ErrorPage />;
  return (
    <section className="px-6">
      <Hero />
      <Features />
      <Categories />
      <ProductOnSale />
      <div className="py-24">
        <p className="font-bold text-4xl text-gray-600 mb-7">Laptops</p>
        <ProductsList products={response.data.laptops} key="laptops" />
      </div>

      <div className="py-24">
        <p className="font-bold text-4xl text-gray-600 mb-7">Headphones</p>
        <ProductsList products={response.data.headphones} key="headphones" />
      </div>
      {/* <Products
        headphones={response.data.headphones}
        laptops={response.data.laptops}
      /> */}
      <NewsLetter />
    </section>
  );
}
