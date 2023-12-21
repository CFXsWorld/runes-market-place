export const correctChainId = "71"; //"1030";
export const correctChainIdHex = "0x47"; //"0x406";
export const eSpaceRpc = "https://evmtestnet.confluxrpc.org"; // "https://emain-rpc.nftrainbow.cn/VKdPKZBdjg";
export const oldContractAddress = "0x36147c4e123dd55b312618e9e2f58e89f6fe9da0"; //"0xc6e865c213c89ca42a622c5572d19f00d84d7a16";
export const bridgeContractAddress =
  "0x9115a0f3022efb9c300f549bec82a09a8af1ac8f"; //"0xc6e865c213c89ca42a622c5572d19f00d84d7a16";
export const maxSelectedItemsCount = 64;

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
