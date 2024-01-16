'use client';

import { Modal } from 'flowbite-react';
import { forwardRef } from 'react';
import AssetsList from '@/app/(pages)/wormhole/_components/TokenInput/AssetsList';
import useSWRMutation from 'swr/mutation';
import { APIs } from '@/app/services/request';
import { getMyCFXsList } from '@/app/services';

const NFTModal = forwardRef(({ onOpen, open, onSelect }, ref) => {
  const { isMutating, trigger: getData } = useSWRMutation(
    APIs.MY_CFXs_LIST,
    getMyCFXsList
  );
  return (
    <Modal show={open} onClose={() => onOpen(false)}>
      <Modal.Header>Select NFT</Modal.Header>
      <Modal.Body>
        <AssetsList
          onConfirm={onSelect}
          open={open}
          getData={getData}
          isMutating={isMutating}
        />
      </Modal.Body>
    </Modal>
  );
});

export default NFTModal;
