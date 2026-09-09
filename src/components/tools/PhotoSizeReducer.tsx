import React, { useState, useRef } from 'react';
import { Upload, Download, Check, Sparkles, AlertCircle } from 'lucide-react';
import { Language } from '../../types';

interface PhotoSizeReducerProps {
  lang: Language;
}

export const PhotoSizeReducer: React.FC<PhotoSizeReducerProps> = ({ lang }) => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [originalSizeKb, setOriginalSizeKb] = useState<number>(0);

  const [targetKb, setTargetKb] = useState<number>(100);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSizeKb, setCompressedSizeKb] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const PRESETS = [20, 50, 100, 200, 500];

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setOriginalFile(file);
    const sizeKb = file.size / 1024;
    setOriginalSizeKb(sizeKb);
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);
    compressToTarget(file, targetKb);
  };

  const compressToTarget = async (file: File, targetSizeKb: number) => {
    setIsProcessing(true);
    try {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      await new Promise((resolve) => {
        img.onload = resolve;
        img.src = objectUrl;
      });

      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, width, height);

      // Binary search for optimal quality between 0.05 and 0.95
      let minQuality = 0.05;
      let maxQuality = 0.95;
      let bestBlob: Blob | null = null;
      let attempts = 0;

      while (attempts < 8) {
        const midQuality = (minQuality + maxQuality) / 2;
        const blob: Blob = await new Promise((res) => {
          canvas.toBlob((b) => res(b!), 'image/jpeg', midQuality);
        });

        const currentKb = blob.size / 1024;

        if (currentKb <= targetSizeKb) {
          bestBlob = blob;
          minQuality = midQuality; // try better quality
        } else {
          maxQuality = midQuality; // lower quality needed
        }

        attempts++;
      }

      // If even at lowest quality it's still bigger than target, scale down dimensions
      if (!bestBlob || bestBlob.size / 1024 > targetSizeKb) {
        let scaleFactor = 0.9;
        while (scaleFactor > 0.2) {
          width = Math.round(img.width * scaleFactor);
          height = Math.round(img.height * scaleFactor);
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          const blob: Blob = await new Promise((res) => {
            canvas.toBlob((b) => res(b!), 'image/jpeg', 0.65);
          });

          if (blob.size / 1024 <= targetSizeKb || scaleFactor <= 0.25) {
            bestBlob = blob;
            break;
          }
          scaleFactor -= 0.15;
        }
      }

      if (bestBlob) {
        if (compressedUrl) URL.revokeObjectURL(compressedUrl);
        const newUrl = URL.createObjectURL(bestBlob);
        setCompressedBlob(bestBlob);
        setCompressedUrl(newUrl);
        setCompressedSizeKb(bestBlob.size / 1024);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePresetClick = (kb: number) => {
    setTargetKb(kb);
    if (originalFile) {
      compressToTarget(originalFile, kb);
    }
  };

  const handleDownload = () => {
    if (!compressedBlob) return;
    const link = document.createElement('a');
    link.download = `compressed-${Math.round(compressedSizeKb)}kb.jpg`;
    link.href = compressedUrl!;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Target KB Selector Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Target Maximum File Size</h3>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset}
                  onClick={() => handlePresetClick(preset)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                    targetKb === preset
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {preset} KB
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Custom Target:</span>
            <div className="flex items-center">
              <input
                type="number"
                min="5"
                max="10000"
                value={targetKb}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setTargetKb(val);
                  if (originalFile && val > 0) compressToTarget(originalFile, val);
                }}
                className="h-10 w-24 rounded-l-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
              <span className="flex h-10 items-center rounded-r-xl border border-l-0 border-slate-200 bg-slate-100 px-3 text-xs font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300">
                KB
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Upload & Compression Display */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        {!originalUrl ? (
          <label className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center cursor-pointer hover:bg-slate-100/60 dark:border-slate-700 dark:bg-slate-950/40 transition">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400">
              <Upload className="h-7 w-7" />
            </div>
            <h4 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
              {lang === 'hi' ? 'फोटो अपलोड करें' : 'Select Photo to Reduce Size'}
            </h4>
            <p className="mt-1 text-xs text-slate-500">JPG, PNG, or WebP</p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            />
          </label>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Original Preview */}
              <div className="flex flex-col items-center rounded-xl border border-slate-200 p-4 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950">
                <span className="text-xs font-bold text-slate-500">Original Photo</span>
                <img src={originalUrl} alt="Original" className="mt-2 max-h-56 rounded-lg object-contain" />
                <span className="mt-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                  {originalSizeKb.toFixed(1)} KB ({(originalSizeKb / 1024).toFixed(2)} MB)
                </span>
              </div>

              {/* Compressed Preview */}
              <div className="flex flex-col items-center rounded-xl border border-blue-200 p-4 bg-blue-50/30 dark:border-blue-900 dark:bg-blue-950/30">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Compressed Result (Target: ≤ {targetKb} KB)</span>
                </span>
                {compressedUrl ? (
                  <img src={compressedUrl} alt="Compressed" className="mt-2 max-h-56 rounded-lg object-contain" />
                ) : (
                  <div className="mt-2 h-56 flex items-center justify-center text-xs text-slate-400">Processing...</div>
                )}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                    {compressedSizeKb.toFixed(1)} KB
                  </span>
                  {originalSizeKb > 0 && (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
                      -{Math.max(0, Math.round(((originalSizeKb - compressedSizeKb) / originalSizeKb) * 100))}% saved
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
              <label className="cursor-pointer text-xs font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-400">
                Choose Different Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                />
              </label>

              <button
                id="download-reduced-photo-btn"
                onClick={handleDownload}
                disabled={!compressedBlob || isProcessing}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 transition"
              >
                <Download className="h-4 w-4" />
                <span>Download Photo ({Math.round(compressedSizeKb)} KB)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
