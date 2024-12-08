import React from 'react';
import { JobOpeningEvent, JobCancelledEvent, PositionClosedEvent } from '../../types/events';
import JobTitle from '../JobTitle';
import ProjectName from '../ProjectName';

type JobEventProps = {
  event: JobOpeningEvent | JobCancelledEvent | PositionClosedEvent;
  onJobOpeningClick: (title: string) => void;
  onProjectClick: (project: string) => void;
  onEmployeeClick?: (name: string) => void;
};

const JobEvent: React.FC<JobEventProps> = ({
  event,
  onJobOpeningClick,
  onProjectClick,
  onEmployeeClick
}) => {
  const handleEmployeeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ('employeeInfo' in event && onEmployeeClick) {
      onEmployeeClick(event.employeeInfo.name);
    }
  };

  const renderJobTitle = () => (
    <JobTitle 
      title={event.jobInfo.title} 
      onJobOpeningClick={onJobOpeningClick}
    />
  );

  return (
    <div className="text-gray-800 font-medium">
      <div>
        {('employeeInfo' in event) ? (
          <>
            <button
              onClick={handleEmployeeClick}
              className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              {event.employeeInfo.name}
            </button>
            {' filled position: '}
            {renderJobTitle()}
          </>
        ) : (
          <>
            {event.type === 'JOB_CANCELLED' ? 'Job opening cancelled: ' : 'New opening: '}
            {renderJobTitle()}
          </>
        )}
        {' in '}
        <ProjectName
          project={event.jobInfo.project}
          onProjectClick={onProjectClick}
        />
      </div>
      <div className="mt-2 text-sm text-gray-600">
        {'openPositions' in event.jobInfo && (
          <>{event.jobInfo.openPositions} position{event.jobInfo.openPositions > 1 ? 's' : ''}</>
        )}
        {'remainingPositions' in event.jobInfo && event.jobInfo.remainingPositions > 0 && (
          <>{event.jobInfo.remainingPositions} position{event.jobInfo.remainingPositions > 1 ? 's' : ''} remaining</>
        )}
      </div>
    </div>
  );
};

export default JobEvent;