
import LogoSvg from './svgs/logo.svg'



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