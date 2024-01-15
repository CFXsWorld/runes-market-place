import { useMemo, useState } from 'react';
import { TOKEN_TYPE } from '@/app/(pages)/wormhole/_components/TokenInput/TokenTypeSelector';

const useTokenInput = ({ type, token }) => {
  const [openNFT, onOpenNFT] = useState(false);
  const [openCFXs, onOpenCFXs] = useState(false);

  const onSelectNFT = (amount) => {};
  const onSelectCFXs = (amount) => {};

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
    onSelectNFT,
    onSelectCFXs,
    disabled,
    showSelect,
    showBalance,
  };
};

export default useTokenInput;
