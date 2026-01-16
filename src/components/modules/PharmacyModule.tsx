
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Pill, Search, AlertTriangle, Package, FileText } from 'lucide-react';
import { mockMedicines, mockPrescriptions, mockPatients } from '@/data/mockData';
import { format } from 'date-fns';

export const PharmacyModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [medicines] = useState(mockMedicines);
  const [prescriptions] = useState(mockPrescriptions);

  const filteredMedicines = medicines.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockMedicines = medicines.filter(m => m.quantity <= m.reorderLevel);
  const totalInventoryValue = medicines.reduce((sum, m) => sum + (m.quantity * m.price), 0);

  const getPatientName = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown';
  };

  const getMedicineName = (medicineId: string) => {
    const medicine = medicines.find(m => m.id === medicineId);
    return medicine ? medicine.name : 'Unknown Medicine';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Pharmacy Management</h2>
          <p className="text-muted-foreground mt-1">Manage medicines, inventory, and prescriptions</p>
        </div>
        <Button>
          <Package className="h-4 w-4 mr-2" />
          Add Medicine
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Medicines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{medicines.length}</div>
            <p className="text-xs text-muted-foreground mt-1">In inventory</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">{lowStockMedicines.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Need reordering</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Prescriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {prescriptions.filter(p => p.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">To be dispensed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">${totalInventoryValue.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground mt-1">Total stock value</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="alerts">Low Stock Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="h-5 w-5 text-primary" />
                    Medicine Inventory
                  </CardTitle>
                  <CardDescription>All medicines in stock</CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search medicines..."
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
                    <TableHead>Medicine Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Batch Number</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMedicines.map((medicine) => (
                    <TableRow key={medicine.id}>
                      <TableCell className="font-medium text-foreground">{medicine.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{medicine.category}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {medicine.quantity} {medicine.unit}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{medicine.batchNumber}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(medicine.expiryDate), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell className="text-muted-foreground">${medicine.price.toFixed(2)}</TableCell>
                      <TableCell>
                        {medicine.quantity <= medicine.reorderLevel ? (
                          <Badge className="bg-warning text-white">Low Stock</Badge>
                        ) : (
                          <Badge className="bg-success text-white">In Stock</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prescription Queue</CardTitle>
              <CardDescription>Prescriptions to be dispensed</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prescription ID</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Medicines</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prescriptions.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell className="font-medium text-foreground">{prescription.id}</TableCell>
                      <TableCell className="text-foreground">
                        {getPatientName(prescription.patientId)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(prescription.date), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {prescription.medicines.length} item(s)
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            prescription.status === 'dispensed'
                              ? 'bg-success text-white'
                              : 'bg-warning text-white'
                          }
                        >
                          {prescription.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              {prescription.status === 'pending' ? 'Dispense' : 'View Details'}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Prescription Details - {prescription.id}
                              </DialogTitle>
                              <DialogDescription>
                                Patient: {getPatientName(prescription.patientId)} | Date: {format(new Date(prescription.date), 'MMM dd, yyyy')}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-muted-foreground">Prescription ID</Label>
                                  <p className="font-medium text-foreground">{prescription.id}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Status</Label>
                                  <Badge className={prescription.status === 'dispensed' ? 'bg-success text-white' : 'bg-warning text-white'}>
                                    {prescription.status}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold text-foreground mb-3">Prescribed Medicines</h4>
                                <div className="space-y-3">
                                  {prescription.medicines.map((med, idx) => (
                                    <div key={idx} className="p-4 border rounded-lg bg-muted">
                                      <div className="flex justify-between items-start mb-2">
                                        <div>
                                          <p className="font-medium text-foreground">{getMedicineName(med.medicineId)}</p>
                                          <p className="text-sm text-muted-foreground">Medicine ID: {med.medicineId}</p>
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-3 gap-2 text-sm mt-2">
                                        <div>
                                          <Label className="text-muted-foreground">Dosage</Label>
                                          <p className="font-medium text-foreground">{med.dosage}</p>
                                        </div>
                                        <div>
                                          <Label className="text-muted-foreground">Frequency</Label>
                                          <p className="font-medium text-foreground">{med.frequency}</p>
                                        </div>
                                        <div>
                                          <Label className="text-muted-foreground">Duration</Label>
                                          <p className="font-medium text-foreground">{med.duration}</p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {prescription.status === 'pending' && (
                                <div className="flex gap-2 pt-4">
                                  <Button className="flex-1">Mark as Dispensed</Button>
                                  <Button variant="outline" className="flex-1">Print Prescription</Button>
                                </div>
                              )}
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

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Low Stock Alerts
              </CardTitle>
              <CardDescription>Medicines that need reordering</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medicine Name</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Reorder Level</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lowStockMedicines.map((medicine) => (
                    <TableRow key={medicine.id}>
                      <TableCell className="font-medium text-foreground">{medicine.name}</TableCell>
                      <TableCell>
                        <Badge className="bg-warning text-white">
                          {medicine.quantity} {medicine.unit}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {medicine.reorderLevel} {medicine.unit}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{medicine.category}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Reorder
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