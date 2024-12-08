import { Employee } from '../types/employee';
import { Event, EventType } from '../types/events';
import { initialEmployees } from '../data/initialEmployees';

class EmployeeManager {
  private employees: Map<string, Employee>;

  constructor() {
    this.employees = new Map();
    initialEmployees.forEach(employee => {
      this.employees.set(employee.name, employee);
    });
  }

  addEmployee(employee: Employee): void {
    this.employees.set(employee.name, employee);
  }

  getEmployee(name: string): Employee | undefined {
    return this.employees.get(name);
  }

  getAllEmployees(): Employee[] {
    return Array.from(this.employees.values());
  }

  getActiveEmployees(): Employee[] {
    return this.getAllEmployees().filter(emp => emp.status === 'active');
  }

  updateEmployeeStatus(name: string, status: 'active' | 'terminated' | 'left'): void {
    const employee = this.employees.get(name);
    if (employee) {
      employee.status = status;
      if (status !== 'active') {
        employee.endDate = new Date().toISOString();
      }
    }
  }

  processEvent(event: Event): void {
    switch (event.type) {
      case EventType.NEW_EMPLOYEE:
        if ('employeeInfo' in event) {
          const newEmployee = {
            id: event.id,
            name: event.employeeInfo.name,
            position: event.employeeInfo.position || '',
            project: event.employeeInfo.project,
            salary: 'salaryInfo' in event ? event.salaryInfo.amount : 0,
            startDate: event.employeeInfo.startDate || event.timestamp,
            status: 'active' as const
          };
          this.addEmployee(newEmployee);
        }
        break;

      case EventType.EMPLOYEE_TERMINATED:
      case EventType.EMPLOYEE_LEFT:
        if ('employeeInfo' in event) {
          this.updateEmployeeStatus(
            event.employeeInfo.name,
            event.type === EventType.EMPLOYEE_TERMINATED ? 'terminated' : 'left'
          );
        }
        break;

      case EventType.EMPLOYEE_RAISE:
        if ('employeeInfo' in event && 'salaryInfo' in event) {
          const employee = this.getEmployee(event.employeeInfo.name);
          if (employee) {
            employee.salary = event.salaryInfo.newAmount;
          }
        }
        break;

      case EventType.PROJECT_ASSIGNMENT:
        if ('employeeInfo' in event) {
          const employee = this.getEmployee(event.employeeInfo.name);
          if (employee) {
            employee.position = event.employeeInfo.newPosition;
            employee.project = event.employeeInfo.newProject;
          }
        }
        break;
    }
  }
}

export const employeeManager = new EmployeeManager();