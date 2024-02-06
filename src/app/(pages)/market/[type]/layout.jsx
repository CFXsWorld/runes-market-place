'use client';

import { cn } from '@/app/utils/classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CFXsInfo from '@/app/(pages)/market/_components/CFXsInfo';
import PriceList from '@/app/(pages)/market/_components/PriceList';
import useSWRMutation from 'swr/mutation';
import { APIs } from '@/app/services/request';
import { getMarketStatistics } from '@/app/services';
import { formatUnits } from 'ethers';
import { usdtDecimal } from '@/app/utils';
import { useEffect, useMemo } from 'react';



export default function Layout({ children }) {


  return (
    <div>

      {children}
    </div>
  );
}
