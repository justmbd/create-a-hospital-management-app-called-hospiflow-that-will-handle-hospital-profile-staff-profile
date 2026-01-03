
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BedDouble, UserPlus } from 'lucide-react';
import { mockAdmissions, mockPatients } from '@/data/mockData';
import { format } from 'date-fns';

export const InpatientModule: React.FC = () => {
  const [admissions] = useState(mockAdmissions);

  const getPatientName = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown';
  };

  const activeAdmissions = admissions.filter(a => a.status === 'active');
  const dischargedAdmissions = admissions.filter(a => a.status === 'discharged');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Inpatient Management</h2>
          <p className="text-muted-foreground mt-1">Manage hospital admissions and ward assignments</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Admit Patient
        </Button>
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
    </div>
  );
};