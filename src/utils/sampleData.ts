import { v4 as uuidv4 } from 'uuid';
import { addDays, differenceInYears, isFuture } from 'date-fns';
import { Event, EventType } from '../types/events';
import { employeeManager } from './employeeManager';
import { initialEmployees } from '../data/initialEmployees';
import {
  generateRandomName,
  generateRandomRole,
  generateRandomProject,
  generateRandomSalaryForRole,
  getRandomItem,
  roles as commonRoles,
  projects as commonProjects
} from '../data/commonData';

// Company info event
const companyInfoEvent: Event = {
  id: uuidv4(),
  type: EventType.COMPANY_INFO,
  timestamp: new Date(2024, 0, 1).toISOString(),
  companyInfo: {
    name: "Nitka Technologies",
    employeeCount: initialEmployees.length
  }
};

// Track open positions
const openPositions = new Map<string, { title: string; project: string; count: number }>();

// Helper function to check probability
const checkProbability = (probability: number) => {
  const random = Math.random();
  return random < probability;
};

// Calculate daily probabilities based on target numbers
const calculateProbabilities = (totalDays: number) => {
  return {
    newJobOpening: 10 / totalDays,
    fillPosition: 10 / totalDays,
    employeeLeave: 10 / (totalDays * 50),
    employeeTerminate: 10 / (totalDays * 50)
  };
};

// Generate events for each day
const generateDailyEvents = (date: Date, probabilities: ReturnType<typeof calculateProbabilities>): Event[] => {
  const events: Event[] = [];
  const activeEmployees = employeeManager.getActiveEmployees();

  // New job opening
  if (checkProbability(probabilities.newJobOpening)) {
    const title = getRandomItem(commonRoles);
    const project = getRandomItem(commonProjects);
    const positionCount = Math.random() < 0.7 ? 1 : 2; // 70% chance for single position
    const jobOpeningId = uuidv4();

    events.push({
      id: jobOpeningId,
      type: EventType.JOB_OPENING,
      timestamp: date.toISOString(),
      jobInfo: {
        title,
        project,
        openPositions: positionCount
      }
    });

    openPositions.set(jobOpeningId, { title, project, count: positionCount });
  }

  // Process open positions
  openPositions.forEach((position, id) => {
    if (checkProbability(probabilities.fillPosition) && position.count > 0) {
      const name = generateRandomName();
      const salary = generateRandomSalaryForRole(position.title);

      // New employee event
      events.push({
        id: uuidv4(),
        type: EventType.NEW_EMPLOYEE,
        timestamp: date.toISOString(),
        employeeInfo: {
          name,
          startDate: date.toISOString(),
          project: position.project
        },
        salaryInfo: {
          amount: salary
        },
        jobOpeningId: id
      });

      // Position closed event
      events.push({
        id: uuidv4(),
        type: EventType.POSITION_CLOSED,
        timestamp: date.toISOString(),
        jobInfo: {
          title: position.title,
          project: position.project,
          remainingPositions: position.count - 1
        },
        employeeInfo: {
          name
        }
      });

      position.count--;
      if (position.count === 0) {
        openPositions.delete(id);
      }
    }
  });

  // Process existing employees
  activeEmployees.forEach(employee => {
    // Employee termination/leaving
    if (checkProbability(probabilities.employeeLeave + probabilities.employeeTerminate)) {
      const isTerminated = checkProbability(probabilities.employeeTerminate / 
        (probabilities.employeeLeave + probabilities.employeeTerminate));
      
      events.push({
        id: uuidv4(),
        type: isTerminated ? EventType.EMPLOYEE_TERMINATED : EventType.EMPLOYEE_LEFT,
        timestamp: date.toISOString(),
        employeeInfo: {
          name: employee.name,
          lastDay: date.toISOString(),
          position: employee.position,
          project: employee.project
        }
      });

      // Create new job opening to backfill
      const backfillId = uuidv4();
      events.push({
        id: backfillId,
        type: EventType.JOB_OPENING,
        timestamp: date.toISOString(),
        jobInfo: {
          title: employee.position,
          project: employee.project,
          openPositions: 1
        }
      });

      openPositions.set(backfillId, {
        title: employee.position,
        project: employee.project,
        count: 1
      });
    }
  });

  return events;
};

// Calculate total days and probabilities
const startDate = new Date(2024, 0, 1);
const endDate = new Date(2025, 1, 28);
const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
const probabilities = calculateProbabilities(totalDays);

// Generate events
let currentDate = startDate;
const generatedEvents: Event[] = [companyInfoEvent];

while (currentDate <= endDate) {
  const dailyEvents = generateDailyEvents(currentDate, probabilities);
  generatedEvents.push(...dailyEvents);
  
  // Process events through employee manager
  dailyEvents.forEach(event => employeeManager.processEvent(event));
  
  currentDate = addDays(currentDate, 1);
}

// Sort events by timestamp
export const sampleEvents = generatedEvents.sort((a, b) => 
  new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
);