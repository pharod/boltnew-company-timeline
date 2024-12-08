import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import MonthSummary from './MonthSummary';
import { Event } from '../types/events';
import { clsx } from 'clsx';

type MonthHeaderProps = {
  date: Date;
  events: Event[];
};

const MonthHeader: React.FC<MonthHeaderProps> = ({ date, events }) => {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowSummary(true)}
          className={clsx(
            "p-1.5 rounded-lg transition-all duration-200",
            "text-gray-400 hover:text-blue-800",
            "bg-gray-50 hover:bg-blue-100",
            "hover:scale-110"
          )}
          title="Show month summary"
        >
          <BarChart3 className="w-4 h-4" />
        </button>
      </div>

      <MonthSummary
        date={date}
        events={events}
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
      />
    </>
  );
}

export default MonthHeader;