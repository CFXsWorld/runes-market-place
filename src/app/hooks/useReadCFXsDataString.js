import { abi } from '../contracts/newCfxsContractAbi.json';
import useEnv from '@/app/hooks/useEnv';
import { Contract, JsonRpcProvider } from 'ethers';
import { useMemo } from 'react';

const useReadCFXsDataString = () => {
  const { eSpaceRPC, newContractAddress } = useEnv();
  const readCFXsDataSting = async (ids) => {
    if (ids?.length) {
      const provider = new JsonRpcProvider(eSpaceRPC);
      const CFXsContract = new Contract(newContractAddress, abi, provider);
      let calls = [];
      ids.map((id) => {
        calls.push(CFXsContract.CFXss(id));
      });
      return Promise.allSettled(calls).then(res=>{
        console.log(res)
        return []
      }).catch((e) => {
        console.log(e);
      });
    }
  };
  return { readCFXsDataSting };
};

export default useReadCFXsDataString;
