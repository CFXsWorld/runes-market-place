import { Button, Modal } from 'flowbite-react';
import { SuccessIcon } from '@/app/components/icons';
import { useWalletStore } from '@/app/store/wallet';
import Link from 'next/link';

const TxModal = () => {
  const onOpen = useWalletStore((state) => state.onOpenTx);
  const open = useWalletStore((state) => state.openTx);
  const txId = useWalletStore((state) => state.txId);
  return (
    <Modal show={open} onClose={() => onOpen(false)} key={txId}>
      <Modal.Header>
        <div className="flex-center">
          <SuccessIcon className="mr-[10px]" />
          Write Contract
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="px-6 pb-6 flex flex-col">
          <div className="text-tc-secondary text-[14px]  mb-[24px] pt-[12px] border border-transparent border-t-fill-e-primary min-h-[80px] break-all">
            {`${txId}`}
          </div>
          <Link
            href={`https://evm.confluxscan.net/tx/${txId}`}
            target="_blank"
            className="text-theme"
          >
            View on ConfluxScan
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TxModal;
