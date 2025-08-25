import { useState, useEffect } from 'react';
import type { Prescription } from '@/types/prescription';

const STORAGE_KEY = 'eyecare-prescriptions';

export const usePrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Sort by date (newest first)
        const sorted = parsed.sort((a: Prescription, b: Prescription) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setPrescriptions(sorted);
      } catch (error) {
        console.error('Error loading prescriptions:', error);
      }
    }
  }, []);

  const addPrescription = (newPrescription: Omit<Prescription, 'id'>) => {
    const prescription: Prescription = {
      ...newPrescription,
      id: Date.now().toString(),
    };
    
    const updated = [prescription, ...prescriptions];
    setPrescriptions(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const deletePrescription = (id: string) => {
    const updated = prescriptions.filter(p => p.id !== id);
    setPrescriptions(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return {
    prescriptions,
    addPrescription,
    deletePrescription,
  };
};