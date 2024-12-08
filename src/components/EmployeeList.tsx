import React from 'react';
import { Dialog } from '@headlessui/react';
import { Users } from 'lucide-react';
import { Employee } from '../types/employee';
import { format as formatDate, isSameYear } from 'date-fns';

type EmployeeListProps = {
  employees: Employee[];
  isOpen: boolean;
  onClose: () => void;
};

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, isOpen, onClose }) => {
  const sortedEmployees = [...employees].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  const formatStartDate = (date: string) => {
    const startDate = new Date(date);
    const currentYear = new Date().getFullYear();
    
    if (isSameYear(startDate, new Date())) {
      return formatDate(startDate, 'MMM d');
    }
    return formatDate(startDate, 'MMM d, yyyy');
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/25" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-800">
                <Users className="w-5 h-5" />
              </div>
              <Dialog.Title className="text-xl font-semibold">
                Initial Employee List
              </Dialog.Title>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              <table className="min-w-full table-fixed">
                <colgroup>
                  <col className="w-1/4" />
                  <col className="w-1/4" />
                  <col className="w-1/4" />
                  <col className="w-1/8" />
                  <col className="w-1/8" />
                </colgroup>
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Position</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Project</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Start Date</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Salary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sortedEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-sm text-gray-900 truncate">{employee.name}</td>
                      <td className="px-6 py-3 text-sm text-gray-600 truncate">{employee.position}</td>
                      <td className="px-6 py-3 text-sm text-gray-600 truncate">{employee.project}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">
                        {formatStartDate(employee.startDate)}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-600 text-right">
                        ${employee.salary.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-4 border-t flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default EmployeeList;