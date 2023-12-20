export const correctChainId = "1030";
export const correctChainIdHex = "0x406";

export const addressFormat = (
  fluentWalletAccount,
  metaMaskWalletAccount,
  okxWalletAccount
) => {
  let address =
    fluentWalletAccount || metaMaskWalletAccount || okxWalletAccount;
  return address
    ? `${address.substr(0, 6)}...${address.substr(address.length - 4, 4)}`
    : "";
};

export const isCorrectChainId = (
  fluentWalletAccount,
  metaMaskWalletAccount,
  okxWalletAccount,
  fluentWalletChainId,
  metaMaskWalletChainId,
  okxWalletChainId
) => {
  let chainId = fluentWalletAccount
    ? fluentWalletChainId
    : metaMaskWalletAccount
    ? metaMaskWalletChainId
    : okxWalletChainId;
  return chainId === correctChainId;
};
