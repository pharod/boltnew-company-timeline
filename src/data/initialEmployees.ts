import { Employee } from '../types/employee';
import { createEmployee } from '../types/employee';
import {
  generateRandomName,
  generateRandomRole,
  generateRandomProject,
  generateRandomSalaryForRole,
  getRandomStartDate
} from './commonData';

// Generate 50 initial employees
export const initialEmployees: Employee[] = Array.from({ length: 50 }, () => {
  const role = generateRandomRole();
  return createEmployee(
    generateRandomName(),
    role,
    generateRandomProject(),
    generateRandomSalaryForRole(role),
    getRandomStartDate()
  );
});