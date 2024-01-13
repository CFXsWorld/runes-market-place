import { useMemo, useState } from 'react';
import useWallet from '@/app/hooks/useWallet';
import { isAddress, getAddress } from 'ethers';
import { toast } from 'react-toastify';
import useCFXsContract from '@/app/hooks/useCFXsContract';
import { omit, uniqueId } from 'lodash';

export const SPLIT_TYPE = {
  CUSTOM: 'CUSTOM',
  SHARE: 'SHARE',
};

const DEFAULT_OUTPUT = {
  owner: '',
  amount: '',
  data: '',
};

const TEMP_ID = `__output__`;

const useSplit = ({ reload, onOpen, splitOrder }) => {
  const [splitType, setSplitType] = useState(SPLIT_TYPE.CUSTOM);
  const [items, setItems] = useState(() => [
    { ...DEFAULT_OUTPUT, id: `${TEMP_ID}${uniqueId()}` },
    { ...DEFAULT_OUTPUT, id: `${TEMP_ID}${uniqueId()}` },
  ]);
  const [shareCount, setShareCount] = useState();
  const { browserProvider, useAccount } = useWallet();
  const { contract: CFXsContract } = useCFXsContract();
  const account = useAccount();

  const shareItems = useMemo(() => {
    if (/^[1-9]\d*$/.test(shareCount) && splitOrder && isAddress(account)) {
      const quotient = Math.floor(Number(splitOrder.amount) / Number(shareCount));
      const remainder = Number(splitOrder.amount) % Number(shareCount);
      return [...new Array(Number(shareCount))].map((_, index) => ({
        owner: getAddress(account),
        amount:
          index === Number(shareCount) - 1 ? quotient + remainder : quotient,
        data: '',
      }));
    }
    return [];
  }, [shareCount, splitOrder, account]);

  const formattedCustomItems = useMemo(() => {
    if (isAddress(account)) {
      return items.map((out) => ({
        ...omit(out, ['id']),
        owner: getAddress(account),
      }));
    }

    return [];
  }, [items, account]);

  const split = async () => {
    if (isValidAmount && splitOrder && account) {
      try {
        const signer = await browserProvider.getSigner();
        const contractWithSigner = CFXsContract.connect(signer);

        const data =
          SPLIT_TYPE.CUSTOM === splitType ? formattedCustomItems : shareItems;
        console.log(data)
        const tx = await contractWithSigner.processTransaction(
          [splitOrder.id],
          data
        );
        await tx.wait();
        reload();
        toast.success('Split success !');
        onOpen(false);
      } catch (e) {
        toast.error('Split failed !');
      }
    }
  };

  const addItem = (item, index) => {
    if (setItems.length < 24) {
      setItems((prev) => {
        return [...prev, { ...DEFAULT_OUTPUT, id: `${TEMP_ID}${uniqueId()}` }];
      });
    }
  };
  const delItem = (item) => {
    if (items.length > 2) {
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    }
  };

  const onCustomValueChange = (value, index) => {
    const changed = [...items];
    changed[index].amount = value;
    setItems(changed);
  };

  const customTotal = useMemo(() => {
    return items.reduce((a, b) => a + Number(b.amount || 0), 0);
  }, [items]);

  const isValidAmount = useMemo(() => {
    if (splitType === SPLIT_TYPE.CUSTOM) {
      return (
        splitOrder &&
        Number(splitOrder?.amount || 0) === Number(customTotal) &&
        items.every((n) => /^[1-9]\d*$/.test(n.amount))
      );
    }

    return (
      splitOrder && /^[1-9]\d*$/.test(shareCount) && Number(shareCount) <= 24
    );
  }, [customTotal, splitOrder, splitType, shareCount, items]);

  return {
    split,
    splitType,
    setSplitType,
    items,
    delItem,
    addItem,
    shareCount,
    setShareCount,
    onCustomValueChange,
    isValidAmount,
  };
};
export default useSplit;
