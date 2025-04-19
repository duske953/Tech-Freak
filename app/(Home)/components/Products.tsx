import ProductCard from '@/app/components/ProductCard';
import formatPrice from '@/app/utils/formatPrice';
import { productTypes } from '@/app/utils/interfaces';
import replaceImgDimension from '@/app/utils/replaceImageDimension';
export default function Products({
  headphones,
  laptops,
}: {
  headphones: Array<productTypes>;
  laptops: Array<productTypes>;
}) {
  return (
    <section className="py-8">
      <div className="flex flex-col gap-24">
        <div>
          <h2 className="text-3xl mb-10 font-bold text-gray-600">
            Headphones for Every Sound Experience
          </h2>
          <ul className="grid grid-cols-4 gap-6">
            {headphones.map((product) => (
              <li key={product.title}>
                <ProductCard
                  title={product.title}
                  imageSrc={product.image}
                  price={formatPrice(product.price)}
                  rating={+product.rating}
                  id={product.asin}
                  secImg={
                    replaceImgDimension(product.images?.[0], 'SX679') as string
                  }
                  link={product.link}
                />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-3xl mb-10 font-bold text-gray-600">
            Laptops for Every Task
          </h2>
          <ul className="grid grid-cols-4 gap-6">
            {laptops.map((product) => (
              <li key={product.title}>
                <ProductCard
                  title={product.title}
                  imageSrc={product.image}
                  price={formatPrice(product.price)}
                  rating={+product.rating}
                  id={product.asin}
                  secImg={
                    replaceImgDimension(product.images?.[0], 'SX679') as string
                  }
                  link={product.link}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
