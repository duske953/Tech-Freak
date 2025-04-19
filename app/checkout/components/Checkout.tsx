'use client';
import LoadingBtn from '@/app/components/LoadingBtn';
import { Button } from '@/app/components/ui/button';
import tryCatch from '@/app/utils/tryCatch';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import {
  loadStripe,
  StripeElementsOptions,
  StripePaymentElementChangeEvent,
} from '@stripe/stripe-js';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import revalidate from '@/app/utils/revalidate';
import tryCatchPost from '@/app/utils/tryCatch';
import { toastError, toastSuccess } from '@/app/utils/toast';
const stripePromise = loadStripe(
  'pk_test_51RBLoUG8ViicEGANfaeHj8Xtk8yczSNhIv0qK89IKENhWmC3PsmCl4ZMqcuqFaPOtYDUemVGpW3z1tHMgBW6smRd00ZH93D8Ks'
);

export default function Checkout({
  clientSecret,
  totalPrice,
}: {
  clientSecret: string;
  totalPrice: string;
}) {
  const router = useRouter();
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      rules: {
        '.Label': {
          fontWeight: '500',
          fontFamily: 'Fredoka, sans-serif',
        },
        '.Error': {
          fontFamily: 'Fredoka, sans-serif',
        },
        '.Input': {
          fontFamily: 'Fredoka, sans-serif',
        },
      },
    },

    fonts: [
      {
        cssSrc:
          'https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap',
      },
    ],
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckOutForm totalPrice={totalPrice} />
    </Elements>
  );
}

function CheckOutForm({ totalPrice }: { totalPrice: string }) {
  const [confirmBtn, setConfirmBtn] = useState<'idle' | 'submitting'>('idle');
  const [invalidForm, setInvalidForm] = useState(true);
  const stripe = useStripe();
  const element = useElements();
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!stripe || !element) return;
    setConfirmBtn('submitting');
    const { error } = await stripe.confirmPayment({
      elements: element,
      redirect: 'if_required',
    });
    if (error) {
      toast.error(error.message, {
        position: 'top-right',
        id: 'checkout',
      });
      setConfirmBtn('idle');
      return;
    }
    const [_, err] = await tryCatchPost('users/checkout-success');
    setConfirmBtn('idle');
    if (err) {
      toastError('Something went wrong', 'check-out');
      return;
    }
    toastSuccess(
      'Payment successful. Check your email for more info.',
      'check-out',
      14000
    );
    revalidate('/checkout');
    router.replace('/');
  }
  function handlePaymentChange(e: StripePaymentElementChangeEvent) {
    setInvalidForm(!e.complete);
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement onChange={handlePaymentChange} />
      {stripe && element && (
        <LoadingBtn
          className="mt-5 w-full text-xl cursor-pointer"
          variant="secondary"
          isSubmitting={confirmBtn === 'submitting'}
          disabled={
            confirmBtn === 'submitting' || !stripe || !element || invalidForm
          }
        >
          Pay ${totalPrice}
        </LoadingBtn>
      )}
    </form>
  );
}
