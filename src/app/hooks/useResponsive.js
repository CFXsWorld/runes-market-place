import { useEffect, useState } from 'react';
import useRect from './useRect';
import useResize from './useResize';

const useResponsive = (width, container) => {
  const { rect } = useRect(container);
  const { isIpad, isMobile, isPC } = useResize();

  const [count, setCount] = useState(1);
  const [maxCount, setMaxCount] = useState(1);

  useEffect(() => {
    if (container && typeof window !== 'undefined') {
      if (isIpad) {
        setCount(3);
      }
      if (isMobile) {
        setCount(1);
      }
      setCount(Math.floor(rect.width / (width.min + width.gap || 8)));
      setMaxCount(Math.floor(rect.width / (width.max + width.gap || 8)));
    }
  }, [container, rect, isIpad, isMobile]);

  return { count: count || 1, maxCount, isPC };
};

export default useResponsive;
