import LogoSvg from './svgs/logo.svg';
import WalletSvg from './svgs/wallet.svg';
import ESpaceSvg from './svgs/eSpace.svg';
import MetamaskSvg from './svgs/metamask.svg';
import FluentSvg from './svgs/fluent.svg';
import CFXsSvg from './svgs/CFXs.svg';
import XSvg from './svgs/X.svg';
import TelegramSvg from './svgs/telegram.svg';

export const Icon = ({ className, style, children, ...props }) => {
  return (
    <span className={className} style={style} {...props}>
      {children}
    </span>
  );
};
export const LogoIcon = (props) => (
  <Icon {...props}>
    <LogoSvg />
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
