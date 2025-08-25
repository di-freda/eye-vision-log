import { useState, useEffect } from 'react';
import type { Appointment } from '@/types/appointment';

const STORAGE_KEY = 'eyecare-appointments';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAppointments(parsed);
      } catch (error) {
        console.error('Error loading appointments:', error);
      }
    }
  }, []);

  const addAppointment = (newAppointment: Omit<Appointment, 'id'>) => {
    const appointment: Appointment = {
      ...newAppointment,
      id: Date.now().toString(),
    };
    
    const updated = [...appointments, appointment];
    setAppointments(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    const updated = appointments.map(a => 
      a.id === id ? { ...a, ...updates } : a
    );
    setAppointments(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const deleteAppointment = (id: string) => {
    const updated = appointments.filter(a => a.id !== id);
    setAppointments(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
  };
};