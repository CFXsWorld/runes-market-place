import { useCallback, useEffect, useMemo, useState } from 'react';
import useERCBridgeContract from '@/app/hooks/useERCBridgeContract';
import { TOKEN_TYPE } from '@/app/(pages)/wormhole/_components/TokenInput/TokenTypeSelector';
import { useWalletStore } from '@/app/store/wallet';
import useWallet from '@/app/hooks/useWallet';
import { toast } from 'react-toastify';
import { parseUnits } from 'ethers';

const useTransform = () => {
  const [remountKey, setRemountKey] = useState(0);
  const [open, onOpen] = useState(false);
  const [fromToken, setFromToken] = useState({
    amount: undefined,
    type: undefined,
    items: [],
  });
  const [toToken, setToToken] = useState({
    amount: undefined,
    type: undefined,
    items: [],
  });
  const { browserProvider } = useWallet();
  const account = useWalletStore((state) => state.account);
  const { contract: ERCBridgeContract } = useERCBridgeContract();

  useEffect(() => {
    if (fromToken.amount) {
      setToToken({ ...toToken, amount: fromToken.amount });
    }
  }, [fromToken.amount]);

  const calcFee = useMemo(() => {
    if (fromToken.type === TOKEN_TYPE.NFT && toToken.type === TOKEN_TYPE.CFXs) {
      return (Number(fromToken.amount || 0) * 0.02).toFixed(2);
    }
    if (
      fromToken.type === TOKEN_TYPE.Coin &&
      toToken.type === TOKEN_TYPE.CFXs
    ) {
      return 0.2;
    }
    if (
      fromToken.type === TOKEN_TYPE.CFXs &&
      toToken.type === TOKEN_TYPE.Coin
    ) {
      return (Number(fromToken.amount || 0) * 0.01).toFixed(2);
    }
    if (fromToken.type === TOKEN_TYPE.CFXs && toToken.type === TOKEN_TYPE.NFT) {
      return (Number(fromToken.amount || 0) * 0.1).toFixed(2);
    }
    return 0;
  }, [fromToken, toToken]);

  const CFXs2Token = async () => {
    if (ERCBridgeContract) {
      try {
        const signer = await browserProvider.getSigner();
        const contractWithSigner = ERCBridgeContract.connect(signer);
        const ids = fromToken.items.map((v) => v.id);
        const tx = await contractWithSigner.ExchangeCFXsForOnlyECR20(ids, {
          value: parseUnits(calcFee.toString(), 18),
        });
        await tx.wait();
        toast.success('Transform success');
      } catch (e) {
        console.log(e);
        toast.error('Transform fail');
      }
    }
  };
  const CFXs2NFT = async () => {
    if (ERCBridgeContract) {
      try {
        const signer = await browserProvider.getSigner();
        const contractWithSigner = ERCBridgeContract.connect(signer);
        const ids = fromToken.items.map((v) => v.id);
        const tx = await contractWithSigner.ExchangeCFXsForECR20721(ids, {
          value: parseUnits(calcFee.toString(), 18),
        });
        await tx.wait();
        toast.success('Transform success');
      } catch (e) {
        console.log(e);
        toast.error('Transform fail');
      }
    }
  };
  const token2CFXs = async () => {
    if (ERCBridgeContract) {
      try {
        const signer = await browserProvider.getSigner();
        const contractWithSigner = ERCBridgeContract.connect(signer);
        const tx = await contractWithSigner.ECR20RedemptionOfCFXs(
          parseUnits(fromToken.amount.toString(), 18),
          {
            value: parseUnits(calcFee.toString(), 18),
          }
        );
        await tx.wait();
        toast.success('Transform success');
      } catch (e) {
        console.log(e);
        toast.error('Transform fail');
      }
    }
  };
  const nft2CFXs = async () => {
    if (ERCBridgeContract) {
      try {
        const signer = await browserProvider.getSigner();
        const contractWithSigner = ERCBridgeContract.connect(signer);
        const ids = fromToken.items.map((v) => v.id);
        const tx = await contractWithSigner.ECR20721RedemptionOfCFXs([ids], {
          value: parseUnits(calcFee.toString(), 18),
        });
        await tx.wait();
        toast.success('Transform success');
      } catch (e) {
        console.log(e);
        toast.error('Transform fail');
      }
    }
  };

  const transform = useCallback(async () => {
    try {
      if (
        fromToken.type === TOKEN_TYPE.NFT &&
        toToken.type === TOKEN_TYPE.CFXs
      ) {
        await nft2CFXs();
      }
      if (
        fromToken.type === TOKEN_TYPE.Coin &&
        toToken.type === TOKEN_TYPE.CFXs
      ) {
        await token2CFXs();
      }
      if (
        fromToken.type === TOKEN_TYPE.CFXs &&
        toToken.type === TOKEN_TYPE.Coin
      ) {
        await CFXs2Token();
      }
      if (
        fromToken.type === TOKEN_TYPE.CFXs &&
        toToken.type === TOKEN_TYPE.NFT
      ) {
        await CFXs2NFT();
      }
      reset();
    } catch (e) {}
  }, [ERCBridgeContract]);

  const shouldDisabled = (prev, target) => {
    return (
      target &&
      prev &&
      (target === prev ||
        (prev !== TOKEN_TYPE.CFXs && target !== TOKEN_TYPE.CFXs))
    );
  };

  const reset = () => {
    setToToken({
      amount: undefined,
      type: toToken.type,
      items: [],
    });
    setFromToken({
      amount: undefined,
      type: fromToken.type,
      items: [],
    });
    setRemountKey?.(Date.now());
  };

  return {
    fromToken,
    setFromToken,
    toToken,
    setToToken,
    open,
    onOpen,
    transform,
    calcFee,
    shouldDisabled,
    remountKey,
  };
};

export default useTransform;
