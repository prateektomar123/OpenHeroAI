import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

export default function ImageUpload({ onImageSelect, selectedImage }) {
  const [preview, setPreview] = useState(selectedImage);
  const [isPasting, setIsPasting] = useState(false);
  const [uploadMethod, setUploadMethod] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
        setUploadMethod('uploaded');
        onImageSelect(file);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const removeImage = () => {
    setPreview(null);
    setUploadMethod('');
    onImageSelect(null);
  };

  // Handle paste events
  const handlePaste = useCallback(async (event) => {
    const items = event.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf('image') !== -1) {
        event.preventDefault();
        setIsPasting(true);

        try {
          const blob = item.getAsFile();
          if (blob) {
            // Check file size (10MB limit)
            if (blob.size > 10 * 1024 * 1024) {
              alert('Image is too large. Maximum file size is 10MB.');
              setIsPasting(false);
              return;
            }

            // Create a File object with a proper name
            const file = new File([blob], `pasted-image-${Date.now()}.png`, { type: blob.type });

            // Set preview
            const reader = new FileReader();
            reader.onload = () => {
              setPreview(reader.result);
              setUploadMethod('pasted');
              onImageSelect(file);
              setIsPasting(false);
            };
            reader.readAsDataURL(blob);
          }
        } catch (error) {
          console.error('Error handling pasted image:', error);
          setIsPasting(false);
        }
        break; // Only handle the first image
      }
    }
  }, [onImageSelect]);

  // Set up paste event listener
  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [handlePaste]);

  if (preview) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full max-h-64 sm:max-h-96 object-contain rounded-lg bg-slate-800 border border-slate-700"
            style={{ minHeight: '150px' }}
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-2 left-2 right-2 bg-slate-900/90 rounded p-2">
            <p className="text-xs text-slate-300 font-medium">
              Image {uploadMethod === 'pasted' ? 'pasted' : 'uploaded'} successfully
            </p>
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={removeImage}
            className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600 transition-colors"
          >
            Remove Image
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Upload Your Photo
        </h3>
        <p className="text-sm sm:text-base text-slate-400">Choose an image to transform into your hero</p>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-slate-600 hover:border-slate-500 bg-slate-700/50 focus-within:border-blue-400 focus-within:bg-blue-500/5'
        }`}
        tabIndex={0}
      >
        <input {...getInputProps()} />

        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-slate-600 rounded-lg flex items-center justify-center">
            {isPasting ? (
              <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            ) : isDragActive ? (
              <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
            ) : (
              <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
            )}
          </div>

          <div className="space-y-2">
            <p className="text-lg sm:text-xl font-bold text-white">
              {isPasting ? 'Processing pasted image...' : isDragActive ? 'Drop your image here!' : 'Upload your image'}
            </p>
            <p className="text-sm text-slate-400">
              {isDragActive ? 'Release to upload' : 'Drag & drop, click to browse, or paste image (Ctrl+V / Cmd+V)'}
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-500 mt-4">
              <span className="bg-slate-500/10 px-2 py-1 rounded border border-slate-500/20">JPEG</span>
              <span className="bg-slate-500/10 px-2 py-1 rounded border border-slate-500/20">PNG</span>
              <span className="bg-slate-500/10 px-2 py-1 rounded border border-slate-500/20">GIF</span>
              <span className="bg-slate-500/10 px-2 py-1 rounded border border-slate-500/20">WebP</span>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Maximum file size: 10MB
            </p>
            <p className="text-xs text-slate-400 mt-2 opacity-75">
              💡 Tip: Press Ctrl+V (Cmd+V on Mac) to paste images directly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
