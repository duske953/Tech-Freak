'use client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/app/components/ui/sheet';
import Link from 'next/link';
import { FaCartShopping } from 'react-icons/fa6';
import { buttonVariants } from './ui/button';
import { cn } from '../lib/utils';
import { Dispatch, SetStateAction, useState } from 'react';
import { productTypes } from '../utils/interfaces';
import { motion } from 'motion/react';
import Image from 'next/image';
import revalidate from '../utils/revalidate';
import { MdOutlineShoppingCartCheckout } from 'react-icons/md';
import totalCartPrice from '../utils/totalCartPrice';
import LoadingBtn from './LoadingBtn';
import tryCatchPost from '../utils/tryCatch';
import { toastError, toastSuccess } from '../utils/toast';
import formatPrice from '../utils/formatPrice';
export default function Cart({
  err,
  cart,
}: {
  err: any;
  cart: Array<{
    product: productTypes;
    quantity: number;
    productDiscount: number;
  }>;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const totalPrice = totalCartPrice(cart);
  return (
    <Sheet open={modalOpen} onOpenChange={setModalOpen}>
      <SheetTrigger>
        <div className="relative">
          <FaCartShopping className="text-2xl text-blue-600 cursor-pointer" />
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            key={cart?.length}
            className="absolute -top-5 right-2 font-bold text-blue-900"
          >
            {cart?.length}
          </motion.p>
        </div>
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle className="text-3xl">
            {err ? 'Unauthorized' : 'Your cart'}
          </SheetTitle>
          <SheetDescription asChild>
            <div>
              {err && (
                <div className="mt-7">
                  <p className="text-xl">
                    Please login to view the items in your cart
                  </p>
                  <Link
                    onClick={() => setModalOpen(false)}
                    className={cn(
                      buttonVariants({ variant: 'secondary', size: 'lg' }),
                      'mt-6'
                    )}
                    href="/account"
                  >
                    Login
                  </Link>
                </div>
              )}
              {!err && cart?.length === 0 && (
                <div className="flex items-center h-svh justify-center text-center">
                  <p className="font-bold text-2xl">
                    You currently have no item(s) in your cart{' '}
                  </p>
                </div>
              )}
              {!err && cart?.length > 0 && (
                <div className="flex flex-col gap-10 py-10">
                  {cart.map((product) => (
                    <CartItems
                      setModalOpen={setModalOpen}
                      product={product}
                      key={product.product._id}
                      length={cart.length}
                    />
                  ))}
                </div>
              )}
            </div>
          </SheetDescription>
        </SheetHeader>
        {!err && cart?.length > 0 && (
          <SheetFooter className="flex flex-col gap-7">
            <p className="text-xl">
              Total:{' '}
              <span className="font-bold text-gray-600">${totalPrice}</span>
            </p>
            <Link
              onClick={() => setModalOpen(false)}
              href="/checkout"
              className={buttonVariants({ variant: 'secondary' })}
            >
              <MdOutlineShoppingCartCheckout /> Proceed to Checkout
            </Link>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

function CartItems({
  product,
  length,
  setModalOpen,
}: {
  product: { product: productTypes; quantity: number; productDiscount: number };
  length: number;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [deleteBtn, setDeleteBtn] = useState<'deleting' | 'idle'>('idle');
  async function renderDeleteProductFromCart(id: string) {
    setDeleteBtn('deleting');
    const [response, err] = await tryCatchPost(
      'products/deleteProductFromCart',
      'post',
      { id }
    );
    setDeleteBtn('idle');
    if (!response) {
      toastError(err, 'delete-from-cart');
      return;
    }
    toastSuccess('Product removed', 'delete-from-cart');
    revalidate('/product/[slug]');
  }
  return (
    <div
      className={cn(
        'border-b pb-4 last:border-b-0 last:pb-0 flex flex-col',
        length === 1 && 'last:border-b last:pb-4'
      )}
    >
      <Link
        onClick={() => setModalOpen(false)}
        href={`/product/${product.product.title
          .slice(0, 20)
          .split(' ')
          .join('-')}/?id=${product.product.asin}`}
        key={product.product._id}
        className="flex gap-4 items-center"
      >
        <Image
          width={100}
          height={100}
          src={product.product.image}
          alt={product.product.title}
          className="size-20 object-contain rounded-md"
        />
        <div className="flex flex-col gap-1">
          <p className="">{product.product.title.slice(0, 20)}...</p>
          <div>
            <div className="flex gap-5">
              <p className={cn(product.quantity >= 5 && 'line-through')}>
                $
                {new Intl.NumberFormat().format(
                  product.quantity *
                    +formatPrice(product.product.price).split(',').join('')
                )}
              </p>
              {product.quantity >= 5 && (
                <p className="font-bold text-blue-800">
                  ${new Intl.NumberFormat().format(product.productDiscount)}
                </p>
              )}
            </div>
            <p className="text-sm font-bold">qty: {product.quantity}</p>
          </div>
        </div>
      </Link>

      <div className="flex items-center gap-6 mt-4 self-end">
        {/* <Button className="cursor-pointer" variant="outline">
                            Check Out
                          </Button> */}
        <LoadingBtn
          isSubmitting={deleteBtn === 'deleting'}
          disabled={deleteBtn === 'deleting'}
          className="text-red-600 hover:text-red-500 cursor-pointer"
          onClick={() => renderDeleteProductFromCart(product.product._id)}
          variant="outline"
        >
          Delete
        </LoadingBtn>
      </div>
    </div>
  );
}
