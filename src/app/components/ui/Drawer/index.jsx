'use client';

import { forwardRef } from 'react';
import { cn } from '@/app/utils/classnames';
import { Modal } from 'flowbite-react';

const Drawer = forwardRef(({ open, onOpen, className }, ref) => {
  return (
    <Modal show={open} onClose={() => onOpen(false)} ref={ref} dismissible>
      <Modal.Header>Connect a wallet</Modal.Header>
      <Modal.Body>
        <div className="pt-6  px-6 flex flex-col  bg-fill-e-secondary ">
          {items.map((item) => (
            <button
              key={item.type}
              onClick={() => connect(item.type)}
              className={cn(
                'px-[12px] btn w-full h-[60px] mb-[24px] rounded-[4px] bg-fill-e-primary border-none',
                'hover:bg-theme hover:opacity-80 text-white hover:btn-primary',
                'flex-center-between'
              )}
            >
              <span>{item.name}</span>
              {item.icon}
            </button>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
});

export default Drawer;
