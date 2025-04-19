import { Input } from './ui/input';

interface FieldInputTypes {
  register: any;
  errors: any;
  field: string;
  type: string;
  placeholder: string;
}

export default function FieldInput({
  register,
  field,
  errors,
  placeholder,
  type,
}: FieldInputTypes) {
  return (
    <div className="relative">
      <Input {...register(field)} placeholder={placeholder} type={type} />
      {errors[field] && (
        <span className="absolute right-0 text-red-800 font-bold text-xs">
          {errors[field]?.message}
        </span>
      )}
    </div>
  );
}
