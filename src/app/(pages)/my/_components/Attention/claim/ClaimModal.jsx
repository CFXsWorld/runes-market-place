'use client';

import { Button, Modal } from 'flowbite-react';
import { forwardRef } from 'react';
import usePromiseLoading from '@/app/hooks/usePromiseLoading';
import { LoadingIcon, Refresh2Icon } from '@/app/components/icons';
import useClaim from '@/app/(pages)/my/_components/Attention/claim/useClaim';
import { formatNumberWithCommas } from '@/app/utils';
import Checkbox from '@/app/components/ui/Checkbox';

const ClaimModal = forwardRef(({ onOpen, open }, ref) => {
  const { claim } = useClaim();
  const { trigger, loading } = usePromiseLoading(claim);
  return (
    <Modal show={open} onClose={() => onOpen(false)}>
      <Modal.Header>Check Claimable CFXs</Modal.Header>
      <Modal.Body>
        <div className="px-6  pb-6 flex flex-col">
          <div className="flex-center-between mb-[12px]">
            <span className="text-tc-secondary">Old World CFXs</span>
            <span className="text-white font-medium">
              {formatNumberWithCommas('200000')}
            </span>
          </div>
          <div className="flex-center-between mt-[12px]">
            <div className="flex-center">
              <span className="text-tc-secondary">
                Claimable: <span className="text-white"> 1,000,000</span>
              </span>
              <Refresh2Icon className='text-theme ml-[10px] cursor-pointer hover:opacity-95'/>
            </div>
            <Checkbox
              // onChange={onChange}
              className="text-tc-secondary max-md:text-[12px] max-md:mr-[16px]"
            >
              Select All
            </Checkbox>
          </div>
          <div className="h-[400px] overflow-y-auto"></div>
          <div>
            <Button
              color="primary"
              className="btn btn-primary w-full"
              // disabled={!selected || loading}
              onClick={() => {
                trigger();
              }}
            >
              {loading ? <LoadingIcon /> : 'CLAIM'}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
});

export default ClaimModal;
