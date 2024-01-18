import { useState } from 'react';

const usePromiseLoading = (fn, { onSuccess, onError } = {}) => {
  const [loading, setLoading] = useState();

  const trigger = async (...rest) => {
    setLoading(true);
    return Promise.resolve(fn)
      .then((next) => {
        onSuccess?.();
        return next?.(...rest);
      })
      .catch((e) => {
        onError?.();
      })
      .finally((e) => {
        setLoading(false);
      });
  };

  return { trigger, loading, setLoading };
};

export default usePromiseLoading;
