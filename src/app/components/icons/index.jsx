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
