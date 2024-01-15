'use client';

import Selector from '@/app/components/ui/Selector';
import {
  CFXsTokenIcon,
  NFTTokenIcon,
  CoinTokenIcon,
} from '@/app/components/icons';
import { cn } from '@/app/utils/classnames';

export const TOKEN_TYPE = {
  CFXs: 'CFXs',
  NFT: 'NFT',
  Coin: 'Coin',
};
export const tokenList = [
  {
    label: 'CFXs',
    value: TOKEN_TYPE.CFXs,
    icon: <CFXsTokenIcon />,
    disabled: false,
  },
  {
    label: 'NFT',
    value: TOKEN_TYPE.NFT,
    icon: <NFTTokenIcon />,
    disabled: false,
  },
  {
    label: 'Coin',
    value: TOKEN_TYPE.Coin,
    icon: <CoinTokenIcon />,
    disabled: false,
  },
];

const TokenTypeSelector = ({ value, onChange, className, options }) => {
  return (
    <Selector
      options={options}
      value={value}
      onChange={onChange}
      type="pure"
      className={cn('w-[70px]', className)}
      placeholder="Select"
    />
  );
};

export default TokenTypeSelector;
