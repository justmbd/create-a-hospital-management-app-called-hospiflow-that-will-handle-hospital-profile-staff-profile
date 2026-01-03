
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserPlus, Search, Calendar, Clock } from 'lucide-react';
import { mockPatients } from '@/data/mockData';

export const OutpatientModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = mockPatients.filter(p =>
    p.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Outpatient Management</h2>
          <p className="text-muted-foreground mt-1">Manage outpatient appointments and visits</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Register Patient
        </Button>
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
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};