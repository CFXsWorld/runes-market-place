'use client';

import { Button, Datepicker, Label, Modal, TextInput } from 'flowbite-react';
import { forwardRef } from 'react';
import usePromiseLoading from '@/app/hooks/usePromiseLoading';
import { LoadingIcon, UsdtIcon } from '@/app/components/icons';
import { formatNumberWithCommas } from '@/app/utils';
import useListing from '@/app/(pages)/my/_components/MyCFXsList/listing/useListing';
import { cn } from '@/app/utils/classnames';

const ListingModal = forwardRef(
  ({ reload, listingOrder, onOpen, open }, ref) => {
    const {
      price,
      setPrice,
      duration,
      setDuration,
      durationHours,
      dateFormate,
      isValid,
      listing,
      calcEarning,
      isPrice,
      totalPrice,
    } = useListing({ listingOrder, reload, onOpen });

    const { trigger, loading, setLoading } = usePromiseLoading(listing);

    return (
      <Modal
        show={open}
        onClose={() => {
          onOpen(false);
          setLoading(false);
        }}
      >
        <Modal.Header>Quick List</Modal.Header>
        <Modal.Body>
          <div className="px-6 pb-3 flex flex-col  bg-fill-e-secondary ">
            <div className="flex flex-col gap-[8px]">
              <div className="flex justify-between">
                <p className="text-tc-secondary">Set unit price</p>
              </div>
              <div className="flex-center-between mt-[10px]">
                <span className="text-tc-secondary">#{listingOrder?.id}</span>
                <span className={cn('font-medium')}>
                  {formatNumberWithCommas(listingOrder?.amount || 0)}
                </span>
              </div>
              <TextInput
                type="text"
                rightIcon={() => (
                  <div className="flex-center gap-[8px]">
                    <UsdtIcon className="text-[20px]" />
                    <span className="text-[12px]">USDT</span>
                  </div>
                )}
                value={price}
                onChange={(e) => {
                  if (
                    /^\d+(\.\d*)?$/g.test(e.target.value) ||
                    !e.target.value
                  ) {
                    setPrice(e.target.value);
                  }
                }}
                placeholder="0.00"
                required
                color="primary"
              />
            </div>
            <div className="flex-center-between mt-[10px]">
              <span className="text-tc-secondary">Total price</span>
              <span
                className={cn('text-theme font-medium', {
                  'text-red-500': price && !isPrice(price),
                })}
              >
                {formatNumberWithCommas(totalPrice.toFixed(4))}
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
            <div className="flex-center-between mt-[10px]">
              <span className="text-tc-secondary">Locked</span>
              <span className="text-theme font-medium">{durationHours} h</span>
            </div>

            <div className="flex-center-between mt-[24px]">
              <span className="text-tc-secondary">Sale price</span>
              <span className="text-white font-medium">
                {formatNumberWithCommas(totalPrice.toFixed(4))} USDT
              </span>
            </div>
            <div className="flex-center-between mt-[10px]">
              <span className="text-tc-secondary">Market fee</span>
              <span className="text-tc-secondary font-medium line-through">
                0.3%
              </span>
            </div>
            <div className="flex-center-between mt-[10px]">
              <span className="text-tc-secondary">
                Total potential earnings
              </span>
              <span className="text-white font-medium">
                {formatNumberWithCommas(calcEarning.toFixed(4))} USDT
              </span>
            </div>
            <Button
              color="primary"
              className="btn btn-primary w-full mt-[24px]"
              disabled={!listingOrder || loading || !isValid}
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
