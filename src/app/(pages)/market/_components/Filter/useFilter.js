import { useMemo, useState } from 'react';

const useFilter = ({ filter, setFilter }) => {
  const formValues = useMemo(() => {
    return {
      orderType: filter.orderType,
      unit_price_start: filter.unit_price_start,
      unit_price_end: filter.unit_price_end,
      searchValue: filter.searchValue,
    };
  }, [filter]);
  const onFilterChange = (form) => {
    setFilter({ ...filter, ...form });
  };

  return { onFilterChange, formValues };
};

export default useFilter;
