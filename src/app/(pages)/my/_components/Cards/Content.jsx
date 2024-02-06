'use client';

import { MergeIcon, FragmentIcon, EyeIcon } from '@/app/components/icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';


const GeneralContent = ({ item }) => {
  const isMerge = item.amount > 1;
  return (
    <div className="p-[16px] max-sm:p-[10px]">
      <div className="flex-center-between">
        <div className="text-theme flex items-center">
          <span className="text-[24px] mr-[8px] max-sm:text-[14px]">
            {!isMerge ? <FragmentIcon /> : <MergeIcon />}
          </span>
          <span className="max-sm:text-[12px]">CFXs</span>
        </div>
        <span className="text-tc-secondary">#{item.id}</span>
      </div>
      <div className="my-[16px] flex flex-col justify-center items-center max-sm:my-[12px]">
        <span className="text-[24px] font-[500]">{item.amount}</span>
      </div>
    </div>
  );
};
const ImageContent = ({ item }) => {
  const isMerge = item.amount > 1;
  const params = useParams();
  return (
    <div
      className="p-[5px] max-sm:p-[4px] relative h-[170px] bg-no-repeat bg-contain bg-center"
      style={{ backgroundImage: `url(${item.data})` }}
    >
      <div className="relative z-[3] h-full flex flex-col justify-between">
        <div className="flex-center-between z-[2]">
          <div className="text-theme flex items-center">
            <span className="text-[14px] mr-[8px] max-sm:text-[14px] bg-black w-[24px] h-[24px] rounded-[12px] flex-center text-white">
              {isMerge ? <FragmentIcon /> : <MergeIcon />}
            </span>
          </div>
          <span className="text-[12px] bg-black px-[4px] rounded-[4px] flex-center">
            x{item.amount}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="inline-block text-tc-secondary bg-black w-auto p-[1px] rounded-[4px] text-[12px]">
            <div className="flex-center"># {item.id}</div>
          </div>
          <Link
            href={`/my/${params.type}/${item.id}`}
            className="bg-black p-[2] rounded-[4px] w-[24px] h-[24px] flex-center"
            onClick={(e)=>{
              e.stopPropagation()
            }}
          >
            <EyeIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};
const TextContent = ({ item }) => {
  const isMerge = item.amount > 1;
  const params = useParams();
  return (
    <div className="p-[5px] max-sm:p-[4px] relative h-[170px]">
      <div className="relative z-[3] h-full flex flex-col justify-between">
        <div className="flex-center-between z-[2]">
          <div className="text-theme flex items-center">
            <span className="text-[14px] mr-[8px] max-sm:text-[14px] bg-black w-[24px] h-[24px] rounded-[12px] flex-center text-white">
              {isMerge ? <FragmentIcon /> : <MergeIcon />}
            </span>
          </div>
          <span className="text-[12px] bg-black px-[4px] rounded-[4px] flex-center">
            x{item.amount}
          </span>
        </div>
        <div className="flex-1 flex-center gap-[10px] text-[12px]">
          <pre>{JSON.stringify(item.data, null, '\t')}</pre>
        </div>
        <div className="flex justify-between items-center">
          <div className="inline-block text-tc-secondary bg-black w-auto p-[1px] rounded-[4px] text-[12px]">
            <div className="flex-center"># {item.id}</div>
          </div>
          <Link
            href={`/my/${params.type}/${item.id}`}
            className="bg-black p-[2] rounded-[4px] w-[24px] h-[24px] flex-center"
            onClick={(e)=>{
              e.stopPropagation()
            }}
          >
            <EyeIcon />
          </Link>
        </div>
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
