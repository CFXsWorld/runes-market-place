'use client';

import { ArrowLeftIcon, UsdtIcon } from '@/app/components/icons';
import { addressFormat } from '@/app/utils';
import { tabs } from '@/app/(pages)/market/[type]/page';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

export default function CFXsDetail({ item = {} }) {
  const typeName = useMemo(() => {
    return tabs.find((i) => i.value === item.regmarket)?.name || '';
  }, [item]);

  const router = useRouter();
  const renderContent = () => {
    if (item.regmarket === 1) {
      return (
        <div className="p-[5px] max-sm:p-[4px]  md:w-[500px] md:h-[500px] max-md:w-screen max-md:h-[100vw] flex-center">
          <div
            className="bg-no-repeat bg-contain flex-1 w-full h-full  bg-center"
            style={{ backgroundImage: `url(${item.data})` }}
          ></div>
        </div>
      );
    }

    return (
      <div className="w-[500px] h-[500px] bg-fill-e-secondary flex-center">
        <div className="flex-1 flex-center gap-[10px] text-[12px]">
          <pre>{JSON.stringify(item.data, null, '\t')}</pre>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-[24px] w-full">
      <div className="flex justify-center gap-[40px] max-md:flex-col">
        <div className="flex flex-col max-w-[500px] md:px-[20px] flex-1">
          <div className="flex items-center gap-[20px] mb-[20px]">
            <ArrowLeftIcon
              className="cursor-pointer"
              onClick={() => {
                router.back();
              }}
            />
            Detail
          </div>
          <div className="max-w-[600px] w-full relative flex-1 flex md:hidden">
            {renderContent()}
          </div>
          <p className="md:text-[40px] font-bold"># {item.id}</p>
          <p className="text-tc-secondary my-[10px]">
            Owner by
            <span className="text-tc-primary">
              {addressFormat(item.chainto)}
            </span>
          </p>
          <p className="text-[16px] font-medium flex items-center my-[10px]">
            <UsdtIcon className="text-[20px] mr-[4px] max-sm:text-[12px]" />
            {parseFloat(item.amount).toFixed(3)}
          </p>
          {/*<Button*/}
          {/*  color="primary"*/}
          {/*  className="w-[200px]"*/}
          {/*  disabled={loading}*/}
          {/*  onClick={(e) => {*/}
          {/*    e.stopPropagation();*/}
          {/*    // trigger(item);*/}
          {/*  }}*/}
          {/*>*/}
          {/*  {loading ? (*/}
          {/*    <LoadingIcon />*/}
          {/*  ) : (*/}
          {/*    <span className="line-clamp-1">Buy Now</span>*/}
          {/*  )}*/}
          {/*</Button>*/}
          <div className="mt-[20px]">
            <p className="font-bold">Info</p>
            <div className="flex-center-between mt-[10px]">
              <span className="text-tc-secondary">Slot</span>
              <span>1</span>
            </div>
            <div className="flex-center-between mt-[10px]">
              <span className="text-tc-secondary">Balance</span>
              <span>{item.quantity}</span>
            </div>
            <div className="flex-center-between mt-[10px]">
              <span className="text-tc-secondary">Content Type</span>
              <span>{typeName}</span>
            </div>
            <p className="font-bold mt-[20px] mb-[10px]">Content</p>

            <div className="break-all whitespace-wrap text-tc-secondary text-[14px] max-h-[400px] overflow-y-auto">
              {item.data}
            </div>
          </div>
        </div>
        <div className="max-w-[600px] w-full relative flex-1 flex max-md:hidden">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
