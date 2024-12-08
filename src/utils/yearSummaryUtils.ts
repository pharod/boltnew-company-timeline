import { Event, EventType } from '../types/events';
import { isSameYear } from 'date-fns';

type YearSummary = {
  newEmployees: number;
  employeesLeft: number;
  newOpenings: number;
  positionsClosed: number;
  raises: number;
  projectAssignments: number;
};

export const getYearEvents = (events: Event[], year: number): Event[] => {
  return events.filter(event => {
    const eventDate = new Date(event.timestamp);
    return eventDate.getFullYear() === year;
  });
};

export const calculateYearSummary = (events: Event[], year: number): YearSummary => {
  const yearEvents = getYearEvents(events, year);

  return yearEvents.reduce((summary, event) => {
    switch (event.type) {
      case EventType.NEW_EMPLOYEE:
        return { ...summary, newEmployees: summary.newEmployees + 1 };
      case EventType.EMPLOYEE_LEFT:
      case EventType.EMPLOYEE_TERMINATED:
        return { ...summary, employeesLeft: summary.employeesLeft + 1 };
      case EventType.JOB_OPENING:
        return { ...summary, newOpenings: summary.newOpenings + 1 };
      case EventType.POSITION_CLOSED:
        return { ...summary, positionsClosed: summary.positionsClosed + 1 };
      case EventType.EMPLOYEE_RAISE:
        return { ...summary, raises: summary.raises + 1 };
      case EventType.PROJECT_ASSIGNMENT:
        return { ...summary, projectAssignments: summary.projectAssignments + 1 };
      default:
        return summary;
    }
  }, {
    newEmployees: 0,
    employeesLeft: 0,
    newOpenings: 0,
    positionsClosed: 0,
    raises: 0,
    projectAssignments: 0
  });
};

export const calculateYearGrowth = (events: Event[], year: number): number => {
  const yearEvents = getYearEvents(events, year);
  
  return yearEvents.reduce((growth, event) => {
    switch (event.type) {
      case EventType.NEW_EMPLOYEE:
        return growth + 1;
      case EventType.EMPLOYEE_LEFT:
      case EventType.EMPLOYEE_TERMINATED:
        return growth - 1;
      default:
        return growth;
    }
  }, 0);
};