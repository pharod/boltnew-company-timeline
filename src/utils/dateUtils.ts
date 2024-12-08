import { format as formatDate, isSameMonth, isSameYear } from 'date-fns';
import { Cloud, Sun, Leaf, Snowflake, LucideIcon } from 'lucide-react';

export const format = (dateString: string, formatType: 'date' | 'datetime' = 'datetime'): string => {
  const date = new Date(dateString);
  return formatType === 'date' 
    ? formatDate(date, 'MMMM d, yyyy')
    : formatDate(date, 'MMMM d, yyyy h:mm a');
};

export const formatCurrentDate = (date: Date): string => {
  return formatDate(date, "d MMM, EEEE");
};

export const formatMonthYear = (date: Date): string => {
  return formatDate(date, 'MMMM yyyy');
};

export const isSameMonthAndYear = (date1: Date, date2: Date): boolean => {
  return isSameMonth(date1, date2) && isSameYear(date1, date2);
};

export const getSeasonIcon = (date: Date): LucideIcon => {
  const month = date.getMonth();
  
  // Spring: March (2) - May (4)
  if (month >= 2 && month <= 4) {
    return Leaf;
  }
  // Summer: June (5) - August (7)
  else if (month >= 5 && month <= 7) {
    return Sun;
  }
  // Fall: September (8) - November (10)
  else if (month >= 8 && month <= 10) {
    return Cloud;
  }
  // Winter: December (11) - February (1)
  else {
    return Snowflake;
  }
};