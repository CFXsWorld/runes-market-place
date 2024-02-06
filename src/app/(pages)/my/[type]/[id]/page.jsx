'use client';

import { useEffect, useMemo } from 'react';
import useSWRMutation from 'swr/mutation';
import { getMyCFXsList } from '@/app/services';
import CFXsDetail from '@/app/(pages)/market/_components/CFXsDetail';
import { useParams } from 'next/navigation';
import { APIs } from '@/app/services/request';

export default function Market() {
  const params = useParams();
  const id = params.id;
  const type = params.type;
  const {
    data,
    isMutating,
    trigger: getData,
  } = useSWRMutation(APIs.MY_CFXs_LIST, getMyCFXsList);
  useEffect(() => {
    if (id) {
      getData({ id });
    }
  }, [id]);

  const item = useMemo(() => {
    return data ? data.rows?.[0] || {} : {};
  }, [data]);

  return (
    <div className="pt-[24px] w-full">
      <CFXsDetail item={item} />
    </div>
  );
}
