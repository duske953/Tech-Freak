'use client';
import { Button } from '@/app/components/ui/button';
import { productTypes } from '@/app/utils/interfaces';
import { AnimatePresence, motion } from 'motion/react';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import { FaCartShopping, FaMinus, FaPlus, FaWhatsapp } from 'react-icons/fa6';
import { Rating } from 'react-simple-star-rating';
import { MdWarning } from 'react-icons/md';
import NumberFlow from '@number-flow/react';
import { Dispatch, useEffect, useState } from 'react';
import revalidate from '@/app/utils/revalidate';
import tryCatchPost from '@/app/utils/tryCatch';
import formatPrice from '@/app/utils/formatPrice';
import { cn } from '@/app/lib/utils';
import { toastError, toastSuccess } from '@/app/utils/toast';
const MotionNumberFlow = motion.create(NumberFlow);
export default function ProductDetails({
  productData,
}: {
  productData: productTypes;
}) {
  const [quantity, setQuantity] = useState(1);
  const [addToCart, setAddToCart] = useState<'submitting' | 'idle'>('idle');
  const [currentLocation, setCurrentLocation] = useState<null | {
    region: string;
    country: string;
  }>(null);
  const productPrice = (
    quantity * +formatPrice(productData.price).split(',').join('')
  ).toFixed(2);

  const productDiscount =
    quantity >= 5
      ? (+productPrice - +(0.05 * +productPrice)).toFixed(2)
      : (+productPrice).toFixed(2);

  async function renderAddToCart() {
    setAddToCart('submitting');
    const [response, err] = await tryCatchPost(
      'products/addProductToCart',
      'post',
      {
        id: productData._id,
        quantity,
        productDiscount,
      }
    );
    setAddToCart('idle');
    if (!response) {
      toastError(err, 'addToCart');

      return;
    }
    toastSuccess('Product addded to cart', 'addToCart');
    revalidate('/product/[slug]');
  }

  useEffect(() => {
    let ignore = false;
    async function fetchLocation() {
      setCurrentLocation(null);
      const response = await fetch(
        `https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IP_TOKEN}`
      );
      const data = await response.json();
      if (!response.ok) {
        setCurrentLocation(null);
      }
      if (!ignore) {
        setCurrentLocation({ country: data.country, region: data.region });
      }
    }
    fetchLocation();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="flex gap-8 flex-col px-6 rounded-md max-sm:px-3">
      <h1 className="text-2xl leading-loose font-bold text-gray-600 max-sm:text-xl">
        {productData.title}
      </h1>
      <div className="flex justify-between items-center max-md:flex-col max-md:items-start max-md:gap-y-7">
        <Rating
          initialValue={+productData.rating}
          allowFraction={true}
          readonly={true}
          size={40}
          fillColor="#74c0fc"
          emptyClassName="rating-empty"
          fillClassName="rating-fill"
        />

        <div className="flex items-center gap-5">
          <p>Availability</p>
          <span className="bg-blue-800 rounded-full px-8 py-2 font-bold text-white">
            In Stock
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <MdWarning className="text-blue-600 text-xl" />
        <p className="text-xl">Sales tax could be applied at checkout.</p>
      </div>

      <div>
        {currentLocation && (
          <p className="font-bold">
            Deliver to {currentLocation.region}, {currentLocation.country}
          </p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <p className="relative">
          {' '}
          <NumberFlow
            trend={+1}
            format={{ useGrouping: false, currency: 'USD', style: 'currency' }}
            value={+productPrice}
            className={cn('text-blue-900 text-4xl font-bold')}
          />
          {quantity >= 5 && (
            <span className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-[75%] border-b-4 size-4 w-[120%] border-b-gray-500 ">
              &nbsp;
            </span>
          )}
        </p>

        <AnimatePresence>
          {quantity >= 5 && (
            <MotionNumberFlow
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              trend={+1}
              format={{
                useGrouping: false,
                currency: 'USD',
                style: 'currency',
              }}
              value={+productDiscount}
              className={cn(
                'text-blue-900 text-4xl font-bold line-through',
                quantity >= 5 && 'line-through'
              )}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-6">
        <Button
          onClick={renderAddToCart}
          disabled={addToCart === 'submitting'}
          size="lg"
          variant="secondary"
          className="rounded-full cursor-pointer"
        >
          <FaCartShopping />
          Add To Cart
        </Button>

        <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
      </div>
      <div>
        <p className="mb-4 text-xl font-bold">Share</p>
        <div className="flex items-center gap-6">
          <FacebookShareButton url="https://eloho.vercel.app">
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <TwitterShareButton url="/">
            <TwitterIcon size={32} />
          </TwitterShareButton>

          <WhatsappShareButton
            about="kennedy is a boy"
            content="kennedy is a boy"
            url="/"
          >
            <FaWhatsapp size={32} />
          </WhatsappShareButton>
        </div>
      </div>
      {/* <ProductMetadata
        productSpecs={productData.details.productSpecs}
        aboutProduct={productData.details.aboutProduct}
      /> */}
    </div>
  );
}

function ProductQuantity({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: Dispatch<number>;
}) {
  return (
    <div>
      <div className="flex items-center gap-5 bg-gray-50 px-4 py-2 rounded-md">
        <FaMinus
          className="cursor-pointer"
          onClick={() => setQuantity(quantity === 1 ? 1 : quantity - 1)}
        />
        <p>{quantity}</p>
        <FaPlus
          className="cursor-pointer"
          onClick={() => setQuantity(quantity + 1)}
        />
      </div>
    </div>
  );
}
