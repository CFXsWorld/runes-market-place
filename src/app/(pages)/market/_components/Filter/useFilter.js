import { useMemo, useState } from 'react';

const useFilter = ({ filter, setFilter }) => {
  const formValues = useMemo(() => {
    return {
      orderType: filter.orderType,
      amountRangeStart: filter.amountRangeStart,
      amountRangeEnd: filter.amountRangeEnd,
      searchValue: filter.searchValue,
    };
  }, [filter]);
  const onFilterChange = (form) => {
    setFilter({ ...filter, ...form });
  };

  return { onFilterChange, formValues };
};

export default useFilter;
