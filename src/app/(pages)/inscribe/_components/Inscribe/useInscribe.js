import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { parseUnits } from 'ethers';
import useCFXsContract from '@/app/hooks/useCFXsContract';
import { useWalletStore } from '@/app/store/wallet';
import useUpload from '@/app/(pages)/inscribe/_components/Inscribe/useUpload';
import useWallet from '@/app/hooks/useWallet';
import useCISContract from '@/app/hooks/useCISContract';

const gatewayUrl = 'https://ipfs.4everland.io/ipfs/';

const useInscribe = () => {
  const [text, onTextChange] = useState('');
  const [type, setType] = useState('file');
  const [openCFXs, onOpenCFXs] = useState(false);
  const [selectedCFXs, onCFXsSelect] = useState(false);
  const [file, setFile] = useState();
  const [fileType, setFileType] = useState();
  const { uploadIPFs } = useUpload();
  const [remountKey, setRemountKey] = useState(0);
  const { contract: CFXsContract } = useCFXsContract();
  const { contract: CISContract } = useCISContract();
  const account = useWalletStore((state) => state.account);
  const { browserProvider } = useWallet();

  const inscribe = async () => {
    if (account) {
      try {
        let inscribeString = text;
        let inscribeType = 3;
        if (type === 'file') {
          const cid = await uploadIPFs(file);
          console.log('cid', cid);
          inscribeString = gatewayUrl + cid;
          inscribeType = fileType;
        }

        const signer = await browserProvider.getSigner();
        const contractWithSigner = CFXsContract.connect(signer);
        console.log('inscribeString', inscribeString);
        const tx1 = await contractWithSigner.inscribe(
          selectedCFXs.id,
          inscribeString
        );
        await tx1.wait();
        toast.success('Inscribe success');
        const contract2WithSigner = CISContract.connect(signer);
        // TODO  name series
        const tx2 = await contract2WithSigner.userDataRegist(
          [selectedCFXs.id],
          [inscribeType],
          [''],
          ''
        );
        await tx2.wait();
        toast.success('Apply inscribe success');
      } catch (e) {
        console.log(e);
        toast.error('Inscribe fail');
      }
    }
  };

  const disabled = (!text && !file) || !selectedCFXs;

  return {
    type,
    setType,
    openCFXs,
    onOpenCFXs,
    file,
    setFile,
    inscribe,
    onCFXsSelect,
    selectedCFXs,
    text,
    onTextChange,
    disabled,
    setFileType,
  };
};

export default useInscribe;
