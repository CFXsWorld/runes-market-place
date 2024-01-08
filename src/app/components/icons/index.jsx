import LogoSvg from './svgs/logo.svg';
import WalletSvg from './svgs/wallet.svg';
import ESpaceSvg from './svgs/eSpace.svg';
import MetamaskSvg from './svgs/metamask.svg';
import FluentSvg from './svgs/fluent.svg';

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
