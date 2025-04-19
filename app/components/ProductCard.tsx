'use client';
import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from '@/app/components/ui/card';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import useTransitionImage from '../hook/useTransitionImg';
const MotionImg = motion.create(Image);
export default function ProductCard({
  title,
  imageSrc,
  price,
  rating,
  id,
  secImg,
}: {
  title: string;
  imageSrc: string;
  price: string;
  rating: number;
  id: string;
  secImg: string;
}) {
  const [isImageValid, setIsImageValid] = useState(true);
  const { controls, setImgLoad } = useTransitionImage();
  return (
    <Link
      href={`/product/${title.slice(0, 20).split(' ').join('-')}/?id=${id}`}
      className="w-full"
    >
      <Card>
        <CardHeader>
          <MotionImg
            initial={{ opacity: 0 }}
            animate={controls}
            onLoad={() => setImgLoad(true)}
            className="size-40 object-contain left-2/4 relative -translate-x-2/4"
            onError={() => setIsImageValid(false)}
            src={isImageValid ? imageSrc : secImg || '/placeholder-img.png'}
            alt={title}
            width={200}
            height={200}
          />
        </CardHeader>
        <CardContent>
          <p>{title.slice(0, 40)}...</p>
          <div className="flex items-center gap-4">
            <Rating
              initialValue={+rating}
              allowFraction={true}
              readonly={true}
              size={20}
            />
            <p className="font-bold">({String(rating).padEnd(3, '.0')})</p>
          </div>
        </CardContent>
        <CardFooter>
          <span className="font-bold text-2xl text-blue-800">${price}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
