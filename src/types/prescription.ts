export interface EyeData {
  sph: number; // Sphere power
  cyl: number; // Cylinder power
  axis: number; // Axis (0-180 degrees)
}

export interface Prescription {
  id: string;
  date: string;
  type: 'glasses' | 'contacts';
  rightEye: EyeData;
  leftEye: EyeData;
  notes?: string;
}