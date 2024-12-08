import React, { useState } from 'react';
import { EventType } from '../types/events';
import { createEvent } from '../utils/eventUtils';

type EventFormProps = {
  onEventAdd: (event: any) => void;
};

const EventForm: React.FC<EventFormProps> = ({ onEventAdd }) => {
  const [eventType, setEventType] = useState<EventType>(EventType.NEW_EMPLOYEE);
  const [formData, setFormData] = useState({});

  const getFormFields = () => {
    switch (eventType) {
      case EventType.NEW_EMPLOYEE:
        return (
          <>
            <input
              type="text"
              placeholder="Name"
              className="form-input"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="date"
              className="form-input"
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
            <input
              type="text"
              placeholder="Position"
              className="form-input"
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            />
            <input
              type="text"
              placeholder="Project"
              className="form-input"
              onChange={(e) => setFormData({ ...formData, project: e.target.value })}
            />
            <input
              type="number"
              placeholder="Salary"
              className="form-input"
              onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
            />
          </>
        );
      // Add other event type forms here
      default:
        return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent = createEvent(eventType, formData);
    onEventAdd(newEvent);
    setFormData({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <select
        value={eventType}
        onChange={(e) => setEventType(e.target.value as EventType)}
        className="w-full p-2 border rounded"
      >
        {Object.values(EventType).map((type) => (
          <option key={type} value={type}>
            {type.replace(/_/g, ' ')}
          </option>
        ))}
      </select>
      <div className="space-y-3">
        {getFormFields()}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add Event
      </button>
    </form>
  );
};

export default EventForm;