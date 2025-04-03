
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Clock, Star, ChevronRight, Search, Filter, Users, BookOpen } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type HealthCenter = {
  id: number;
  name: string;
  type: string;
  address: string;
  distance: string;
  phone: string;
  hours: string;
  services: string[];
  rating: number;
  availability: "High" | "Medium" | "Low";
};

type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  type: string;
  description: string;
};

type Resource = {
  id: number;
  title: string;
  category: string;
  description: string;
  link?: string;
};

const CommunityPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  const healthCenters: HealthCenter[] = [
    {
      id: 1,
      name: "Community Health Clinic",
      type: "Primary Care",
      address: "123 Main St, Rural County",
      distance: "3.2 km",
      phone: "555-123-4567",
      hours: "Mon-Fri: 9AM-5PM, Sat: 10AM-2PM",
      services: ["General Medicine", "Vaccinations", "Basic Tests", "Prenatal Care"],
      rating: 4.5,
      availability: "High"
    },
    {
      id: 2,
      name: "Rural District Hospital",
      type: "Hospital",
      address: "456 Health Ave, Rural District",
      distance: "12.7 km",
      phone: "555-987-6543",
      hours: "24/7",
      services: ["Emergency Care", "Surgery", "Diagnostics", "Specialized Care"],
      rating: 4.2,
      availability: "Medium"
    },
    {
      id: 3,
      name: "Mobile Health Unit",
      type: "Mobile Clinic",
      address: "Visits different villages weekly",
      distance: "Varies",
      phone: "555-789-0123",
      hours: "According to schedule",
      services: ["Basic Check-ups", "Vaccinations", "Health Education"],
      rating: 4.0,
      availability: "Medium"
    },
    {
      id: 4,
      name: "Women's Health Center",
      type: "Specialized Care",
      address: "789 Wellness Rd, Rural Town",
      distance: "8.5 km",
      phone: "555-456-7890",
      hours: "Mon-Fri: 8AM-6PM",
      services: ["Women's Health", "Maternal Care", "Family Planning"],
      rating: 4.8,
      availability: "High"
    },
    {
      id: 5,
      name: "Rural Mental Health Services",
      type: "Mental Health",
      address: "321 Support St, Rural County",
      distance: "5.1 km",
      phone: "555-234-5678",
      hours: "Mon-Fri: 9AM-7PM",
      services: ["Counseling", "Therapy", "Mental Health Support"],
      rating: 4.3,
      availability: "Low"
    }
  ];
  
  const communityEvents: Event[] = [
    {
      id: 1,
      title: "Free Health Checkup Camp",
      date: "April 15, 2025",
      location: "Community Center, Rural District",
      type: "Health Camp",
      description: "Free basic health checkups including blood pressure, blood sugar, and BMI measurements."
    },
    {
      id: 2,
      title: "Diabetes Awareness Workshop",
      date: "April 20, 2025",
      location: "Rural District Hospital",
      type: "Educational",
      description: "Learn about diabetes prevention, management, and healthy living strategies."
    },
    {
      id: 3,
      title: "Mental Health Support Group",
      date: "Weekly - Every Wednesday",
      location: "Rural Mental Health Services",
      type: "Support Group",
      description: "A safe space to discuss mental health challenges and receive peer support."
    },
    {
      id: 4,
      title: "Maternal Health Seminar",
      date: "May 5, 2025",
      location: "Women's Health Center",
      type: "Educational",
      description: "Information about prenatal care, nutrition, and safe childbirth practices."
    }
  ];
  
  const communityResources: Resource[] = [
    {
      id: 1,
      title: "Healthcare Subsidy Program",
      category: "Financial Assistance",
      description: "Government program providing financial assistance for medical treatment to eligible rural residents.",
      link: "#"
    },
    {
      id: 2,
      title: "Telehealth Services Guide",
      category: "Remote Healthcare",
      description: "Step-by-step guide on how to access and use telehealth services available in your area.",
      link: "#"
    },
    {
      id: 3,
      title: "Emergency Medical Transport",
      category: "Emergency Services",
      description: "Information about emergency medical transport services available in rural areas.",
      link: "#"
    },
    {
      id: 4,
      title: "Rural Health Education Materials",
      category: "Education",
      description: "Free downloadable health education materials specifically designed for rural communities.",
      link: "#"
    }
  ];
  
  const filterHealthCenters = () => {
    return healthCenters
      .filter(center => 
        center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        center.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .filter(center => 
        !selectedType || center.type === selectedType
      );
  };

  const getAvailabilityColor = (availability: "High" | "Medium" | "Low") => {
    switch (availability) {
      case "High": return "bg-green-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };
  
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            className={`h-4 w-4 ${
              i < fullStars 
                ? 'text-yellow-500 fill-yellow-500' 
                : i === fullStars && hasHalfStar
                ? 'text-yellow-500 fill-yellow-500 opacity-50'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Community Resources</h1>
        <p className="text-muted-foreground">
          Find healthcare centers, community events, and resources near you.
        </p>
      </div>
      
      <Tabs defaultValue="centers">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="centers">Healthcare Centers</TabsTrigger>
          <TabsTrigger value="events">Community Events</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="centers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Find Healthcare Centers</CardTitle>
              <CardDescription>
                Discover healthcare facilities in your area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Input 
                    placeholder="Search centers or services..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                    icon={<Search className="h-4 w-4" />}
                  />
                </div>
                <div className="flex gap-2">
                  {["Primary Care", "Hospital", "Mobile Clinic", "Specialized Care", "Mental Health"].map(type => (
                    <Button
                      key={type}
                      variant={selectedType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedType(selectedType === type ? null : type)}
                      className={selectedType === type ? "bg-wellness-600" : ""}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
              
              {filterHealthCenters().length > 0 ? (
                <div className="space-y-4">
                  {filterHealthCenters().map((center) => (
                    <Card key={center.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-4 md:p-6 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold">{center.name}</h3>
                              <div className="flex items-center mt-1">
                                <Badge variant="outline" className="mr-2">{center.type}</Badge>
                                <div className="flex items-center">
                                  <div className={`w-2 h-2 rounded-full mr-1 ${getAvailabilityColor(center.availability)}`}></div>
                                  <span className="text-xs">{center.availability} Availability</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              {renderStars(center.rating)}
                            </div>
                          </div>
                          
                          <div className="mt-4 space-y-2">
                            <div className="flex items-start">
                              <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                              <div className="text-sm">
                                <div>{center.address}</div>
                                <div className="text-muted-foreground">{center.distance} away</div>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <Phone className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                              <span className="text-sm">{center.phone}</span>
                            </div>
                            
                            <div className="flex items-start">
                              <Clock className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                              <span className="text-sm">{center.hours}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">Services Available:</h4>
                            <div className="flex flex-wrap gap-2">
                              {center.services.map((service, index) => (
                                <Badge key={index} variant="secondary">{service}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-muted md:w-32 p-4 flex flex-row md:flex-col justify-between items-center md:items-stretch">
                          <Button variant="outline" className="w-full mb-2">
                            Details
                          </Button>
                          <Button className="w-full bg-wellness-600 hover:bg-wellness-700">
                            Directions
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No healthcare centers found matching your criteria.
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <MapPin className="mr-2 h-4 w-4" />
                View All Centers on Map
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Community Health Events</CardTitle>
              <CardDescription>
                Health-related events and activities in your community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communityEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="p-4 border-l-4 border-healing-500">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">{event.title}</h3>
                          <Badge variant="outline" className="mt-1">{event.type}</Badge>
                        </div>
                        <div className="text-sm font-medium text-healing-700">
                          {event.date}
                        </div>
                      </div>
                      
                      <div className="mt-3 flex items-start">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      
                      <div className="mt-3 text-sm text-muted-foreground">
                        {event.description}
                      </div>
                      
                      <div className="mt-3 flex justify-end">
                        <Button variant="outline" size="sm">
                          Learn More
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter Events
              </Button>
              <Button>
                <Users className="mr-2 h-4 w-4" />
                Community Calendar
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Healthcare Resources</CardTitle>
              <CardDescription>
                Information and resources to support your health journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {communityResources.map((resource) => (
                  <AccordionItem key={resource.id} value={`resource-${resource.id}`}>
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-healing-600" />
                        <span>{resource.title}</span>
                        <Badge variant="outline" className="ml-3">{resource.category}</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="p-2">
                        <p className="text-muted-foreground mb-3">{resource.description}</p>
                        {resource.link && (
                          <Button variant="link" className="p-0 text-wellness-600">
                            Access Resource →
                          </Button>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                View All Resources
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Need Transportation?</CardTitle>
              <CardDescription>
                Transportation services to help you reach healthcare facilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  For many rural residents, transportation to healthcare facilities can be a major challenge. 
                  Here are some transportation services that may be available in your area:
                </p>
                
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Community Medical Transport</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Volunteer-driven transport service for medical appointments.</p>
                      <Button variant="link" className="p-0 h-auto mt-2 text-wellness-600">Call 555-888-7777</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Rural Transport Subsidy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Government program providing transport subsidies for medical visits.</p>
                      <Button variant="link" className="p-0 h-auto mt-2 text-wellness-600">Check Eligibility</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityPage;
