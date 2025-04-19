import FieldInput from '@/app/components/FieldInput';
import LoadingBtn from '@/app/components/LoadingBtn';
import useFormHandlers from '@/app/hook/useFormHandler';
import { setCookie } from '@/app/utils/cookies';
import revalidate from '@/app/utils/revalidate';
import { toastError, toastSuccess } from '@/app/utils/toast';
import tryCatchPost from '@/app/utils/tryCatch';
import { InferType, object, string } from 'yup';

const loginSchema = object({
  email: string()
    .required('Your email is required')
    .email('Your email is invalid')
    .min(3)
    .max(100, 'Email is too long')
    .lowercase(),
  password: string()
    .required('Your password is required')
    .max(256, 'Password is too long'),
});

export default function Login() {
  const { register, handleSubmit, formState } = useFormHandlers(loginSchema);

  async function renderOnSubmit(data: InferType<typeof loginSchema>) {
    const [response, err] = await tryCatchPost('users/login', 'post', {
      Email: data.email,
      Password: data.password,
    });

    if (err) {
      toastError(err, 'login');
      return;
    }
    await setCookie(response.data.token);
    toastSuccess(`Welcome ${response.data.user.Name}`, 'login');
    revalidate('/account');
  }
  return (
    <form
      className="flex flex-col gap-9"
      onSubmit={handleSubmit(renderOnSubmit)}
    >
      <FieldInput
        placeholder="Email"
        type="email"
        errors={formState.errors}
        field="email"
        register={register}
      />
      <FieldInput
        placeholder="Password"
        type="password"
        errors={formState.errors}
        field="password"
        register={register}
      />
      <LoadingBtn
        isSubmitting={formState.isSubmitting}
        disabled={!formState.isValid || formState.isSubmitting}
        variant="secondary"
        className="cursor-pointer"
      >
        Login
      </LoadingBtn>
    </form>
  );
}
