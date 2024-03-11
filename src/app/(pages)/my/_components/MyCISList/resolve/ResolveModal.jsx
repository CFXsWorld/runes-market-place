'use client';

import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { forwardRef } from 'react';
import usePromiseLoading from '@/app/hooks/usePromiseLoading';
import { CircleRightIcon, LoadingIcon } from '@/app/components/icons';
import useResolve from './useResolve';

const ResolveModal = forwardRef(({ onOpen, open, reload, item }, ref) => {
  const { resolve, address, setAddress, isValid, account } = useResolve({
    reload,
    onOpen,
    item,
  });

  const { trigger, loading, setLoading } = usePromiseLoading(resolve);
  return (
    <Modal
      show={open}
      onClose={() => {
        onOpen(false);
        setLoading(false);
      }}
    >
      <Modal.Header>Resolve address</Modal.Header>
      <Modal.Body>
        <div className="px-6 pb-6 flex flex-col  bg-fill-e-secondary ">
          <div className="flex flex-col gap-[8px]">
            <div className="flex flex-col gap-[5px]">
              <Label
                htmlFor="address"
                value="Address"
                className="text-tc-secondary"
              />
              <div className="flex justify-between gap-[10px]">
                <div className="flex-1">
                  <TextInput
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    placeholder="Destination address e.g 0x1234...1234"
                    required
                    color="primary"
                  />
                </div>

                <Button
                  color="outline"
                  className="h-[48px] min-h-[36px] px-[8px] text-[14px] font-normal rounded-[4px]"
                  onClick={() => {
                    setAddress(account || null);
                  }}
                >
                  <span className="max-sm:text-[12px] line-clamp-1 pr-[10px]">
                    My Address
                  </span>
                  <CircleRightIcon />
                </Button>
              </div>
              <p className="text-tc-secondary text-[12px]">
                Resolve address is simply where your name points to and is
                determined by the Address record set on your CIS name.
              </p>
            </div>
            <Button
              color="primary"
              className="mt-[24px] w-full"
              disabled={!item || loading || !isValid}
              onClick={() => {
                trigger();
              }}
            >
              {loading ? <LoadingIcon /> : `CONFIRM`}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
});

export default ResolveModal;
