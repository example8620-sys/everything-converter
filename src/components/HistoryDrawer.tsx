import React from 'react';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { ToolDefinition, Language } from '../types';
import { getTranslation } from '../translations';
import { DynamicIcon } from './DynamicIcon';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  recentTools: ToolDefinition[];
  onSelectTool: (slug: string) => void;
  onClearHistory: () => void;
  lang: Language;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  recentTools,
  onSelectTool,
  onClearHistory,
  lang,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 h-full p-6 shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {getTranslation(lang, 'recentTools')}
            </h3>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 space-y-2 overflow-y-auto max-h-[calc(100vh-180px)] pr-1">
            {recentTools.length > 0 ? (
              recentTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => {
                    onSelectTool(tool.slug);
                    onClose();
                  }}
                  className="flex w-full items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800/80 p-3 text-left hover:bg-blue-50/50 dark:hover:bg-slate-800/60 transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400">
                      <DynamicIcon name={tool.iconName} className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {lang === 'hi' ? tool.nameHi : tool.name}
                      </p>
                      <p className="text-[11px] text-slate-400 capitalize">{tool.category.replace('-', ' ')}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))
            ) : (
              <p className="py-8 text-center text-xs text-slate-400">
                {getTranslation(lang, 'noRecentTools')}
              </p>
            )}
          </div>
        </div>

        {recentTools.length > 0 && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={onClearHistory}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 text-rose-600 py-2.5 text-xs font-semibold hover:bg-rose-50 dark:border-rose-900/60 dark:text-rose-400 dark:hover:bg-rose-950/40 transition"
            >
              <Trash2 className="w-4 h-4" />
              <span>{getTranslation(lang, 'clearHistory')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
