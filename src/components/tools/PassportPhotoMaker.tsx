import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Upload,
  Download,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Printer,
  Grid,
  Sparkles,
} from 'lucide-react';
import { Language } from '../../types';

interface PassportPhotoMakerProps {
  lang: Language;
}

interface CountryPreset {
  id: string;
  name: string;
  widthMm: number;
  heightMm: number;
  widthPx: number; // at 300 DPI
  heightPx: number;
  description: string;
}

const PRESETS: CountryPreset[] = [
  { id: 'india', name: 'India (Passport, Visa, OCI)', widthMm: 35, heightMm: 45, widthPx: 413, heightPx: 531, description: '35 mm × 45 mm' },
  { id: 'us', name: 'USA (Passport, Visa, Green Card)', widthMm: 50.8, heightMm: 50.8, widthPx: 600, heightPx: 600, description: '2 × 2 inches (51 × 51 mm)' },
  { id: 'uk-schengen', name: 'UK / Schengen / Europe (Visa, ID)', widthMm: 35, heightMm: 45, widthPx: 413, heightPx: 531, description: '35 mm × 45 mm' },
  { id: 'canada', name: 'Canada (Passport, Visa)', widthMm: 50, heightMm: 70, widthPx: 590, heightPx: 826, description: '50 mm × 70 mm' },
  { id: 'australia', name: 'Australia (Passport)', widthMm: 35, heightMm: 45, widthPx: 413, heightPx: 531, description: '35 mm × 45 mm' },
  { id: 'custom', name: 'Custom Dimension', widthMm: 35, heightMm: 45, widthPx: 413, heightPx: 531, description: 'User Defined' },
];

export const PassportPhotoMaker: React.FC<PassportPhotoMakerProps> = ({ lang }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string>('india');
  const [customWidthMm, setCustomWidthMm] = useState<number>(35);
  const [customHeightMm, setCustomHeightMm] = useState<number>(45);

  const [zoom, setZoom] = useState<number>(1);
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);
  const [rotation, setRotation] = useState<number>(0);
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [sheetLayout, setSheetLayout] = useState<'single' | '4x6' | 'a4'>('single');
  const [showGuidelines, setShowGuidelines] = useState<boolean>(true);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const currentPreset = PRESETS.find((p) => p.id === selectedPreset) || PRESETS[0];

  const targetWidthPx = selectedPreset === 'custom' ? Math.round((customWidthMm / 25.4) * 300) : currentPreset.widthPx;
  const targetHeightPx = selectedPreset === 'custom' ? Math.round((customHeightMm / 25.4) * 300) : currentPreset.heightPx;

  // Handle file select
  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        imgRef.current = img;
        setImageSrc(src);
        setZoom(1);
        setPanX(0);
        setPanY(0);
        setRotation(0);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Render photo onto canvas
  const drawPhoto = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imgRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = targetWidthPx;
    canvas.height = targetHeightPx;

    // Fill background color
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, targetWidthPx, targetHeightPx);

    ctx.save();
    // Center of canvas
    ctx.translate(targetWidthPx / 2 + panX, targetHeightPx / 2 + panY);
    ctx.rotate((rotation * Math.PI) / 180);

    const img = imgRef.current;
    // Scale to fill maintaining aspect ratio
    const scale = Math.max(targetWidthPx / img.width, targetHeightPx / img.height) * zoom;
    const drawW = img.width * scale;
    const drawH = img.height * scale;

    ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();

    // Subtle 1px cut border
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, targetWidthPx, targetHeightPx);
  }, [targetWidthPx, targetHeightPx, bgColor, panX, panY, rotation, zoom]);

  useEffect(() => {
    if (imageSrc) {
      drawPhoto();
    }
  }, [imageSrc, drawPhoto]);

  // Pan / Drag interactions
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanX(e.clientX - dragStart.x);
    setPanY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => setIsDragging(false);

  // Download Single Photo
  const handleDownloadSingle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `passport-photo-${currentPreset.id}-300dpi.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
  };

  // Generate Multi-Photo Print Sheet (4x6 or A4)
  const handleGenerateSheet = (sheetType: '4x6' | 'a4') => {
    const singleCanvas = canvasRef.current;
    if (!singleCanvas) return;

    const sheetCanvas = document.createElement('canvas');
    const ctx = sheetCanvas.getContext('2d');
    if (!ctx) return;

    // 300 DPI dimensions
    // 4x6 inch = 1200 x 1800 px (or 1800 x 1200)
    // A4 = 210 x 297 mm = 2480 x 3508 px
    let sheetW = 1800;
    let sheetH = 1200;
    if (sheetType === 'a4') {
      sheetW = 2480;
      sheetH = 3508;
    }

    sheetCanvas.width = sheetW;
    sheetCanvas.height = sheetH;

    // Pure white sheet background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, sheetW, sheetH);

    const photoW = targetWidthPx;
    const photoH = targetHeightPx;
    const gap = 30; // 30px gap for scissors cut lines
    const margin = 60;

    const cols = Math.floor((sheetW - 2 * margin + gap) / (photoW + gap));
    const rows = Math.floor((sheetH - 2 * margin + gap) / (photoH + gap));

    const totalCopies = cols * rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = margin + c * (photoW + gap);
        const y = margin + r * (photoH + gap);

        // Draw photo
        ctx.drawImage(singleCanvas, x, y, photoW, photoH);

        // Draw cutting dashed border
        ctx.setLineDash([6, 6]);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, photoW, photoH);
      }
    }

    // Add header branding text
    ctx.setLineDash([]);
    ctx.fillStyle = '#64748b';
    ctx.font = '24px sans-serif';
    ctx.fillText(`Everything Converter • ${currentPreset.name} (${totalCopies} copies, 300 DPI print ready)`, margin, margin - 20);

    const link = document.createElement('a');
    link.download = `passport-photo-sheet-${sheetType}-${totalCopies}-copies.jpg`;
    link.href = sheetCanvas.toDataURL('image/jpeg', 0.95);
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Configuration Controls */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Preset Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Country & Document Standard:
            </label>
            <select
              id="passport-country-select"
              value={selectedPreset}
              onChange={(e) => setSelectedPreset(e.target.value)}
              className="mt-1.5 w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            >
              {PRESETS.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.name} ({preset.description})
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-[11px] text-slate-500">
              Output: {targetWidthPx} × {targetHeightPx} px @ 300 DPI high resolution.
            </p>
          </div>

          {/* Background Color Picker */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Background Fill:
            </label>
            <div className="mt-1.5 flex items-center gap-2">
              {[
                { label: 'White', color: '#ffffff' },
                { label: 'Off-White', color: '#f8fafc' },
                { label: 'Light Blue', color: '#dbeafe' },
                { label: 'Light Grey', color: '#e2e8f0' },
              ].map((c) => (
                <button
                  key={c.color}
                  onClick={() => setBgColor(c.color)}
                  className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                    bgColor === c.color
                      ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="h-3 w-3 rounded-full border border-slate-300" style={{ backgroundColor: c.color }} />
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Guidelines Toggle */}
          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={showGuidelines}
                onChange={(e) => setShowGuidelines(e.target.checked)}
                className="h-4 w-4 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Show Biometric Face Alignment Guides</span>
            </label>
            <span className="text-[11px] text-slate-400 mt-1">
              Ensures chin & top-of-head match official embassy biometric rules.
            </span>
          </div>
        </div>

        {/* Custom Dimensions if selected */}
        {selectedPreset === 'custom' && (
          <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 dark:border-slate-800">
            <div>
              <label className="text-xs font-bold text-slate-600">Width (mm):</label>
              <input
                type="number"
                value={customWidthMm}
                onChange={(e) => setCustomWidthMm(Number(e.target.value))}
                className="mt-1 w-full h-10 rounded-xl border px-3 text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-600">Height (mm):</label>
              <input
                type="number"
                value={customHeightMm}
                onChange={(e) => setCustomHeightMm(Number(e.target.value))}
                className="mt-1 w-full h-10 rounded-xl border px-3 text-xs"
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Studio Workspace */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        {!imageSrc ? (
          /* Upload Dropzone */
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-12 text-center dark:border-slate-700 dark:bg-slate-950/40"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <Upload className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
              {lang === 'hi' ? 'अपनी फोटो यहाँ ड्रैग करें या चुनें' : 'Drag & Drop Your Photo Here'}
            </h3>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 max-w-sm">
              Supports high-resolution JPG, PNG, and WebP photos taken from mobile camera or digital camera.
            </p>

            <label className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition">
              <Upload className="h-4 w-4" />
              <span>{lang === 'hi' ? 'कंप्यूटर या मोबाइल से चुनें' : 'Choose Photo from Device'}</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </label>
          </div>
        ) : (
          /* Active Editing Studio */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Canvas Preview Area */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div
                className="relative cursor-move overflow-hidden rounded-xl border border-slate-300 bg-slate-100 shadow-md dark:border-slate-700 dark:bg-slate-950 select-none"
                style={{
                  maxWidth: '380px',
                  aspectRatio: `${targetWidthPx} / ${targetHeightPx}`,
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <canvas ref={canvasRef} className="w-full h-full object-contain" />

                {/* Biometric Face Alignment Overlay */}
                {showGuidelines && (
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between p-4 border border-dashed border-blue-400/60">
                    <div className="w-full border-b border-dashed border-rose-500/80 text-[10px] font-bold text-rose-500 pl-1">
                      Crown / Top of Hair (70-80% rule)
                    </div>
                    <div className="h-32 w-28 rounded-full border-2 border-dashed border-emerald-400/80" />
                    <div className="w-full border-t border-dashed border-rose-500/80 text-[10px] font-bold text-rose-500 pl-1">
                      Chin Line
                    </div>
                  </div>
                )}
              </div>

              <p className="mt-3 text-[11px] text-slate-500 flex items-center gap-1">
                <span>💡 Click & drag the photo inside the frame to adjust positioning.</span>
              </p>
            </div>

            {/* Adjustments & Export Panel */}
            <div className="lg:col-span-5 space-y-5">
              {/* Zoom Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1">
                    <ZoomIn className="h-3.5 w-3.5 text-blue-600" />
                    <span>Zoom Scale:</span>
                  </span>
                  <span>{Math.round(zoom * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="mt-2 w-full accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>50%</span>
                  <span>100%</span>
                  <span>300%</span>
                </div>
              </div>

              {/* Rotation */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Rotate 90°:</span>
                <button
                  onClick={() => setRotation((r) => (r + 90) % 360)}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <RotateCw className="h-3.5 w-3.5" />
                  <span>Rotate</span>
                </button>
              </div>

              {/* Re-upload New Photo */}
              <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800">
                <Upload className="h-3.5 w-3.5" />
                <span>Upload Different Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
              </label>

              {/* Export Buttons */}
              <div className="space-y-2.5 border-t border-slate-100 pt-4 dark:border-slate-800">
                <button
                  id="download-single-passport-btn"
                  onClick={handleDownloadSingle}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Single Photo (300 DPI)</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleGenerateSheet('4x6')}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50/60 py-2.5 text-xs font-bold text-blue-700 hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300 transition"
                  >
                    <Grid className="h-3.5 w-3.5" />
                    <span>Print 4×6 Sheet</span>
                  </button>

                  <button
                    onClick={() => handleGenerateSheet('a4')}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50/60 py-2.5 text-xs font-bold text-blue-700 hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300 transition"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>Print A4 Sheet</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
