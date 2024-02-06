'use client';

import { MergeIcon, FragmentIcon } from '@/app/components/icons';
import Image from 'next/image';
import TimeBox from '@/app/(pages)/market/_components/Cards/TimeBox';

const GeneralContent = ({ item }) => {
  return (
    <div className="p-[16px] max-sm:p-[10px]">
      <div className="flex-center-between">
        <div className="text-theme flex items-center">
          <span className="text-[24px] mr-[8px] max-sm:text-[14px]">
            {item.quantity === '1' ? <FragmentIcon /> : <MergeIcon />}
          </span>
          <span className="max-sm:text-[12px]">CFXs</span>
        </div>
      </div>
      <div className="my-[16px] flex flex-col justify-center items-center max-sm:my-[12px]">
        <span className="text-[24px] font-[500]">{item.quantity}</span>
        <div className="mt-[4px] text-[14px] text-tc-secondary">
          <span className="text-theme">
            ${Number(item.unitprice).toFixed(4)}
          </span>
          <span className="px-[4px]">/</span>
          <span>CFXs</span>
        </div>
      </div>
      <TimeBox item={item} />
    </div>
  );
};

const ImageContent = ({ item }) => {
  return (
    <div
      className="p-[5px] max-sm:p-[4px] relative h-[170px] bg-no-repeat bg-contain bg-center"
      style={{ backgroundImage: `url(${item.data})` }}
    >
      <div className="relative z-[3] h-full flex flex-col justify-between">
        <div className="flex-center-between z-[2]">
          <div className="text-theme flex items-center">
            <span className="text-[14px] mr-[8px] max-sm:text-[14px] bg-black w-[24px] h-[24px] rounded-[12px] flex-center text-white">
              {item.quantity === '1' ? <FragmentIcon /> : <MergeIcon />}
            </span>
          </div>
          <span className="text-[12px] bg-black px-[4px] rounded-[4px] flex-center">
            x{item.quantity}
          </span>
        </div>
        <TimeBox item={item} />
      </div>
    </div>
  );
};

const TextContent = ({ item }) => {
  return (
    <div className="p-[5px] max-sm:p-[4px] relative h-[170px]">
      <div className="relative z-[3] h-full flex flex-col justify-between">
        <div className="flex-center-between z-[2]">
          <div className="text-theme flex items-center">
            <span className="text-[14px] mr-[8px] max-sm:text-[14px] bg-black w-[24px] h-[24px] rounded-[12px] flex-center text-white">
              {item.quantity === '1' ? <FragmentIcon /> : <MergeIcon />}
            </span>
          </div>
          <span className="text-[12px] bg-black px-[4px] rounded-[4px] flex-center">
            x{item.quantity}
          </span>
        </div>
        <div className="flex-1 flex-center gap-[10px] text-[12px]">
          <pre className="break-all whitespace-break-spaces">
            {JSON.stringify(item.data, null, '\t')}
          </pre>
        </div>
        <TimeBox item={item} />
      </div>
    </div>
  );
};

const Content = ({ item }) => {
  if (item.regmarket === 1) {
    return <ImageContent item={item} />;
  }
  if (item.regmarket === 3 || item.regmarket === 4) {
    return <TextContent item={item} />;
  }
  return <GeneralContent item={item} />;
};

export default Content;
