import { v4 as uuidv4 } from 'uuid';

export type Employee = {
  id: string;
  name: string;
  position: string;
  project: string;
  salary: number;
  startDate: string;
  endDate?: string;
  status: 'active' | 'terminated' | 'left';
};

export const createEmployee = (
  name: string,
  position: string,
  project: string,
  salary: number,
  startDate: string
): Employee => ({
  id: uuidv4(),
  name,
  position,
  project,
  salary,
  startDate,
  status: 'active'
});