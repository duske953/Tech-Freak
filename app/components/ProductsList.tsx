'use client';
import { productTypes } from '@/app/utils/interfaces';
import { Variants, motion } from 'motion/react';
import ProductCard from '@/app/components/ProductCard';
import replaceImgDimension from '../utils/replaceImageDimension';
import formatPrice from '../utils/formatPrice';
export default function ProductsList({
  products,
  key,
}: {
  products: any;
  key: string;
}) {
  const productContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const productItemVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };
  return (
    <motion.ul
      key={key}
      variants={productContainerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1"
    >
      {products.map((product: productTypes) => (
        <motion.li variants={productItemVariants} key={product.title}>
          <ProductCard
            title={product.title}
            imageSrc={product.image}
            price={formatPrice(product.price)}
            rating={+product.rating}
            id={product.asin}
            secImg={replaceImgDimension(product.images?.[0], 'SX679') as string}
          />
        </motion.li>
      ))}
    </motion.ul>
  );
}
