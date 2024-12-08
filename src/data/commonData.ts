import { subYears, subMonths } from 'date-fns';

export const firstNames = [
  'James', 'Emma', 'Michael', 'Sophia', 'William', 'Olivia', 'Alexander', 'Isabella',
  'Daniel', 'Ava', 'David', 'Mia', 'Joseph', 'Charlotte', 'Matthew', 'Amelia',
  'Andrew', 'Harper', 'Lucas', 'Evelyn', 'Samuel', 'Abigail', 'Christopher', 'Emily',
  'John', 'Elizabeth', 'Dylan', 'Sofia', 'Nathan', 'Victoria'
];

export const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson'
];

export const roles = [
  'Software Engineer',
  'Senior Software Engineer',
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'DevOps Engineer',
  'QA Engineer',
  'UI/UX Designer',
  'Product Manager',
  'Project Manager',
  'Data Scientist',
  'Machine Learning Engineer',
  'Systems Architect',
  'Cloud Engineer',
  'Security Engineer'
];

export const projects = [
  'ACME Inc Website',
  'Intel Mobile App',
  'Tesla Navigation System',
  'SpaceX Mission Control',
  'Amazon Warehouse Automation',
  'Google Cloud Integration',
  'Microsoft Office Add-in',
  'Apple Health Platform',
  'Meta VR Experience',
  'Netflix Streaming Service'
];

// Helper functions
export const getRandomItem = <T>(array: T[]): T => 
  array[Math.floor(Math.random() * array.length)];

export const getRandomSalary = (min: number, max: number): number => 
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomStartDate = (yearsAgo: number = 2): string => {
  const now = new Date();
  const startDate = subYears(now, yearsAgo);
  const monthsAgo = Math.floor(Math.random() * (yearsAgo * 12)) + 1;
  return subMonths(startDate, monthsAgo).toISOString();
};

export const generateRandomName = (): string => 
  `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`;

export const generateRandomRole = (): string => 
  getRandomItem(roles);

export const generateRandomProject = (): string => 
  getRandomItem(projects);

export const generateRandomSalaryForRole = (role: string): number => {
  const baseSalary = role.includes('Senior') ? 130000 : 90000;
  const salaryVariation = Math.floor(Math.random() * 30000);
  return baseSalary + salaryVariation;
};