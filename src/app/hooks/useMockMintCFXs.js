import abi from '../contracts/mockMint.json';
import useWallet from '@/app/hooks/useWallet';
import { BrowserProvider, Contract } from 'ethers';

const useMockMintCFXs = () => {
  const wallet = useWallet();
  const provider = new BrowserProvider(wallet.provider);
  const contract = new Contract(
    '0xcb4a3aD9Ea8f0B5ba2e624742D9eFd4d1Db3b28B',
    abi,
    provider
  );

  const mint = async () => {
    if (contract && provider) {
      const signer = await provider.getSigner();
      const contractWithSigner = contract.connect(signer);
      const tx = await contractWithSigner.MockMint('88', '5000');
      console.log(tx.hash);
      await tx.wait();
    }
  };

  return {
    mint,
  };
};

export default useMockMintCFXs;
