import React, { useRef, useState, useCallback } from 'react';
import { Upload, X, FileText, Image } from 'lucide-react';

interface FileUploadZoneProps {
  label: string;
  helpText: string;
  accept: string;
  multiple?: boolean;
  maxFiles?: number;
  files: File[];
  onChange: (files: File[]) => void;
}

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const isImage = (file: File) => file.type.startsWith('image/');

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  label,
  helpText,
  accept,
  multiple = false,
  maxFiles = 1,
  files,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    const newFiles = Array.from(incoming);
    if (multiple) {
      const combined = [...files, ...newFiles].slice(0, maxFiles);
      onChange(combined);
    } else {
      onChange(newFiles.slice(0, 1));
    }
  }, [files, multiple, maxFiles, onChange]);

  const removeFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const atLimit = files.length >= maxFiles;

  return (
    <div>
      <label className="block text-sm font-medium text-zinc-300 mb-1.5">{label}</label>
      <p className="text-xs text-zinc-500 mb-2">{helpText}</p>

      {!atLimit && (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            flex flex-col items-center justify-center gap-2 p-5 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200
            ${isDragOver
              ? 'border-accent-pink/50 bg-accent-pink/5'
              : 'border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.02]'
            }
          `}
        >
          <Upload className="w-5 h-5 text-zinc-500" />
          <span className="text-sm text-zinc-400">
            Drop files here or <span className="text-accent-pink font-medium">browse</span>
          </span>
          {multiple && (
            <span className="text-xs text-zinc-600">Up to {maxFiles} files</span>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />

      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((file, i) => (
            <div
              key={`${file.name}-${i}`}
              className="flex items-center gap-3 bg-dark-700 rounded-lg px-3 py-2 text-sm"
            >
              {isImage(file) ? (
                <Image className="w-4 h-4 text-accent-pink flex-shrink-0" />
              ) : (
                <FileText className="w-4 h-4 text-accent-orange flex-shrink-0" />
              )}
              <span className="text-zinc-300 truncate flex-1">{file.name}</span>
              <span className="text-zinc-600 text-xs flex-shrink-0">{formatSize(file.size)}</span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="p-1 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
