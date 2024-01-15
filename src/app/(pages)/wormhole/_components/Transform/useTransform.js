import { useMemo, useState } from "react";

const useTransform = () => {
  const [open, onOpen] = useState(false);
  const [fromToken, setFromToken] = useState({
    amount: undefined,
    type: undefined,
  });
  const [toToken, setToToken] = useState({
    amount: undefined,
    type: undefined,
  });

  return {
    fromToken,
    setFromToken,
    toToken,
    setToToken,
    open,
    onOpen,
  };
};

export default useTransform;
