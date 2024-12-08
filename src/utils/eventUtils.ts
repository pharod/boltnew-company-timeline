import { v4 as uuidv4 } from 'uuid';
import {
  Event,
  EventType,
  NewEmployeeEvent,
  EmployeeTerminatedEvent,
  EmployeeLeftEvent,
  EmployeeRaiseEvent,
  ProjectAssignmentEvent,
  JobOpeningEvent,
  JobCancelledEvent,
  PositionClosedEvent,
} from '../types/events';
import {
  UserPlus,
  UserMinus,
  UserX,
  TrendingUp,
  Briefcase,
  FileSearch,
  FileX,
  CheckCircle,
  Clock,
  Building2,
  LucideIcon
} from 'lucide-react';

export const createEvent = (type: EventType, data: any): Event => {
  const baseEvent = {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    type,
  };

  switch (type) {
    case EventType.NEW_EMPLOYEE:
      return {
        ...baseEvent,
        employeeInfo: {
          name: data.name,
          startDate: data.startDate,
          position: data.position,
          project: data.project,
        },
        salaryInfo: {
          amount: data.salary,
        }
      } as NewEmployeeEvent;

    case EventType.EMPLOYEE_TERMINATED:
      return {
        ...baseEvent,
        employeeInfo: {
          name: data.name,
          lastDay: data.lastDay,
          position: data.position,
          project: data.project,
        }
      } as EmployeeTerminatedEvent;

    case EventType.EMPLOYEE_LEFT:
      return {
        ...baseEvent,
        employeeInfo: {
          name: data.name,
          lastDay: data.lastDay,
          position: data.position,
          project: data.project,
        }
      } as EmployeeLeftEvent;

    case EventType.EMPLOYEE_RAISE:
      return {
        ...baseEvent,
        employeeInfo: {
          name: data.name,
          effectiveDate: data.effectiveDate,
          position: data.position,
          project: data.project,
        },
        salaryInfo: {
          oldAmount: data.oldSalary,
          newAmount: data.newSalary,
        }
      } as EmployeeRaiseEvent;

    case EventType.PROJECT_ASSIGNMENT:
      return {
        ...baseEvent,
        employeeInfo: {
          name: data.name,
          effectiveDate: data.effectiveDate,
          newPosition: data.newPosition,
          newProject: data.newProject,
        }
      } as ProjectAssignmentEvent;

    case EventType.JOB_OPENING:
      return {
        ...baseEvent,
        jobInfo: {
          title: data.title,
          project: data.project,
          openPositions: data.openPositions,
        }
      } as JobOpeningEvent;

    case EventType.JOB_CANCELLED:
      return {
        ...baseEvent,
        jobInfo: {
          title: data.title,
          project: data.project,
          openPositions: data.openPositions,
        }
      } as JobCancelledEvent;

    case EventType.POSITION_CLOSED:
      return {
        ...baseEvent,
        jobInfo: {
          title: data.title,
          project: data.project,
          remainingPositions: data.remainingPositions,
        },
        employeeInfo: {
          name: data.newEmployeeName,
        }
      } as PositionClosedEvent;

    default:
      throw new Error(`Unsupported event type: ${type}`);
  }
};

export const getEventIcon = (type: EventType): LucideIcon => {
  switch (type) {
    case EventType.COMPANY_INFO:
      return Building2;
    case EventType.NEW_EMPLOYEE:
      return UserPlus;
    case EventType.EMPLOYEE_TERMINATED:
      return UserX;
    case EventType.EMPLOYEE_LEFT:
      return UserMinus;
    case EventType.EMPLOYEE_RAISE:
      return TrendingUp;
    case EventType.PROJECT_ASSIGNMENT:
      return Briefcase;
    case EventType.JOB_OPENING:
      return FileSearch;
    case EventType.JOB_CANCELLED:
      return FileX;
    case EventType.POSITION_CLOSED:
      return CheckCircle;
    case EventType.CURRENT_DATE:
      return Clock;
  }
};

export const getEventColor = (type: EventType) => {
  switch (type) {
    case EventType.COMPANY_INFO:
      return {
        bg: 'bg-blue-100',
        text: 'text-blue-800'
      };
    case EventType.NEW_EMPLOYEE:
    case EventType.POSITION_CLOSED:
      return {
        bg: 'bg-green-100',
        text: 'text-green-800'
      };
    case EventType.EMPLOYEE_TERMINATED:
    case EventType.EMPLOYEE_LEFT:
    case EventType.JOB_CANCELLED:
      return {
        bg: 'bg-red-100',
        text: 'text-red-800'
      };
    case EventType.EMPLOYEE_RAISE:
      return {
        bg: 'bg-purple-100',
        text: 'text-purple-800'
      };
    case EventType.PROJECT_ASSIGNMENT:
      return {
        bg: 'bg-blue-100',
        text: 'text-blue-800'
      };
    case EventType.JOB_OPENING:
      return {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800'
      };
    case EventType.CURRENT_DATE:
      return {
        bg: 'bg-indigo-100/80',
        text: 'text-indigo-800'
      };
    default:
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-800'
      };
  }
};