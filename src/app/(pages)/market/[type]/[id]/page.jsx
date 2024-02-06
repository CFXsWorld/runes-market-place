'use client';

import { useEffect, useMemo } from 'react';
import useSWRMutation from 'swr/mutation';
import { getMarketCFXsList } from '@/app/services';
import CFXsDetail from '@/app/(pages)/market/_components/CFXsDetail';
import { useParams } from 'next/navigation';

export default function Market() {
  const params = useParams();
  const id = params.id;
  const type = params.type;
  const {
    data,
    isMutating,
    trigger: getData,
  } = useSWRMutation('CFXs-detail', getMarketCFXsList);

  useEffect(() => {
    if (id) {
      getData({ id });
    }
  }, [id]);

  const item = useMemo(() => {
    return data ? data.rows[0] : {};
  }, [data]);

  return (
    <div className="pt-[24px] w-full">
      <CFXsDetail item={item} />
    </div>
  );
}
