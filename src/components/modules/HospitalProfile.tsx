
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building2, Mail, Phone, MapPin, FileText, Award } from 'lucide-react';
import { mockHospital } from '@/data/mockData';
import { toast } from 'sonner';

export const HospitalProfile: React.FC = () => {
  const [hospital, setHospital] = useState(mockHospital);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    toast.success('Hospital profile updated successfully');
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Hospital Profile</h2>
          <p className="text-muted-foreground mt-1">Manage hospital information and settings</p>
        </div>
        <Button onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Basic Information
            </CardTitle>
            <CardDescription>Hospital identification details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Hospital Name</Label>
              <Input
                id="name"
                value={hospital.name}
                onChange={(e) => setHospital({ ...hospital, name: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="license">License Number</Label>
              <Input
                id="license"
                value={hospital.license}
                onChange={(e) => setHospital({ ...hospital, license: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accreditation">Accreditation</Label>
              <Input
                id="accreditation"
                value={hospital.accreditation}
                onChange={(e) => setHospital({ ...hospital, accreditation: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-secondary" />
              Contact Information
            </CardTitle>
            <CardDescription>Communication details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={hospital.phone}
                onChange={(e) => setHospital({ ...hospital, phone: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={hospital.email}
                onChange={(e) => setHospital({ ...hospital, email: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={hospital.address}
                onChange={(e) => setHospital({ ...hospital, address: e.target.value })}
                disabled={!isEditing}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-info" />
              Operating Information
            </CardTitle>
            <CardDescription>Service hours and policies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="hours">Operating Hours</Label>
              <Input
                id="hours"
                value={hospital.operatingHours}
                onChange={(e) => setHospital({ ...hospital, operatingHours: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};