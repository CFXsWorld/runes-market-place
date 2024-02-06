import { immer } from 'zustand/middleware/immer';
import { create } from 'zustand';

const useRewardStore = create(
  immer((set) => ({
    open: false,

    onOpen: (open) => {
      set((state) => {
        state.open = open;
      });
    },
  }))
);

export default useRewardStore;
