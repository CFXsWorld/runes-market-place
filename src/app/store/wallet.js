import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useWalletStore = create(
  immer((set) => ({
    walletProvider: 'Fluent',
    isConnect: false,

    updateWalletProvider: (wallet) =>
      set((state) => {
        state.walletProvider = wallet;
      }),
    updateIsConnect: (val) =>
      set((state) => {
        state.isConnect = val;
      }),
  }))
);
