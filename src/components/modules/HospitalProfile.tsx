
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Building2, Mail, Phone, MapPin, FileText, Award, Upload, X } from 'lucide-react';
import { mockHospital } from '@/data/mockData';
import { toast } from 'sonner';

export const HospitalProfile: React.FC = () => {
  const [hospital, setHospital] = useState(mockHospital);
  const [originalHospital, setOriginalHospital] = useState(mockHospital);
  const [isEditing, setIsEditing] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(mockHospital.logo || null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setOriginalHospital(hospital);
    setIsEditing(true);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setLogoPreview(result);
      setHospital({ ...hospital, logo: result });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
    setHospital({ ...hospital, logo: undefined });
    if (logoInputRef.current) {
      logoInputRef.current.value = '';
    }
  };

  const handleSave = () => {
    // Validation
    if (!hospital.name.trim()) {
      toast.error('Hospital name is required');
      return;
    }
    if (!hospital.phone.trim()) {
      toast.error('Phone number is required');
      return;
    }
    if (!hospital.email.trim()) {
      toast.error('Email address is required');
      return;
    }
    if (!hospital.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!hospital.address.trim()) {
      toast.error('Address is required');
      return;
    }

    toast.success('Hospital profile updated successfully');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setHospital(originalHospital);
    setLogoPreview(originalHospital.logo || null);
    setIsEditing(false);
    toast.info('Changes discarded');
  };

  const handleNewHospital = () => {
    const resetHospital = {
      id: '1',
      name: '',
      logo: undefined,
      address: '',
      phone: '',
      email: '',
      license: '',
      accreditation: '',
      operatingHours: ''
    };
    setHospital(resetHospital);
    setOriginalHospital(resetHospital);
    setLogoPreview(null);
    setIsEditing(true);
    toast.info('Ready to register new hospital');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Hospital Profile</h2>
          <p className="text-muted-foreground mt-1">Manage hospital information and settings</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleNewHospital}>
                New Hospital
              </Button>
              <Button onClick={handleEdit}>
                Edit Profile
              </Button>
            </>
          )}
        </div>
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
              <Label>Hospital Logo</Label>
              <div className="flex items-center gap-4">
                <Avatar className="h-24 w-24 rounded-lg">
                  <AvatarImage src={logoPreview || undefined} alt="Hospital Logo" />
                  <AvatarFallback className="rounded-lg bg-muted">
                    <Building2 className="h-12 w-12 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <div className="flex flex-col gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => logoInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </Button>
                    {logoPreview && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleRemoveLogo}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    )}
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Recommended: Square image, max 5MB
              </p>
            </div>
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