import React, { useState } from 'react';
import { Copy, Check, Type } from 'lucide-react';
import { Language } from '../../types';

export const CaseConverterEngine: React.FC<{ lang: Language }> = ({ lang }) => {
  const [text, setText] = useState<string>(
    'everything converter simplifies everyday conversions quickly and accurately'
  );
  const [copied, setCopied] = useState<boolean>(false);

  const applyCase = (type: string) => {
    switch (type) {
      case 'upper':
        setText(text.toUpperCase());
        break;
      case 'lower':
        setText(text.toLowerCase());
        break;
      case 'title':
        setText(
          text
            .toLowerCase()
            .split(' ')
            .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ''))
            .join(' ')
        );
        break;
      case 'sentence':
        setText(
          text
            .toLowerCase()
            .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
        );
        break;
      case 'camel':
        setText(
          text
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
              index === 0 ? word.toLowerCase() : word.toUpperCase()
            )
            .replace(/\s+/g, '')
        );
        break;
      case 'pascal':
        setText(
          text
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
            .replace(/\s+/g, '')
        );
        break;
      case 'snake':
        setText(
          text
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '_')
        );
        break;
      case 'kebab':
        setText(
          text
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
        );
        break;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        {/* Buttons Bar */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => applyCase('upper')}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
          >
            UPPERCASE
          </button>
          <button
            onClick={() => applyCase('lower')}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
          >
            lowercase
          </button>
          <button
            onClick={() => applyCase('title')}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
          >
            Title Case
          </button>
          <button
            onClick={() => applyCase('sentence')}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
          >
            Sentence case
          </button>
          <button
            onClick={() => applyCase('camel')}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
          >
            camelCase
          </button>
          <button
            onClick={() => applyCase('pascal')}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
          >
            PascalCase
          </button>
          <button
            onClick={() => applyCase('snake')}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
          >
            snake_case
          </button>
          <button
            onClick={() => applyCase('kebab')}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
          >
            kebab-case
          </button>
        </div>

        <textarea
          rows={7}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white leading-relaxed resize-y"
        />

        <div className="flex justify-end">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'Copied' : 'Copy Converted Text'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
