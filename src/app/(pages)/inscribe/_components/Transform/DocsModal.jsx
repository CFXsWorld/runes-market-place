'use client';

import { Modal } from 'flowbite-react';
import { forwardRef } from 'react';

const DocsModal = forwardRef(({ onOpen, open }, ref) => {
  return (
    <Modal show={open} onClose={() => onOpen(false)}>
      <Modal.Header>Wormhole</Modal.Header>
      <Modal.Body>
        <div className="p-6 flex flex-col  bg-fill-e-secondary ">
          <p className="text-tc-secondary md:mb-[16px] max:md:mb-[8px] text-[14px]">
            Entering the CFXs world wormhole, the unique “Rosen Bridge” will
            transform CFXs into ERC20 or ERC721.
          </p>
          <p className="text-tc-secondary md:mb-[24px] max:md:mb-[12px] text-[14px]">
            First put on a helmet, then you need to master the following
            wormhole safety guidelines:
          </p>
          <div className="bg-fill-e-primary text-[12px] w-[96px] text-center py-[4px] text-theme mb-[10px] ">
            CFXs to Token
          </div>
          <p className="text-tc-secondary md:mb-[16px] max:md:mb-[8px] text-[14px]">
            The ID of CFXs will not be retained, and the total amount of CFXs
            will be transform into the total amount of Token.
          </p>
          <div className="bg-fill-e-primary text-[12px] w-[96px] text-center py-[4px] text-theme mb-[10px] ">

            CFXs to NFT
          </div>
          <p className="text-tc-secondary md:mb-[16px] max:md:mb-[8px] text-[14px]">
            The ID of CFXs will be written into the token ID of NFT. In addition
            to obtaining NFT, the total amount of CFXs will be transform into
            the total amount of Token.
          </p>
          <div className="bg-fill-e-primary text-[12px] w-[96px] text-center py-[4px] text-theme mb-[10px] ">

            Token to CFXs
          </div>
          <p className="text-tc-secondary md:mb-[16px] max:md:mb-[8px] text-[14px]">
            Entering the CFXs world wormhole, the unique “Rosen Bridge” will
            transform CFXs into ERC20 or ERC721. You will receive a new CFXs.
          </p>
          <div className="bg-fill-e-primary text-[12px] w-[96px] text-center py-[4px] text-theme mb-[10px] ">
            NFT to CFXs
          </div>
          <p className="text-tc-secondary md:mb-[16px] max:md:mb-[8px] text-[14px]">
            NFT token ID and corresponding token balance are restored to the
            original CFXs.
          </p>

          <p className="text-tc-secondary md:mb-[16px] max:md:mb-[8px] text-[14px]">
            Enjoy the journey.
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
});

export default DocsModal;
