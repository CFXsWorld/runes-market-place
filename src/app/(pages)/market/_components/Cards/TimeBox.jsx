import { EyeIcon, TimeIcon } from '@/app/components/icons';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const TimeBox = ({ item }) => {
  const params = useParams();
  return (
    <div className="flex justify-between items-center">
      <div className="inline-block text-tc-secondary bg-fill-e-secondary w-auto p-[4px] rounded-[2px]">
        <div className="flex-center">
          <TimeIcon className="text-[12px] mr-[4px]" />
          <span className="text-[12px] line-clamp-1">
            {item.locktime
              ? dayjs.unix(item.locktime).format('MM-DD HH:mm')
              : '-'}
          </span>
        </div>
      </div>
      {item.regmarket !== 0 && (
        <Link
          href={`/market/${params.type}/${item.id}`}
          className="bg-black p-[2] rounded-[4px] w-[24px] h-[24px] flex-center"
          onClick={(e)=>{
            e.stopPropagation()
          }}
        >
          <EyeIcon />
        </Link>
      )}
    </div>
  );
};

export default TimeBox;
