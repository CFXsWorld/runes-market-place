'use client';

import { Button, Datepicker, Label, Modal, TextInput } from 'flowbite-react';
import { forwardRef } from 'react';
import usePromiseLoading from '@/app/hooks/usePromiseLoading';
import { LoadingIcon, UsdtIcon } from '@/app/components/icons';
import { formatNumberWithCommas } from '@/app/utils';
import Checkbox from '@/app/components/ui/Checkbox';
import useBatchListing from '@/app/(pages)/my/_components/MyCFXsList/listing/useBatchListing';
import { cn } from '@/app/utils/classnames';

const BatchListingModal = forwardRef(
  ({ reload, onOpen, open, selected }, ref) => {
    const {
      duration,
      setDuration,
      durationHours,
      dateFormate,
      isValid,
      listing,
      calcEarning,
      onSameChange,
      setPrices,
      prices,
      isSamePrice,
      equalize,
      isPrice,
      totalPricesMap,
      totalPrice,
    } = useBatchListing({ selected, reload, onOpen });

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
            <div className="flex-center-between">
              <span className="text-[14px] text-tc-secondary">
                List {selected?.length || 0} items
              </span>
              <Checkbox
                onChange={onSameChange}
                value={isSamePrice}
                className="text-tc-secondary text-[12px]"
              >
                Same price
              </Checkbox>
            </div>
            <div className="max-h-[300px] overflow-y-auto p-[20px] bg-fill-e-primary mb-[24px] flex flex-col gap-[10px] rounded-[8px] mt-[5px]">
              <div className="flex justify-between">
                <p className="">Set unit price</p>
              </div>
              {(selected || []).map((item) => (
                <div key={item.id}>
                  <div className="flex flex-col gap-[8px]">
                    <div className="flex-center-between mt-[10px]">
                      <span className="text-tc-secondary">#{item.id}</span>
                      <span className={cn('font-medium')}>
                        {formatNumberWithCommas(item?.amount || 0)}
                      </span>
                    </div>
                    <TextInput
                      id="price"
                      type="text"
                      rightIcon={() => (
                        <div className="flex-center gap-[8px]">
                          <UsdtIcon className="text-[20px]" />
                          <span className="text-[12px]">USDT</span>
                        </div>
                      )}
                      value={prices[item.id]}
                      onChange={(e) => {
                        if (
                          /^\d+(\.\d*)?$/g.test(e.target.value) ||
                          !e.target.value
                        ) {
                          if (isSamePrice) {
                            setPrices(equalize(e.target.value));
                          } else {
                            setPrices({ ...prices, [item.id]: e.target.value });
                          }
                        }
                      }}
                      placeholder="0.00"
                      required
                      color="primary"
                    />
                  </div>
                  <div className="flex-center-between mt-[10px]">
                    <span className="text-tc-secondary">Total price</span>
                    <span className={cn('text-theme font-medium')}>
                      {formatNumberWithCommas(
                        (totalPricesMap[item.id] || 0).toFixed(4)
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-[8px] mt-[5px]">
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
              <span className="text-tc-secondary font-medium">
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
              disabled={!selected?.length || loading || !isValid}
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

export default BatchListingModal;
