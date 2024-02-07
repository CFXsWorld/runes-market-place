'use client';

import { Modal } from 'flowbite-react';
import useRewardStore from '@/app/store/reward';
import { CloseIcon, LoadingIcon } from '@/app/components/icons';
import { useWalletStore } from '@/app/store/wallet';
import WithConnect from '@/app/components/Wallet/WithConnect';
import { toast } from 'react-toastify';
import { addressFormat } from '@/app/utils';
import useReward from '@/app/components/Reward/useReward';
const RewardConnect = ({
  isConnected,
  isActive,
  account,
  isCorrectChain,
  switchChain,
  correctChainIdHex,
  count,
}) => {
  const onOpen = useWalletStore((state) => state.onOpen);
  const switchNetwork = async () => {
    try {
      if (!isCorrectChain) {
        await switchChain(correctChainIdHex);
      }
    } catch (switchError) {
      if (switchError.code === 4902) {
        toast.error('The chain has not been added to Wallet!');
      }
    }
  };

  if (isConnected && isActive) {
    if (!isCorrectChain) {
      return (
        <div
          className="w-full text-black bg-red-400 h-[44px] rounded-[22px] my-[32px] flex-center cursor-pointer"
          onClick={() => {
            switchNetwork();
          }}
        >
          SWITCH NETWORK
        </div>
      );
    }
    return (
      <div className="ml-[5px] flex items-center justify-center flex-col h-[44px] my-[32px] text-theme">
        <p>{addressFormat(account)}</p>
        <p className="text-[12px]">剩余 {count} 次</p>
      </div>
    );
  }

  return (
    <div
      className="w-full text-black bg-theme h-[44px] rounded-[22px] my-[32px] flex-center cursor-pointer"
      onClick={() => {
        onOpen(true);
      }}
    >
      链接钱包
    </div>
  );
};

const RewardModal = () => {
  const open = useRewardStore((state) => state.open);
  const onOpen = useRewardStore((state) => state.onOpen);
  const onOpenWallet = useWalletStore((state) => state.onOpen);
  const { count, status, openLoading, amount, openReward, setStatus } =
    useReward();

  const renderRedBg = () => {
    if (status === 'opened') {
      return (
        <>
          <div
            className="w-[270px] h-[356px] bg-conver bg-center cursor-pointer flex justify-center"
            style={{ backgroundImage: `url(/opened.png)` }}
          >
            <div>
              <p className="text-[#9F7D54] text-[66px] mt-[66px]">{amount}</p>
              <p className="text-[#9F7D54]  flex-center">CFXs</p>
            </div>
          </div>

          <div
            className="w-full text-black bg-theme h-[44px] rounded-[22px] my-[32px] flex-center cursor-pointer"
            onClick={() => {
              if (Number(count) > 0) {
                setStatus('opening');
                openReward();
              } else {
                setStatus('closed');
              }
            }}
          >
            {Number(count) > 0 ? '继续领取' : '开心收下'}
          </div>
        </>
      );
    }
    if (status === 'closed') {
      return (
        <div
          className="w-[270px] h-[356px] bg-conver bg-center cursor-pointer flex justify-center"
          style={{ backgroundImage: `url(/claimed.png)` }}
        >
          <p className="text-[#9F7D54] text-[24px] mt-[60px]">您已经领取过了</p>
        </div>
      );
    }
    return (
      <div
        className="w-[270px] h-[356px] bg-conver bg-center cursor-pointer flex-center"
        style={{ backgroundImage: `url(/open.png)` }}
        onClick={() => {
          openReward();
        }}
      >
        {openLoading && <LoadingIcon />}
      </div>
    );
  };
  return (
    <Modal
      show={open}
      onClose={() => {
        onOpen(false);
      }}
      size="sm"
    >
      <Modal.Body>
        <div className="">
          {renderRedBg()}

          <WithConnect>
            {(props) => <RewardConnect {...props} count={count} />}
          </WithConnect>

          <div className="flex-center">
            <span
              className="border border-white flex-center w-[30px] h-[30px] rounded-full cursor-pointer"
              onClick={() => {
                onOpen(false);
              }}
            >
              <CloseIcon />
            </span>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RewardModal;
