import React, { useState } from 'react';
import { Upload, Download, Trash2, FileText, MoveUp, MoveDown } from 'lucide-react';
import { Language } from '../../types';

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
  sizeKb: number;
}

export const ImageToPdfEngine: React.FC<{ lang: Language }> = ({ lang }) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<'a4' | 'fit'>('a4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFiles = (fileList: FileList) => {
    const newItems: ImageItem[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const f = fileList[i];
      if (f.type.startsWith('image/')) {
        newItems.push({
          id: `${Date.now()}-${i}-${Math.random()}`,
          file: f,
          previewUrl: URL.createObjectURL(f),
          name: f.name,
          sizeKb: Math.round(f.size / 1024),
        });
      }
    }
    setImages((prev) => [...prev, ...newItems]);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= images.length) return;
    const copy = [...images];
    const temp = copy[index];
    copy[index] = copy[newIdx];
    copy[newIdx] = temp;
    setImages(copy);
  };

  // Compile photos into PDF document using canvas frames
  const generatePdf = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);

    try {
      // Build an iframe-free printable HTML popup or multi-page image print
      // Create a print window with embedded base64 images that saves cleanly as PDF
      const loadedImages: HTMLImageElement[] = [];
      for (const item of images) {
        const img = new Image();
        await new Promise((res) => {
          img.onload = res;
          img.src = item.previewUrl;
        });
        loadedImages.push(img);
      }

      // Generate printable pages
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert('Please allow popups to download the generated PDF');
        return;
      }

      const isA4 = pageSize === 'a4';
      const isLandscape = orientation === 'landscape';

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Everything Converter - Compiled PDF Document</title>
          <style>
            @page {
              size: ${isA4 ? (isLandscape ? 'A4 landscape' : 'A4 portrait') : 'auto'};
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              background-color: #f1f5f9;
              font-family: sans-serif;
            }
            .page-container {
              page-break-after: always;
              width: 100vw;
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #ffffff;
              overflow: hidden;
            }
            .page-container img {
              max-width: 95%;
              max-height: 95%;
              object-fit: contain;
            }
            @media print {
              body { background: transparent; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="no-print" style="position:fixed; top:10px; right:10px; z-index:9999; background: #2563eb; color:white; padding:12px 20px; border-radius:8px; font-weight:bold; cursor:pointer;" onclick="window.print()">
            Click to Print / Save as PDF
          </div>
          ${images
            .map(
              (img) => `
            <div class="page-container">
              <img src="${img.previewUrl}" alt="Page" />
            </div>
          `
            )
            .join('')}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 500);
            };
          </script>
        </body>
        </html>
      `;

      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        {/* Upload Zone */}
        <label className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center cursor-pointer hover:bg-slate-100/60 dark:border-slate-700 dark:bg-slate-950/40 transition">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400">
            <Upload className="h-7 w-7" />
          </div>
          <h4 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
            {lang === 'hi' ? 'फोटो अपलोड करें (एक या अधिक)' : 'Select or Drop Images to Convert to PDF'}
          </h4>
          <p className="mt-1 text-xs text-slate-500">Supports JPG, PNG, and WebP files</p>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
        </label>

        {/* Selected List */}
        {images.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {images.length} Image{images.length > 1 ? 's' : ''} Selected
              </span>

              <div className="flex items-center gap-3">
                <div>
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value as any)}
                    className="h-9 rounded-xl border border-slate-200 bg-white px-2.5 text-xs font-semibold dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <option value="a4">Standard A4 Document</option>
                    <option value="fit">Fit Image Dimensions</option>
                  </select>
                </div>
                <div>
                  <select
                    value={orientation}
                    onChange={(e) => setOrientation(e.target.value as any)}
                    className="h-9 rounded-xl border border-slate-200 bg-white px-2.5 text-xs font-semibold dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                  </select>
                </div>
              </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {images.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 p-2.5 bg-slate-50 dark:border-slate-800 dark:bg-slate-950"
                >
                  <img src={item.previewUrl} alt={item.name} className="h-12 w-12 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-slate-800 dark:text-slate-200">{item.name}</p>
                    <p className="text-[10px] text-slate-400">
                      Page {idx + 1} • {item.sizeKb} KB
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => moveItem(idx, 'up')}
                      disabled={idx === 0}
                      className="text-slate-400 hover:text-slate-600 disabled:opacity-30"
                      title="Move Up"
                    >
                      <MoveUp className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => moveItem(idx, 'down')}
                      disabled={idx === images.length - 1}
                      className="text-slate-400 hover:text-slate-600 disabled:opacity-30"
                      title="Move Down"
                    >
                      <MoveDown className="h-3 w-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeImage(item.id)}
                    className="text-rose-500 hover:text-rose-700 p-1"
                    title="Remove"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Generate Button */}
            <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                id="generate-pdf-doc-btn"
                onClick={generatePdf}
                disabled={isGenerating}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition"
              >
                <Download className="h-4 w-4" />
                <span>{isGenerating ? 'Compiling PDF...' : 'Download / Print PDF Document'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
