import React, { useState, useMemo } from 'react';
import { Copy, Check, RotateCcw, FileText } from 'lucide-react';
import { Language } from '../../types';

export const WordCounterEngine: React.FC<{ lang: Language }> = ({ lang }) => {
  const [text, setText] = useState<string>(
    'Everything Converter provides fast, accurate, and completely private online conversion tools.'
  );
  const [copied, setCopied] = useState<boolean>(false);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const wordsArray = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
    const wordCount = wordsArray.length;
    const charCountWithSpaces = text.length;
    const charCountNoSpaces = text.replace(/\s/g, '').length;
    const sentences = trimmed ? (text.match(/[^.!?]+[.!?]+/g) || []).length || (wordCount > 0 ? 1 : 0) : 0;
    const paragraphs = trimmed ? text.split(/\n+/).filter((p) => p.trim().length > 0).length : 0;

    const readingMinutes = Math.ceil(wordCount / 225);
    const speakingMinutes = Math.ceil(wordCount / 150);

    return {
      wordCount,
      charCountWithSpaces,
      charCountNoSpaces,
      sentences,
      paragraphs,
      readingMinutes,
      speakingMinutes,
    };
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Words</span>
          <p className="mt-1 text-2xl font-black text-blue-600 dark:text-blue-400">
            {stats.wordCount.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Characters</span>
          <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
            {stats.charCountWithSpaces.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Sentences</span>
          <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
            {stats.sentences.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Reading Time</span>
          <p className="mt-1 text-2xl font-black text-emerald-600 dark:text-emerald-400">
            ~{stats.readingMinutes} min
          </p>
        </div>
      </div>

      {/* Editor Box */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type text here..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white leading-relaxed resize-y"
        />

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 dark:border-slate-800 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span>Without spaces: <strong>{stats.charCountNoSpaces}</strong></span>
            <span>Paragraphs: <strong>{stats.paragraphs}</strong></span>
            <span>Speaking: <strong>~{stats.speakingMinutes} min</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setText('')}
              className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Clear</span>
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5 font-bold text-blue-600 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
