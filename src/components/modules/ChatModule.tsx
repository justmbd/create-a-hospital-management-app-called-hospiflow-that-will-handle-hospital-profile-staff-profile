
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ChatMessage } from '@/types';
import { format } from 'date-fns';

export const ChatModule: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: 'S001',
      senderName: 'Dr. Sarah Johnson',
      message: 'Patient in Room 205 needs immediate attention',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      department: 'General Medicine'
    },
    {
      id: '2',
      senderId: 'S002',
      senderName: 'Emily Davis',
      message: 'On my way to Room 205',
      timestamp: new Date(Date.now() - 3500000).toISOString(),
      department: 'Emergency'
    },
    {
      id: '3',
      senderId: 'S003',
      senderName: 'Michael Chen',
      message: 'Prescription RX002 is ready for pickup',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      department: 'Pharmacy'
    },
    {
      id: '4',
      senderId: 'S004',
      senderName: 'Robert Martinez',
      message: 'Lab results for Patient P001 are now available',
      timestamp: new Date(Date.now() - 900000).toISOString(),
      department: 'Laboratory'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.fullName,
      message: newMessage,
      timestamp: new Date().toISOString(),
      department: user.department
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Staff Communication</h2>
        <p className="text-muted-foreground mt-1">Real-time messaging for hospital staff</p>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            General Chat
          </CardTitle>
          <CardDescription>Hospital-wide staff communication</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 px-6" ref={scrollRef}>
            <div className="space-y-4 py-4">
              {messages.map((message) => {
                const isOwnMessage = message.senderId === user?.id;
                return (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {getInitials(message.senderName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`flex-1 max-w-[70%] ${isOwnMessage ? 'items-end' : 'items-start'} flex flex-col`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground">{message.senderName}</span>
                        {message.department && (
                          <Badge variant="outline" className="text-xs">
                            {message.department}
                          </Badge>
                        )}
                      </div>
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          isOwnMessage
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">
                        {format(new Date(message.timestamp), 'MMM dd, HH:mm')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};