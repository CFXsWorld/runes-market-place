import { useEffect, useMemo, useRef, useState } from 'react';
import useWindowLoad from './useWindowLoad';

const useResize = () => {
  const [width, setWidth] = useState(0);
  const handlerRef = useRef();

  useWindowLoad(handlerRef.current);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      handlerRef.current = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handlerRef.current);
    }
    return () => {
      if (typeof window !== 'undefined' && handlerRef.current) {
        window.removeEventListener('resize', handlerRef.current);
      }
    };
  }, [width]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth || document.body.clientWidth);
    }
  }, []);

  const isIpad = useMemo(() => {
    return width < 960 && width > 480;
  }, [width]);

  const isMobile = useMemo(() => {
    return width < 480;
  }, [width]);

  const isPC = useMemo(() => {
    return width > 960;
  }, [width]);

  return { width, isIpad, isMobile, isPC };
};

export default useResize;
