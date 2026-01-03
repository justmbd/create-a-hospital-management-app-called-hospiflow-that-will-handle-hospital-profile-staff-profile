
export type UserRole = 'admin' | 'doctor' | 'nurse' | 'pharmacist' | 'lab_tech' | 'receptionist';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  fullName: string;
  department?: string;
  avatar?: string;
}

export interface Hospital {
  id: string;
  name: string;
  logo?: string;
  address: string;
  phone: string;
  email: string;
  license: string;
  accreditation: string;
  operatingHours: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email: string;
  address: string;
  bloodType?: string;
  allergies?: string[];
  insurance?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: 'outpatient' | 'inpatient';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Admission {
  id: string;
  patientId: string;
  wardId: string;
  bedNumber: string;
  admissionDate: string;
  dischargeDate?: string;
  diagnosis: string;
  status: 'active' | 'discharged';
}

export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department: string;
  email: string;
  phone: string;
  qualification: string;
  joinDate: string;
  status: 'active' | 'inactive';
}

export interface Medicine {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  batchNumber: string;
  reorderLevel: number;
  price: number;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  medicines: {
    medicineId: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  date: string;
  status: 'pending' | 'dispensed';
}

export interface LabTest {
  id: string;
  patientId: string;
  testName: string;
  orderedBy: string;
  orderedDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  results?: string;
  completedDate?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  department?: string;
}