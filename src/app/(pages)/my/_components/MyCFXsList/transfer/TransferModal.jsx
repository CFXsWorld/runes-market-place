'use client';

import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { forwardRef } from 'react';
import usePromiseLoading from '@/app/hooks/usePromiseLoading';
import { LoadingIcon } from '@/app/components/icons';
import useTransfer from '@/app/(pages)/my/_components/MyCFXsList/transfer/useTransfer';

const TransferModal = forwardRef(({ selected, onOpen, open, reload }, ref) => {
  const { transfer, address, setAddress, isValid } = useTransfer({
    reload,
    selected,
    onOpen,
  });

  const { trigger, loading } = usePromiseLoading(transfer);
  return (
    <Modal show={open} onClose={() => onOpen(false)}>
      <Modal.Header>Transfer Items</Modal.Header>
      <Modal.Body>
        <div className="px-6 pb-6 flex flex-col">
          <div className="flex flex-col gap-[8px]">
            <div className="flex justify-between">
              <Label
                htmlFor="price"
                value="Set a address"
                className="text-tc-secondary"
              />
            </div>
            <TextInput
              id="price"
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              placeholder="Destination address e.g 0x1234...1234"
              required
              color="primary"
            />
            <Button
              color="primary"
              className="mt-[24px] w-full"
              disabled={!selected || loading || !isValid}
              onClick={() => {
                trigger();
              }}
            >
              {loading ? (
                <LoadingIcon />
              ) : (
                `TRANSFER ${selected?.length || 0} CFXs`
              )}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
});

export default TransferModal;
