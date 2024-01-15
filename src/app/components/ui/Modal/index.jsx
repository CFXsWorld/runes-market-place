'use client';

import { Button, Modal as OriginalMdal } from 'flowbite-react';

const Modal = ({
  children,
  cancelText = 'CANCEL',
  okText = 'CONFIRM',
  title,
  onCancel,
  onOk,
  dismissible = false,
}) => {
  return (
    <OriginalMdal
      show={open}
      onClose={() => onOpen(false)}
      dismissible={dismissible}
    >
      <OriginalMdal.Header>{title}</OriginalMdal.Header>
      <OriginalMdal.Body>
        <div className="p-6 flex flex-col">{children}</div>
      </OriginalMdal.Body>
      <OriginalMdal.Footer>
        <div className="flex gap-[12px]">
          {cancelText && (
            <Button color="outline" className="flex-1" onClick={onCancel}>
              {cancelText}
            </Button>
          )}
          <Button color="primary" className="flex-1" onClick={onOk}>
            {okText}
          </Button>
        </div>
      </OriginalMdal.Footer>
    </OriginalMdal>
  );
};

function renderModal(props) {}

export default Modal;
