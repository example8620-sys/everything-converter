import React, { useState, useMemo } from 'react';
import { HeartPulse, Sparkles } from 'lucide-react';
import { Language } from '../../types';

export const BmiCalculatorEngine: React.FC<{ lang: Language }> = ({ lang }) => {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  // Metric
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(70);

  // Imperial
  const [feet, setFeet] = useState<number>(5);
  const [inches, setInches] = useState<number>(9);
  const [weightLbs, setWeightLbs] = useState<number>(154);

  const stats = useMemo(() => {
    let bmi = 0;
    let idealMinKg = 0;
    let idealMaxKg = 0;

    if (unitSystem === 'metric') {
      const hMeters = heightCm / 100;
      if (hMeters > 0) {
        bmi = weightKg / (hMeters * hMeters);
        idealMinKg = 18.5 * (hMeters * hMeters);
        idealMaxKg = 24.9 * (hMeters * hMeters);
      }
    } else {
      const totalInches = feet * 12 + inches;
      if (totalInches > 0) {
        bmi = (weightLbs / (totalInches * totalInches)) * 703;
        idealMinKg = (18.5 * (totalInches * totalInches)) / 703;
        idealMaxKg = (24.9 * (totalInches * totalInches)) / 703;
      }
    }

    let category = 'Normal Weight';
    let color = 'text-emerald-600 dark:text-emerald-400';
    let bg = 'bg-emerald-500';

    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-sky-600 dark:text-sky-400';
      bg = 'bg-sky-500';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      color = 'text-amber-600 dark:text-amber-400';
      bg = 'bg-amber-500';
    } else if (bmi >= 30) {
      category = 'Obese';
      color = 'text-rose-600 dark:text-rose-400';
      bg = 'bg-rose-500';
    }

    return {
      bmi: Math.round(bmi * 10) / 10,
      category,
      color,
      bg,
      idealMin: Math.round(idealMinKg * 10) / 10,
      idealMax: Math.round(idealMaxKg * 10) / 10,
    };
  }, [unitSystem, heightCm, weightKg, feet, inches, weightLbs]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-5">
        {/* Unit Toggle */}
        <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <button
            onClick={() => setUnitSystem('metric')}
            className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${
              unitSystem === 'metric'
                ? 'bg-white text-blue-600 shadow-xs dark:bg-slate-900 dark:text-blue-400'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Metric (cm, kg)
          </button>
          <button
            onClick={() => setUnitSystem('imperial')}
            className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${
              unitSystem === 'imperial'
                ? 'bg-white text-blue-600 shadow-xs dark:bg-slate-900 dark:text-blue-400'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Imperial (ft/in, lbs)
          </button>
        </div>

        {unitSystem === 'metric' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Height (cm):
              </label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="mt-1.5 w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Weight (kg):
              </label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="mt-1.5 w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Height (Feet):</label>
              <input
                type="number"
                value={feet}
                onChange={(e) => setFeet(Number(e.target.value))}
                className="mt-1.5 w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Height (Inches):</label>
              <input
                type="number"
                value={inches}
                onChange={(e) => setInches(Number(e.target.value))}
                className="mt-1.5 w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Weight (Pounds lbs):</label>
              <input
                type="number"
                value={weightLbs}
                onChange={(e) => setWeightLbs(Number(e.target.value))}
                className="mt-1.5 w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </div>
          </div>
        )}

        {/* Results */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6 text-center dark:border-slate-800 dark:bg-slate-950">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Your Body Mass Index (BMI)
          </span>
          <div className="mt-2 text-4xl font-black text-slate-900 dark:text-white">
            {stats.bmi}
          </div>
          <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold ${stats.color}`}>
            {stats.category}
          </span>

          <p className="mt-4 text-xs text-slate-500">
            Healthy normal weight range for your height:{' '}
            <strong className="text-slate-800 dark:text-slate-200">
              {stats.idealMin} – {stats.idealMax} {unitSystem === 'metric' ? 'kg' : 'lbs'}
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};
