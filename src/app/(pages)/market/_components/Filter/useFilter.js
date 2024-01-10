import { useMemo, useState } from 'react';

const useFilter = ({ filter, setFilter }) => {
  const formValues = useMemo(() => {
    return {
      ao: filter.ao === 0 ? 'ASC' : 'DESC',
      amountRangeStart: filter.amountRangeStart,
      amountRangeEnd: filter.amountRangeEnd,
    };
  }, [filter]);
  const onFilterChange = (form) => {
    if (form.ao) {
      setFilter({ ...filter, ao: form.ao === 'ASC' ? 0 : 1 });
    } else {
      setFilter({ ...filter, ...form });
    }
  };

  return { onFilterChange, formValues };
};

export default useFilter;
