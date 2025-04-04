
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
  Users, 
  Building, 
  FileText, 
  Shield, 
  PersonStanding,
  TrendingUp,
  GripHorizontal,
  Search
} from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { toast } from '@/hooks/use-toast';

// Mock data for government schemes
const governmentSchemes = [
  {
    id: 1,
    name: 'Ayushman Bharat',
    description: 'Health insurance for low-income families covering secondary and tertiary care.',
    beneficiaries: 5842,
    target: 8500,
    status: 'active'
  },
  {
    id: 2,
    name: 'National Health Mission',
    description: 'Comprehensive healthcare including immunization, nutrition, and sanitation.',
    beneficiaries: 12543,
    target: 15000,
    status: 'active'
  },
  {
    id: 3,
    name: 'Janani Suraksha Yojana',
    description: 'Safe motherhood intervention providing cash assistance for institutional delivery.',
    beneficiaries: 3210,
    target: 5000,
    status: 'active'
  },
  {
    id: 4,
    name: 'Pradhan Mantri Jan Arogya Yojana',
    description: 'Health insurance scheme providing coverage up to Rs. 5 lakhs per family.',
    beneficiaries: 7865,
    target: 10000,
    status: 'active'
  },
  {
    id: 5,
    name: 'National AYUSH Mission',
    description: 'Promoting AYUSH medical systems through cost-effective services.',
    beneficiaries: 2356,
    target: 4000,
    status: 'upcoming'
  }
];

// Mock data for awareness programs
const awarenessPrograms = [
  {
    id: 101,
    name: 'COVID-19 Vaccination Drive',
    date: 'March 15, 2025',
    location: 'Multiple Health Centers',
    participants: 250,
    status: 'upcoming'
  },
  {
    id: 102,
    name: 'Diabetes Awareness Camp',
    date: 'March 20, 2025',
    location: 'Community Center, Koraput',
    participants: 120,
    status: 'upcoming'
  },
  {
    id: 103,
    name: 'Maternal Health Workshop',
    date: 'February 28, 2025',
    location: 'Women\'s Health Center, Balasore',
    participants: 85,
    status: 'completed'
  },
  {
    id: 104,
    name: 'Mental Health Awareness Program',
    date: 'February 15, 2025',
    location: 'Rural Health Outpost, Mayurbhanj',
    participants: 65,
    status: 'completed'
  }
];

// Mock data for charts
const healthMetricsData = [
  { name: 'Jan', immunization: 65, consultations: 80, outreach: 45 },
  { name: 'Feb', immunization: 70, consultations: 85, outreach: 50 },
  { name: 'Mar', immunization: 75, consultations: 90, outreach: 60 },
  { name: 'Apr', immunization: 80, consultations: 95, outreach: 65 },
  { name: 'May', immunization: 85, consultations: 100, outreach: 70 },
];

const populationData = [
  { name: 'Children (0-14)', value: 3250, color: '#8884d8' },
  { name: 'Youth (15-24)', value: 2740, color: '#82ca9d' },
  { name: 'Adults (25-64)', value: 5630, color: '#ffc658' },
  { name: 'Seniors (65+)', value: 1890, color: '#ff8042' },
];

const CommunityDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredSchemes = governmentSchemes.filter(scheme => 
    scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const activeSchemes = governmentSchemes.filter(scheme => scheme.status === 'active');
  const upcomingPrograms = awarenessPrograms.filter(program => program.status === 'upcoming');
  
  const handleCreateProgram = () => {
    toast({
      title: "Program Creation Started",
      description: "You can now define the details for your new awareness program.",
    });
  };
  
  const getProgressColor = (value: number) => {
    if (value < 40) return 'bg-red-500';
    if (value < 70) return 'bg-amber-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Community Administrator Dashboard</h1>
        <p className="text-muted-foreground">
          Manage government schemes, awareness programs, and community health resources
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">16,720</CardTitle>
            <CardDescription>Total Population</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-blue-600" />
              <span className="text-sm">Registered citizens</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{activeSchemes.length}</CardTitle>
            <CardDescription>Active Schemes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-wellness-600" />
              <span className="text-sm">Government healthcare initiatives</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{upcomingPrograms.length}</CardTitle>
            <CardDescription>Upcoming Programs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-amber-600" />
              <span className="text-sm">Scheduled awareness activities</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">4,230</CardTitle>
            <CardDescription>Insurance Holders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Building className="mr-2 h-5 w-5 text-green-600" />
              <span className="text-sm">Families with health coverage</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schemes">Government Schemes</TabsTrigger>
          <TabsTrigger value="programs">Awareness Programs</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Health Metrics Trend</CardTitle>
                <CardDescription>Monthly progress of key health indicators</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={healthMetricsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="immunization" name="Immunization Rate" fill="#8884d8" />
                    <Bar dataKey="consultations" name="Medical Consultations" fill="#82ca9d" />
                    <Bar dataKey="outreach" name="Community Outreach" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Active Government Schemes</CardTitle>
                <CardDescription>Implementation status of current schemes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeSchemes.slice(0, 3).map(scheme => (
                    <div key={scheme.id} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{scheme.name}</span>
                        <span className="text-sm">{scheme.beneficiaries} / {scheme.target}</span>
                      </div>
                      <Progress 
                        value={(scheme.beneficiaries / scheme.target) * 100} 
                        className={getProgressColor((scheme.beneficiaries / scheme.target) * 100)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab('schemes')}>
                  View All Schemes
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Awareness Programs</CardTitle>
              <CardDescription>Community health education events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {upcomingPrograms.map(program => (
                  <div key={program.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{program.name}</h4>
                      <Badge>Upcoming</Badge>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Date:</span> {program.date}</p>
                      <p><span className="font-medium">Location:</span> {program.location}</p>
                      <p><span className="font-medium">Expected Participants:</span> {program.participants}</p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button variant="outline" size="sm">Details</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab('programs')}>
                View All Programs
              </Button>
              <Button 
                className="bg-wellness-600 hover:bg-wellness-700"
                onClick={handleCreateProgram}
              >
                Create New Program
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-24 flex flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  <span>Generate Reports</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col">
                  <Shield className="h-6 w-6 mb-2" />
                  <span>Scheme Enrollment</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col">
                  <PersonStanding className="h-6 w-6 mb-2" />
                  <span>Citizen Services</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col">
                  <GripHorizontal className="h-6 w-6 mb-2" />
                  <span>Resource Allocation</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schemes" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Government Healthcare Schemes</CardTitle>
                  <CardDescription>Manage and monitor implementation of schemes</CardDescription>
                </div>
                <div className="w-full md:w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search schemes"
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSchemes.map(scheme => (
                  <Card key={scheme.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>{scheme.name}</CardTitle>
                        <Badge className={scheme.status === 'active' ? 'bg-green-500' : 'bg-amber-500'}>
                          {scheme.status === 'active' ? 'Active' : 'Upcoming'}
                        </Badge>
                      </div>
                      <CardDescription>{scheme.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="mt-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Enrollment Progress</span>
                          <span className="text-sm">{scheme.beneficiaries} / {scheme.target} beneficiaries</span>
                        </div>
                        <Progress 
                          value={(scheme.beneficiaries / scheme.target) * 100} 
                          className={getProgressColor((scheme.beneficiaries / scheme.target) * 100)}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button 
                        className="bg-wellness-600 hover:bg-wellness-700"
                        size="sm"
                      >
                        Update Status
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-wellness-600 hover:bg-wellness-700">
                Add New Scheme
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="programs" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Health Awareness Programs</CardTitle>
                  <CardDescription>Community education and outreach initiatives</CardDescription>
                </div>
                <Button 
                  className="bg-wellness-600 hover:bg-wellness-700"
                  onClick={handleCreateProgram}
                >
                  Create New Program
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upcoming">
                <TabsList className="mb-4">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upcoming">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    {awarenessPrograms
                      .filter(program => program.status === 'upcoming')
                      .map(program => (
                        <Card key={program.id}>
                          <CardHeader>
                            <CardTitle>{program.name}</CardTitle>
                            <CardDescription>{program.date} at {program.location}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Expected Participants:</span>
                                <span>{program.participants}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Resources Allocated:</span>
                                <span>Yes</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Coordinator Assigned:</span>
                                <span>Yes</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button variant="outline">Edit Program</Button>
                            <Button variant="outline" className="text-red-500">Cancel</Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="completed">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    {awarenessPrograms
                      .filter(program => program.status === 'completed')
                      .map(program => (
                        <Card key={program.id}>
                          <CardHeader>
                            <CardTitle>{program.name}</CardTitle>
                            <CardDescription>{program.date} at {program.location}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Actual Participants:</span>
                                <span>{program.participants}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Feedback Score:</span>
                                <span>4.5/5</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Follow-up Required:</span>
                                <span>No</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full">View Detailed Report</Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="demographics" className="space-y-4 mt-4">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Population Distribution</CardTitle>
                <CardDescription>Demographic breakdown by age groups</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={populationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {populationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Community Health Indicators</CardTitle>
                <CardDescription>Key health metrics assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Vaccination Coverage</span>
                      <span>82%</span>
                    </div>
                    <Progress value={82} className="bg-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Maternal Healthcare</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="bg-pink-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Child Nutrition</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="bg-amber-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Access to Clean Water</span>
                      <span>90%</span>
                    </div>
                    <Progress value={90} className="bg-teal-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Sanitation Coverage</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="bg-green-600" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Generate Detailed Report</Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Healthcare Infrastructure</CardTitle>
              <CardDescription>Resources and facilities available in the community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Primary Health Centers</h4>
                  <div className="text-3xl font-bold mb-2">8</div>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Staff:</span> 36 healthcare workers</p>
                    <p><span className="font-medium">Average Distance:</span> 5.2 km</p>
                    <p><span className="font-medium">Coverage:</span> 85% of population</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Community Health Workers</h4>
                  <div className="text-3xl font-bold mb-2">42</div>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Villages Covered:</span> 18</p>
                    <p><span className="font-medium">Households Served:</span> 3,250</p>
                    <p><span className="font-medium">Training Level:</span> Advanced</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Medical Equipment</h4>
                  <div className="text-3xl font-bold mb-2">90%</div>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Diagnostic Units:</span> 12</p>
                    <p><span className="font-medium">Mobile Clinics:</span> 5</p>
                    <p><span className="font-medium">Emergency Vehicles:</span> 7</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Telemedicine Facilities</h4>
                  <div className="text-3xl font-bold mb-2">6</div>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Monthly Consultations:</span> 390</p>
                    <p><span className="font-medium">Specialties Available:</span> 8</p>
                    <p><span className="font-medium">Satisfaction Rate:</span> 92%</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Medicine Distribution</h4>
                  <div className="text-3xl font-bold mb-2">80%</div>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Storage Centers:</span> 15</p>
                    <p><span className="font-medium">Essential Drugs Available:</span> 95%</p>
                    <p><span className="font-medium">Cold Chain Maintained:</span> Yes</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Training Programs</h4>
                  <div className="text-3xl font-bold mb-2">12</div>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Healthcare Staff Trained:</span> 78</p>
                    <p><span className="font-medium">Community Volunteers:</span> 124</p>
                    <p><span className="font-medium">Programs Completed:</span> 8</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityDashboard;
