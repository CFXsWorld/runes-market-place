'use client';

import {  forwardRef } from 'react';
import { cn } from '@/app/utils/classnames';

const Modal =forwardRef( ({  outside = false, className, children },ref) => {

  return (
    <dialog className="modal sm:modal-middl" ref={ref}>
      <div className={cn('modal-box', className)}>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        {children}
      </div>
      {outside && (
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      )}
    </dialog>
  );
});

export default Modal;
