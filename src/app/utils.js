// FIXME test env
// export const correctChainId = "71"; //"1030";
// export const correctChainIdHex = "0x47"; //"0x406";
// export const eSpaceRpc = "https://evmtestnet.confluxrpc.org"; // "https://emain-rpc.nftrainbow.cn/VKdPKZBdjg";
// export const oldContractAddress = "0x36147c4e123dd55b312618e9e2f58e89f6fe9da0"; //"0xc6e865c213c89ca42a622c5572d19f00d84d7a16";
// export const bridgeContractAddress =
//   "0x344889aa53995929a62ba826fbabf37d427b7748"; //"0xc6e865c213c89ca42a622c5572d19f00d84d7a16";
// export const maxSelectedItemsCount = 64;
//
// prod env
// export const correctChainId = "1030";
// export const correctChainIdHex = "0x406";
// export const eSpaceRpc = "https://emain-rpc.nftrainbow.cn/VKdPKZBdjg";
// export const oldContractAddress = "0xc6e865c213c89ca42a622c5572d19f00d84d7a16";
// export const newContractAddress = "0xd3a4d837e0a7b40de0b4024fa0f93127dd47b8b8";
// export const bridgeContractAddress = "0x5c3c1a119300669990863861a854616ecb04b463";
// export const isTest = false;
//
// // test env
// // export const correctChainId = "71"; //"1030";
// // export const correctChainIdHex = "0x47"; //"0x406";
// // export const eSpaceRpc = "https://evmtestnet.confluxrpc.org";
// // export const oldContractAddress = "0x36147c4e123dd55b312618e9e2f58e89f6fe9da0";
// // export const newContractAddress = "0x8a248cc7a9bbdaafee224f0d7e1adb13a52541d0";
// // export const bridgeContractAddress = "0x344889aa53995929a62ba826fbabf37d427b7748";
// // export const isTest = true;

export const maxSelectedItemsCount = 32;
export const pageItemCount = 128;

export const addressFormat = (defaultWalletAccount, fluentWalletAccount, metaMaskWalletAccount, okxWalletAccount) => {
  let address = defaultWalletAccount || fluentWalletAccount || metaMaskWalletAccount || okxWalletAccount;
  return address ? `${address.substr(0, 6)}...${address.substr(address.length - 4, 4)}` : "";
};

export const isCorrectChainId = (
  defaultWalletAccount,
  fluentWalletAccount,
  metaMaskWalletAccount,
  okxWalletAccount,
  defaultWalletChainId,
  fluentWalletChainId,
  metaMaskWalletChainId,
  okxWalletChainId
) => {
  let chainId = defaultWalletAccount
    ? defaultWalletChainId
    : fluentWalletAccount
    ? fluentWalletChainId
    : metaMaskWalletAccount
    ? metaMaskWalletChainId
    : okxWalletChainId;
  return chainId === process.env.NEXT_PUBLIC_CorrectChainId;
};
