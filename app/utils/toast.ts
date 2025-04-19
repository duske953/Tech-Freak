import { toast } from 'sonner';

export function toastSuccess(msg: string, id: string, duration: number = 4000) {
  return toast.success(msg, { position: 'top-right', id, duration });
}

export function toastError(msg: string, id: string, duration: number = 4000) {
  return toast.error(msg, { position: 'top-right', id, duration });
}
