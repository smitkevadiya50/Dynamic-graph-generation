// src/components/FilePicker.tsx
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FilePicker: React.FC<{ onFilesUploaded: (files: File[]) => void }> = ({ onFilesUploaded }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesUploaded(acceptedFiles);
  }, [onFilesUploaded]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-md cursor-pointer">
      <input {...getInputProps()} />
      <p>Drag & drop data files here, or click to select data files</p>
    </div>
  );
};

export default FilePicker;
