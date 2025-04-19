'use client';

import FieldInput from '@/app/components/FieldInput';
import LoadingBtn from '@/app/components/LoadingBtn';
import { Button } from '@/app/components/ui/button';
import useFormHandlers from '@/app/hook/useFormHandler';
import tryCatchPost from '@/app/utils/tryCatch';
import { toast } from 'sonner';
import { InferType, object, string } from 'yup';

const forgotPasswordSchema = object({
  email: string()
    .required('Your email address is required')
    .email('Email is Invalid')
    .max(256, 'Your email is too long')
    .lowercase(),
});

export default function ForgotPassword() {
  const { register, handleSubmit, formState } =
    useFormHandlers(forgotPasswordSchema);

  async function renderForgotPassword(
    value: InferType<typeof forgotPasswordSchema>
  ) {
    const [response, err] = await tryCatchPost('users/forgot-password', {
      Email: value.email,
    });
    if (err) {
      toast.error(err, {
        id: 'forgot-password',
        position: 'top-right',
      });
      return;
    }
    toast.success('ken', { id: 'forgot-password', position: 'top-right' });
  }
  return (
    <form onSubmit={handleSubmit(renderForgotPassword)}>
      <FieldInput
        placeholder="Enter your email address"
        errors={formState.errors}
        register={register}
        field="email"
        type="text"
      />
      <LoadingBtn
        isSubmitting={formState.isSubmitting}
        disabled={!formState.isValid || formState.isSubmitting}
        variant="secondary"
        size="lg"
        className="mt-4 rounded-none"
      >
        Submit
      </LoadingBtn>
    </form>
  );
}
