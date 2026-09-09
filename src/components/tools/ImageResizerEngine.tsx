import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, Lock, Unlock, Image as ImageIcon } from 'lucide-react';
import { Language } from '../../types';

interface ImageResizerEngineProps {
  lang: Language;
}

export const ImageResizerEngine: React.FC<ImageResizerEngineProps> = ({ lang }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [keepAspectRatio, setKeepAspectRatio] = useState<boolean>(true);
  const [format, setFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [quality, setQuality] = useState<number>(90);

  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        imgRef.current = img;
        setImageSrc(src);
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (keepAspectRatio && originalWidth > 0) {
      setHeight(Math.round((val / originalWidth) * originalHeight));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (keepAspectRatio && originalHeight > 0) {
      setWidth(Math.round((val / originalHeight) * originalWidth));
    }
  };

  const applySocialPreset = (w: number, h: number) => {
    setKeepAspectRatio(false);
    setWidth(w);
    setHeight(h);
  };

  const handleDownload = () => {
    if (!imgRef.current || width <= 0 || height <= 0) return;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (format === 'image/jpeg') {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
    }
    ctx.drawImage(imgRef.current, 0, 0, width, height);

    const ext = format === 'image/png' ? 'png' : format === 'image/webp' ? 'webp' : 'jpg';
    const link = document.createElement('a');
    link.download = `resized-${width}x${height}.${ext}`;
    link.href = canvas.toDataURL(format, quality / 100);
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
              {lang === 'hi' ? 'फोटो अपलोड करें' : 'Select Photo to Resize'}
            </h4>
            <p className="mt-1 text-xs text-slate-500">JPG, PNG, WebP or GIF</p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </label>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Preview Column */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="max-h-72 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 p-2 dark:border-slate-800 dark:bg-slate-950">
                <img src={imageSrc} alt="Preview" className="max-h-64 object-contain rounded-lg" />
              </div>
              <p className="mt-2 text-xs font-semibold text-slate-500">
                Original Size: {originalWidth} × {originalHeight} px
              </p>
            </div>

            {/* Controls Column */}
            <div className="lg:col-span-6 space-y-4">
              {/* Presets */}
              <div>
                <label className="text-xs font-bold text-slate-500">Social Media Presets:</label>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  <button
                    onClick={() => applySocialPreset(500, 500)}
                    className="rounded-lg border px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    WhatsApp DP (500×500)
                  </button>
                  <button
                    onClick={() => applySocialPreset(1080, 1080)}
                    className="rounded-lg border px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Insta Square (1080×1080)
                  </button>
                  <button
                    onClick={() => applySocialPreset(1280, 720)}
                    className="rounded-lg border px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    YouTube 720p (1280×720)
                  </button>
                  <button
                    onClick={() => applySocialPreset(1920, 1080)}
                    className="rounded-lg border px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Full HD (1920×1080)
                  </button>
                </div>
              </div>

              {/* Dimensions */}
              <div className="grid grid-cols-2 gap-3 items-end">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Width (px):</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(Number(e.target.value))}
                    className="mt-1 w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Height (px):</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(Number(e.target.value))}
                    className="mt-1 w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setKeepAspectRatio(!keepAspectRatio)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  {keepAspectRatio ? (
                    <Lock className="h-3.5 w-3.5 text-blue-600" />
                  ) : (
                    <Unlock className="h-3.5 w-3.5 text-slate-400" />
                  )}
                  <span>Lock Aspect Ratio</span>
                </button>
              </div>

              {/* Format & Quality */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-500">Output Format:</label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value as any)}
                    className="mt-1 w-full h-10 rounded-xl border border-slate-200 bg-white px-2 text-xs font-semibold dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <option value="image/jpeg">JPG / JPEG</option>
                    <option value="image/png">PNG</option>
                    <option value="image/webp">WebP</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500">Quality: {quality}%</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="mt-2 w-full accent-blue-600"
                  />
                </div>
              </div>

              {/* Download */}
              <button
                id="download-resized-image-btn"
                onClick={handleDownload}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition"
              >
                <Download className="h-4 w-4" />
                <span>Download Resized Image ({width}×{height} px)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
