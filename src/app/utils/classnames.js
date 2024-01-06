import {  clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase()
}
