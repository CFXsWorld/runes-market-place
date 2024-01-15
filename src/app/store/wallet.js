import { createContext, useContext, useRef } from 'react';
import { immer } from 'zustand/middleware/immer';
import { createStore, useStore } from 'zustand';

const context = createContext(null);

const create = (initProps = {}) =>
  createStore(
    immer((set) => ({
      open: false,
      openTx: false,
      txId: '',
      walletProvider: null,
      status: null,
      chainId: null,
      account: null,
      balance: null,
      wallet: null,
      updateStatus: (status) => {
        set((state) => {
          state.status = status;
        });
      },
      updateChainId: (chainId) => {
        set((state) => {
          state.chainId = chainId;
        });
      },

      updateAccount: (account) => {
        set((state) => {
          state.account = account;
        });
      },
      updateBalance: (balance) => {
        set((state) => {
          state.balance = balance;
        });
      },

      updateWalletFn: (wallet) => {
        set((state) => {
          state.wallet = wallet;
        });
      },
      onOpen: (value) => {
        set((state) => {
          state.open = value;
        });
      },
      onOpenTx: (value, txId) => {
        set((state) => {
          console.log(txId);
          state.openTx = value;
          state.txId = txId;
        });
      },
      updateWalletProvider: (wallet) =>
        set((state) => {
          state.walletProvider = wallet;
        }),
      ...initProps,
    }))
  );

const WalletProvider = ({ children, store }) => {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = create(store);
  }
  return (
    <context.Provider value={storeRef.current}> {children}</context.Provider>
  );
};

export const useWalletStore = (selector) => {
  const store = useContext(context);
  if (!store) {
    throw new Error('Missing WalletProvider !');
  }
  return useStore(store, selector);
};

export default WalletProvider;
