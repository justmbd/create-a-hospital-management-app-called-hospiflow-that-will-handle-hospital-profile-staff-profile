
import { Hospital, Patient, Staff, Medicine, LabTest, Prescription, Admission } from '@/types';

export const mockHospital: Hospital = {
  id: '1',
  name: 'HospiFlow Medical Center',
  address: '123 Healthcare Avenue, Medical District, City 12345',
  phone: '+1 (555) 123-4567',
  email: 'info@hospiflow.com',
  license: 'HL-2024-001234',
  accreditation: 'Joint Commission Accredited',
  operatingHours: '24/7 Emergency Services'
};

export const mockPatients: Patient[] = [
  {
    id: 'P001',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1985-03-15',
    gender: 'male',
    phone: '+1 (555) 234-5678',
    email: 'john.doe@email.com',
    address: '456 Patient Street, City',
    bloodType: 'O+',
    allergies: ['Penicillin'],
    insurance: 'Blue Cross',
    emergencyContact: {
      name: 'Jane Doe',
      phone: '+1 (555) 234-5679',
      relationship: 'Spouse'
    }
  },
  {
    id: 'P002',
    firstName: 'Mary',
    lastName: 'Smith',
    dateOfBirth: '1990-07-22',
    gender: 'female',
    phone: '+1 (555) 345-6789',
    email: 'mary.smith@email.com',
    address: '789 Health Road, City',
    bloodType: 'A+',
    allergies: [],
    insurance: 'Aetna',
    emergencyContact: {
      name: 'Robert Smith',
      phone: '+1 (555) 345-6790',
      relationship: 'Father'
    }
  },
  {
    id: 'P003',
    firstName: 'James',
    lastName: 'Wilson',
    dateOfBirth: '1978-11-30',
    gender: 'male',
    phone: '+1 (555) 456-7890',
    email: 'james.wilson@email.com',
    address: '321 Wellness Blvd, City',
    bloodType: 'B+',
    allergies: ['Sulfa drugs'],
    insurance: 'United Healthcare',
    emergencyContact: {
      name: 'Lisa Wilson',
      phone: '+1 (555) 456-7891',
      relationship: 'Wife'
    }
  }
];

export const mockStaff: Staff[] = [
  {
    id: 'S001',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'doctor',
    department: 'General Medicine',
    email: 'sarah.johnson@hospiflow.com',
    phone: '+1 (555) 111-2222',
    qualification: 'MD, Internal Medicine',
    joinDate: '2020-01-15',
    status: 'active'
  },
  {
    id: 'S002',
    firstName: 'Emily',
    lastName: 'Davis',
    role: 'nurse',
    department: 'Emergency',
    email: 'emily.davis@hospiflow.com',
    phone: '+1 (555) 222-3333',
    qualification: 'RN, BSN',
    joinDate: '2021-03-20',
    status: 'active'
  },
  {
    id: 'S003',
    firstName: 'Michael',
    lastName: 'Chen',
    role: 'pharmacist',
    department: 'Pharmacy',
    email: 'michael.chen@hospiflow.com',
    phone: '+1 (555) 333-4444',
    qualification: 'PharmD',
    joinDate: '2019-08-10',
    status: 'active'
  },
  {
    id: 'S004',
    firstName: 'Robert',
    lastName: 'Martinez',
    role: 'lab_tech',
    department: 'Laboratory',
    email: 'robert.martinez@hospiflow.com',
    phone: '+1 (555) 444-5555',
    qualification: 'MLT Certified',
    joinDate: '2022-02-01',
    status: 'active'
  }
];

export const mockMedicines: Medicine[] = [
  {
    id: 'M001',
    name: 'Amoxicillin 500mg',
    category: 'Antibiotic',
    quantity: 500,
    unit: 'tablets',
    expiryDate: '2025-12-31',
    batchNumber: 'AMX-2024-001',
    reorderLevel: 100,
    price: 0.50
  },
  {
    id: 'M002',
    name: 'Ibuprofen 400mg',
    category: 'Pain Relief',
    quantity: 800,
    unit: 'tablets',
    expiryDate: '2026-06-30',
    batchNumber: 'IBU-2024-002',
    reorderLevel: 200,
    price: 0.25
  },
  {
    id: 'M003',
    name: 'Metformin 850mg',
    category: 'Diabetes',
    quantity: 300,
    unit: 'tablets',
    expiryDate: '2025-09-15',
    batchNumber: 'MET-2024-003',
    reorderLevel: 150,
    price: 0.75
  },
  {
    id: 'M004',
    name: 'Lisinopril 10mg',
    category: 'Cardiovascular',
    quantity: 450,
    unit: 'tablets',
    expiryDate: '2026-03-20',
    batchNumber: 'LIS-2024-004',
    reorderLevel: 100,
    price: 0.60
  }
];

export const mockLabTests: LabTest[] = [
  {
    id: 'L001',
    patientId: 'P001',
    testName: 'Complete Blood Count (CBC)',
    orderedBy: 'Dr. Sarah Johnson',
    orderedDate: '2026-01-02',
    status: 'completed',
    results: 'WBC: 7.5, RBC: 4.8, Hemoglobin: 14.2 g/dL - Normal',
    completedDate: '2026-01-02'
  },
  {
    id: 'L002',
    patientId: 'P002',
    testName: 'Lipid Panel',
    orderedBy: 'Dr. Sarah Johnson',
    orderedDate: '2026-01-03',
    status: 'in_progress'
  },
  {
    id: 'L003',
    patientId: 'P003',
    testName: 'Blood Glucose',
    orderedBy: 'Dr. Sarah Johnson',
    orderedDate: '2026-01-03',
    status: 'pending'
  }
];

export const mockPrescriptions: Prescription[] = [
  {
    id: 'RX001',
    patientId: 'P001',
    doctorId: 'S001',
    medicines: [
      {
        medicineId: 'M001',
        dosage: '500mg',
        frequency: 'Three times daily',
        duration: '7 days'
      }
    ],
    date: '2026-01-02',
    status: 'dispensed'
  },
  {
    id: 'RX002',
    patientId: 'P002',
    doctorId: 'S001',
    medicines: [
      {
        medicineId: 'M002',
        dosage: '400mg',
        frequency: 'As needed',
        duration: '14 days'
      }
    ],
    date: '2026-01-03',
    status: 'pending'
  }
];

export const mockAdmissions: Admission[] = [
  {
    id: 'A001',
    patientId: 'P001',
    wardId: 'W001',
    bedNumber: 'B-101',
    admissionDate: '2026-01-01',
    diagnosis: 'Pneumonia',
    status: 'active'
  },
  {
    id: 'A002',
    patientId: 'P003',
    wardId: 'W002',
    bedNumber: 'B-205',
    admissionDate: '2025-12-30',
    dischargeDate: '2026-01-02',
    diagnosis: 'Appendicitis - Post Surgery',
    status: 'discharged'
  }
];