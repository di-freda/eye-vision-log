export interface Appointment {
  id: string;
  date: string;
  optician: string;
  location: string;
  attended: boolean;
  notes?: string;
}