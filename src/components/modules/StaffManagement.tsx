
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserPlus, Search, Mail, Phone } from 'lucide-react';
import { mockStaff } from '@/data/mockData';

export const StaffManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [staff] = useState(mockStaff);

  const filteredStaff = staff.filter(s =>
    s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      doctor: 'bg-primary text-primary-foreground',
      nurse: 'bg-secondary text-secondary-foreground',
      pharmacist: 'bg-accent text-accent-foreground',
      lab_tech: 'bg-info text-white',
      admin: 'bg-destructive text-destructive-foreground'
    };
    return colors[role] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Staff Management</h2>
          <p className="text-muted-foreground mt-1">Manage hospital staff and personnel</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Staff
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Staff Directory</CardTitle>
              <CardDescription>View and manage all staff members</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
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
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Qualification</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium text-foreground">
                    {member.firstName} {member.lastName}
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleBadgeColor(member.role)}>
                      {member.role.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{member.department}</TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {member.email}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {member.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{member.qualification}</TableCell>
                  <TableCell>
                    <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                      {member.status}
                    </Badge>
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