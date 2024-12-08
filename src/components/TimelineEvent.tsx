import React, { useState } from 'react';
import { Event, EventType } from '../types/events';
import BaseTimelineEvent from './events/BaseTimelineEvent';
import EmployeeEvent from './events/EmployeeEvent';
import JobEvent from './events/JobEvent';
import SalaryEvent from './events/SalaryEvent';
import EmployeeList from './EmployeeList';
import { formatCurrentDate } from '../utils/dateUtils';
import { Users } from 'lucide-react';
import { initialEmployees } from '../data/initialEmployees';
import { clsx } from 'clsx';

type TimelineEventProps = {
  event: Event;
  events: Event[];
  index: number;
  onEventTypeClick: () => void;
  onEmployeeClick: (name: string) => void;
  onJobOpeningClick: (title: string) => void;
  onProjectClick: (project: string) => void;
  isActive: boolean;
};

const TimelineEvent: React.FC<TimelineEventProps> = ({ 
  event, 
  events,
  index, 
  onEventTypeClick,
  onEmployeeClick,
  onJobOpeningClick,
  onProjectClick,
  isActive 
}) => {
  const [showEmployeeList, setShowEmployeeList] = useState(false);

  const findJobOpeningEvent = (jobOpeningId: string) => {
    return events.find(e => e.id === jobOpeningId);
  };

  const renderEventContent = () => {
    if (event.type === EventType.COMPANY_INFO) {
      return (
        <div className="flex items-center justify-between">
          <div className="text-gray-800 font-medium">
            {event.companyInfo.name} - {event.companyInfo.employeeCount} employees
          </div>
          <button
            onClick={() => setShowEmployeeList(true)}
            className={clsx(
              "p-1.5 rounded-lg transition-all duration-200",
              "text-gray-400 hover:text-blue-800",
              "bg-gray-50 hover:bg-blue-100",
              "hover:scale-110"
            )}
            title="Show employee list"
          >
            <Users className="w-4 h-4" />
          </button>
          <EmployeeList
            employees={initialEmployees}
            isOpen={showEmployeeList}
            onClose={() => setShowEmployeeList(false)}
          />
        </div>
      );
    }

    if (event.type === EventType.CURRENT_DATE) {
      return (
        <div className="text-gray-800 font-medium">
          Today is {formatCurrentDate(new Date(event.timestamp))}
        </div>
      );
    }

    switch (event.type) {
      case EventType.NEW_EMPLOYEE: {
        const jobOpeningEvent = findJobOpeningEvent(event.jobOpeningId);
        return (
          <EmployeeEvent
            employeeInfo={event.employeeInfo}
            jobOpeningEvent={jobOpeningEvent}
            onEmployeeClick={onEmployeeClick}
            onProjectClick={onProjectClick}
            onJobOpeningClick={onJobOpeningClick}
            summary="joined as"
          >
            <SalaryEvent salaryInfo={{ amount: event.salaryInfo.amount }} />
          </EmployeeEvent>
        );
      }

      case EventType.EMPLOYEE_TERMINATED:
      case EventType.EMPLOYEE_LEFT:
      case EventType.PROJECT_ASSIGNMENT:
        return (
          <EmployeeEvent
            employeeInfo={event.employeeInfo}
            onEmployeeClick={onEmployeeClick}
            onProjectClick={onProjectClick}
            onJobOpeningClick={onJobOpeningClick}
            summary={getEventSummary(event)}
          />
        );

      case EventType.EMPLOYEE_RAISE:
        return (
          <EmployeeEvent
            employeeInfo={event.employeeInfo}
            onEmployeeClick={onEmployeeClick}
            onProjectClick={onProjectClick}
            onJobOpeningClick={onJobOpeningClick}
            summary={getEventSummary(event)}
          >
            <SalaryEvent salaryInfo={{ 
              oldAmount: event.salaryInfo.oldAmount,
              newAmount: event.salaryInfo.newAmount 
            }} />
          </EmployeeEvent>
        );

      case EventType.JOB_OPENING:
      case EventType.JOB_CANCELLED:
      case EventType.POSITION_CLOSED:
        return (
          <JobEvent
            event={event}
            onJobOpeningClick={onJobOpeningClick}
            onProjectClick={onProjectClick}
            onEmployeeClick={onEmployeeClick}
          />
        );

      default:
        return null;
    }
  };

  const getEventSummary = (event: Event): string => {
    switch (event.type) {
      case EventType.NEW_EMPLOYEE:
        return 'joined as';
      case EventType.EMPLOYEE_TERMINATED:
        return 'was terminated from';
      case EventType.EMPLOYEE_LEFT:
        return 'left their position as';
      case EventType.EMPLOYEE_RAISE:
        return 'received a raise';
      case EventType.PROJECT_ASSIGNMENT:
        return 'was assigned as';
      default:
        return '';
    }
  };

  return (
    <BaseTimelineEvent
      event={event}
      index={index}
      onEventTypeClick={onEventTypeClick}
      isActive={isActive}
    >
      {renderEventContent()}
    </BaseTimelineEvent>
  );
};

export default TimelineEvent;