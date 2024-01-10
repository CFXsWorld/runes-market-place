import { useEffect, useState } from 'react';
import useRect from './useRect';
import useResize from './useResize';

const useResponsive = (width, container) => {
  const { rect } = useRect(container);
  const { isIpad, isMobile, isPC } = useResize();

  const [count, setCount] = useState(1);
  const [maxCount, setMaxCount] = useState(1);

  const { H5Min, max, gap, min } = width;

  useEffect(() => {
    if (container && typeof window !== 'undefined') {
      const calcMin = isMobile ? H5Min || min : min;
      const calcGap = isMobile ? 8 : gap || 8;
      setCount(Math.floor(rect.width / (calcMin + calcGap)));
      setMaxCount(Math.floor(rect.width / (max + calcGap)));
    }
  }, [container, rect, isIpad, isMobile]);

  return { count: count || 1, maxCount, isPC };
};

export default useResponsive;
