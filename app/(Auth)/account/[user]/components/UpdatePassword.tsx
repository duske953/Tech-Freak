'use client';
import FieldInput from '@/app/components/FieldInput';
import LoadingBtn from '@/app/components/LoadingBtn';
import useFormHandlers from '@/app/hook/useFormHandler';
import { toastError, toastSuccess } from '@/app/utils/toast';
import tryCatchPost from '@/app/utils/tryCatch';
import { InferType, object, ref, string } from 'yup';
const updatePasswordSchema = object({
  oldPassword: string()
    .required('Your password is required')
    .max(100, 'password is too long'),
  newPassword: string()
    .required('Your password is required')
    .min(8, 'Your password is to short')
    .max(100, 'Your password is too long'),
  confirmPassword: string()
    .oneOf([ref('newPassword')], 'Passwords must match')
    .required('Please confirm your password'),
});
export default function UpdatePassword() {
  const { register, handleSubmit, reset, formState } =
    useFormHandlers(updatePasswordSchema);

  async function renderUpdateAccountInfo(
    value: InferType<typeof updatePasswordSchema>
  ) {
    const [response, err] = await tryCatchPost(
      'users/update-password',
      'post',
      {
        oldPassword: value.oldPassword,
        newPassword: value.newPassword,
        passwordConfirm: value.confirmPassword,
      }
    );
    if (!response) {
      toastError(err, 'update-password');
      return;
    }
    toastSuccess('password updated', 'update-password');
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(renderUpdateAccountInfo)}
      className="flex flex-col gap-9"
    >
      <FieldInput
        placeholder="Old password"
        type="password"
        errors={formState.errors}
        field="oldPassword"
        register={register}
      />

      <FieldInput
        placeholder="New password"
        type="password"
        errors={formState.errors}
        field="newPassword"
        register={register}
      />
      <FieldInput
        placeholder="Confirm your password"
        type="password"
        errors={formState.errors}
        field="confirmPassword"
        register={register}
      />

      <LoadingBtn
        isSubmitting={formState.isSubmitting}
        disabled={!formState.isValid || formState.isSubmitting}
        variant="secondary"
        className="cursor-pointer"
      >
        Update Password
      </LoadingBtn>
    </form>
  );
}
