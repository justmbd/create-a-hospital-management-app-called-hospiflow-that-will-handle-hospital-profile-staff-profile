
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FlaskConical, Plus } from 'lucide-react';
import { mockLabTests, mockPatients } from '@/data/mockData';
import { format } from 'date-fns';

export const LaboratoryModule: React.FC = () => {
  const [labTests] = useState(mockLabTests);

  const getPatientName = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown';
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
                        <Button variant="outline" size="sm">
                          {test.status === 'completed' ? 'View Results' : 'Update'}
                        </Button>
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
                        <Button variant="outline" size="sm">
                          Start Processing
                        </Button>
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
                        <Button variant="outline" size="sm">
                          Enter Results
                        </Button>
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
                        <Button variant="outline" size="sm">
                          View Full Report
                        </Button>
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