import React, { useState, useMemo } from 'react';
import { Calendar, Cake, Clock, Heart } from 'lucide-react';
import { Language } from '../../types';

export const AgeCalculatorEngine: React.FC<{ lang: Language }> = ({ lang }) => {
  const [birthDate, setBirthDate] = useState<string>('2000-01-01');
  const [targetDate, setTargetDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const stats = useMemo(() => {
    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (isNaN(birth.getTime()) || isNaN(target.getTime()) || birth > target) {
      return null;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonthLastDay = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Next birthday calculation
    const currentYearBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    let nextBday = currentYearBirthday;
    if (currentYearBirthday < target) {
      nextBday = new Date(target.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const diffTime = nextBday.getTime() - target.getTime();
    const daysUntilNextBirthday = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Day of the week born
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const bornDayName = dayNames[birth.getDay()];

    // Total milestones
    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    return {
      years,
      months,
      days,
      daysUntilNextBirthday,
      bornDayName,
      totalDays,
      totalWeeks,
      totalHours,
      totalMinutes,
      totalSeconds,
    };
  }, [birthDate, targetDate]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
              {lang === 'hi' ? 'जन्मतिथि चुनें (Date of Birth):' : 'Date of Birth:'}
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="mt-1.5 w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
              {lang === 'hi' ? 'इस तारीख तक उम्र निकालें (Age at Date):' : 'Age at the Date of:'}
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="mt-1.5 w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
          </div>
        </div>

        {stats && (
          <div className="mt-6 space-y-6">
            {/* Primary Age Display */}
            <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-6 text-center dark:border-blue-900/50 dark:bg-blue-950/30">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {lang === 'hi' ? 'आपकी वर्तमान उम्र' : 'Your Chronological Age'}
              </span>
              <div className="mt-2 text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                {stats.years} <span className="text-base font-medium text-slate-500">Years</span> {stats.months}{' '}
                <span className="text-base font-medium text-slate-500">Months</span> {stats.days}{' '}
                <span className="text-base font-medium text-slate-500">Days</span>
              </div>
              <p className="mt-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                You were born on a <strong>{stats.bornDayName}</strong>.
              </p>
            </div>

            {/* Next Birthday & Total Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-slate-200 p-3 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 text-center">
                <Cake className="mx-auto h-5 w-5 text-rose-500" />
                <span className="mt-1 block text-[11px] text-slate-500">Next Birthday In</span>
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  {stats.daysUntilNextBirthday} Days
                </span>
              </div>
              <div className="rounded-xl border border-slate-200 p-3 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 text-center">
                <Calendar className="mx-auto h-5 w-5 text-blue-500" />
                <span className="mt-1 block text-[11px] text-slate-500">Total Days</span>
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  {stats.totalDays.toLocaleString()}
                </span>
              </div>
              <div className="rounded-xl border border-slate-200 p-3 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 text-center">
                <Clock className="mx-auto h-5 w-5 text-amber-500" />
                <span className="mt-1 block text-[11px] text-slate-500">Total Hours</span>
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  {stats.totalHours.toLocaleString()}
                </span>
              </div>
              <div className="rounded-xl border border-slate-200 p-3 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 text-center">
                <Heart className="mx-auto h-5 w-5 text-emerald-500" />
                <span className="mt-1 block text-[11px] text-slate-500">Total Weeks</span>
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  {stats.totalWeeks.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
