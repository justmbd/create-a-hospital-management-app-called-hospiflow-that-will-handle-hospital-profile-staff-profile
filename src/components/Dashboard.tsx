
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  LogOut, 
  Hospital, 
  Users, 
  UserCog, 
  Stethoscope, 
  BedDouble, 
  Pill, 
  FlaskConical, 
  MessageSquare,
  Activity,
  Calendar,
  AlertCircle
} from 'lucide-react';
import logo from '@/assets/hospiflow.png';

import { HospitalProfile } from './modules/HospitalProfile';
import { StaffManagement } from './modules/StaffManagement';
import { OutpatientModule } from './modules/OutpatientModule';
import { InpatientModule } from './modules/InpatientModule';
import { PharmacyModule } from './modules/PharmacyModule';
import { LaboratoryModule } from './modules/LaboratoryModule';
import { ChatModule } from './modules/ChatModule';
import { DashboardOverview } from './modules/DashboardOverview';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const hasAccess = (module: string): boolean => {
    const roleAccess: Record<string, string[]> = {
      overview: ['admin', 'doctor', 'nurse', 'pharmacist', 'lab_tech', 'receptionist'],
      hospital: ['admin'],
      staff: ['admin'],
      outpatient: ['admin', 'doctor', 'nurse', 'receptionist'],
      inpatient: ['admin', 'doctor', 'nurse'],
      pharmacy: ['admin', 'doctor', 'pharmacist'],
      laboratory: ['admin', 'doctor', 'lab_tech'],
      chat: ['admin', 'doctor', 'nurse', 'pharmacist', 'lab_tech', 'receptionist']
    };
    return roleAccess[module]?.includes(user?.role || '') || false;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="HospiFlow" className="h-10 w-10" />
            <div>
              <h1 className="text-xl font-bold text-primary">HospiFlow</h1>
              <p className="text-xs text-muted-foreground">Hospital Management</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{user?.fullName}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <ScrollArea className="w-full">
            <TabsList className="inline-flex w-full justify-start">
              {hasAccess('overview') && (
                <TabsTrigger value="overview" className="gap-2">
                  <Activity className="h-4 w-4" />
                  Overview
                </TabsTrigger>
              )}
              {hasAccess('hospital') && (
                <TabsTrigger value="hospital" className="gap-2">
                  <Hospital className="h-4 w-4" />
                  Hospital
                </TabsTrigger>
              )}
              {hasAccess('staff') && (
                <TabsTrigger value="staff" className="gap-2">
                  <UserCog className="h-4 w-4" />
                  Staff
                </TabsTrigger>
              )}
              {hasAccess('outpatient') && (
                <TabsTrigger value="outpatient" className="gap-2">
                  <Stethoscope className="h-4 w-4" />
                  Outpatient
                </TabsTrigger>
              )}
              {hasAccess('inpatient') && (
                <TabsTrigger value="inpatient" className="gap-2">
                  <BedDouble className="h-4 w-4" />
                  Inpatient
                </TabsTrigger>
              )}
              {hasAccess('pharmacy') && (
                <TabsTrigger value="pharmacy" className="gap-2">
                  <Pill className="h-4 w-4" />
                  Pharmacy
                </TabsTrigger>
              )}
              {hasAccess('laboratory') && (
                <TabsTrigger value="laboratory" className="gap-2">
                  <FlaskConical className="h-4 w-4" />
                  Laboratory
                </TabsTrigger>
              )}
              {hasAccess('chat') && (
                <TabsTrigger value="chat" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Chat
                </TabsTrigger>
              )}
            </TabsList>
          </ScrollArea>

          <TabsContent value="overview" className="space-y-4">
            <DashboardOverview />
          </TabsContent>

          {hasAccess('hospital') && (
            <TabsContent value="hospital">
              <HospitalProfile />
            </TabsContent>
          )}

          {hasAccess('staff') && (
            <TabsContent value="staff">
              <StaffManagement />
            </TabsContent>
          )}

          {hasAccess('outpatient') && (
            <TabsContent value="outpatient">
              <OutpatientModule />
            </TabsContent>
          )}

          {hasAccess('inpatient') && (
            <TabsContent value="inpatient">
              <InpatientModule />
            </TabsContent>
          )}

          {hasAccess('pharmacy') && (
            <TabsContent value="pharmacy">
              <PharmacyModule />
            </TabsContent>
          )}

          {hasAccess('laboratory') && (
            <TabsContent value="laboratory">
              <LaboratoryModule />
            </TabsContent>
          )}

          {hasAccess('chat') && (
            <TabsContent value="chat">
              <ChatModule />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};