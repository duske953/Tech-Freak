import { useForm, UseFormProps } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ObjectSchema, InferType } from 'yup';

export default function useFormHandlers<TSchema extends ObjectSchema<any>>(
  schema: TSchema,
  options?: UseFormProps<InferType<TSchema>>
) {
  const { register, handleSubmit, watch, reset, formState } = useForm<
    InferType<TSchema>
  >({
    resolver: yupResolver(schema),
    ...options,
  });

  return { formState, register, handleSubmit, watch, reset };
}
