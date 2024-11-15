import React from 'react';
import type { CycleInfo } from '../types';

interface CycleCardProps {
  cycle: CycleInfo;
}

export function CycleCard({ cycle }: CycleCardProps) {
  const percentage = Math.round(cycle.value);
  const isPositive = cycle.value >= 0;

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{cycle.name}</h3>
        <span
          className={`text-2xl font-bold ${
            isPositive ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'
          }`}
        >
          {percentage}%
        </span>
      </div>
      <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">{cycle.description}</p>
      <div className="relative pt-1">
        <div className="overflow-hidden h-2 text-xs flex rounded bg-slate-200 dark:bg-slate-700">
          <div
            style={{
              width: `${Math.abs(percentage)}%`,
              marginLeft: !isPositive ? `${100 - Math.abs(percentage)}%` : '0',
            }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${
              isPositive ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
        </div>
      </div>
      <p className="text-slate-500 dark:text-slate-400 text-xs mt-2">
        Cycle period: {cycle.period} days
      </p>
    </div>
  );
}