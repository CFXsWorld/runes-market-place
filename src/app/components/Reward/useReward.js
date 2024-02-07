import RedEnv from './redenv.json';
import useWallet from '@/app/hooks/useWallet';
import { useWalletStore } from '@/app/store/wallet';
import { Contract, formatUnits, getAddress } from 'ethers';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
const rpc = 'https://conflux-espace.rpc.thirdweb.com';
const address = '';

const useReward = () => {
  const [count, setCount] = useState(0);
  const { browserProvider } = useWallet();
  const [status, setStatus] = useState('opening');
  const [amount, setAmount] = useState(0);
  const account = useWalletStore((state) => state.account);
  const [openLoading, setOpenLoading] = useState(false);

  const getRemainCount = async () => {
    if (account) {
      try {
        const RedContract = new Contract(
          RedEnv.address,
          RedEnv.abi,
          browserProvider
        );
        const signer = await browserProvider.getSigner();
        const contractWithSigner = RedContract.connect(signer);
        const data = await contractWithSigner.getYourRemainTimes(
          getAddress(account)
        );
        setCount(data + '');
        if (data == 0) {
          setStatus('closed');
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (account && browserProvider) {
      getRemainCount();
    }
  }, [account, browserProvider]);

  useEffect(() => {
    if (account) {
      setStatus('opening');
      setAmount(0);
    }
  }, [account]);

  const openReward = async () => {
    if (account) {
      try {
        setOpenLoading(true);
        const RedContract = new Contract(
          RedEnv.address,
          RedEnv.abi,
          browserProvider
        );
        const signer = await browserProvider.getSigner();
        const contractWithSigner = RedContract.connect(signer);
        const tx = await contractWithSigner.receiveRed();
        const receipt = await tx.wait();
        console.log(
          'received',
          formatUnits(BigInt(receipt.logs?.[1]?.args?.[1]))
        );
        const amount = formatUnits(BigInt(receipt.logs?.[1]?.args?.[1]));
        setAmount(amount);
        setStatus('opened');
        setCount((prev) => Number(prev) - 1);
      } catch (e) {
        console.log(e);
        toast.error('未开始！');
      } finally {
        setOpenLoading(false);
      }
    }
  };

  return {
    openReward,
    count,
    openLoading,
    status,
    amount,
    setStatus,
  };
};

export default useReward;
