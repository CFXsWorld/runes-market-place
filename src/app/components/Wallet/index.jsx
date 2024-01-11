'use client';

import ConnectButton from './ConnectButton';
import useCFXsWallet from '@/app/hooks/useCFXsWallet';
import useDisconnect from '@/app/components/Wallet/useDisconnect';
export const STORAGE_IS_CONNECT_KEY = 'isConnect';
export const STORAGE_WALLET_PROVIDER_KEY = 'walletProvider';


export { ConnectButton, useCFXsWallet, useDisconnect };
