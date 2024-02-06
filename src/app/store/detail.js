import { immer } from 'zustand/middleware/immer';
import { create } from 'zustand';

const useDetailStore = create(
  immer((set) => ({
    showDetail: false,
    detail: null,
    updateShowDetail: (status) => {
      set((state) => {
        state.showDetail = status;
      });
    },
    updateDetail: (detail) => {
      set((state) => {
        state.detail = detail;
      });
    },
  }))
);

export default useDetailStore;
