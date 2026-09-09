import React, { useState } from 'react';
import { Copy, Check, Palette, Sparkles } from 'lucide-react';
import { Language } from '../../types';

export const ColorConverterEngine: React.FC<{ lang: Language }> = ({ lang }) => {
  const [hex, setHex] = useState<string>('#2563EB');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Convert HEX to RGB
  const hexToRgb = (hexStr: string) => {
    let clean = hexStr.replace('#', '');
    if (clean.length === 3) {
      clean = clean.split('').map((c) => c + c).join('');
    }
    const num = parseInt(clean, 16);
    if (isNaN(num) || clean.length !== 6) return { r: 37, g: 99, b: 235 };
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  const rgb = hexToRgb(hex);

  // RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  // RGB to CMYK
  const rgbToCmyk = (r: number, g: number, b: number) => {
    const c0 = 1 - r / 255;
    const m0 = 1 - g / 255;
    const y0 = 1 - b / 255;
    const k = Math.min(c0, m0, y0);
    if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
    return {
      c: Math.round(((c0 - k) / (1 - k)) * 100),
      m: Math.round(((m0 - k) / (1 - k)) * 100),
      y: Math.round(((y0 - k) / (1 - k)) * 100),
      k: Math.round(k * 100),
    };
  };

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

  const copyVal = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const cmykString = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-6">
        {/* Color Swatch Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div
            className="h-28 w-28 shrink-0 rounded-2xl border-4 border-white shadow-md dark:border-slate-800 transition"
            style={{ backgroundColor: hex }}
          />
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Choose Color</h3>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <input
                type="color"
                value={hex}
                onChange={(e) => setHex(e.target.value.toUpperCase())}
                className="h-10 w-16 cursor-pointer rounded-xl border border-slate-200 p-1 dark:border-slate-700"
              />
              <input
                type="text"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="h-10 w-32 rounded-xl border border-slate-200 bg-slate-50 px-3 font-mono text-sm font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white uppercase"
              />
            </div>
          </div>
        </div>

        {/* Color Formats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* HEX */}
          <div className="rounded-xl border border-slate-200 p-4 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500">
              <span>HEX</span>
              <button
                onClick={() => copyVal(hex, 'hex')}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
              >
                {copiedKey === 'hex' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedKey === 'hex' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="mt-2 font-mono text-base font-bold text-slate-900 dark:text-white">{hex}</p>
          </div>

          {/* RGB */}
          <div className="rounded-xl border border-slate-200 p-4 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500">
              <span>RGB</span>
              <button
                onClick={() => copyVal(rgbString, 'rgb')}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
              >
                {copiedKey === 'rgb' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedKey === 'rgb' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="mt-2 font-mono text-base font-bold text-slate-900 dark:text-white">{rgbString}</p>
          </div>

          {/* HSL */}
          <div className="rounded-xl border border-slate-200 p-4 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500">
              <span>HSL</span>
              <button
                onClick={() => copyVal(hslString, 'hsl')}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
              >
                {copiedKey === 'hsl' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedKey === 'hsl' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="mt-2 font-mono text-base font-bold text-slate-900 dark:text-white">{hslString}</p>
          </div>

          {/* CMYK */}
          <div className="rounded-xl border border-slate-200 p-4 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500">
              <span>CMYK (Print)</span>
              <button
                onClick={() => copyVal(cmykString, 'cmyk')}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
              >
                {copiedKey === 'cmyk' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedKey === 'cmyk' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="mt-2 font-mono text-base font-bold text-slate-900 dark:text-white">{cmykString}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
