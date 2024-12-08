import React from 'react';
import ProjectName from '../ProjectName';
import JobTitle from '../JobTitle';
import { Event, EventType } from '../../types/events';
import { format } from '../../utils/dateUtils';

type EmployeeInfo = {
  name: string;
  project: string;
  position?: string;
  startDate?: string;
};

type EmployeeEventProps = {
  employeeInfo: EmployeeInfo;
  jobOpeningEvent?: Event;
  onEmployeeClick: (name: string) => void;
  onProjectClick: (project: string) => void;
  onJobOpeningClick?: (title: string) => void;
  summary: string;
  children?: React.ReactNode;
};

const EmployeeEvent: React.FC<EmployeeEventProps> = ({
  employeeInfo,
  jobOpeningEvent,
  onEmployeeClick,
  onProjectClick,
  onJobOpeningClick,
  summary,
  children
}) => {
  const handleEmployeeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEmployeeClick(employeeInfo.name);
  };

  const getPosition = () => {
    if (jobOpeningEvent && 'jobInfo' in jobOpeningEvent) {
      return jobOpeningEvent.jobInfo.title;
    }
    if ('position' in employeeInfo) {
      return employeeInfo.position;
    }
    if ('newPosition' in employeeInfo) {
      return (employeeInfo as any).newPosition;
    }
    return undefined;
  };

  const position = getPosition();

  return (
    <div className="text-gray-800 font-medium">
      <button
        onClick={handleEmployeeClick}
        className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
      >
        {employeeInfo.name}
      </button>
      {' '}
      {summary}{' '}
      {position && (
        <JobTitle 
          title={position} 
          onJobOpeningClick={onJobOpeningClick}
        />
      )}
      {' in '}
      <ProjectName
        project={employeeInfo.project}
        onProjectClick={onProjectClick}
      />
      {employeeInfo.startDate && (
        <div className="mt-1 text-sm text-gray-600">
          Starting {format(employeeInfo.startDate, 'date')}
        </div>
      )}
      {children}
    </div>
  );
};

export default EmployeeEvent;