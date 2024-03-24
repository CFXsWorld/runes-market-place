'use client';

import { CloseIcon, LoadingIcon } from '@/app/components/icons';
import useInscribe from './useInscribe';
import { Button } from 'flowbite-react';
import WithAuth from '@/app/components/Wallet/WithAuth';
import usePromiseLoading from '@/app/hooks/usePromiseLoading';
import { cn } from '@/app/utils/classnames';
import FileUpload from '@/app/(pages)/inscribe/_components/Uploader';
import Checkbox from '@/app/components/ui/Checkbox';
import CFXsModal from './CFXsModal';
import TextInput from '@/app/(pages)/inscribe/_components/TextInput';

export const tabs = [
  {
    name: 'File',
    type: 'file',
    value: 0,
  },
  {
    name: 'Text',
    type: 'text',
    path: '/my/text',
    value: 1,
  },
];
const Inscribe = () => {
  const {
    type,
    setType,
    openCFXs,
    onOpenCFXs,
    setFile,
    inscribe,
    onCFXsSelect,
    selectedCFXs,
    text,
    onTextChange,
    disabled,
    setFileType,
  } = useInscribe();

  const { trigger, loading } = usePromiseLoading(inscribe);

  return (
    <div className="flex flex-col">
      <div className="flex-center-between">
        <span>Inscribe CFXs</span>
      </div>
      <div className="flex items-center justify-between text-[16px] max-md:text-[12px] font-[540] text-tc-secondary">
        <div className="flex items-center mt-[20px]">
          {tabs.map((tab) => (
            <div
              key={tab.value}
              onClick={() => {
                setType(tab.type);
              }}
              className={cn('px-[20px] mr-[20px]  py-[6px]   cursor-pointer', {
                'bg-fill-e-primary text-theme rounded-[6px]': type === tab.type,
              })}
            >
              {tab.name}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col mt-[24px] gap-[16px]  w-full">
        {type === 'file' ? (
          <FileUpload
            onChange={(file, fileType) => {
              setFile(file);
              setFileType(fileType);
            }}
          />
        ) : (
          <TextInput
            value={text}
            onChange={(e) => {
              onTextChange(e.target.value);
            }}
          />
        )}
      </div>

      {type === 'file' && (
        <div className="w-full flex justify-start mt-[20px] ">
          <Checkbox
            value={true}
            disabled
            className="text-tc-secondary max-md:text-[12px] max-md:mr-[16px]"
          >
            Publish On IPFs
          </Checkbox>
        </div>
      )}
      <CFXsModal
        onOpen={onOpenCFXs}
        open={openCFXs}
        onSelect={(item) => {
          onCFXsSelect(item);
          onOpenCFXs(false);
        }}
      />
      <div className="flex justify-between items-center mt-[10px] h-[40px]">
        <span className="text-tc-secondary">Select CFXs to inscribe</span>
        {selectedCFXs ? (
          <div className="flex items-center justify-center gap-[20px]">
            <span className="text-theme">#{selectedCFXs.id}</span>
            <span
              className="cursor-pointer"
              onClick={() => {
                onCFXsSelect(null);
              }}
            >
              <CloseIcon />
            </span>
          </div>
        ) : (
          <Button
            color="outline"
            className="ml-[10px] max-sm:text-[12px] btn btn-outline btn-primary max-sm:h-[26px] max-sm:min-h-[26px] h-[30px] min-h-[30px] text-[12px] font-normal line-clamp-1 ml-[3px]"
            onClick={() => {
              onOpenCFXs(true);
            }}
          >
            Select
          </Button>
        )}
      </div>
      <WithAuth>
        <Button
          className="w-full mt-[42px]"
          color="primary"
          disabled={disabled}
          onClick={() => {
            trigger();
          }}
        >
          {loading ? <LoadingIcon /> : 'SUBMIT'}
        </Button>
      </WithAuth>
    </div>
  );
};

export default Inscribe;
