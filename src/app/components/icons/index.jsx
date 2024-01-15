import { cn } from '@/app/utils/classnames';

import LogoSvg from './svgs/logo.svg';
import WalletSvg from './svgs/wallet.svg';
import ESpaceSvg from './svgs/eSpace.svg';
import MetamaskSvg from './svgs/metamask.svg';
import FluentSvg from './svgs/fluent.svg';
import CFXsSvg from './svgs/CFXs.svg';
import XSvg from './svgs/X.svg';
import TelegramSvg from './svgs/telegram.svg';
import ListSvg from './svgs/list.svg';
import RefreshSvg from './svgs/refresh.svg';
import ArrowDown from './svgs/arrowDown.svg';
import Asc from './svgs/asc.svg';
import Desc from './svgs/desc.svg';
import EndingSvg from './svgs/ending.svg';
import Merge from './svgs/merge.svg';
import FragmentSvg from './svgs/fragment.svg';
import TimeSvg from './svgs/time.svg';
import SearchSvg from './svgs/search.svg';
import Usdt from './svgs/usdt.svg';
import Flag from './svgs/flag.svg';
import Split from './svgs/split.svg';
import Loading from './svgs/loading.svg';
import Empty from './svgs/empty.svg';
import Menu from './svgs/menu.svg';
import Close from './svgs/close.svg';
import LogoMDSvg from './svgs/logo-md.svg';
import FilterSvg from './svgs/filter.svg';
import Transfer from './svgs/transfer.svg';
import Active from './svgs/active.svg';
import Reduce from './svgs/reduce.svg';
import Plus from './svgs/plus.svg';
import Warning from './svgs/warning.svg';
import Refresh2 from './svgs/refresh2.svg';
import Docs from './svgs/docs.svg';
import CFXsToken from './svgs/CFXsToken.svg';
import CoinToken from './svgs/CoinToken.svg';
import NFTToken from './svgs/NFTToken.svg';
import Tips from './svgs/Tips.svg';
import ArrowDownLine from './svgs/arrowDownLine.svg';
import Success from './svgs/success.svg';

export const Icon = ({ className, style, children, ...props }) => {
  return (
    <span className={className} style={style} {...props}>
      {children}
    </span>
  );
};
export const ArrowDownIcon = (props) => (
  <Icon {...props}>
    <ArrowDown />
  </Icon>
);

export const TransferIcon = (props) => (
  <Icon {...props}>
    <Transfer />
  </Icon>
);
export const EmptyIcon = (props) => (
  <Icon {...props}>
    <Empty />
  </Icon>
);
export const AscIcon = (props) => (
  <Icon {...props}>
    <Asc />
  </Icon>
);
export const DescIcon = (props) => (
  <Icon {...props}>
    <Desc />
  </Icon>
);
export const EndingIcon = (props) => (
  <Icon {...props}>
    <EndingSvg />
  </Icon>
);
export const MergeIcon = (props) => (
  <Icon {...props}>
    <Merge />
  </Icon>
);
export const FragmentIcon = (props) => (
  <Icon {...props}>
    <FragmentSvg />
  </Icon>
);
export const TimeIcon = (props) => (
  <Icon {...props}>
    <TimeSvg />
  </Icon>
);

export const LogoIcon = (props) => (
  <Icon {...props}>
    <LogoSvg />
  </Icon>
);

export const LogoMDIcon = (props) => (
  <Icon {...props}>
    <LogoMDSvg />
  </Icon>
);
export const ListIcon = (props) => (
  <Icon {...props}>
    <ListSvg />
  </Icon>
);

export const XIcon = (props) => (
  <Icon {...props}>
    <XSvg />
  </Icon>
);

export const TelegramIcon = (props) => (
  <Icon {...props}>
    <TelegramSvg />
  </Icon>
);

export const WalletIcon = (props) => (
  <Icon {...props}>
    <WalletSvg />
  </Icon>
);

export const ESpaceIcon = (props) => (
  <Icon {...props}>
    <ESpaceSvg />
  </Icon>
);
export const MetamaskIcon = (props) => (
  <Icon {...props}>
    <MetamaskSvg />
  </Icon>
);
export const FluentIcon = (props) => (
  <Icon {...props}>
    <FluentSvg />
  </Icon>
);
export const CFXsIcon = (props) => (
  <Icon {...props}>
    <CFXsSvg />
  </Icon>
);
export const RefreshIcon = (props) => (
  <Icon {...props}>
    <RefreshSvg />
  </Icon>
);

export const SearchIcon = (props) => (
  <Icon {...props}>
    <SearchSvg />
  </Icon>
);

export const UsdtIcon = (props) => (
  <Icon {...props}>
    <Usdt />
  </Icon>
);
export const FlagIcon = (props) => (
  <Icon {...props}>
    <Flag />
  </Icon>
);
export const SplitIcon = (props) => (
  <Icon {...props}>
    <Split />
  </Icon>
);
export const LoadingIcon = ({ className, ...props }) => (
  <Icon {...props} className={cn('animate-spin', className)}>
    <Loading />
  </Icon>
);

export const MenuIcon = (props) => (
  <Icon {...props}>
    <Menu />
  </Icon>
);
export const CloseIcon = (props) => (
  <Icon {...props}>
    <Close />
  </Icon>
);
export const FilterIcon = (props) => (
  <Icon {...props}>
    <FilterSvg />
  </Icon>
);
export const ActiveIcon = (props) => (
  <Icon {...props}>
    <Active />
  </Icon>
);
export const ReduceIcon = (props) => (
  <Icon {...props}>
    <Reduce />
  </Icon>
);
export const PlusIcon = (props) => (
  <Icon {...props}>
    <Plus />
  </Icon>
);
export const WarningIcon = (props) => (
  <Icon {...props}>
    <Warning />
  </Icon>
);
export const Refresh2Icon = (props) => (
  <Icon {...props}>
    <Refresh2 />
  </Icon>
);
export const DocsIcon = (props) => (
  <Icon {...props}>
    <Docs />
  </Icon>
);

export const TipsIcon = (props) => (
  <Icon {...props}>
    <Tips />
  </Icon>
);

export const CFXsTokenIcon = (props) => (
  <Icon {...props}>
    <CFXsToken />
  </Icon>
);

export const NFTTokenIcon = (props) => (
  <Icon {...props}>
    <NFTToken />
  </Icon>
);

export const CoinTokenIcon = (props) => (
  <Icon {...props}>
    <CoinToken />
  </Icon>
);
export const ArrowDownLineIcon = (props) => (
  <Icon {...props}>
    <ArrowDownLine />
  </Icon>
);
export const SuccessIcon = (props) => (
  <Icon {...props}>
    <Success />
  </Icon>
);
