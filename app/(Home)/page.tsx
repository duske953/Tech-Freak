import { Metadata } from 'next';
import { productTypes } from '../utils/interfaces';
import Categories from './components/Categories';
import Features from './components/Features';
import Hero from './components/Hero';
import NewsLetter from './components/NewsLetter';
import ProductOnSale from './components/ProductOnSale';
import { tryCatchGet } from '../utils/tryCatch';
import ProductsList from '../components/ProductsList';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Tech-Freak, your one-stop shop for all things tech!',
  keywords: [
    'tech',
    'electronics',
    'gadgets',
    'online shopping',
    'tech store',
    'latest technology',
    'tech reviews',
    'tech news',
    'tech accessories',
    'tech deals',
    'tech trends',
    'tech products',
    'tech innovations',
    'tech lifestyle',
  ],
};

interface pageProductTypes {
  data: {
    headphones: Array<productTypes>;
    laptops: Array<productTypes>;
  };
}

export default async function Page() {
  const [response, err] = await tryCatchGet('products/fetchProducts', 600);
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
