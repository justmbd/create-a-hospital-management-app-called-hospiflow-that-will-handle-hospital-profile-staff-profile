
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Search, Mail, Phone, Edit, Trash2, Upload, X, User } from 'lucide-react';
import { mockStaff } from '@/data/mockData';
import { Staff, UserRole } from '@/types';
import { toast } from 'sonner';

export const StaffManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [staff, setStaff] = useState(mockStaff);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: '' as UserRole | '',
    department: '',
    email: '',
    phone: '',
    qualification: '',
    photo: '' as string | undefined,
  });

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      role: '',
      department: '',
      email: '',
      phone: '',
      qualification: '',
      photo: undefined,
    });
    setPhotoPreview(null);
    setEditingStaff(null);
    if (photoInputRef.current) {
      photoInputRef.current.value = '';
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setPhotoPreview(result);
      setFormData({ ...formData, photo: result });
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    setFormData({ ...formData, photo: undefined });
    if (photoInputRef.current) {
      photoInputRef.current.value = '';
    }
  };

  const handleAddStaff = () => {
    // Validation
    if (!formData.firstName.trim()) {
      toast.error('First name is required');
      return;
    }
    if (!formData.lastName.trim()) {
      toast.error('Last name is required');
      return;
    }
    if (!formData.role) {
      toast.error('Role is required');
      return;
    }
    if (!formData.department.trim()) {
      toast.error('Department is required');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast.error('Valid email is required');
      return;
    }
    if (!formData.phone.trim()) {
      toast.error('Phone number is required');
      return;
    }
    if (!formData.qualification.trim()) {
      toast.error('Qualification is required');
      return;
    }

    const newStaff: Staff = {
      id: `S${String(staff.length + 1).padStart(3, '0')}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: formData.role as UserRole,
      department: formData.department,
      email: formData.email,
      phone: formData.phone,
      qualification: formData.qualification,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active',
      photo: formData.photo,
    };

    setStaff([...staff, newStaff]);
    toast.success(`${formData.firstName} ${formData.lastName} added successfully`);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditStaff = (member: Staff) => {
    setEditingStaff(member);
    setFormData({
      firstName: member.firstName,
      lastName: member.lastName,
      role: member.role,
      department: member.department,
      email: member.email,
      phone: member.phone,
      qualification: member.qualification,
      photo: member.photo,
    });
    setPhotoPreview(member.photo || null);
  };

  const handleUpdateStaff = () => {
    if (!editingStaff) return;

    // Validation (same as add)
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.role || 
        !formData.department.trim() || !formData.email.trim() || !formData.email.includes('@') ||
        !formData.phone.trim() || !formData.qualification.trim()) {
      toast.error('All fields are required');
      return;
    }

    const updatedStaff = staff.map(s => 
      s.id === editingStaff.id 
        ? { ...s, ...formData, role: formData.role as UserRole, photo: formData.photo }
        : s
    );

    setStaff(updatedStaff);
    toast.success('Staff member updated successfully');
    setEditingStaff(null);
    resetForm();
  };

  const handleDeleteStaff = (id: string) => {
    const member = staff.find(s => s.id === id);
    if (member) {
      setStaff(staff.filter(s => s.id !== id));
      toast.success(`${member.firstName} ${member.lastName} removed from staff`);
    }
  };

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
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
              <DialogDescription>Enter staff member information to add to the system</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Staff Photo</Label>
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={photoPreview || undefined} alt="Staff Photo" />
                    <AvatarFallback className="bg-muted">
                      <User className="h-10 w-10 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => photoInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                    {photoPreview && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleRemovePhoto}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    )}
                    <input
                      ref={photoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Optional: Square image, max 5MB
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role *</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value as UserRole })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="nurse">Nurse</SelectItem>
                      <SelectItem value="pharmacist">Pharmacist</SelectItem>
                      <SelectItem value="lab_tech">Lab Technician</SelectItem>
                      <SelectItem value="receptionist">Receptionist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="General Medicine"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john.doe@hospiflow.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="qualification">Qualification *</Label>
                <Input
                  id="qualification"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  placeholder="MD, Internal Medicine"
                />
              </div>
              <Button onClick={handleAddStaff} className="w-full">
                Add Staff Member
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium text-foreground">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.photo} alt={`${member.firstName} ${member.lastName}`} />
                        <AvatarFallback className="bg-muted text-xs">
                          {member.firstName[0]}{member.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span>{member.firstName} {member.lastName}</span>
                    </div>
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
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => handleEditStaff(member)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit Staff Member</DialogTitle>
                            <DialogDescription>Update staff member information</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <Label>Staff Photo</Label>
                              <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20">
                                  <AvatarImage src={photoPreview || undefined} alt="Staff Photo" />
                                  <AvatarFallback className="bg-muted">
                                    <User className="h-10 w-10 text-muted-foreground" />
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col gap-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => photoInputRef.current?.click()}
                                  >
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload Photo
                                  </Button>
                                  {photoPreview && (
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={handleRemovePhoto}
                                    >
                                      <X className="h-4 w-4 mr-2" />
                                      Remove
                                    </Button>
                                  )}
                                  <input
                                    ref={photoInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    className="hidden"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-firstName">First Name *</Label>
                                <Input
                                  id="edit-firstName"
                                  value={formData.firstName}
                                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-lastName">Last Name *</Label>
                                <Input
                                  id="edit-lastName"
                                  value={formData.lastName}
                                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-role">Role *</Label>
                                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value as UserRole })}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="doctor">Doctor</SelectItem>
                                    <SelectItem value="nurse">Nurse</SelectItem>
                                    <SelectItem value="pharmacist">Pharmacist</SelectItem>
                                    <SelectItem value="lab_tech">Lab Technician</SelectItem>
                                    <SelectItem value="receptionist">Receptionist</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-department">Department *</Label>
                                <Input
                                  id="edit-department"
                                  value={formData.department}
                                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-email">Email *</Label>
                                <Input
                                  id="edit-email"
                                  type="email"
                                  value={formData.email}
                                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-phone">Phone *</Label>
                                <Input
                                  id="edit-phone"
                                  value={formData.phone}
                                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-qualification">Qualification *</Label>
                              <Input
                                id="edit-qualification"
                                value={formData.qualification}
                                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                              />
                            </div>
                            <Button onClick={handleUpdateStaff} className="w-full">
                              Update Staff Member
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteStaff(member.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
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