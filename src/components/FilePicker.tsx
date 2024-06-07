// src/components/FilePicker.tsx
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FilePicker: React.FC<{ onFilesUploaded: (files: File[]) => void }> = ({ onFilesUploaded }) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFilesUploaded(acceptedFiles);
      setError(null); // reset error on successful upload
    }
  }, [onFilesUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },  // only accept CSV and Excel files
    onDragLeave: () => setError(null), // reset error on drag leave
    onDropRejected: (rejectedFiles) => {
      setError('Wrong data file. Please upload a CSV or Excel file.'); // set error message on rejected file
    },
  });

  return (
    <div {...getRootProps()} className="w-1/2 h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl cursor-pointer">
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the file here...</p> : (
        <p>Drag & drop data files here, or click to select data files</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default FilePicker;
