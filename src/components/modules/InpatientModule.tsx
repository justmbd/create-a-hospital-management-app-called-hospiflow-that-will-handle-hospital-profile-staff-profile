
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BedDouble, UserPlus } from 'lucide-react';
import { mockAdmissions, mockPatients } from '@/data/mockData';

export const InpatientModule: React.FC = ()