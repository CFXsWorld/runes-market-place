import { getAddress } from 'ethers';
import { isNumber } from 'lodash';

export const maxSelectedItemsCount = 32;
export const maxTransferSelectedItemsCount = 24;
export const pageItemCount = 60;
export const defaultLockHours = 48;
export const usdtDecimal = 18;

export const addressFormat = (address) => {
  return address
    ? `${getAddress(address).substr(0, 6)}...${getAddress(address).substr(
        address.length - 4,
        4
      )}`
    : '';
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

export const addressFormatShort = (address) => {
  return `${getAddress(address).substr(0, 3)}...${getAddress(address).substr(
    address.length - 2,
    2
  )}`;
};
