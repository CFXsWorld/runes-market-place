import React, { useState, useRef } from 'react';
import { CloseIcon } from '@/app/components/icons';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const KILO_BYTES_PER_BYTE = 1024;

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
const AUDIO_TYPES = [
  'video/mp4',
  'video/quicktime',
  'video/x-msvideo',
  'video/x-matroska',
  'audio/mp3',
  'audio/mpeg',
  'audio/wav',
  'audio/ogg',
  'audio/flac',
];
const ALLOWED_FILE_TYPES = [...IMAGE_TYPES, ...AUDIO_TYPES];

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const DragAndDropUpload = ({ onChange }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const beforeUpload = (files) => {
    if (files.length > 1) {
      return;
    }
    const file = files[0];
    if (!file || !ALLOWED_FILE_TYPES.includes(file.type)) {
      return;
    }

    if (file && file.size > MAX_FILE_SIZE_BYTES) {
      return;
    }
    const file_type = AUDIO_TYPES.includes(file.type) ? 2 : 1;
    setUploadedFile(file);
    onChange(file, file_type);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    beforeUpload([...e.target.files]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileInputChange = (e) => {
    beforeUpload([...e.target.files]);
  };

  const handleUpload = () => {
    console.log('上传文件:');
    setUploadedFile(null);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-[100px]">
      <div
        className="border border-dashed border-theme p-4 rounded-lg cursor-pointer w-full h-[100px]"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => {
          if (!uploadedFile) {
            fileInputRef.current.click();
          }
        }}
      >
        {uploadedFile ? (
          <div className="relative">
            <p className="text-[14px] font-semibold text-tc-secondary pr-[40px]">
              {uploadedFile.name}
            </p>
            <p className="text-[12px] mt-2 text-tc-secondary">
              {formatBytes(uploadedFile.size || 0)}
            </p>
            <span
              className="cursor-pointer absolute right-[10px] top-[2px]"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setUploadedFile(null);
              }}
            >
              <CloseIcon />{' '}
            </span>
          </div>
        ) : (
          <div>
            <p className="text-[14px] font-semibold text-tc-secondary">
              Drag and drop your file here, or click to select file
            </p>
            <p className="text-[12px] mt-2 text-tc-secondary">
              .jpg, .png, .gif, .mp4, .mp3 + more!. Limit 10MB
            </p>
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              accept=".jpg,.jpeg,.png,.gif,.svg,.mp4,.mov,.avi,.mkv,.mp3,.wav,.ogg,.flac"
              onChange={handleFileInputChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DragAndDropUpload;
