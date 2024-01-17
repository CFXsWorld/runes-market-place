'use client';

import { Waypoint } from 'react-waypoint';
import LoadMore from '@/app/components/LoadMore';
import useSWRMutation from 'swr/mutation';
import { APIs } from '@/app/services/request';
import { getMyNFTList } from '@/app/services';
import { useMemo, useState } from 'react';
import { formatNumberWithCommas, pageItemCount } from '@/app/utils';
import { uniqBy } from 'lodash';
import { getAddress } from 'ethers';
import { useWalletStore } from '@/app/store/wallet';
import { NFTTokenIcon } from '@/app/components/icons';
import useERC721Contract from '@/app/hooks/useERC721Contract';

export default function NFTList() {
  const [currentPage, setCurrentPage] = useState(0);
  const [noMore, setNoMore] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const { getValueByIds } = useERC721Contract();
  const {
    data,
    isMutating,
    trigger: getData,
  } = useSWRMutation(APIs.MY_NFT_LIST, getMyNFTList);
  const account = useWalletStore((state) => state.account);

  const [filter] = useState({
    index: 0,
    size: pageItemCount,
    owner: undefined,
  });

  const transformedFilter = useMemo(() => {
    return {
      ...filter,
      owner: account ? getAddress(account) : undefined,
    };
  }, [account, filter]);

  const loadMore = async () => {
    getData({
      ...transformedFilter,
      index: currentPage * pageItemCount,
    }).then((res) => {
      if (res.rows && res.rows.length === 0 && currentPage > 0) {
        setNoMore(true);
      } else {
        setCurrentPage(currentPage + 1);
        setDataSource({
          ...(dataSource || {}),
          [currentPage]: res.rows || [],
        });
      }
    });
  };
  const source = useMemo(() => {
    if (dataSource) {
      return uniqBy(
        Object.keys(dataSource)
          .sort()
          .reduce((prev, next) => prev.concat(dataSource[next]), []),
        (item) => item.tokenid
      );
    }
    return null;
  }, [dataSource]);

  return (
    <div className="w-full py-[10px]">
      <div
        className="grid w-full gap-[16px]"
        style={{
          gridTemplateColumns: `repeat(1,1fr)`,
        }}
      >
        {(source || []).map((item) => (
          <div key={item.tokenid} className="flex-center-between">
            <div className="flex-center">
              <NFTTokenIcon className="text-[40px]" />
              <span className="ml-[12px]">#{item.tokenid}</span>
            </div>
            <span>value: {formatNumberWithCommas(item.amount)}</span>
          </div>
        ))}
      </div>
      <Waypoint onEnter={loadMore} key="nft">
        <div className="w-full">
          <LoadMore loading={isMutating} data={source} noMore={noMore} />
        </div>
      </Waypoint>
    </div>
  );
}
