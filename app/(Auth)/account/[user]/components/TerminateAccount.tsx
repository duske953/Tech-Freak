'use client';

import FieldInput from '@/app/components/FieldInput';
import LoadingBtn from '@/app/components/LoadingBtn';
import useFormHandlers from '@/app/hook/useFormHandler';
import { clearJwtCookie } from '@/app/utils/cookies';
import revalidate from '@/app/utils/revalidate';
import { toastError, toastSuccess } from '@/app/utils/toast';
import tryCatchPost from '@/app/utils/tryCatch';
import { InferType, object, string } from 'yup';
const updateAcoountSchema = object({
  email: string()
    .required('Your email is required')
    .email('Your email is invalid')
    .max(100, 'Email is too long')
    .lowercase(),
  password: string().required('Your password is required'),
});
export default function TerminateAccount() {
  const { register, handleSubmit, formState } =
    useFormHandlers(updateAcoountSchema);

  async function renderTerminateAccount(
    value: InferType<typeof updateAcoountSchema>
  ) {
    const [response, err] = await tryCatchPost(
      'users/delete-account',
      'delete',
      {
        Email: value.email,
        Password: value.password,
      }
    );
    if (!response) {
      toastError(err, 'terminate-account');
      return;
    }
    clearJwtCookie();
    toastSuccess('Your account has been closed', 'terminate-account');
    revalidate('/account[user]/terminate-account');
  }

  return (
    <form
      onSubmit={handleSubmit(renderTerminateAccount)}
      className="flex flex-col gap-9"
    >
      <FieldInput
        placeholder="Your email"
        type="email"
        errors={formState.errors}
        field="email"
        register={register}
      />
      <FieldInput
        placeholder="Your password"
        type="password"
        errors={formState.errors}
        field="password"
        register={register}
      />

      <LoadingBtn
        isSubmitting={formState.isSubmitting}
        disabled={!formState.isValid || formState.isSubmitting}
        variant="secondary"
        className="cursor-pointer bg-red-600 hover:bg-red-500"
      >
        Terminate
      </LoadingBtn>
    </form>
  );
}
