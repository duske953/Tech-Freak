import { Ref } from 'react';
import { cn } from '../lib/utils';

export default function Overlay(props: {
  ref: Ref<HTMLDivElement> | undefined;
  renderClick: () => void;
  className: string;
}) {
  return (
    <div
      onClick={props.renderClick}
      ref={props.ref}
      className={cn(
        'fixed top-0 left-0 size-full bg-gray-900/90 cursor-pointer',
        props.className
      )}
    >
      &nbsp;
    </div>
  );
}
