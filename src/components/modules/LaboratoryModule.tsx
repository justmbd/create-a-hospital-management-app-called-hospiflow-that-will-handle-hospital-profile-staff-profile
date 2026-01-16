
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FlaskConical, Plus, FileText, User } from 'lucide-react';
import { mockLabTests, mockPatients } from '@/data/mockData';
import { format } from 'date-fns';

export const LaboratoryModule: React.FC = () => {
  const [labTests] = useState(mockLabTests);

  const getPatientName = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown';
  };

  const getPatientDetails = (patientId: string) => {
    return mockPatients.find(p => p.id === patientId);
  };

  const pendingTests = labTests.filter(t => t.status === 'pending');
  const inProgressTests = labTests.filter(t => t.status === 'in_progress');
  const completedTests = labTests.filter(t => t.status === 'completed');

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-warning text-white',
      in_progress: 'bg-info text-white',
      completed: 'bg-success text-white'
    };
    return styles[status] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Laboratory Management</h2>
          <p className="text-muted-foreground mt-1">Manage lab tests and results</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Test Order
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{labTests.length}</div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">{pendingTests.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-info">{inProgressTests.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Being processed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">{completedTests.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Results available</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Tests</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingTests.length})</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress ({inProgressTests.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedTests.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-primary" />
                All Laboratory Tests
              </CardTitle>
              <CardDescription>Complete list of lab tests</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test ID</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Test Name</TableHead>
                    <TableHead>Ordered By</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {labTests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell className="font-medium text-foreground">{test.id}</TableCell>
                      <TableCell className="text-foreground">{getPatientName(test.patientId)}</TableCell>
                      <TableCell className="text-muted-foreground">{test.testName}</TableCell>
                      <TableCell className="text-muted-foreground">{test.orderedBy}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(test.orderedDate), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(test.status)}>
                          {test.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              {test.status === 'completed' ? 'View Results' : 'Update Status'}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <FlaskConical className="h-5 w-5" />
                                Lab Test Details - {test.id}
                              </DialogTitle>
                              <DialogDescription>
                                {test.testName} for {getPatientName(test.patientId)}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-muted-foreground">Test ID</Label>
                                  <p className="font-medium text-foreground">{test.id}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Status</Label>
                                  <Badge className={getStatusBadge(test.status)}>
                                    {test.status.replace('_', ' ')}
                                  </Badge>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Test Name</Label>
                                  <p className="font-medium text-foreground">{test.testName}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Ordered By</Label>
                                  <p className="font-medium text-foreground">{test.orderedBy}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Order Date</Label>
                                  <p className="font-medium text-foreground">
                                    {format(new Date(test.orderedDate), 'MMM dd, yyyy')}
                                  </p>
                                </div>
                                {test.completedDate && (
                                  <div>
                                    <Label className="text-muted-foreground">Completed Date</Label>
                                    <p className="font-medium text-foreground">
                                      {format(new Date(test.completedDate), 'MMM dd, yyyy')}
                                    </p>
                                  </div>
                                )}
                              </div>

                              <div className="p-4 bg-muted rounded-lg">
                                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                  <User className="h-4 w-4" />
                                  Patient Information
                                </h4>
                                {(() => {
                                  const patient = getPatientDetails(test.patientId);
                                  if (!patient) return <p className="text-muted-foreground">Patient not found</p>;
                                  return (
                                    <div className="grid grid-cols-3 gap-3 text-sm">
                                      <div>
                                        <Label className="text-muted-foreground">Name</Label>
                                        <p className="font-medium text-foreground">
                                          {patient.firstName} {patient.lastName}
                                        </p>
                                      </div>
                                      <div>
                                        <Label className="text-muted-foreground">Patient ID</Label>
                                        <p className="font-medium text-foreground">{patient.id}</p>
                                      </div>
                                      <div>
                                        <Label className="text-muted-foreground">Blood Type</Label>
                                        <p className="font-medium text-foreground">{patient.bloodType}</p>
                                      </div>
                                      <div>
                                        <Label className="text-muted-foreground">Age</Label>
                                        <p className="font-medium text-foreground">
                                          {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} years
                                        </p>
                                      </div>
                                      <div>
                                        <Label className="text-muted-foreground">Gender</Label>
                                        <p className="font-medium text-foreground capitalize">{patient.gender}</p>
                                      </div>
                                      <div>
                                        <Label className="text-muted-foreground">Allergies</Label>
                                        <p className="font-medium text-foreground">
                                          {patient.allergies && patient.allergies.length > 0 ? patient.allergies.join(', ') : 'None'}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })()}
                              </div>

                              {test.results ? (
                                <div>
                                  <Label className="text-muted-foreground">Test Results</Label>
                                  <div className="mt-2 p-4 bg-success/10 border border-success/20 rounded-lg">
                                    <p className="text-foreground">{test.results}</p>
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <Label className="text-muted-foreground">Enter Test Results</Label>
                                  <Textarea 
                                    placeholder="Enter detailed test results here..."
                                    className="mt-2"
                                    rows={4}
                                  />
                                </div>
                              )}

                              <div className="flex gap-2 pt-4">
                                {test.status === 'pending' && (
                                  <Button className="flex-1">Start Processing</Button>
                                )}
                                {test.status === 'in_progress' && (
                                  <Button className="flex-1">Submit Results</Button>
                                )}
                                {test.status === 'completed' && (
                                  <Button variant="outline" className="flex-1">
                                    <FileText className="h-4 w-4 mr-2" />
                                    Print Report
                                  </Button>
                                )}
                                <Button variant="outline" className="flex-1">View Patient History</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Tests</CardTitle>
              <CardDescription>Tests awaiting processing</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test ID</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Test Name</TableHead>
                    <TableHead>Ordered By</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingTests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell className="font-medium text-foreground">{test.id}</TableCell>
                      <TableCell className="text-foreground">{getPatientName(test.patientId)}</TableCell>
                      <TableCell className="text-muted-foreground">{test.testName}</TableCell>
                      <TableCell className="text-muted-foreground">{test.orderedBy}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(test.orderedDate), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              Start Processing
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <FlaskConical className="h-5 w-5" />
                                Start Lab Test - {test.id}
                              </DialogTitle>
                              <DialogDescription>
                                {test.testName} for {getPatientName(test.patientId)}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-muted-foreground">Test ID</Label>
                                  <p className="font-medium text-foreground">{test.id}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Test Name</Label>
                                  <p className="font-medium text-foreground">{test.testName}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Patient</Label>
                                  <p className="font-medium text-foreground">{getPatientName(test.patientId)}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Ordered By</Label>
                                  <p className="font-medium text-foreground">{test.orderedBy}</p>
                                </div>
                              </div>
                              <Button className="w-full">Mark as In Progress</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="in_progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tests In Progress</CardTitle>
              <CardDescription>Currently being processed</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test ID</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Test Name</TableHead>
                    <TableHead>Ordered By</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inProgressTests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell className="font-medium text-foreground">{test.id}</TableCell>
                      <TableCell className="text-foreground">{getPatientName(test.patientId)}</TableCell>
                      <TableCell className="text-muted-foreground">{test.testName}</TableCell>
                      <TableCell className="text-muted-foreground">{test.orderedBy}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(test.orderedDate), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              Enter Results
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <FlaskConical className="h-5 w-5" />
                                Enter Test Results - {test.id}
                              </DialogTitle>
                              <DialogDescription>
                                {test.testName} for {getPatientName(test.patientId)}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-muted-foreground">Test ID</Label>
                                  <p className="font-medium text-foreground">{test.id}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Test Name</Label>
                                  <p className="font-medium text-foreground">{test.testName}</p>
                                </div>
                              </div>
                              <div>
                                <Label>Test Results</Label>
                                <Textarea 
                                  placeholder="Enter detailed test results, measurements, and observations..."
                                  rows={6}
                                  className="mt-2"
                                />
                              </div>
                              <Button className="w-full">Submit Results & Mark Complete</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Tests</CardTitle>
              <CardDescription>Tests with available results</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test ID</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Test Name</TableHead>
                    <TableHead>Completed Date</TableHead>
                    <TableHead>Results</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedTests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell className="font-medium text-foreground">{test.id}</TableCell>
                      <TableCell className="text-foreground">{getPatientName(test.patientId)}</TableCell>
                      <TableCell className="text-muted-foreground">{test.testName}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {test.completedDate && format(new Date(test.completedDate), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{test.results}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              View Full Report
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Lab Test Report - {test.id}
                              </DialogTitle>
                              <DialogDescription>
                                {test.testName} | Completed: {test.completedDate && format(new Date(test.completedDate), 'MMM dd, yyyy')}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-muted-foreground">Patient Name</Label>
                                  <p className="font-medium text-foreground">{getPatientName(test.patientId)}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Patient ID</Label>
                                  <p className="font-medium text-foreground">{test.patientId}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Test Name</Label>
                                  <p className="font-medium text-foreground">{test.testName}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Ordered By</Label>
                                  <p className="font-medium text-foreground">{test.orderedBy}</p>
                                </div>
                              </div>
                              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                                <Label className="text-muted-foreground">Test Results</Label>
                                <p className="text-foreground mt-2">{test.results}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button className="flex-1">
                                  <FileText className="h-4 w-4 mr-2" />
                                  Print Report
                                </Button>
                                <Button variant="outline" className="flex-1">Email to Doctor</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};