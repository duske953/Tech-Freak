import { cn } from '@/app/lib/utils';
import Image from 'next/image';

export default function ProductOnSale() {
  return (
    <section className="py-14">
      <div className="grid grid-cols-3 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1">
        <div className="bg-gray-50 h-full w-full row-[1_/_3] relative max-sm:row-auto max-sm:h-[15rem]">
          <SaleImage
            src="/Home/Laptop.png"
            size={500}
            model="MacBook Pro 14-inch"
            className="max-sm:scale-75"
          />
        </div>

        <div className="bg-gray-50 h-48 w-full relative">
          <SaleImage
            src="/Home/Headphone.png"
            size={200}
            model="AirPods Max"
            className="-translate-x-[50%]"
          />
        </div>
        <div className="bg-gray-50 h-48 w-full relative">
          <SaleImage
            src="/Home/phone.png"
            size={200}
            className="-translate-x-[50%]"
            model="Iphone 14 pro max"
          />
        </div>
        <div className="bg-gray-50 h-48 w-full relative col-[-3_/_-1] max-sm:col-auto">
          <SaleImage
            src="/Home/Camera.png"
            size={200}
            className="-translate-x-[50%] scale-150 max-sm:scale-105"
            model="Sony WH-1000XM5"
          />
        </div>
      </div>
    </section>
  );
}

function SaleImage({
  src,
  size,
  model,
  className,
}: {
  src: string;
  size: number;
  model: string;
  className?: string;
}) {
  return (
    <>
      <Image
        src={src}
        width={size}
        height={size}
        alt={model}
        className={cn(
          `absolute top-2/4 left-2/4 -translate-x-[70%] -translate-y-2/4 scale-125`,
          className
        )}
      />
      <p className="absolute bottom-3 right-4 text-xl font-bold text-gray-800">
        {model}
      </p>

      <p className="absolute right-0 top-0 bg-blue-900 p-2 text-white font-bold">
        ON SALE
      </p>
    </>
  );
}
