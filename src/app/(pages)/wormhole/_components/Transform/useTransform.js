import { useMemo, useState } from 'react';
import useERCBridgeContract from '@/app/hooks/useERCBridgeContract';
import { TOKEN_TYPE } from '@/app/(pages)/wormhole/_components/TokenInput/TokenTypeSelector';
import { useWalletStore } from '@/app/store/wallet';
import useWallet from '@/app/hooks/useWallet';
import { toast } from 'react-toastify';

const useTransform = () => {
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

  const calcFee = useMemo(() => {
    if (fromToken.type === TOKEN_TYPE.NFT && toToken.type === TOKEN_TYPE.CFXs) {
      return Number(fromToken.amount || 0) * 0.02;
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
      return Number(fromToken.amount || 0) * 0.01;
    }
    if (fromToken.type === TOKEN_TYPE.CFXs && toToken.type === TOKEN_TYPE.NFT) {
      return Number(fromToken.amount || 0) * 0.01;
    }
    return 0;
  }, [fromToken, toToken]);

  const CFXs2Token = async () => {
    if (account) {
      const signer = await browserProvider.getSigner();
      const contractWithSigner = ERCBridgeContract.connect(signer);
      const tx = await contractWithSigner.ExchangeCFXsForOnlyECR20();
      await tx.wait();
    }
  };
  const CFXs2NFT = async () => {
    if (account) {
      const signer = await browserProvider.getSigner();
      const contractWithSigner = ERCBridgeContract.connect(signer);
      const tx = await contractWithSigner.ExchangeCFXsForECR20721();
      await tx.wait();
    }
  };
  const token2CFXs = async () => {
    if (account) {
      const signer = await browserProvider.getSigner();
      const contractWithSigner = ERCBridgeContract.connect(signer);
      const tx = await contractWithSigner.ECR20RedemptionOfCFXs();
      await tx.wait();
    }
  };
  const nft2CFXs = async () => {
    if (account) {
      const signer = await browserProvider.getSigner();
      const contractWithSigner = ERCBridgeContract.connect(signer);
      const tx = await contractWithSigner.ECR20721RedemptionOfCFXs();
      await tx.wait();
    }
  };

  const transform = async () => {
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

      toast.success('Transform success');
    } catch (e) {
      console.log(e);
      toast.error('Transform error');
    }
  };

  const shouldDisabled = (prev, target) => {
    return (
      target &&
      prev &&
      (target === prev ||
        (prev !== TOKEN_TYPE.CFXs && target !== TOKEN_TYPE.CFXs))
    );
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
  };
};

export default useTransform;
