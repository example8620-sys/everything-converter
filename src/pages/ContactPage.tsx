import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const ContactPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('Tool Suggestion');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <SEOHead
        title="Contact Us & Suggest a Tool – Everything Converter"
        description="Contact the Everything Converter team and developer Shubham Kumar. Suggest new tools, report bugs, or request features."
        canonicalUrl="https://everythingconverter.com/contact"
      />

      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Contact Us' }]} />

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Get in Touch</span>
          </div>
          <h1 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Contact & Suggest a Tool
          </h1>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
            Have a suggestion for a new converter or calculator? Found a bug? We'd love to hear from you.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-8 text-center dark:border-emerald-900/50 dark:bg-emerald-950/30 space-y-3">
            <CheckCircle className="mx-auto h-10 w-10 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Thank You for Your Feedback!
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Your message has been received. Our team regularly adds new tools requested by users like you.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setMessage('');
              }}
              className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-800"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Name:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex"
                  className="mt-1.5 w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address:</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="mt-1.5 w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Subject / Category:</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1.5 w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              >
                <option value="Tool Suggestion">Suggest a New Converter / Tool</option>
                <option value="Bug Report">Report an Issue or Bug</option>
                <option value="Feature Improvement">Feature Improvement</option>
                <option value="Partnership">General / Partnership</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Message:</label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what tool you need or what formula you'd like to see added..."
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-medium text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white leading-relaxed resize-y"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition"
            >
              <Send className="h-4 w-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
