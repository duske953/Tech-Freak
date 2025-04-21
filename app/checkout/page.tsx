import { tryCatchGet } from '../utils/tryCatch';
import { cookies } from 'next/headers';
import Checkout from './components/Checkout';
import totalCartPrice from '../utils/totalCartPrice';
import Link from 'next/link';
import { buttonVariants } from '../components/ui/button';
import ErrorPage from '../components/ErrorPage';

async function fetchCheckoutData() {
  const cookieStore = cookies();
  const cookieHeader = (await cookieStore).toString();
  const [response, err] = await tryCatchGet(
    'users/process-checkout',
    0,
    cookieHeader
  );
  return [response, err];
}

export async function generateMetadata() {
  const [response, err] = await fetchCheckoutData();
  const totalPrice = totalCartPrice(response?.userProducts.productsInCart);

  function genereateMetaMsg(defaultMsg: string) {
    return !err && response?.userProducts.productsInCart <= 0
      ? 'Please add at least one item before proceeding to payment.'
      : err
      ? 'something went wrong'
      : defaultMsg;
  }

  return {
    title: genereateMetaMsg(`Checkout – ByteCart (Total: $${totalPrice}`),
    description: genereateMetaMsg(
      `You're just a step away from completing your purchase. Review your order and proceed to payment for your ByteCart shopping cart totaling $${totalPrice}.`
    ),
    keywords: [
      'checkout',
      'ByteCart checkout',
      'complete purchase',
      'shopping cart',
      'online payment',
      'secure checkout',
      'order review',
      'buy tech products',
      'tech store checkout',
      'finalizing order',
      'total order price',
      'tech shopping',
    ],
  };
}

export default async function Page() {
  const [response, err] = await fetchCheckoutData();
  if (err) {
    return <ErrorPage />;
  }

  if (response?.userProducts.productsInCart <= 0)
    return (
      <section className="py-20 px-6">
        <div className="flex flex-col gap-3 items-center">
          <p>Your cart is empty.</p>
          <p>Please add at least one item before proceeding to payment.</p>
          <Link
            className={buttonVariants({ variant: 'outline', size: 'lg' })}
            href="/shop?category=monitors&id=1292115011&page=1"
          >
            Back to shop
          </Link>
        </div>
      </section>
    );

  const totalPrice = totalCartPrice(response.userProducts.productsInCart);
  return (
    <section className="py-28 px-6">
      <div className="max-w-screen-sm mx-auto">
        <Checkout
          clientSecret={response.paymentIntent.client_secret}
          totalPrice={totalPrice}
        />
      </div>
    </section>
  );
}
