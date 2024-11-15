import React, { useState, useMemo } from 'react';
import { Activity, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import { BiorhythmChart } from './components/BiorhythmChart';
import { CycleCard } from './components/CycleCard';
import { calculateBiorhythms, generateChartData } from './utils/biorhythm';
import type { CycleInfo } from './types';

function App() {
  const [birthDate, setBirthDate] = useState<string>('1990-01-01');
  const [targetDate, setTargetDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [showInfo, setShowInfo] = useState(false);

  const cycles: CycleInfo[] = useMemo(() => {
    const { physical, emotional, intellectual } = calculateBiorhythms(
      new Date(birthDate),
      new Date(targetDate)
    );

    return [
      {
        name: 'Physical',
        value: physical,
        description: 'Energy, strength, and physical well-being',
        period: 23,
        color: '#ef4444',
      },
      {
        name: 'Emotional',
        value: emotional,
        description: 'Mood, feelings, and creativity',
        period: 28,
        color: '#3b82f6',
      },
      {
        name: 'Intellectual',
        value: intellectual,
        description: 'Memory, alertness, and analytical thinking',
        period: 33,
        color: '#10b981',
      },
    ];
  }, [birthDate, targetDate]);

  const chartData = useMemo(
    () => generateChartData(new Date(birthDate), new Date(targetDate)),
    [birthDate, targetDate]
  );

  return (
    <div className="min-h-screen bg-transparent text-white transition-colors duration-300">
      <header className="glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Activity className="w-8 h-8 text-blue-400 animate-pulse" />
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                Biorhythm Calculator
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold">Birth Date</h2>
            </div>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold">Target Date</h2>
            </div>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {cycles.map((cycle) => (
            <CycleCard key={cycle.name} cycle={cycle} />
          ))}
        </div>

        <div className="glass-card rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            30-Day Cycle Overview
          </h2>
          <BiorhythmChart data={chartData} />
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="glass-card px-6 py-3 rounded-full flex items-center space-x-2 hover:scale-105 transition-transform"
          >
            <span>Show {showInfo ? 'Less' : 'More'} Info</span>
            {showInfo ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showInfo && (
          <div className="mt-8 glass-card rounded-xl p-6 space-y-6">
            <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Scientific Background
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-2 text-blue-400">Physical Cycle (23 Days)</h4>
                <p className="text-slate-300">
                  The physical cycle influences strength, endurance, energy, and resistance to illness. Research suggests this cycle may correlate with circadian rhythms and athletic performance. Studies have shown patterns in physical performance that approximately follow a 23-day cycle.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2 text-blue-400">Emotional Cycle (28 Days)</h4>
                <p className="text-slate-300">
                  The emotional cycle affects mood, sensitivity, creativity, and emotional response. This 28-day cycle closely matches the lunar cycle and has been studied in relation to mood variations and emotional well-being. Research in chronobiology has shown correlations between emotional states and lunar phases.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2 text-blue-400">Intellectual Cycle (33 Days)</h4>
                <p className="text-slate-300">
                  The intellectual cycle influences memory, mental alertness, and analytical thinking. Studies in cognitive science have observed patterns in problem-solving ability and mental performance that suggest cyclical variations. This cycle may be related to neural plasticity and learning patterns.
                </p>
              </div>

              <div className="mt-6 p-4 bg-blue-900/30 rounded-lg">
                <p className="text-sm text-slate-300">
                  <strong>Note:</strong> While biorhythm theory has historical significance and continues to intrigue researchers, modern science emphasizes that human biology is complex and influenced by numerous factors including sleep, diet, exercise, and environmental conditions.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="glass mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-slate-300 text-sm">
            Made with ❤️ by Jainil Patel
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;