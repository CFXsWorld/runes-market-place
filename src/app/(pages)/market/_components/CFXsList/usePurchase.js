import { useMemo, useRef, useState } from 'react';
import useUSDTContract from '@/app/hooks/useUSDTContract';
import useWallet from '@/app/hooks/useWallet';
import useEnv from '@/app/hooks/useEnv';
import { parseUnits } from 'ethers';
import { toast } from 'react-toastify';
import useCFXsContract from '@/app/hooks/useCFXsContract';
import { useWalletStore } from '@/app/store/wallet';

const usePurchase = ({ selected = [], clearAll, refresh }) => {
  const [currentOrder, setCurrentOrder] = useState(null);

  const [approveOpen, onApproveOpen] = useState(false);
  const [purchaseOpen, onPurchaseOpen] = useState(false);

  const USDTContract = useUSDTContract();
  const { contract: CFXsContract } = useCFXsContract();
  const { browserProvider } = useWallet();
  const { newContractAddress } = useEnv();
  const account = useWalletStore((state) => state.account);
  const onopenTx = useWalletStore((state) => state.onOpenTx);

  const selectedAmount = useMemo(() => {
    return selected.reduce((a, b) => a + Number(b.amount), 0).toFixed(4);
  }, [selected]);

  const purchaseOrder = useMemo(() => {
    if (currentOrder) {
      return {
        count: 1,
        quantity: currentOrder.quantity,
        amount: currentOrder.amount,
        items: [currentOrder],
      };
    }

    return {
      count: selected.length,
      quantity: (selected || []).reduce((a, b) => a + Number(b.quantity), 0),
      amount: selectedAmount,
      items: selected,
    };
  }, [currentOrder, selected]);

  const USDTAllowance = async (amount) => {
    try {
      const value = await USDTContract.allowance(account, newContractAddress);
      return value && BigInt(value) >= BigInt(parseUnits(amount, 18));
    } catch (e) {
      return false;
    }
  };

  const getUSDTBalance = async () => {
    return USDTContract.balanceOf(account);
  };
  const handlePurchase = async (item) => {
    setCurrentOrder(item);
    const approved = await USDTAllowance(item.amount);
    if (approved) {
      onPurchaseOpen(true);
    } else {
      onApproveOpen(true);
    }
  };

  const onBuy = async () => {
    if (account) {
      try {
        const signer = await browserProvider.getSigner();
        const contractWithSigner = CFXsContract.connect(signer);
        const ids = purchaseOrder.items.map((item) => item.id);
        const tokenTypes = purchaseOrder.items.map((c) => 0);
        const amounts = purchaseOrder.items.map((c) =>
          parseUnits(c.amount, 18)
        );
        const tx = await contractWithSigner.UnlockingScriptbatch(
          ids,
          tokenTypes,
          amounts
        );
        await tx.wait();
        onPurchaseOpen(false);
        onopenTx(true, tx.hash, refresh);
        toast.success('Purchase success !');
      } catch (e) {
        console.log(e);
        toast.error('Purchase failed !');
      } finally {
        refresh();
      }
    }
  };

  const handleMultiPurchase = async () => {
    setCurrentOrder(null);
    if (selected.length > 0) {
      const approved = await USDTAllowance(selectedAmount);
      if (approved) {
        onPurchaseOpen(true);
      } else {
        onApproveOpen(true);
      }
    }
  };

  const handleApprove = async (amount) => {
    try {
      const balance = await getUSDTBalance();
      if (!balance || BigInt(balance) < BigInt(parseUnits(amount, 18))) {
        toast.error('Insufficient USDT Balance!');
      } else {
        const signer = await browserProvider.getSigner();
        const contractWithSigner = USDTContract.connect(signer);
        // TODO MAX? ui not.
        const tx = await contractWithSigner.approve(
          newContractAddress,
          parseUnits(amount, 18)
        );
        await tx.wait();
        toast.success(`Approved ${amount} USDT success !`);
        onApproveOpen(false);
        onPurchaseOpen(true);
      }
    } catch (e) {
      console.log(e);
      onApproveOpen(false);
      toast.error('Approval failed ！');
    }
  };

  return {
    purchaseOrder,
    handlePurchase,
    handleApprove,
    approveOpen,
    onApproveOpen,
    purchaseOpen,
    onPurchaseOpen,
    onBuy,
    getUSDTBalance,
    handleMultiPurchase,
  };
};

export default usePurchase;
