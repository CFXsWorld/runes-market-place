'use client';

import { Button, Datepicker, Label, Modal, TextInput } from 'flowbite-react';
import { forwardRef } from 'react';
import usePromiseLoading from '@/app/hooks/usePromiseLoading';
import { LoadingIcon, UsdtIcon } from '@/app/components/icons';
import { formatNumberWithCommas } from '@/app/utils';
import useListing from '@/app/(pages)/my/_components/MyCFXsList/listing/useListing';
import dayjs from 'dayjs';

const ListingModal = forwardRef(
  ({ purchaseOrder, onBuy, onOpen, open }, ref) => {
    const { trigger, loading } = usePromiseLoading(onBuy);
    const { price, setPrice, duration, setDuration, dateFormate } =
      useListing();
    return (
      <Modal show={open} onClose={() => onOpen(false)}>
        <Modal.Header>Quick List</Modal.Header>
        <Modal.Body>
          <div className="px-6 pb-3 flex flex-col">
            <div className="flex flex-col gap-[8px]">
              <Label
                htmlFor="price"
                value="Set a price"
                className="text-tc-secondary"
              />
              <TextInput
                id="price"
                type="text"
                rightIcon={() => (
                  <div className="flex-center gap-[8px]">
                    <UsdtIcon className="text-[20px]" />
                    <span className="text-[12px]">USDT</span>
                  </div>
                )}
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                placeholder="0.00"
                required
                color="primary"
              />
            </div>
            <div className="flex-center-between mt-[10px]">
              <span className="text-tc-secondary">#{purchaseOrder?.id}</span>
              <span className="text-theme font-medium">
                {/*{purchaseOrder?.a || 0}*/}
                {formatNumberWithCommas(1000)}
              </span>
            </div>
            <div className="flex flex-col gap-[8px] mt-[24px]">
              <Label
                htmlFor="duration"
                value="Duration"
                className="text-tc-secondary"
              />
              <Datepicker
                color="primary"
                type="text"
                value={dateFormate(duration)}
                minDate={new Date()}
                onSelectedDateChanged={(e) => {
                  setDuration(e);
                }}
              />
            </div>
            <div className="flex-center-between mt-[24px]">
              <span className="text-tc-secondary">Market fee</span>
              <span className="text-white font-medium">3%</span>
            </div>
            <div className="flex-center-between mt-[10px]">
              <span className="text-tc-secondary">Total potential earnings</span>
              <span className="text-white font-medium">1164.95 USDT</span>
            </div>
            <Button
              color="primary"
              className="btn btn-primary w-full mt-[24px]"
              disabled={!purchaseOrder || loading}
              onClick={() => {
                trigger();
              }}
            >
              {loading ? <LoadingIcon /> : 'COMPLETE LISTING'}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
);

export default ListingModal;
