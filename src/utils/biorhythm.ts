import { addDays, differenceInDays } from 'date-fns';

const calculateBiorhythm = (birthDate: Date, targetDate: Date, days: number): number => {
  const daysSinceBirth = differenceInDays(targetDate, birthDate);
  return Math.sin((2 * Math.PI * daysSinceBirth) / days) * 100;
};

export const calculateBiorhythms = (birthDate: Date, targetDate: Date) => {
  return {
    physical: calculateBiorhythm(birthDate, targetDate, 23),
    emotional: calculateBiorhythm(birthDate, targetDate, 28),
    intellectual: calculateBiorhythm(birthDate, targetDate, 33),
  };
};

export const generateChartData = (birthDate: Date, targetDate: Date, daysRange: number = 15) => {
  const data = [];
  for (let i = -daysRange; i <= daysRange; i++) {
    const date = addDays(targetDate, i);
    const values = calculateBiorhythms(birthDate, date);
    data.push({
      date,
      ...values,
    });
  }
  return data;
};