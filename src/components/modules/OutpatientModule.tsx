
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UserPlus, Search, Calendar, Clock, FileText, Stethoscope, Activity } from 'lucide-react';
import { mockPatients, mockPrescriptions, mockLabTests } from '@/data/mockData';
import { format } from 'date-fns';

export const OutpatientModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  const filteredPatients = mockPatients.filter(p =>
    p.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPatientPrescriptions = (patientId: string) => {
    return mockPrescriptions.filter(p => p.patientId === patientId);
  };

  const getPatientLabTests = (patientId: string) => {
    return mockLabTests.filter(t => t.patientId === patientId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Outpatient Management</h2>
          <p className="text-muted-foreground mt-1">Manage outpatient appointments and visits</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Register Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Register New Patient</DialogTitle>
              <DialogDescription>Enter patient information to create a new record</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Input id="gender" placeholder="Male/Female/Other" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="patient@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Full address" />
              </div>
              <Button className="w-full">Register Patient</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">24</div>
            <p className="text-xs text-muted-foreground mt-1">8 completed, 16 pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Walk-in Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">7</div>
            <p className="text-xs text-muted-foreground mt-1">Waiting for consultation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Wait Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">25m</div>
            <p className="text-xs text-muted-foreground mt-1">Below target of 30 minutes</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="registry" className="space-y-4">
        <TabsList>
          <TabsTrigger value="registry">Patient Registry</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="consultations">Consultations</TabsTrigger>
        </TabsList>

        <TabsContent value="registry" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Patient Registry</CardTitle>
                  <CardDescription>All registered outpatients</CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Blood Type</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => {
                    const age = new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();
                    return (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium text-foreground">{patient.id}</TableCell>
                        <TableCell className="text-foreground">
                          {patient.firstName} {patient.lastName}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{age} years</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {patient.gender}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{patient.phone}</TableCell>
                        <TableCell>
                          <Badge className="bg-destructive text-destructive-foreground">
                            {patient.bloodType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedPatient(patient.id)}>
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Patient Details - {patient.firstName} {patient.lastName}</DialogTitle>
                                <DialogDescription>Complete patient information and medical history</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-muted-foreground">Patient ID</Label>
                                    <p className="font-medium text-foreground">{patient.id}</p>
                                  </div>
                                  <div>
                                    <Label className="text-muted-foreground">Blood Type</Label>
                                    <p className="font-medium text-foreground">{patient.bloodType}</p>
                                  </div>
                                  <div>
                                    <Label className="text-muted-foreground">Date of Birth</Label>
                                    <p className="font-medium text-foreground">{format(new Date(patient.dateOfBirth), 'MMM dd, yyyy')}</p>
                                  </div>
                                  <div>
                                    <Label className="text-muted-foreground">Gender</Label>
                                    <p className="font-medium text-foreground capitalize">{patient.gender}</p>
                                  </div>
                                  <div>
                                    <Label className="text-muted-foreground">Phone</Label>
                                    <p className="font-medium text-foreground">{patient.phone}</p>
                                  </div>
                                  <div>
                                    <Label className="text-muted-foreground">Email</Label>
                                    <p className="font-medium text-foreground">{patient.email}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <Label className="text-muted-foreground">Address</Label>
                                    <p className="font-medium text-foreground">{patient.address}</p>
                                  </div>
                                  <div>
                                    <Label className="text-muted-foreground">Insurance</Label>
                                    <p className="font-medium text-foreground">{patient.insurance}</p>
                                  </div>
                                  <div>
                                    <Label className="text-muted-foreground">Allergies</Label>
                                    <p className="font-medium text-foreground">
                                      {patient.allergies && patient.allergies.length > 0 ? patient.allergies.join(', ') : 'None'}
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">Emergency Contact</h4>
                                  <div className="grid grid-cols-3 gap-4 bg-muted p-4 rounded-lg">
                                    <div>
                                      <Label className="text-muted-foreground">Name</Label>
                                      <p className="font-medium text-foreground">{patient.emergencyContact.name}</p>
                                    </div>
                                    <div>
                                      <Label className="text-muted-foreground">Phone</Label>
                                      <p className="font-medium text-foreground">{patient.emergencyContact.phone}</p>
                                    </div>
                                    <div>
                                      <Label className="text-muted-foreground">Relationship</Label>
                                      <p className="font-medium text-foreground">{patient.emergencyContact.relationship}</p>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    Recent Prescriptions
                                  </h4>
                                  {getPatientPrescriptions(patient.id).length > 0 ? (
                                    <div className="space-y-2">
                                      {getPatientPrescriptions(patient.id).map((rx) => (
                                        <div key={rx.id} className="bg-muted p-3 rounded-lg">
                                          <div className="flex justify-between items-center">
                                            <span className="font-medium text-foreground">{rx.id}</span>
                                            <Badge className={rx.status === 'dispensed' ? 'bg-success text-white' : 'bg-warning text-white'}>
                                              {rx.status}
                                            </Badge>
                                          </div>
                                          <p className="text-sm text-muted-foreground mt-1">
                                            {format(new Date(rx.date), 'MMM dd, yyyy')} - {rx.medicines.length} medicine(s)
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-muted-foreground text-sm">No prescriptions found</p>
                                  )}
                                </div>

                                <div>
                                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                    <Activity className="h-4 w-4" />
                                    Lab Tests
                                  </h4>
                                  {getPatientLabTests(patient.id).length > 0 ? (
                                    <div className="space-y-2">
                                      {getPatientLabTests(patient.id).map((test) => (
                                        <div key={test.id} className="bg-muted p-3 rounded-lg">
                                          <div className="flex justify-between items-center">
                                            <span className="font-medium text-foreground">{test.testName}</span>
                                            <Badge className={
                                              test.status === 'completed' ? 'bg-success text-white' :
                                              test.status === 'in_progress' ? 'bg-info text-white' :
                                              'bg-warning text-white'
                                            }>
                                              {test.status.replace('_', ' ')}
                                            </Badge>
                                          </div>
                                          <p className="text-sm text-muted-foreground mt-1">
                                            {format(new Date(test.orderedDate), 'MMM dd, yyyy')}
                                          </p>
                                          {test.results && (
                                            <p className="text-sm text-foreground mt-2">{test.results}</p>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-muted-foreground text-sm">No lab tests found</p>
                                  )}
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Appointment Schedule
                  </CardTitle>
                  <CardDescription>Today's appointments and upcoming visits</CardDescription>
                </div>
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: '09:00 AM', patient: 'John Doe', doctor: 'Dr. Sarah Johnson', type: 'Consultation', status: 'completed' },
                  { time: '10:30 AM', patient: 'Mary Smith', doctor: 'Dr. Sarah Johnson', type: 'Follow-up', status: 'in_progress' },
                  { time: '11:00 AM', patient: 'James Wilson', doctor: 'Dr. Sarah Johnson', type: 'Consultation', status: 'scheduled' },
                  { time: '02:00 PM', patient: 'Lisa Brown', doctor: 'Dr. Sarah Johnson', type: 'Check-up', status: 'scheduled' },
                ].map((apt, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{apt.time}</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{apt.patient}</p>
                        <p className="text-sm text-muted-foreground">{apt.doctor} • {apt.type}</p>
                      </div>
                    </div>
                    <Badge className={
                      apt.status === 'completed' ? 'bg-success text-white' :
                      apt.status === 'in_progress' ? 'bg-info text-white' :
                      'bg-warning text-white'
                    }>
                      {apt.status.replace('_', ' ')}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consultations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-primary" />
                Active Consultations
              </CardTitle>
              <CardDescription>Patients currently being consulted</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { patient: 'Mary Smith', doctor: 'Dr. Sarah Johnson', room: 'Room 101', duration: '15 mins', complaint: 'Fever and headache' },
                  { patient: 'Robert Lee', doctor: 'Dr. Michael Chen', room: 'Room 102', duration: '8 mins', complaint: 'Chest pain' },
                ].map((consult, idx) => (
                  <div key={idx} className="p-4 border rounded-lg bg-card">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{consult.patient}</h4>
                        <p className="text-sm text-muted-foreground">{consult.doctor}</p>
                      </div>
                      <Badge className="bg-info text-white">{consult.duration}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Room:</span>
                        <span className="ml-2 text-foreground font-medium">{consult.room}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Complaint:</span>
                        <span className="ml-2 text-foreground">{consult.complaint}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">View History</Button>
                      <Button size="sm" variant="outline">Prescribe</Button>
                      <Button size="sm" variant="outline">Order Lab Test</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};