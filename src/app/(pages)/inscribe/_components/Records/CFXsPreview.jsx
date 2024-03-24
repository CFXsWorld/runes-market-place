'use client';

import { Modal } from 'flowbite-react';
import { forwardRef } from 'react';

const CFXsPreview = forwardRef(({ onOpen, open, item }, ref) => {
  return (
    <Modal show={open} onClose={() => onOpen(false)}>
      <Modal.Header>CFXs Inscribe</Modal.Header>
      <Modal.Body>
        <div className="h-[400px] w-full px-6  pb-6 flex flex-col  bg-fill-e-secondary flex-center">
          {item && (
            <div>
              {item.regmarket === 1 && (
                <img src={item.data} width={240} height={240} alt="" />
              )}
              {item.regmarket === 2 && <audio src={item.data} alt="" />}
              {item.regmarket === 3 && <span className='flex  overflow-hidden break-anywhere'>{item.data}</span>}
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
});

export default CFXsPreview;
