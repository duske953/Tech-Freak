'use client';

import FieldInput from '@/app/components/FieldInput';
import LoadingBtn from '@/app/components/LoadingBtn';
import useFormHandlers from '@/app/hook/useFormHandler';
import revalidate from '@/app/utils/revalidate';
import { toastError, toastSuccess } from '@/app/utils/toast';
import tryCatchPost from '@/app/utils/tryCatch';
import { InferType, object, string } from 'yup';
const updateAcoountSchema = object({
  name: string().min(3).max(100, 'name is too long'),
  email: string()
    .email('Your email is invalid')
    .min(3)
    .max(100, 'Email is too long')
    .lowercase(),
});
export default function UpdateAccountInfo({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const { register, handleSubmit, watch, formState } = useFormHandlers(
    updateAcoountSchema,
    {
      defaultValues: { name, email },
    }
  );

  async function renderUpdateAccountInfo(
    value: InferType<typeof updateAcoountSchema>
  ) {
    const [response, err] = await tryCatchPost(
      'users/update-account-info',
      'post',
      {
        Name: value.name,
        Email: value.email,
      }
    );
    if (!response) {
      toastError(err, 'update-account-info');
      return;
    }
    toastSuccess('Details changed', 'update-account-info');
    revalidate('/account[user]/account-info');
  }

  return (
    <form
      onSubmit={handleSubmit(renderUpdateAccountInfo)}
      className="flex flex-col gap-9"
    >
      <FieldInput
        placeholder="Your name"
        type="text"
        errors={formState.errors}
        field="name"
        register={register}
      />
      <FieldInput
        placeholder="Your email"
        type="email"
        errors={formState.errors}
        field="email"
        register={register}
      />

      <LoadingBtn
        isSubmitting={formState.isSubmitting}
        disabled={
          !formState.isValid ||
          formState.isSubmitting ||
          (name.toLocaleLowerCase().trim() ===
            watch('name')?.toLowerCase().trim() &&
            email.toLocaleLowerCase().trim() ===
              watch('email')?.toLowerCase().trim())
        }
        variant="secondary"
        className="cursor-pointer"
      >
        Update Details
      </LoadingBtn>
    </form>
  );
}
