
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BedDouble, Pill, FlaskConical, Activity, TrendingUp } from 'lucide-react';
import { mockPatients, mockAdmissions, mockMedicines, mockLabTests } from '@/data/mockData';

export const DashboardOverview: React.FC = () => {
  const activeAdmissions = mockAdmissions.filter(a => a.status === 'active').length;
  const pendingLabTests = mockLabTests.filter(t => t.status === 'pending').length;
  const lowStockMedicines = mockMedicines.filter(m => m.quantity <= m.reorderLevel).length;

  const stats = [
    {
      title: 'Total Patients',
      value: mockPatients.length,
      icon: Users,
      description: 'Registered patients',
      color: 'text-primary'
    },
    {
      title: 'Active Admissions',
      value: activeAdmissions,
      icon: BedDouble,
      description: 'Currently admitted',
      color: 'text-secondary'
    },
    {
      title: 'Pending Lab Tests',
      value: pendingLabTests,
      icon: FlaskConical,
      description: 'Awaiting results',
      color: 'text-info'
    },
    {
      title: 'Low Stock Items',
      value: lowStockMedicines,
      icon: Pill,
      description: 'Need reordering',
      color: 'text-warning'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Dashboard Overview</h2>
        <p className="text-muted-foreground mt-1">Welcome to HospiFlow Management System</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <div className="h-2 w-2 rounded-full bg-secondary mt-2" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">New patient registered</p>
                <p className="text-xs text-muted-foreground">John Doe - 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Lab test completed</p>
                <p className="text-xs text-muted-foreground">CBC for Mary Smith - 3 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <div className="h-2 w-2 rounded-full bg-warning mt-2" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Prescription dispensed</p>
                <p className="text-xs text-muted-foreground">RX001 - 5 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-secondary" />
              Quick Stats
            </CardTitle>
            <CardDescription>System performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Bed Occupancy</span>
                <span className="font-medium text-foreground">75%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-secondary" style={{ width: '75%' }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Pharmacy Stock</span>
                <span className="font-medium text-foreground">85%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '85%' }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Staff Availability</span>
                <span className="font-medium text-foreground">92%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-success" style={{ width: '92%' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};