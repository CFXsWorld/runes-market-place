'use client';

import useRewardStore from '@/app/store/reward';

const RewardButton = () => {
  const onOpen = useRewardStore((state) => state.onOpen);
  return  null;
  // return (
  //   <div
  //     className="w-[88px] h-[116px] fixed right-[20px] md:top-[90px] bg-cover cursor-pointer max-md:bottom-[120px] max-md:w-[60px] max-md:h-[80px]"
  //     style={{ backgroundImage: `url(/open.png)` }}
  //     onClick={() => {
  //       onOpen(true);
  //     }}
  //   ></div>
  // );
};

export default RewardButton;
