'use client';

import { Modal } from 'flowbite-react';
import { forwardRef } from 'react';
import AssetsList from '@/app/(pages)/wormhole/_components/TokenInput/AssetsList';

const NFTModal = forwardRef(({ onOpen, open }, ref) => {
  return (
    <Modal show={open} onClose={() => onOpen(false)}>
      <Modal.Header>Select NFT</Modal.Header>
      <Modal.Body>
        <AssetsList
          onConfirm={() => {}}
          open={open}
          getData={async () => ({ count: 0, rows: [] })}
          isMutating={false}
        />
      </Modal.Body>
    </Modal>
  );
});

export default NFTModal;
