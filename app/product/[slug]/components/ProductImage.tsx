'use client';
import useTransitionImage from '@/app/hook/useTransitionImg';
import { cn } from '@/app/lib/utils';
import replaceImgDimension from '@/app/utils/replaceImageDimension';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Fragment, useState } from 'react';
const MotionImg = motion.create(Image);
export default function ProductImage({
  title,
  image,
  images,
}: {
  title: string;
  image: string;
  images: string[];
}) {
  const [mainImg, setMainImg] = useState(image);
  const [isImageValid, setIsImageValid] = useState(true);
  const { controls, setImgLoad } = useTransitionImage();

  function renderChangeMainImg(imageSrc: string) {
    setMainImg(replaceImgDimension(imageSrc, 'SX679') as string);
    setImgLoad(false);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-center">
        <MotionImg
          onLoad={() => setImgLoad(true)}
          onError={() => setIsImageValid(false)}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          animate={controls}
          src={
            isImageValid
              ? (replaceImgDimension(mainImg, 'SL2000') as string)
              : replaceImgDimension(images[0], 'SX679') ||
                '/placeholder-img.png'
          }
          key={mainImg}
          className="size-96 object-contain max-sm:size-72"
          alt={`Product of ${title}`}
          width={500}
          height={500}
        />
      </div>
      <div className="flex gap-5 flex-wrap">
        {images.map((imageSrc) => (
          <Fragment key={imageSrc}>
            <MotionImg
              initial={{ opacity: 0 }}
              animate={controls}
              transition={{ duration: 0.7 }}
              onClick={() => renderChangeMainImg(imageSrc)}
              width={100}
              height={100}
              key={imageSrc}
              src={replaceImgDimension(imageSrc, 'SX679') as string}
              alt="product"
              className={cn(
                'size-20 object-contain my-2 border p-4 cursor-pointer  rounded-md',
                replaceImgDimension(imageSrc, 'SX679') === mainImg
                  ? 'border-blue-800'
                  : 'border-gray-300'
              )}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
