'use client';

import { Modal } from 'flowbite-react';
import useRewardStore from '@/app/store/reward';
import { CloseIcon } from '@/app/components/icons';
import { useWalletStore } from '@/app/store/wallet';
import WithConnect from '@/app/components/Wallet/WithConnect';
import { toast } from 'react-toastify';
import { addressFormat } from '@/app/utils';
const RewardConnect = ({
  isConnected,
  isActive,
  account,
  isCorrectChain,
  switchChain,
  correctChainIdHex,
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
      <div className="ml-[5px] flex-center h-[44px] my-[32px] text-theme">
        {addressFormat(account)}
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
          <div
            className="w-[270px] h-[356px] bg-conver bg-center"
            style={{ backgroundImage: `url(/open.png)` }}
          >
            {/*12313*/}
          </div>

          <WithConnect>{(props) => <RewardConnect {...props} />}</WithConnect>

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
