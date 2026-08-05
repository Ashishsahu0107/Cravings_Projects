import React, { useCallback, useState } from 'react';
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';

export const ImageUpload = ({ 
  label, 
  error, 
  id,
  value, // Assuming value is a File object or a string URL
  onChange,
  containerClassName = "",
  helperText,
}) => {
  const [preview, setPreview] = useState(
    value ? (typeof value === 'string' ? value : URL.createObjectURL(value)) : null
  );

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(file);
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    setPreview(null);
    onChange(null);
  };

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
          {label}
        </span>
      )}
      
      <div className={`relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl transition-all ${
        error ? 'border-red-300 bg-red-50/50 dark:bg-red-900/10 dark:border-red-500/50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 dark:bg-slate-800/50 dark:border-slate-700 dark:hover:bg-slate-800'
      }`}>
        {preview ? (
          <div className="relative w-full h-full p-2 group">
            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
            <div className="absolute inset-2 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                type="button"
                onClick={handleRemove}
                className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-sm transition-all"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        ) : (
          <label htmlFor={id} className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-8 h-8 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-orange-500">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id={id} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </label>
        )}
      </div>

      {error && <span className="text-xs font-semibold text-red-500">{error.message}</span>}
      {!error && helperText && <span className="text-xs text-gray-500">{helperText}</span>}
    </div>
  );
};

export default ImageUpload;
