
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle, 
  MessageSquare,
  Stethoscope,
  FileText,
  UserCheck
} from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

// Mock data for appointments
const appointments = [
  {
    id: 1,
    patientName: 'Aarav Singh',
    age: 45,
    date: 'Today, 10:00 AM',
    status: 'upcoming',
    complaint: 'Persistent cough and fever',
    image: '/placeholder.svg'
  },
  {
    id: 2,
    patientName: 'Priya Patel',
    age: 32,
    date: 'Today, 11:30 AM',
    status: 'upcoming',
    complaint: 'Migraine and vision issues',
    image: '/placeholder.svg'
  },
  {
    id: 3,
    patientName: 'Vikram Mehra',
    age: 58,
    date: 'Today, 2:00 PM',
    status: 'upcoming',
    complaint: 'Joint pain and stiffness',
    image: '/placeholder.svg'
  },
  {
    id: 4,
    patientName: 'Sunita Devi',
    age: 28,
    date: 'Yesterday, 3:30 PM',
    status: 'completed',
    complaint: 'Prenatal checkup',
    image: '/placeholder.svg'
  },
  {
    id: 5,
    patientName: 'Rajesh Kumar',
    age: 52,
    date: 'Yesterday, 5:00 PM',
    status: 'completed',
    complaint: 'Blood pressure monitoring',
    image: '/placeholder.svg'
  }
];

// Mock data for consultation requests
const consultationRequests = [
  {
    id: 101,
    patientName: 'Meena Kumari',
    age: 42,
    requestDate: 'Today, 8:30 AM',
    complaint: 'Severe back pain',
    urgency: 'high',
    image: '/placeholder.svg'
  },
  {
    id: 102,
    patientName: 'Arjun Sharma',
    age: 35,
    requestDate: 'Yesterday, 1:15 PM',
    complaint: 'Recurring headaches',
    urgency: 'medium',
    image: '/placeholder.svg'
  },
  {
    id: 103,
    patientName: 'Lakshmi Rao',
    age: 65,
    requestDate: 'Yesterday, 10:00 AM',
    complaint: 'Difficulty breathing',
    urgency: 'high',
    image: '/placeholder.svg'
  }
];

const DoctorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const upcomingAppointments = appointments.filter(app => app.status === 'upcoming');
  const completedAppointments = appointments.filter(app => app.status === 'completed');
  
  const handleAcceptRequest = (id: number) => {
    toast({
      title: "Request Accepted",
      description: "Consultation request has been accepted and scheduled.",
    });
  };
  
  const handleDeclineRequest = (id: number) => {
    toast({
      title: "Request Declined",
      description: "Consultation request has been declined.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your appointments, consultations, and patient interactions
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{upcomingAppointments.length}</CardTitle>
            <CardDescription>Today's Appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-wellness-600" />
              <span className="text-sm">All scheduled for today</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{consultationRequests.length}</CardTitle>
            <CardDescription>Pending Requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-amber-600" />
              <span className="text-sm">Awaiting your response</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">42</CardTitle>
            <CardDescription>Total Patients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-blue-600" />
              <span className="text-sm">Active patient count</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="requests">Consultation Requests</TabsTrigger>
          <TabsTrigger value="profile">My Profile</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-24 flex flex-col">
                  <Calendar className="h-6 w-6 mb-2" />
                  <span>View Schedule</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col">
                  <MessageSquare className="h-6 w-6 mb-2" />
                  <span>Patient Messages</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col">
                  <Stethoscope className="h-6 w-6 mb-2" />
                  <span>Clinical Notes</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  <span>Prescriptions</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your schedule for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.slice(0, 3).map(appointment => (
                  <div key={appointment.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={appointment.image} alt={appointment.patientName} />
                        <AvatarFallback>{appointment.patientName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{appointment.patientName}</p>
                        <p className="text-sm text-muted-foreground">{appointment.date}</p>
                      </div>
                    </div>
                    <Button size="sm">View Details</Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setActiveTab('appointments')}>
                View All Appointments
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Consultation Requests</CardTitle>
              <CardDescription>Requests awaiting your response</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {consultationRequests.slice(0, 2).map(request => (
                  <div key={request.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={request.image} alt={request.patientName} />
                        <AvatarFallback>{request.patientName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{request.patientName}</p>
                          {request.urgency === 'high' && (
                            <Badge variant="destructive" className="ml-2">Urgent</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{request.complaint}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-500"
                        onClick={() => handleDeclineRequest(request.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Decline
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-wellness-600 hover:bg-wellness-700"
                        onClick={() => handleAcceptRequest(request.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setActiveTab('requests')}>
                View All Requests
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appointments" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
              <CardDescription>All scheduled appointments for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map(appointment => (
                  <div key={appointment.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={appointment.image} alt={appointment.patientName} />
                        <AvatarFallback>{appointment.patientName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{appointment.patientName}, {appointment.age}</p>
                        <p className="text-sm">{appointment.complaint}</p>
                        <p className="text-sm text-muted-foreground">{appointment.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-wellness-600 hover:bg-wellness-700"
                      >
                        Start Session
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Past Appointments</CardTitle>
              <CardDescription>Recently completed appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedAppointments.map(appointment => (
                  <div key={appointment.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={appointment.image} alt={appointment.patientName} />
                        <AvatarFallback>{appointment.patientName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{appointment.patientName}, {appointment.age}</p>
                        <p className="text-sm">{appointment.complaint}</p>
                        <p className="text-sm text-muted-foreground">{appointment.date}</p>
                      </div>
                    </div>
                    <div>
                      <Button 
                        size="sm" 
                        variant="outline"
                      >
                        View Notes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="requests" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Consultation Requests</CardTitle>
              <CardDescription>Patients requesting your medical expertise</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {consultationRequests.map(request => (
                  <div key={request.id} className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={request.image} alt={request.patientName} />
                          <AvatarFallback>{request.patientName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium">{request.patientName}, {request.age}</p>
                            {request.urgency === 'high' && (
                              <Badge variant="destructive" className="ml-2">Urgent</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">Requested on {request.requestDate}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2 mb-4">
                      <p className="font-medium text-sm">Primary complaint:</p>
                      <p>{request.complaint}</p>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        className="text-red-500"
                        onClick={() => handleDeclineRequest(request.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Decline
                      </Button>
                      <Button 
                        className="bg-wellness-600 hover:bg-wellness-700"
                        onClick={() => handleAcceptRequest(request.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Accept & Schedule
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Doctor Profile</CardTitle>
              <CardDescription>Your professional details and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src="/placeholder.svg" alt="Doctor" />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="mt-4">Change Photo</Button>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">Dr. Anita Sharma</h3>
                    <p className="text-muted-foreground">General Physician</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Qualification</p>
                      <p>MBBS, MD (General Medicine)</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Experience</p>
                      <p>15 years</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Registration Number</p>
                      <p>MCI-12345</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Languages</p>
                      <p>English, Hindi, Odia</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h4 className="font-medium mb-2">Specializations</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge>General Medicine</Badge>
                      <Badge>Diabetes</Badge>
                      <Badge>Hypertension</Badge>
                      <Badge>Preventive Healthcare</Badge>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h4 className="font-medium mb-2">Consultation Schedule</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Monday, Wednesday, Friday</span>
                        <span>9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tuesday, Thursday</span>
                        <span>10:00 AM - 3:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 justify-end">
              <Button variant="outline">Edit Profile</Button>
              <Button className="bg-wellness-600 hover:bg-wellness-700">Update Schedule</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorDashboard;
