'use client';

import Selector from '@/app/components/ui/Selector';
import {
  CFXsTokenIcon,
  NFTTokenIcon,
  CoinTokenIcon,
} from '@/app/components/icons';
import { cn } from '@/app/utils/classnames';

const TokenTypeSelector = ({ value, onChange, className }) => {
  const options = [
    { label: 'CFXs', value: 'ASC', icon: <CFXsTokenIcon />, disabled: false },
    { label: 'NFT', value: 'DESC', icon: <NFTTokenIcon />, disabled: false },
    {
      label: 'Coin',
      value: 'RECENTLY',
      icon: <CoinTokenIcon />,
      disabled: false,
    },
  ];
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
