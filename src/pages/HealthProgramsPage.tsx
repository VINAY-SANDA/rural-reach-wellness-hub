
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
  Users, 
  MapPin, 
  FileText, 
  CheckCircle,
  AlertCircle,
  Clock,
  Search
} from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

// Mock data for health programs
const healthPrograms = [
  {
    id: 1,
    name: 'COVID-19 Vaccination Drive',
    description: 'Mass vaccination program for COVID-19 booster doses',
    startDate: '2025-04-15',
    endDate: '2025-04-30',
    location: 'Multiple Health Centers',
    status: 'upcoming',
    targetGroup: 'Adults 18+',
    enrolledParticipants: 420,
    targetParticipants: 2000,
    coordinators: ['Dr. Amit Kumar', 'Nurse Priya Singh'],
    resources: ['Vaccine doses', 'Medical staff', 'Registration system']
  },
  {
    id: 2,
    name: 'Maternal Health Awareness',
    description: 'Education and check-ups for pregnant women in rural areas',
    startDate: '2025-04-10',
    endDate: '2025-05-10',
    location: 'Village Outposts in Koraput District',
    status: 'active',
    targetGroup: 'Pregnant women',
    enrolledParticipants: 158,
    targetParticipants: 300,
    coordinators: ['Dr. Lakshmi Rao', 'Community Worker Sunita Devi'],
    resources: ['Educational materials', 'Basic medical equipment', 'Nutrition supplements']
  },
  {
    id: 3,
    name: 'Diabetes Screening Camp',
    description: 'Free diabetes screening and awareness program',
    startDate: '2025-05-05',
    endDate: '2025-05-07',
    location: 'Community Center, Balasore',
    status: 'upcoming',
    targetGroup: 'Adults 40+',
    enrolledParticipants: 75,
    targetParticipants: 500,
    coordinators: ['Dr. Rajan Mehta', 'Health Worker Vikram Singh'],
    resources: ['Glucose testing kits', 'Educational pamphlets', 'Medical staff']
  },
  {
    id: 4,
    name: 'Child Nutrition Program',
    description: 'Providing nutritional supplements and education for malnourished children',
    startDate: '2025-03-15',
    endDate: '2025-06-15',
    location: 'Rural Schools in Mayurbhanj',
    status: 'active',
    targetGroup: 'Children 0-5 years',
    enrolledParticipants: 315,
    targetParticipants: 450,
    coordinators: ['Nutritionist Deepa Shah', 'School Coordinator Rajesh Kumar'],
    resources: ['Nutritional supplements', 'Growth monitoring tools', 'Educational materials']
  },
  {
    id: 5,
    name: 'Mental Health Awareness Campaign',
    description: 'Destigmatizing mental health issues and providing resources',
    startDate: '2025-02-10',
    endDate: '2025-03-10',
    location: 'Various Locations',
    status: 'completed',
    targetGroup: 'All residents',
    enrolledParticipants: 420,
    targetParticipants: 400,
    coordinators: ['Dr. Aarav Sharma', 'Counselor Meera Joshi'],
    resources: ['Counseling services', 'Educational materials', 'Resource directories']
  },
  {
    id: 6,
    name: 'Eye Care Camp',
    description: 'Free eye check-ups and glasses distribution for elderly',
    startDate: '2025-03-01',
    endDate: '2025-03-05',
    location: 'Senior Center, Cuttack',
    status: 'completed',
    targetGroup: 'Seniors 65+',
    enrolledParticipants: 310,
    targetParticipants: 300,
    coordinators: ['Dr. Neha Patil', 'Volunteer Coordinator Suresh Patel'],
    resources: ['Eye testing equipment', 'Eyeglasses inventory', 'Medical volunteers']
  }
];

// Program form type
type ProgramFormValues = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  targetGroup: string;
  targetParticipants: number;
  resources: string;
};

const HealthProgramsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const form = useForm<ProgramFormValues>({
    defaultValues: {
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      location: '',
      targetGroup: '',
      targetParticipants: 0,
      resources: ''
    }
  });
  
  // Filter programs based on search term and active tab
  const filteredPrograms = healthPrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        program.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && program.status === activeTab;
  });
  
  const getProgramStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-500">Upcoming</Badge>;
      case 'completed':
        return <Badge className="bg-gray-500">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getProgressPercentage = (enrolled: number, target: number) => {
    return Math.min(Math.round((enrolled / target) * 100), 100);
  };
  
  const getProgressColorClass = (percentage: number) => {
    if (percentage < 40) return 'bg-red-500';
    if (percentage < 70) return 'bg-amber-500';
    return 'bg-green-500';
  };
  
  const onSubmit = (data: ProgramFormValues) => {
    // Here we would typically send the data to an API
    console.log('Form submitted:', data);
    
    toast({
      title: "Program Created",
      description: `${data.name} has been created successfully.`,
    });
    
    setIsDialogOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Health Programs</h1>
        <p className="text-muted-foreground">
          Manage community health initiatives and education programs
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search programs"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-wellness-600 hover:bg-wellness-700">
              Create New Program
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Health Program</DialogTitle>
              <DialogDescription>
                Fill out the details below to create a new health program for the community.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Program Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter program name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter program description" 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Program location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="targetGroup"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Group</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g. Children, Elderly, All" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="targetParticipants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Participants</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Number of participants" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="resources"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resources Needed</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List required resources, separated by commas" 
                          className="min-h-[80px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-wellness-600 hover:bg-wellness-700">
                    Create Program
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Programs</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredPrograms.map(program => (
              <Card key={program.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="line-clamp-2">{program.name}</CardTitle>
                    {getProgramStatusBadge(program.status)}
                  </div>
                  <CardDescription className="line-clamp-2">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(program.startDate).toLocaleDateString()} to {new Date(program.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{program.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{program.targetGroup}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Enrollment:</span>
                      <span>
                        {program.enrolledParticipants} / {program.targetParticipants}
                        {' '}
                        ({getProgressPercentage(program.enrolledParticipants, program.targetParticipants)}%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getProgressColorClass(getProgressPercentage(program.enrolledParticipants, program.targetParticipants))}`}
                        style={{ width: `${getProgressPercentage(program.enrolledParticipants, program.targetParticipants)}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {program.status !== 'completed' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-wellness-600 text-white hover:bg-wellness-700"
                    >
                      {program.status === 'upcoming' ? 'Start Program' : 'Manage'}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredPrograms.length === 0 && (
            <Card className="mt-4">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No programs found</h3>
                <p className="text-muted-foreground text-center mt-2">
                  {searchTerm ? 
                    `No programs matching "${searchTerm}" were found. Try a different search term.` : 
                    "No programs are currently available."
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="active" className="mt-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredPrograms.map(program => (
              <Card key={program.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="line-clamp-2">{program.name}</CardTitle>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Same content as "all" tab */}
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(program.startDate).toLocaleDateString()} to {new Date(program.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{program.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{program.targetGroup}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Enrollment:</span>
                      <span>
                        {program.enrolledParticipants} / {program.targetParticipants}
                        {' '}
                        ({getProgressPercentage(program.enrolledParticipants, program.targetParticipants)}%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getProgressColorClass(getProgressPercentage(program.enrolledParticipants, program.targetParticipants))}`}
                        style={{ width: `${getProgressPercentage(program.enrolledParticipants, program.targetParticipants)}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-wellness-600 text-white hover:bg-wellness-700"
                  >
                    Manage Program
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredPrograms.length === 0 && (
            <Card className="mt-4">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No active programs</h3>
                <p className="text-muted-foreground text-center mt-2">
                  There are no active programs at the moment.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredPrograms.map(program => (
              <Card key={program.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="line-clamp-2">{program.name}</CardTitle>
                    <Badge className="bg-blue-500">Upcoming</Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Same content as "all" tab */}
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(program.startDate).toLocaleDateString()} to {new Date(program.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{program.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{program.targetGroup}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Pre-enrollment:</span>
                      <span>
                        {program.enrolledParticipants} / {program.targetParticipants}
                        {' '}
                        ({getProgressPercentage(program.enrolledParticipants, program.targetParticipants)}%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getProgressColorClass(getProgressPercentage(program.enrolledParticipants, program.targetParticipants))}`}
                        style={{ width: `${getProgressPercentage(program.enrolledParticipants, program.targetParticipants)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-amber-500" />
                    <span>
                      Starting in {Math.max(1, Math.ceil((new Date(program.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-wellness-600 text-white hover:bg-wellness-700"
                  >
                    Start Program
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredPrograms.length === 0 && (
            <Card className="mt-4">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No upcoming programs</h3>
                <p className="text-muted-foreground text-center mt-2">
                  There are no upcoming programs scheduled at the moment.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredPrograms.map(program => (
              <Card key={program.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="line-clamp-2">{program.name}</CardTitle>
                    <Badge className="bg-gray-500">Completed</Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Same content as "all" tab with slight modifications */}
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(program.startDate).toLocaleDateString()} to {new Date(program.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{program.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{program.targetGroup}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Final Participation:</span>
                      <span>
                        {program.enrolledParticipants} / {program.targetParticipants}
                        {' '}
                        ({getProgressPercentage(program.enrolledParticipants, program.targetParticipants)}%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getProgressColorClass(getProgressPercentage(program.enrolledParticipants, program.targetParticipants))}`}
                        style={{ width: `${getProgressPercentage(program.enrolledParticipants, program.targetParticipants)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>
                      Completed on {new Date(program.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                  >
                    Download Report
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredPrograms.length === 0 && (
            <Card className="mt-4">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No completed programs</h3>
                <p className="text-muted-foreground text-center mt-2">
                  There are no completed programs in the system.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthProgramsPage;
