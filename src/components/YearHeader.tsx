import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import YearSummary from './YearSummary';
import { Event } from '../types/events';
import { clsx } from 'clsx';

type YearHeaderProps = {
  year: number;
  events: Event[];
  allEvents: Event[];
};

const YearHeader: React.FC<YearHeaderProps> = ({ year, events, allEvents }) => {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowSummary(true)}
          className={clsx(
            "p-1.5 rounded-lg transition-all duration-200",
            "text-gray-400 hover:text-amber-800",
            "bg-gray-50 hover:bg-amber-100",
            "hover:scale-110"
          )}
          title="Show annual summary"
        >
          <BarChart3 className="w-4 h-4" />
        </button>
      </div>

      <YearSummary
        year={year}
        events={events}
        allEvents={allEvents}
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
      />
    </>
  );
};

export default YearHeader;