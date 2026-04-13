
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BedDouble, UserPlus, LogOut } from 'lucide-react';
import { mockAdmissions, mockPatients, mockStaff } from '@/data/mockData';
import { Admission } from '@/types';
import { format } from 'date-fns';
import { toast } from 'sonner';

export const InpatientModule: React.FC = () => {
  const [admissions, setAdmissions] = useState(mockAdmissions);
  const [isAdmitDialogOpen, setIsAdmitDialogOpen] = useState(false);
  const [dischargeAdmissionId, setDischargeAdmissionId] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    patientId: '',
    wardId: '',
    bedNumber: '',
    diagnosis: '',
    admittingDoctorId: '',
    notes: '',
  });

  const getPatientName = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown';
  };

  const activeAdmissions = admissions.filter(a => a.status === 'active');
  const dischargedAdmissions = admissions.filter(a => a.status === 'discharged');

  const doctors = mockStaff.filter(s => s.role === 'doctor');
  
  const wards = [
    { id: 'W001', name: 'General Ward', availableBeds: 15 },
    { id: 'W002', name: 'ICU', availableBeds: 5 },
    { id: 'W003', name: 'Pediatric Ward', availableBeds: 8 },
    { id: 'W004', name: 'Maternity Ward', availableBeds: 10 },
  ];

  const resetForm = () => {
    setFormData({
      patientId: '',
      wardId: '',
      bedNumber: '',
      diagnosis: '',
      admittingDoctorId: '',
      notes: '',
    });
  };

  const handleAdmitPatient = () => {
    // Validation
    if (!formData.patientId) {
      toast.error('Please select a patient');
      return;
    }
    if (!formData.wardId) {
      toast.error('Please select a ward');
      return;
    }
    if (!formData.bedNumber) {
      toast.error('Please enter bed number');
      return;
    }
    if (!formData.diagnosis.trim()) {
      toast.error('Please enter diagnosis');
      return;
    }
    if (!formData.admittingDoctorId) {
      toast.error('Please select admitting doctor');
      return;
    }

    const newAdmission: Admission = {
      id: `A${String(admissions.length + 1).padStart(3, '0')}`,
      patientId: formData.patientId,
      wardId: formData.wardId,
      bedNumber: formData.bedNumber,
      admissionDate: new Date().toISOString().split('T')[0],
      diagnosis: formData.diagnosis,
      admittingDoctorId: formData.admittingDoctorId,
      status: 'active',
      notes: formData.notes,
    };

    setAdmissions([...admissions, newAdmission]);
    toast.success('Patient admitted successfully');
    setIsAdmitDialogOpen(false);
    resetForm();
  };

  const handleDischargePatient = (admissionId: string) => {
    const admission = admissions.find(a => a.id === admissionId);
    if (!admission) return;
    
    const updatedAdmissions = admissions.map(a => 
      a.id === admissionId 
        ? { ...a, status: 'discharged' as const, dischargeDate: new Date().toISOString().split('T')[0] }
        : a
    );
    
    setAdmissions(updatedAdmissions);
    const patient = getPatientName(admission.patientId);
    toast.success(`${patient} discharged successfully`);
    setDischargeAdmissionId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Inpatient Management</h2>
          <p className="text-muted-foreground mt-1">Manage hospital admissions and ward assignments</p>
        </div>
        <Dialog open={isAdmitDialogOpen} onOpenChange={setIsAdmitDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Admit Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Admit New Patient</DialogTitle>
              <DialogDescription>Enter patient admission details</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patient">Patient *</Label>
                  <Select value={formData.patientId} onValueChange={(value) => setFormData({ ...formData, patientId: value })}>
                    <SelectTrigger id="patient">
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockPatients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.firstName} {patient.lastName} - {patient.id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ward">Ward *</Label>
                  <Select value={formData.wardId} onValueChange={(value) => setFormData({ ...formData, wardId: value })}>
                    <SelectTrigger id="ward">
                      <SelectValue placeholder="Select ward" />
                    </SelectTrigger>
                    <SelectContent>
                      {wards.map((ward) => (
                        <SelectItem key={ward.id} value={ward.id}>
                          {ward.name} ({ward.availableBeds} beds available)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedNumber">Bed Number *</Label>
                  <Input
                    id="bedNumber"
                    placeholder="e.g., B-101"
                    value={formData.bedNumber}
                    onChange={(e) => setFormData({ ...formData, bedNumber: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor">Admitting Doctor *</Label>
                  <Select value={formData.admittingDoctorId} onValueChange={(value) => setFormData({ ...formData, admittingDoctorId: value })}>
                    <SelectTrigger id="doctor">
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          Dr. {doctor.firstName} {doctor.lastName} - {doctor.department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnosis *</Label>
                <Textarea
                  id="diagnosis"
                  placeholder="Enter primary diagnosis"
                  value={formData.diagnosis}
                  onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Enter any additional notes or special instructions"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => {
                setIsAdmitDialogOpen(false);
                resetForm();
              }}>
                Cancel
              </Button>
              <Button onClick={handleAdmitPatient}>
                Admit Patient
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Admissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{activeAdmissions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently admitted patients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Bed Occupancy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">75%</div>
            <p className="text-xs text-muted-foreground mt-1">45 of 60 beds occupied</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Stay Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">4.2</div>
            <p className="text-xs text-muted-foreground mt-1">Days per patient</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BedDouble className="h-5 w-5 text-primary" />
            Active Admissions
          </CardTitle>
          <CardDescription>Currently admitted patients</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admission ID</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Ward</TableHead>
                <TableHead>Bed Number</TableHead>
                <TableHead>Admission Date</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeAdmissions.map((admission) => (
                <TableRow key={admission.id}>
                  <TableCell className="font-medium text-foreground">{admission.id}</TableCell>
                  <TableCell className="text-foreground">{getPatientName(admission.patientId)}</TableCell>
                  <TableCell className="text-muted-foreground">{admission.wardId}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{admission.bedNumber}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(admission.admissionDate), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{admission.diagnosis}</TableCell>
                  <TableCell>
                    <Badge className="bg-secondary text-secondary-foreground">Active</Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setDischargeAdmissionId(admission.id)}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Discharge
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Discharges</CardTitle>
          <CardDescription>Recently discharged patients</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admission ID</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Admission Date</TableHead>
                <TableHead>Discharge Date</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dischargedAdmissions.map((admission) => (
                <TableRow key={admission.id}>
                  <TableCell className="font-medium text-foreground">{admission.id}</TableCell>
                  <TableCell className="text-foreground">{getPatientName(admission.patientId)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(admission.admissionDate), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {admission.dischargeDate && format(new Date(admission.dischargeDate), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{admission.diagnosis}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Discharged</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Discharge Confirmation Dialog */}
      <AlertDialog open={!!dischargeAdmissionId} onOpenChange={() => setDischargeAdmissionId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discharge Patient</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to discharge this patient? This will mark the admission as complete and free up the bed. Make sure all discharge procedures and paperwork are completed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => dischargeAdmissionId && handleDischargePatient(dischargeAdmissionId)}
            >
              Discharge Patient
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};