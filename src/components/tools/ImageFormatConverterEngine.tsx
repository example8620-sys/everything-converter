import React, { useState } from 'react';
import { Upload, Download, RefreshCw } from 'lucide-react';
import { Language } from '../../types';

interface ImageFormatConverterProps {
  lang: Language;
  defaultTarget?: 'png' | 'jpeg' | 'webp';
}

export const ImageFormatConverterEngine: React.FC<ImageFormatConverterProps> = ({
  lang,
  defaultTarget = 'png',
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<'png' | 'jpeg' | 'webp'>(defaultTarget);
  const [quality, setQuality] = useState<number>(92);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setImageSrc(src);
      convert(src, targetFormat, quality);
    };
    reader.readAsDataURL(file);
  };

  const convert = (src: string, format: 'png' | 'jpeg' | 'webp', qual: number) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (format === 'jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, img.width, img.height);
      }
      ctx.drawImage(img, 0, 0);

      const mime = `image/${format}`;
      const dataUrl = canvas.toDataURL(mime, qual / 100);
      setConvertedUrl(dataUrl);
    };
    img.src = src;
  };

  const handleFormatChange = (newFmt: 'png' | 'jpeg' | 'webp') => {
    setTargetFormat(newFmt);
    if (imageSrc) {
      convert(imageSrc, newFmt, quality);
    }
  };

  const handleDownload = () => {
    if (!convertedUrl) return;
    const link = document.createElement('a');
    const ext = targetFormat === 'jpeg' ? 'jpg' : targetFormat;
    const nameWithoutExt = imageFile?.name.replace(/\.[^/.]+$/, '') || 'converted-image';
    link.download = `${nameWithoutExt}.${ext}`;
    link.href = convertedUrl;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        {!imageSrc ? (
          <label className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center cursor-pointer hover:bg-slate-100/60 dark:border-slate-700 dark:bg-slate-950/40 transition">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400">
              <Upload className="h-7 w-7" />
            </div>
            <h4 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
              {lang === 'hi' ? 'फोटो अपलोड करें' : 'Select Image to Convert Format'}
            </h4>
            <p className="mt-1 text-xs text-slate-500">Supports JPG, PNG, WebP, GIF, BMP</p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </label>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-slate-500">Convert To:</span>
                <div className="mt-1.5 flex items-center gap-2">
                  {(['png', 'jpeg', 'webp'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => handleFormatChange(fmt)}
                      className={`rounded-xl px-4 py-1.5 text-xs font-bold uppercase transition ${
                        targetFormat === fmt
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {fmt === 'jpeg' ? 'JPG' : fmt}
                    </button>
                  ))}
                </div>
              </div>

              {targetFormat !== 'png' && (
                <div className="w-48">
                  <label className="text-xs font-bold text-slate-500">Quality: {quality}%</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => {
                      const q = Number(e.target.value);
                      setQuality(q);
                      if (imageSrc) convert(imageSrc, targetFormat, q);
                    }}
                    className="mt-1 w-full accent-blue-600"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-center">
              {convertedUrl && (
                <div className="max-h-80 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 p-2 dark:border-slate-800 dark:bg-slate-950">
                  <img src={convertedUrl} alt="Converted" className="max-h-72 object-contain rounded-lg" />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
              <label className="cursor-pointer text-xs font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-400">
                Choose Different File
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
              </label>

              <button
                id="download-converted-format-btn"
                onClick={handleDownload}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition"
              >
                <Download className="h-4 w-4" />
                <span>
                  Download as {targetFormat === 'jpeg' ? 'JPG' : targetFormat.toUpperCase()}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
