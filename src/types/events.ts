import { BaseEvent, EventType } from './baseEvents';

// Company info event
export type CompanyInfoEvent = BaseEvent & {
  type: EventType.COMPANY_INFO;
  companyInfo: {
    name: string;
    employeeCount: number;
  };
};

// Employee-related events
export type NewEmployeeEvent = BaseEvent & {
  type: EventType.NEW_EMPLOYEE;
  employeeInfo: {
    name: string;
    startDate: string;
    project: string;
  };
  salaryInfo: {
    amount: number;
  };
  jobOpeningId: string; // Reference to the job opening event
};

export type EmployeeTerminatedEvent = BaseEvent & {
  type: EventType.EMPLOYEE_TERMINATED;
  employeeInfo: {
    name: string;
    lastDay: string;
    position: string;
    project: string;
  };
};

export type EmployeeLeftEvent = BaseEvent & {
  type: EventType.EMPLOYEE_LEFT;
  employeeInfo: {
    name: string;
    lastDay: string;
    position: string;
    project: string;
  };
};

export type EmployeeRaiseEvent = BaseEvent & {
  type: EventType.EMPLOYEE_RAISE;
  employeeInfo: {
    name: string;
    effectiveDate: string;
    position: string;
    project: string;
  };
  salaryInfo: {
    oldAmount: number;
    newAmount: number;
  };
};

export type ProjectAssignmentEvent = BaseEvent & {
  type: EventType.PROJECT_ASSIGNMENT;
  employeeInfo: {
    name: string;
    effectiveDate: string;
    newPosition: string;
    newProject: string;
  };
};

// Job-related events
export type JobOpeningEvent = BaseEvent & {
  type: EventType.JOB_OPENING;
  jobInfo: {
    title: string;
    project: string;
    openPositions: number;
  };
};

export type JobCancelledEvent = BaseEvent & {
  type: EventType.JOB_CANCELLED;
  jobInfo: {
    title: string;
    project: string;
    openPositions: number;
  };
};

export type PositionClosedEvent = BaseEvent & {
  type: EventType.POSITION_CLOSED;
  jobInfo: {
    title: string;
    project: string;
    remainingPositions: number;
  };
  employeeInfo: {
    name: string;
  };
};

export type Event =
  | CompanyInfoEvent
  | NewEmployeeEvent
  | EmployeeTerminatedEvent
  | EmployeeLeftEvent
  | EmployeeRaiseEvent
  | ProjectAssignmentEvent
  | JobOpeningEvent
  | JobCancelledEvent
  | PositionClosedEvent;

export { EventType } from './baseEvents';