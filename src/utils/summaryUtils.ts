import { Event, EventType } from '../types/events';
import { isSameMonth, isSameYear } from 'date-fns';

type MonthSummary = {
  newEmployees: number;
  employeesLeft: number;
  newOpenings: number;
  positionsClosed: number;
  raises: number;
  projectAssignments: number;
};

export const getMonthEvents = (events: Event[], date: Date): Event[] => {
  return events.filter(event => {
    const eventDate = new Date(event.timestamp);
    return isSameMonth(eventDate, date) && isSameYear(eventDate, date);
  });
};

export const calculateMonthSummary = (events: Event[], date: Date): MonthSummary => {
  const monthEvents = getMonthEvents(events, date);

  return monthEvents.reduce((summary, event) => {
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