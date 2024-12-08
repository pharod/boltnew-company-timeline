import React from 'react';
import { Event, EventType } from '../../types/events';
import { getEventIcon, getEventColor } from '../../utils/eventUtils';
import { format } from '../../utils/dateUtils';
import { clsx } from 'clsx';

type BaseTimelineEventProps = {
  event: Event;
  index: number;
  onEventTypeClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
};

const BaseTimelineEvent: React.FC<BaseTimelineEventProps> = ({ 
  event, 
  index, 
  onEventTypeClick,
  isActive,
  children
}) => {
  const Icon = getEventIcon(event.type);
  const colorClasses = getEventColor(event.type);
  const isCurrentDate = event.type === EventType.CURRENT_DATE;
  const isFutureEvent = new Date(event.timestamp) > new Date();
  
  return (
    <div
      className="relative pl-10 pr-4 opacity-0 translate-x-[-20px] animate-fadeIn"
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'forwards'
      }}
    >
      <div className="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <button
          onClick={onEventTypeClick}
          className={clsx(
            'p-2 rounded-full shadow-sm transition-all duration-200 hover:scale-110',
            colorClasses.bg,
            colorClasses.text,
            isActive && 'ring-2 ring-offset-2 ring-blue-500',
            isCurrentDate && 'ring-2 ring-offset-2 ring-indigo-300',
            isFutureEvent && 'opacity-80'
          )}
        >
          <Icon className="w-5 h-5" />
        </button>
      </div>
      <div 
        className={clsx(
          'rounded-xl shadow-sm p-4 transition-all duration-200 ml-4',
          isActive ? 'border-blue-200 shadow-md' : 'border-gray-100 hover:shadow-md',
          isCurrentDate ? [
            'bg-gradient-to-r from-indigo-50 to-white',
            'border-indigo-200',
            'border',
            'shadow-[0_0_15px_rgba(99,102,241,0.1)]'
          ] : [
            'bg-white',
            isFutureEvent ? [
              'border-dashed border-2 border-gray-200',
              'bg-gradient-to-r from-gray-50/50 to-white'
            ] : 'border'
          ]
        )}
      >
        <div className={clsx(
          'text-sm mb-1',
          isCurrentDate ? 'text-indigo-500 font-medium' : 'text-gray-500',
          isFutureEvent && 'italic'
        )}>
          {format(event.timestamp)}
          {isFutureEvent && ' (Planned)'}
        </div>
        <div className={clsx(
          isFutureEvent && 'opacity-80'
        )}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default BaseTimelineEvent;