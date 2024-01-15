'use client';

import { TipsIcon } from '@/app/components/icons';
import {  Tooltip } from 'flowbite-react';

const Fee = ({ value, onChange, className }) => {
  return (
    <div className="flex-center-between mt-[16px]">
      <div className="text-tc-secondary flex-center">
        Fee
        <Tooltip
          content={
            <div className="flex flex-col text-tc-secondary text-[14px] gap-[5px]">
              <span>CFXs to Token: CFXs amount*0.01 CFX</span>
              <span> CFXs to NFT: CFXs amount*0.1 CFX</span>
              <span> Token to CFXs: 0.2 CFX</span>
              <span> NFT to CFXs: CFXs amount*0.1 CFX</span>
            </div>
          }
          className="flex-center"
          placement="right"
        >
          <TipsIcon className="ml-[5px] cursor-pointer" />
        </Tooltip>
      </div>
      <div>{1} CFX</div>
    </div>
  );
};

export default Fee;
