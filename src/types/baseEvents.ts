export enum EventType {
  COMPANY_INFO = 'COMPANY_INFO',
  NEW_EMPLOYEE = 'NEW_EMPLOYEE',
  EMPLOYEE_TERMINATED = 'EMPLOYEE_TERMINATED',
  EMPLOYEE_LEFT = 'EMPLOYEE_LEFT',
  EMPLOYEE_RAISE = 'EMPLOYEE_RAISE',
  PROJECT_ASSIGNMENT = 'PROJECT_ASSIGNMENT',
  JOB_OPENING = 'JOB_OPENING',
  JOB_CANCELLED = 'JOB_CANCELLED',
  POSITION_CLOSED = 'POSITION_CLOSED',
  CURRENT_DATE = 'CURRENT_DATE'
}

export type BaseEvent = {
  id: string;
  timestamp: string;
  type: EventType;
};