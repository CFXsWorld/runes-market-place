'use client';

import { Modal } from 'flowbite-react';
import WalletDetail from '@/app/components/Wallet/WalletDetail';

const theme = {
  root: {
    base: 'fixed bottom-0 right-0 left-0 z-[1000] h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full justify-start',
    sizes: {
      '2xl': 'max-w-[100vw]',
    },
  },
  content: {
    base: 'relative w-full p-0',
    inner:
      'relative rounded-[0] bg-fill-e-secondary shadow dark:bg-gray-700 flex flex-col h-auto left-0',
  },
};

const WalletInfoModal = ({ open, onOpen }) => {
  return (
    <Modal
      show={open}
      onClose={() => onOpen(false)}
      dismissible
      theme={theme}
      position="bottom-center"
    >
      <Modal.Body>
        <WalletDetail />
      </Modal.Body>
    </Modal>
  );
};

export default WalletInfoModal;
