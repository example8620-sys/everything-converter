import React, { useState } from 'react';
import { Copy, Check, Braces, AlertCircle, Sparkles, RotateCcw } from 'lucide-react';
import { Language } from '../../types';

export const JsonFormatterEngine: React.FC<{ lang: Language }> = ({ lang }) => {
  const [jsonText, setJsonText] = useState<string>(
    JSON.stringify(
      {
        site: 'Everything Converter',
        author: 'Shubham Kumar',
        features: ['100+ Free Online Tools', '100% Client-Side Privacy', 'Bilingual EN/HI', 'PWA Ready'],
        speed: 'Instant',
      },
      null,
      2
    )
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const formatJson = (spaces: number) => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed, null, spaces));
      setErrorMsg(null);
    } catch (e: any) {
      setErrorMsg(e.message || 'Invalid JSON syntax');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed));
      setErrorMsg(null);
    } catch (e: any) {
      setErrorMsg(e.message || 'Invalid JSON syntax');
    }
  };

  const validateJson = () => {
    try {
      JSON.parse(jsonText);
      setErrorMsg(null);
      alert('Valid JSON! No syntax errors found.');
    } catch (e: any) {
      setErrorMsg(e.message || 'Invalid JSON syntax');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => formatJson(2)}
              className="rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-blue-700 shadow-xs"
            >
              Format (2 Spaces)
            </button>
            <button
              onClick={() => formatJson(4)}
              className="rounded-xl border border-slate-200 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Format (4 Spaces)
            </button>
            <button
              onClick={minifyJson}
              className="rounded-xl border border-slate-200 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Minify / Compact
            </button>
            <button
              onClick={validateJson}
              className="rounded-xl border border-slate-200 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Validate
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setJsonText('')}
              className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600"
              title="Clear"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <textarea
          rows={14}
          value={jsonText}
          onChange={(e) => {
            setJsonText(e.target.value);
            setErrorMsg(null);
          }}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white leading-relaxed resize-y"
        />
      </div>
    </div>
  );
};
