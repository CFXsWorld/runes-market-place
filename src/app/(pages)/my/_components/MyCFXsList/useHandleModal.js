import { useState } from 'react';

const useHandleModal = () => {
  const [openListing, onOpenListing] = useState(false);
  const [openMerge, onOpenMerge] = useState(false);
  const [openSplit, onOpenSplit] = useState(false);
  const [openTransfer, onOpenTransfer] = useState(false);

  return {
    openListing,
    openMerge,
    openSplit,
    openTransfer,
    onOpenListing,
    onOpenMerge,
    onOpenSplit,
    onOpenTransfer,
  };
};

export default useHandleModal;
