import React from 'react';
import { Event, EventType } from '../types/events';
import TimelineEvent from './TimelineEvent';
import MonthHeader from './MonthHeader';
import YearHeader from './YearHeader';
import { formatMonthYear, isSameMonthAndYear, getSeasonIcon, formatCurrentDate } from '../utils/dateUtils';
import { Sparkles } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

type TimelineProps = {
  events: Event[];
  allEvents: Event[];
  onEventTypeClick: (type: EventType) => void;
  onEmployeeClick: (name: string) => void;
  onJobOpeningClick: (title: string) => void;
  onProjectClick: (project: string) => void;
  activeFilter: {
    type: 'eventType' | 'employee' | 'jobOpening' | 'project' | null;
    value: EventType | string | null;
  };
};

const Timeline: React.FC<TimelineProps> = ({ 
  events, 
  allEvents, 
  onEventTypeClick, 
  onEmployeeClick,
  onJobOpeningClick,
  onProjectClick,
  activeFilter 
}) => {
  const currentDate = new Date();
  const currentDateEvent = {
    id: uuidv4(),
    type: EventType.CURRENT_DATE,
    timestamp: currentDate.toISOString()
  };

  const sortedEvents = [...events, currentDateEvent].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  let currentMonthYear: Date | null = null;
  let currentYear: number | null = null;

  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

      <div className="relative space-y-8">
        {sortedEvents.map((event, index) => {
          const eventDate = new Date(event.timestamp);
          let timeMarkers = [];

          if (!currentYear || currentYear !== eventDate.getFullYear()) {
            currentYear = eventDate.getFullYear();
            timeMarkers.push(
              <div 
                key={`year-${currentYear}`}
                className="relative pl-10 mb-8 opacity-0 translate-x-[-20px] animate-fadeIn"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <div className="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="p-2 rounded-full bg-amber-100 text-amber-800 shadow-sm">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {currentYear}
                  </h2>
                  <YearHeader 
                    year={currentYear} 
                    events={events}
                    allEvents={allEvents} 
                  />
                </div>
              </div>
            );
          }

          if (!currentMonthYear || !isSameMonthAndYear(currentMonthYear, eventDate)) {
            currentMonthYear = eventDate;
            const SeasonIcon = getSeasonIcon(eventDate);
            timeMarkers.push(
              <div 
                key={`month-${eventDate.getTime()}`}
                className="relative pl-10 mb-8 opacity-0 translate-x-[-20px] animate-fadeIn"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <div className="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="p-2 rounded-full bg-blue-100 text-blue-800 shadow-sm">
                    <SeasonIcon className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <h3 className="text-lg font-semibold text-gray-600">
                    {formatMonthYear(eventDate)}
                  </h3>
                  <MonthHeader date={eventDate} events={events} />
                </div>
              </div>
            );
          }

          return (
            <React.Fragment key={event.id}>
              {timeMarkers}
              <TimelineEvent 
                event={event}
                events={events}
                index={index} 
                onEventTypeClick={() => onEventTypeClick(event.type)}
                onEmployeeClick={onEmployeeClick}
                onJobOpeningClick={onJobOpeningClick}
                onProjectClick={onProjectClick}
                isActive={
                  (activeFilter.type === 'eventType' && activeFilter.value === event.type) ||
                  (activeFilter.type === 'employee' && 'employeeInfo' in event && event.employeeInfo.name === activeFilter.value) ||
                  (activeFilter.type === 'jobOpening' && 'jobInfo' in event && event.jobInfo.title === activeFilter.value) ||
                  (activeFilter.type === 'project' && (
                    ('employeeInfo' in event && event.employeeInfo.project === activeFilter.value) ||
                    ('jobInfo' in event && event.jobInfo.project === activeFilter.value)
                  ))
                }
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;