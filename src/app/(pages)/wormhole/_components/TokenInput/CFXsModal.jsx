'use client';

import { Modal } from 'flowbite-react';
import { forwardRef } from 'react';
import AssetsList from '@/app/(pages)/wormhole/_components/TokenInput/AssetsList';
import useSWRMutation from 'swr/mutation';
import { APIs } from '@/app/services/request';
import { getMyCFXsList } from '@/app/services';

const CFXsModal = forwardRef(({ onOpen, open }, ref) => {
  const { isMutating, trigger: getData } = useSWRMutation(
    APIs.MY_CFXs_LIST,
    getMyCFXsList
  );

  return (
    <Modal show={open} onClose={() => onOpen(false)}>
      <Modal.Header>Select CFXs</Modal.Header>
      <Modal.Body>
        <AssetsList
          onConfirm={() => {}}
          open={open}
          getData={getData}
          isMutating={isMutating}
        />
      </Modal.Body>
    </Modal>
  );
});

export default CFXsModal;
