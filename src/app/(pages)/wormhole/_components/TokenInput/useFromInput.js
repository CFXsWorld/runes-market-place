import { useEffect, useMemo, useState } from 'react';
import { TOKEN_TYPE } from '@/app/(pages)/wormhole/_components/TokenInput/TokenTypeSelector';
import { getAddress, isAddress, formatUnits } from 'ethers';
import useERC20Contract from '@/app/hooks/useERC20Contract';
import useWallet from '@/app/hooks/useWallet';
import { useWalletStore } from '@/app/store/wallet';

const useFromInput = ({ token, loading, onTokenChange }) => {
  const [openNFT, onOpenNFT] = useState(false);
  const [openCFXs, onOpenCFXs] = useState(false);
  const [coinsBalance, setCoinsBalance] = useState(0);
  const { contract: ERC20Contract } = useERC20Contract();

  const { browserProvider } = useWallet();
  const account = useWalletStore((state) => state.account);

  useEffect(() => {
    if (isAddress(account) && ERC20Contract) {
      browserProvider.getSigner().then((signer) => {
        const contractWithSigner = ERC20Contract.connect(signer);
        contractWithSigner
          .balanceOf(getAddress(account))
          .then((res) => {
            setCoinsBalance(Math.ceil(Number(formatUnits(res, 18))));
          })
          .catch((e) => {});
      });
    }
  }, [ERC20Contract, loading, account]);

  const disabled = useMemo(() => {
    return token.type !== TOKEN_TYPE.Coin;
  }, [token]);

  const onCFSxSelect = (items) => {
    onTokenChange({
      ...token,
      balance: items.length,
      items,
      amount: items.reduce((a, b) => a + Number(b.amount), 0),
    });
    onOpenCFXs(false);
  };
  const onNFXSelect = (items) => {
    onTokenChange({
      ...token,
      balance: items.length,
      items,
      amount: items.reduce((a, b) => a + Number(b.amount), 0),
    });
    onOpenNFT(false);
  };
  const onOpenModal = () => {
    if (token?.type === 'NFT') {
      onOpenNFT(true);
    }
    if (token?.type === 'CFXs') {
      onOpenCFXs(true);
    }
  };

  const onMaxBalance = () => {
    onTokenChange({
      ...token,
      amount: coinsBalance,
      balance: coinsBalance,
    });
  };

  const onInputChange = (value) => {
    if (/^\d+$/g.test(value) || !value) {
      onTokenChange({ ...token, balance: value, amount: value });
    }
  };

  const onTypeChange = (v) => {
    onTokenChange({ items: [], type: v, amount: undefined });
  };
  return {
    openNFT,
    onOpenNFT,
    openCFXs,
    onOpenCFXs,
    disabled,
    onCFSxSelect,
    onNFXSelect,
    onMaxBalance,
    onOpenModal,
    onInputChange,
    onTypeChange,
    coinsBalance,
  };
};

export default useFromInput;
