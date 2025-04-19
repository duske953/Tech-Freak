'use client';
import FieldInput from '@/app/components/FieldInput';
import { Button } from '@/app/components/ui/button';
import useFormHandlers from '@/app/hook/useFormHandler';
import { clearJwtCookie } from '@/app/utils/cookies';
import revalidate from '@/app/utils/revalidate';
import { toastError, toastSuccess } from '@/app/utils/toast';
import tryCatchPost from '@/app/utils/tryCatch';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { InferType, object, ref, string } from 'yup';

const resetPasswordSchema = object({
  password: string()
    .required('Your password is required')
    .min(8, 'Your password is to short')
    .max(100, 'Your password is too long'),

  confirmPassword: string()
    .oneOf([ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export default function ResetPassword({ token }: { token: string }) {
  const { register, handleSubmit, formState } =
    useFormHandlers(resetPasswordSchema);
  const router = useRouter();
  async function renderResetPassword(
    value: InferType<typeof resetPasswordSchema>
  ) {
    const [response, err] = await tryCatchPost('users/reset-password', 'post', {
      password: value.password,
      confirmPassword: value.confirmPassword,
      token,
    });

    if (!response) {
      toastError(err, 'reset-password');
      toast.error(err, { position: 'top-right', id: 'reset-password' });
      return;
    }
    clearJwtCookie();
    toastSuccess('Password reset success', 'reset-password', 5000);

    revalidate('/reset-password');
    router.replace('/account');
  }
  return (
    <form
      className="flex flex-col gap-9"
      onSubmit={handleSubmit(renderResetPassword)}
    >
      <FieldInput
        placeholder="Password"
        type="password"
        errors={formState.errors}
        field="password"
        register={register}
      />

      <FieldInput
        placeholder="confirm password"
        type="password"
        errors={formState.errors}
        field="confirmPassword"
        register={register}
      />
      <Button
        disabled={!formState.isValid || formState.isSubmitting}
        variant="secondary"
        className="cursor-pointer"
      >
        Reset password
      </Button>
    </form>
  );
}
