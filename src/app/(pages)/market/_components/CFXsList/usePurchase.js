import { useMemo, useRef, useState } from 'react';
import useUSDTContract from '@/app/hooks/useUSDTContract';
import useWallet from '@/app/hooks/useWallet';
import useEnv from '@/app/hooks/useEnv';
import { parseUnits } from 'ethers';
import { toast } from 'react-toastify';

const usePurchase = ({ selected = [], clearAll }) => {
  const [currentOrder, setCurrentOrder] = useState(null);
  const approveModalRef = useRef();
  const purchaseModalRef = useRef();
  const USDTContract = useUSDTContract();
  const wallet = useWallet();
  const { newContractAddress } = useEnv();
  const [loading, setLoading] = useState(false);

  const account = wallet.useAccount();

  const USDTAllowance = async (amount) => {
    try {
      const value = await USDTContract.allowance(account, newContractAddress);
      return value && BigInt(value) >= BigInt(parseUnits(amount, 18));
    } catch (e) {
      return false;
    }
  };

  const getUSDTBalance = async () => {
    return usdtContract.balanceOf(account);
  };
  const handlePurchase = async (item) => {
    try {
      setLoading(true);
      setCurrentOrder(item);
      const approved = await USDTAllowance(item.amount);
      if (approved) {
        purchaseModalRef.current.showModal();
      } else {
        approveModalRef.current.showModal();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMultiPurchase = () => {
    console.log(selected);
  };

  const handleApprove = async (amount) => {
    const balance = await getUSDTBalance();
    if (!balance || BigInt(balance) < BigInt(amount)) {
      toast.error('Insufficient USDT Balance!');
    }else {

    }
  };

  // const amounts = checkedCfxsItems.map((c) => parseUnits(c.amount, 18));
  // const totalAmount = amounts.reduce((a, b) => BigInt(a) + BigInt(b));
  // console.log("totalAmount", totalAmount);
  // setOrderTotalAmount(totalAmount);
  // if (!value || BigInt(value) < BigInt(totalAmount)) {
  //   document.getElementById("approveModal").showModal();
  //   return;
  // }

  const purchaseOrder = useMemo(() => {
    if (currentOrder) {
      return {
        count: 1,
        amount: currentOrder.amount,
      };
    }

    return {
      count: selected.length,
      amount: selected.reduce((a, b) => Number(a.amount) + Number(b.amount), 0),
    };
  }, [currentOrder, selected]);

  return {
    purchaseOrder,
    handlePurchase,
    handleApprove,
    approveModalRef,
    purchaseModalRef,
  };
};

export default usePurchase;
