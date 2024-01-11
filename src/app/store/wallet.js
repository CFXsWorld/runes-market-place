import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import createContext from 'zustand/context';
const { Provider, useStore } = createContext();

const createStore = () =>
  create(
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

const WalletProvider = ({ children }) => {
  return <Provider createStore={createStore}>{children}</Provider>;
};

export const useWalletStore = useStore;
export default WalletProvider;
