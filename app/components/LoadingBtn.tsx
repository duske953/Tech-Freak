import { VariantProps } from 'class-variance-authority';
import { Button, buttonVariants } from './ui/button';
import { Loader2 } from 'lucide-react';

type LoadingBtnProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

interface LoadingBtnTypes extends LoadingBtnProps {
  isSubmitting?: boolean;
  disalbed?: boolean;
  children: React.ReactNode;
}

export default function LoadingBtn({
  disabled = false,
  children,
  isSubmitting,
  ...props
}: LoadingBtnTypes) {
  return (
    <Button disabled={disabled} {...props}>
      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
