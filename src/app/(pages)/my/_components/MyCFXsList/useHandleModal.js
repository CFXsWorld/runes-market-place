import { useState } from 'react';

const useHandleModal = () => {
  const [openListing, onOpenListing] = useState(false);
  const [openBatchListing, onOpenBatchListing] = useState(false);
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
    openBatchListing,
    onOpenBatchListing,
  };
};

export default useHandleModal;
