'use client';

import { Button, Modal } from 'flowbite-react';
import { forwardRef } from 'react';
import usePromiseLoading from '@/app/hooks/usePromiseLoading';
import { LoadingIcon } from '@/app/components/icons';
import useSetName from './useSetName';
import { addressFormat } from '@/app/utils';

const SetNameModal = forwardRef(({ reload, item, onOpen, open }, ref) => {
  const { account, setName } = useSetName({ item, reload, onOpen });

  const { trigger, loading, setLoading } = usePromiseLoading(setName);

  return (
    <Modal
      show={open}
      onClose={() => {
        onOpen(false);
        setLoading(false);
      }}
    >
      <Modal.Header>Set the CIS name for your address</Modal.Header>
      <Modal.Body>
        <div className="px-6 pb-3 flex flex-col  bg-fill-e-secondary ">
          <div className="flex-center-between mt-[10px]">
            <span className="text-tc-secondary">Name</span>
            <span className="text-white font-medium">{item?.id}</span>
          </div>
          <div className="flex-center-between mt-[10px]">
            <span className="text-tc-secondary">Address</span>
            <span className="text-white font-medium">
              {addressFormat(account || '')}
            </span>
          </div>
          <p className="text-tc-secondary text-[12px]  mt-[40px]">
            The CIS name is your reverse record responsible for resolving your
            wallet address to your CIS name, effectively helping DApps or other
            supported services display your CIS name based on your wallet
            address.
          </p>
          <Button
            color="primary"
            className="btn btn-primary w-full mt-[24px]"
            disabled={!item || loading}
            onClick={() => {
              trigger();
            }}
          >
            {loading ? <LoadingIcon /> : 'COMPLETE'}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
});

export default SetNameModal;
