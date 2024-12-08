import React from 'react';
import { Dialog } from '@headlessui/react';
import { Event, EventType } from '../types/events';
import { formatMonthYear } from '../utils/dateUtils';
import { BarChart3 } from 'lucide-react';
import { calculateMonthSummary, getMonthEvents } from '../utils/summaryUtils';
import { getEventIcon } from '../utils/eventUtils';
import { format as dateFnsFormat } from 'date-fns';

type MonthSummaryProps = {
  date: Date;
  events: Event[];
  isOpen: boolean;
  onClose: () => void;
};

const MonthSummary: React.FC<MonthSummaryProps> = ({ date, events, isOpen, onClose }) => {
  const summary = calculateMonthSummary(events, date);
  const monthEvents = getMonthEvents(events, date);

  const renderEventList = (eventType: EventType) => {
    const filteredEvents = monthEvents.filter(event => event.type === eventType);
    if (filteredEvents.length === 0) return null;

    const Icon = getEventIcon(eventType);

    // Custom table structure for employee events
    if (eventType === EventType.NEW_EMPLOYEE || 
        eventType === EventType.EMPLOYEE_LEFT || 
        eventType === EventType.EMPLOYEE_TERMINATED
    ) {
      const isNewEmployee = eventType === EventType.NEW_EMPLOYEE;
      
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-50">
                <Icon className="w-5 h-5 text-gray-600" />
              </div>
              <span className="font-medium text-gray-800">
                {eventType.replace(/_/g, ' ')} ({filteredEvents.length})
              </span>
            </div>
          </div>
          
          <div className="pl-4">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="pb-2 font-medium w-32">
                    {isNewEmployee ? 'Start Date' : 'Last Day'}
                  </th>
                  <th className="pb-2 font-medium">Employee</th>
                  <th className="pb-2 font-medium">Role</th>
                  <th className="pb-2 font-medium">Project</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredEvents.map(event => {
                  if ('employeeInfo' in event && 
                      ((isNewEmployee && 'startDate' in event.employeeInfo) || 
                       (!isNewEmployee && 'lastDay' in event.employeeInfo))
                  ) {
                    const dateField = isNewEmployee ? 
                      event.employeeInfo.startDate : 
                      event.employeeInfo.lastDay;
                    
                    return (
                      <tr key={event.id} className="border-t">
                        <td className="py-2 text-gray-600">
                          {dateField && dateFnsFormat(new Date(dateField), 'd MMM yyyy')}
                        </td>
                        <td className="py-2 font-medium text-gray-800">
                          {event.employeeInfo.name}
                        </td>
                        <td className="py-2 text-gray-600">
                          {event.employeeInfo.position || 'N/A'}
                        </td>
                        <td className="py-2 text-gray-600">
                          {event.employeeInfo.project || 'N/A'}
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // Custom table structure for job openings
    if (eventType === EventType.JOB_OPENING) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-50">
                <Icon className="w-5 h-5 text-gray-600" />
              </div>
              <span className="font-medium text-gray-800">
                {eventType.replace(/_/g, ' ')} ({filteredEvents.length})
              </span>
            </div>
          </div>
          
          <div className="pl-4">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="pb-2 font-medium w-32">Date</th>
                  <th className="pb-2 font-medium">Role</th>
                  <th className="pb-2 font-medium">Project</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredEvents.map(event => {
                  if ('jobInfo' in event) {
                    return (
                      <tr key={event.id} className="border-t">
                        <td className="py-2 text-gray-600">
                          {dateFnsFormat(new Date(event.timestamp), 'd MMM yyyy')}
                        </td>
                        <td className="py-2 font-medium text-gray-800">
                          {event.jobInfo.title}
                        </td>
                        <td className="py-2 text-gray-600">
                          {event.jobInfo.project}
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // Default table structure for other event types
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gray-50">
              <Icon className="w-5 h-5 text-gray-600" />
            </div>
            <span className="font-medium text-gray-800">
              {eventType.replace(/_/g, ' ')} ({filteredEvents.length})
            </span>
          </div>
        </div>
        
        <div className="pl-4">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-2 font-medium w-32">Date</th>
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Details</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredEvents.map(event => (
                <tr key={event.id} className="border-t">
                  <td className="py-2 text-gray-600">
                    {dateFnsFormat(new Date(event.timestamp), 'd MMM yyyy')}
                  </td>
                  <td className="py-2 font-medium text-gray-800">
                    {'employeeInfo' in event && event.employeeInfo.name}
                  </td>
                  <td className="py-2 text-gray-600">
                    {'jobInfo' in event && (
                      <>
                        {event.jobInfo.title}
                        {event.jobInfo.project && ` • ${event.jobInfo.project}`}
                      </>
                    )}
                    {'employeeInfo' in event && 'lastDay' in event.employeeInfo && (
                      <>Last day: {dateFnsFormat(new Date(event.employeeInfo.lastDay), 'd MMM yyyy')}</>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/25" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-800">
                <BarChart3 className="w-5 h-5" />
              </div>
              <Dialog.Title className="text-xl font-semibold">
                Summary for {formatMonthYear(date)}
              </Dialog.Title>
            </div>

            <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-2">
              {renderEventList(EventType.NEW_EMPLOYEE)}
              {renderEventList(EventType.EMPLOYEE_LEFT)}
              {renderEventList(EventType.EMPLOYEE_TERMINATED)}
              {renderEventList(EventType.JOB_OPENING)}
              {renderEventList(EventType.POSITION_CLOSED)}
              {renderEventList(EventType.EMPLOYEE_RAISE)}
              {renderEventList(EventType.PROJECT_ASSIGNMENT)}

              {Object.values(summary).every(value => value === 0) && (
                <div className="text-center text-gray-500 py-4">
                  No events recorded for this month
                </div>
              )}
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

export default MonthSummary;