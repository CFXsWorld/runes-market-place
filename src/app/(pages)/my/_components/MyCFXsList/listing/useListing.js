import { useState } from 'react';
import dayjs from 'dayjs';

const useListing = () => {
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(dayjs());
  const dateFormate = (date) => dayjs(date).format('YYYY-MM-DD');

  return {
    price,
    setPrice,
    duration,
    setDuration,
    dateFormate
  };
};
export default useListing;
