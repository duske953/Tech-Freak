'use client';
import FieldInput from '../../components/FieldInput';
import { InferType, object, ref, string } from 'yup';
import { toast } from 'sonner';
import useFormHandlers from '@/app/hook/useFormHandler';
import revalidate from '@/app/utils/revalidate';
import tryCatchPost from '@/app/utils/tryCatch';
import LoadingBtn from '@/app/components/LoadingBtn';

const signupSchema = object({
  fullName: string()
    .required('Your name is required')
    .min(4, 'Your name must be at least 4 chars')
    .max(256, 'Your name is too long'),
  email: string()
    .required('Your email address is required')
    .email('Email is Invalid')
    .max(256, 'Your email is too long')
    .lowercase(),
  password: string()
    .required('Your password is required')
    .min(8, 'Your password is to short')
    .max(100, 'Your password is too long'),

  confirmPassword: string()
    .oneOf([ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export default function Signup() {
  const { register, handleSubmit, formState } = useFormHandlers(signupSchema);
  async function renderOnSubmit(data: InferType<typeof signupSchema>) {
    const [response, err] = await tryCatchPost('users/signup', 'post', data);

    if (!response) {
      toast.error(err.message, { position: 'top-right', id: 'signup' });
      return;
    }

    toast.success('Account created successfully', {
      position: 'top-right',
      id: 'signup',
    });
    revalidate('/account');
  }
  return (
    <form
      onSubmit={handleSubmit(renderOnSubmit)}
      className="flex flex-col gap-9"
    >
      <FieldInput
        placeholder="Full name"
        errors={formState.errors}
        register={register}
        field="fullName"
        type="text"
      />

      <FieldInput
        placeholder="Email address"
        errors={formState.errors}
        register={register}
        field="email"
        type="email"
      />

      <FieldInput
        placeholder="Password"
        errors={formState.errors}
        register={register}
        field="password"
        type="password"
      />

      <FieldInput
        placeholder="Confirm password"
        errors={formState.errors}
        register={register}
        field="confirmPassword"
        type="password"
      />
      <LoadingBtn
        type="submit"
        isSubmitting={formState.isSubmitting}
        disabled={!formState.isValid || formState.isSubmitting}
        variant="secondary"
        className="cursor-pointer"
      >
        Sign up
      </LoadingBtn>
    </form>
  );
}
