import React, { useState } from 'react';
import Timeline from './components/Timeline';
import EventForm from './components/EventForm';
import Button from './components/Button';
import Modal from './components/Modal';
import { Event, EventType } from './types/events';
import { sampleEvents } from './utils/sampleData';
import { Filter, X } from 'lucide-react';

type FilterType = {
  type: 'eventType' | 'employee' | 'jobOpening' | 'project' | null;
  value: EventType | string | null;
};

function App() {
  const [events, setEvents] = useState<Event[]>(sampleEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>({ type: null, value: null });

  const handleEventAdd = (newEvent: Event) => {
    setEvents((prevEvents) => [newEvent, ...prevEvents]);
    setIsModalOpen(false);
  };

  const filteredEvents = React.useMemo(() => {
    if (!activeFilter.type) return events;

    return events.filter(event => {
      switch (activeFilter.type) {
        case 'eventType':
          return event.type === activeFilter.value;
        case 'employee':
          return (
            ('employeeInfo' in event && event.employeeInfo.name === activeFilter.value) ||
            (event.type === EventType.POSITION_CLOSED && 
             'employeeInfo' in event && 
             event.employeeInfo.name === activeFilter.value)
          );
        case 'jobOpening': {
          const title = activeFilter.value as string;
          
          // Find the job opening event to get the project name
          const jobOpeningEvent = events.find(e => 
            e.type === EventType.JOB_OPENING && 
            'jobInfo' in e && 
            e.jobInfo.title === title
          );
          
          const projectName = jobOpeningEvent && 'jobInfo' in jobOpeningEvent ? 
            jobOpeningEvent.jobInfo.project : null;

          // Include job opening events
          if ('jobInfo' in event && event.jobInfo.title === title) {
            return true;
          }

          // Include employee events for the same position and project
          if ('employeeInfo' in event) {
            const isTerminationOrLeaving = (
              event.type === EventType.EMPLOYEE_TERMINATED ||
              event.type === EventType.EMPLOYEE_LEFT
            );

            if (isTerminationOrLeaving) {
              return event.employeeInfo.position === title && 
                     event.employeeInfo.project === projectName;
            }

            // For new employees, check if they're filling this position
            if (event.type === EventType.NEW_EMPLOYEE) {
              const jobOpeningId = 'jobOpeningId' in event ? event.jobOpeningId : null;
              const relatedJobOpening = events.find(e => e.id === jobOpeningId);
              
              return relatedJobOpening && 
                     'jobInfo' in relatedJobOpening && 
                     relatedJobOpening.jobInfo.title === title &&
                     relatedJobOpening.jobInfo.project === projectName;
            }
          }

          return false;
        }
        case 'project':
          return (
            ('employeeInfo' in event && event.employeeInfo.project === activeFilter.value) ||
            ('jobInfo' in event && event.jobInfo.project === activeFilter.value)
          );
        default:
          return true;
      }
    });
  }, [events, activeFilter]);

  const handleEventTypeClick = (type: EventType) => {
    setActiveFilter(current => 
      current.type === 'eventType' && current.value === type 
        ? { type: null, value: null }
        : { type: 'eventType', value: type }
    );
  };

  const handleEmployeeClick = (name: string) => {
    setActiveFilter(current =>
      current.type === 'employee' && current.value === name
        ? { type: null, value: null }
        : { type: 'employee', value: name }
    );
  };

  const handleJobOpeningClick = (title: string) => {
    setActiveFilter(current =>
      current.type === 'jobOpening' && current.value === title
        ? { type: null, value: null }
        : { type: 'jobOpening', value: title }
    );
  };

  const handleProjectClick = (project: string) => {
    setActiveFilter(current =>
      current.type === 'project' && current.value === project
        ? { type: null, value: null }
        : { type: 'project', value: project }
    );
  };

  const getFilterLabel = () => {
    if (!activeFilter.type) return null;
    
    switch (activeFilter.type) {
      case 'eventType':
        return (activeFilter.value as string).replace(/_/g, ' ').toLowerCase();
      case 'employee':
        return `events for ${activeFilter.value}`;
      case 'jobOpening':
        return `events for position "${activeFilter.value}"`;
      case 'project':
        return `events in project "${activeFilter.value}"`;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Company Timeline</h1>
          <Button icon onClick={() => setIsModalOpen(true)}>
            Add Event
          </Button>
        </div>

        {activeFilter.type && (
          <div className="mb-6 flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                Showing only {getFilterLabel()}
              </span>
            </div>
            <button
              onClick={() => setActiveFilter({ type: null, value: null })}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4" />
              Clear filter
            </button>
          </div>
        )}

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <Timeline 
            events={filteredEvents} 
            allEvents={events}
            onEventTypeClick={handleEventTypeClick}
            onEmployeeClick={handleEmployeeClick}
            onJobOpeningClick={handleJobOpeningClick}
            onProjectClick={handleProjectClick}
            activeFilter={activeFilter}
          />
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add New Event"
        >
          <EventForm onEventAdd={handleEventAdd} />
        </Modal>
      </div>
    </div>
  );
}

export default App;