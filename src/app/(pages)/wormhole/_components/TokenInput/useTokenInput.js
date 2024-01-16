import { useEffect, useMemo, useState } from 'react';
import { TOKEN_TYPE } from '@/app/(pages)/wormhole/_components/TokenInput/TokenTypeSelector';
import { getAddress, isAddress, parseUnits, formatUnits } from 'ethers';
import useERC20Contract from '@/app/hooks/useERC20Contract';
import useWallet from '@/app/hooks/useWallet';
import { useWalletStore } from '@/app/store/wallet';

const useTokenInput = ({ type, token }) => {
  const [openNFT, onOpenNFT] = useState(false);
  const [openCFXs, onOpenCFXs] = useState(false);
  const [coinsBalance, setCoinsBalance] = useState(0);
  const { contract: ERC20Contract } = useERC20Contract();
  const { browserProvider, provider } = useWallet();
  const account = useWalletStore((state) => state.account);

  useEffect(() => {
    if (
      isAddress(account) &&
      browserProvider &&
      type === 'FROM' &&
      typeof window !== 'undefined'
    ) {
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
  }, [browserProvider, account, type]);

  const disabled = useMemo(() => {
    if (type === 'TO') {
      return true;
    }
    return token.type !== TOKEN_TYPE.Coin;
  }, [type, token]);

  const showSelect = useMemo(() => {
    return type === 'FROM' && token.type && token.type !== TOKEN_TYPE.Coin;
  }, [token, type]);

  const showBalance = useMemo(() => {
    return type === 'FROM' && token.type && token.type === TOKEN_TYPE.Coin;
  }, [token, type]);

  return {
    openNFT,
    onOpenNFT,
    openCFXs,
    onOpenCFXs,
    disabled,
    showSelect,
    showBalance,
    coinsBalance,
  };
};

export default useTokenInput;
