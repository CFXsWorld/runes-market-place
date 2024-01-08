// test env
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

import { getAddress } from 'ethers';

export const maxSelectedItemsCount = 32;
export const maxTransferSelectedItemsCount = 24;
export const pageItemCount = 60;
export const defaultLockHours = 48;
export const usdtDecimal = 18;

export const addressFormat = (
  defaultWalletAccount,
  fluentWalletAccount,
  metaMaskWalletAccount,
  okxWalletAccount
) => {
  let address =
    defaultWalletAccount ||
    fluentWalletAccount ||
    metaMaskWalletAccount ||
    okxWalletAccount;
  return address
    ? `${getAddress(address).substr(0, 6)}...${getAddress(address).substr(
        address.length - 4,
        4
      )}`
    : '';
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

export function formatNumberWithCommas(number) {
  return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0;
}

export function formatNumber(number, precision = 2) {
  const abbreviations = ['', 'K', 'M', 'B', 'T'];

  const format = (num, precision) =>
    (num % 1 === 0 ? num : num.toFixed(precision)).replace(/\.0+$/, '');

  let abbreviationIndex = 0;

  while (number >= 1000 && abbreviationIndex < abbreviations.length - 1) {
    [number, abbreviationIndex] = [number / 1000, abbreviationIndex + 1];
  }

  return `${format(number, precision)}${abbreviations[abbreviationIndex]}`;
}
