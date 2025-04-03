
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, BookOpen, Search, Clock, ExternalLink, Info, ThumbsUp, ThumbsDown, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type News = {
  id: number;
  title: string;
  category: "Health" | "Schemes" | "Research" | "Alert";
  date: string;
  summary: string;
  imageUrl?: string;
  source: string;
  url: string;
};

type Scheme = {
  id: number;
  title: string;
  sponsoredBy: string;
  eligibility: string;
  benefits: string;
  deadline: string;
  application: string;
};

type Tip = {
  id: number;
  title: string;
  category: string;
  content: string;
  author: string;
  likes: number;
  userLiked?: boolean;
};

const BulletinPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tipLikes, setTipLikes] = useState<Record<number, boolean>>({});
  
  const healthNews: News[] = [
    {
      id: 1,
      title: "New Healthcare Services Coming to Rural Areas",
      category: "Health",
      date: "April 2, 2025",
      summary: "The Health Ministry has announced plans to expand healthcare services in rural areas, including mobile clinics and telemedicine facilities.",
      source: "Health Times",
      url: "#"
    },
    {
      id: 2,
      title: "Rural Health Subsidy Program Expanded",
      category: "Schemes",
      date: "March 28, 2025",
      summary: "The Rural Health Subsidy Program has been expanded to include more treatments and will now cover more geographical areas.",
      source: "Government News",
      url: "#"
    },
    {
      id: 3,
      title: "Monsoon Health Alert: Preventing Water-Borne Diseases",
      category: "Alert",
      date: "March 25, 2025",
      summary: "Health officials have issued an alert regarding the increased risk of water-borne diseases during the upcoming monsoon season. Preventative measures advised.",
      source: "Public Health Department",
      url: "#"
    },
    {
      id: 4,
      title: "Study Shows Telemedicine Improving Rural Healthcare Access",
      category: "Research",
      date: "March 20, 2025",
      summary: "A recent study indicates that telemedicine initiatives have significantly improved healthcare access in remote rural areas.",
      source: "Medical Research Journal",
      url: "#"
    },
    {
      id: 5,
      title: "Free Vaccination Drive Scheduled for Next Month",
      category: "Health",
      date: "March 15, 2025",
      summary: "A comprehensive vaccination drive will be conducted in rural districts next month, offering free vaccinations for children and elderly residents.",
      source: "District Health Office",
      url: "#"
    }
  ];
  
  const healthSchemes: Scheme[] = [
    {
      id: 1,
      title: "Rural Healthcare Accessibility Program",
      sponsoredBy: "Ministry of Health",
      eligibility: "All residents of designated rural areas",
      benefits: "Subsidized healthcare services, free basic check-ups, discounted medications",
      deadline: "Open enrollment",
      application: "Available at local health centers or online"
    },
    {
      id: 2,
      title: "Maternal and Child Health Initiative",
      sponsoredBy: "Department of Family Welfare",
      eligibility: "Pregnant women and children under 5 years in rural areas",
      benefits: "Free prenatal care, nutritional support, vaccinations, and child health monitoring",
      deadline: "Ongoing",
      application: "Through health workers or at primary health centers"
    },
    {
      id: 3,
      title: "Senior Citizens' Healthcare Support",
      sponsoredBy: "Social Welfare Department",
      eligibility: "Rural residents aged 60 and above",
      benefits: "Free health check-ups, chronic disease management, medication subsidies",
      deadline: "May 31, 2025",
      application: "At district hospitals or through online portal"
    },
    {
      id: 4,
      title: "Rural Mental Health Support Program",
      sponsoredBy: "National Mental Health Initiative",
      eligibility: "All rural residents",
      benefits: "Free counseling services, mental health awareness workshops, subsidized treatments",
      deadline: "Open enrollment",
      application: "Through community health workers or online"
    }
  ];
  
  const healthTips: Tip[] = [
    {
      id: 1,
      title: "Staying Hydrated During Summer",
      category: "Seasonal Health",
      content: "Drink at least 8-10 glasses of water daily, especially during hot weather. Carry a water bottle when traveling and include hydrating foods like cucumbers and watermelons in your diet.",
      author: "Dr. Meera Singh",
      likes: 42
    },
    {
      id: 2,
      title: "Preventing Mosquito-Borne Diseases",
      category: "Disease Prevention",
      content: "Remove standing water around your home, use mosquito nets while sleeping, wear long-sleeved clothing in the evening, and use repellents approved by health authorities.",
      author: "Public Health Department",
      likes: 38
    },
    {
      id: 3,
      title: "Managing Chronic Conditions Without Regular Doctor Visits",
      category: "Chronic Care",
      content: "Maintain a health journal to track symptoms, follow medication schedules strictly, learn to monitor vital signs at home when possible, and utilize telemedicine services for regular check-ins.",
      author: "Dr. Rakesh Kumar",
      likes: 57
    },
    {
      id: 4,
      title: "Nutritious Foods Available Locally",
      category: "Nutrition",
      content: "Focus on locally available fruits, vegetables, and grains. Millets, leafy greens, seasonal fruits, and pulses provide essential nutrients and are often more affordable than processed foods.",
      author: "Nutritionist Anjali Desai",
      likes: 63
    }
  ];
  
  const filteredNews = healthNews.filter(news => 
    news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    news.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredSchemes = healthSchemes.filter(scheme => 
    scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scheme.benefits.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredTips = healthTips.filter(tip => 
    tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tip.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tip.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Health": return "bg-wellness-100 text-wellness-700";
      case "Schemes": return "bg-healing-100 text-healing-700";
      case "Research": return "bg-purple-100 text-purple-700";
      case "Alert": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };
  
  const toggleLike = (tipId: number) => {
    setTipLikes(prev => ({
      ...prev,
      [tipId]: !prev[tipId]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Health Bulletin</h1>
        <p className="text-muted-foreground">
          Stay updated with health news, schemes, and important information.
        </p>
      </div>
      
      <div className="mb-6">
        <Input 
          placeholder="Search news, schemes, or health tips..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
          icon={<Search className="h-4 w-4" />}
        />
      </div>
      
      <Tabs defaultValue="news">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="news">Health News</TabsTrigger>
          <TabsTrigger value="schemes">Health Schemes</TabsTrigger>
          <TabsTrigger value="tips">Health Tips</TabsTrigger>
        </TabsList>
        
        <TabsContent value="news" className="space-y-6">
          {filteredNews.length > 0 ? (
            <div className="space-y-4">
              {filteredNews.map((news) => (
                <Card key={news.id} className="overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-2">
                          <Badge className={getCategoryColor(news.category)}>
                            {news.category}
                          </Badge>
                          <div className="ml-2 flex items-center text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {news.date}
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{news.title}</h3>
                        <p className="text-muted-foreground">{news.summary}</p>
                      </div>
                      {news.imageUrl && (
                        <div className="ml-4 hidden sm:block">
                          <img 
                            src={news.imageUrl} 
                            alt={news.title} 
                            className="w-24 h-24 object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        Source: {news.source}
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center">
                        Read More
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No news articles found matching your search.
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="schemes" className="space-y-6">
          {filteredSchemes.length > 0 ? (
            <div className="space-y-4">
              {filteredSchemes.map((scheme) => (
                <Card key={scheme.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle>{scheme.title}</CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Info className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Government schemes to support healthcare in rural areas</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <CardDescription>
                      Sponsored by: {scheme.sponsoredBy}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium">Eligibility:</span> {scheme.eligibility}
                      </div>
                      <div>
                        <span className="font-medium">Benefits:</span> {scheme.benefits}
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <span className="font-medium">Deadline:</span> {scheme.deadline}
                        </div>
                        <Badge variant={scheme.deadline === 'Ongoing' || scheme.deadline === 'Open enrollment' ? 'outline' : 'destructive'}>
                          {scheme.deadline === 'Ongoing' || scheme.deadline === 'Open enrollment' ? 'No Deadline' : scheme.deadline}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      Application: {scheme.application}
                    </div>
                    <Button size="sm">
                      Apply Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No schemes found matching your search.
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="tips" className="space-y-6">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {filteredTips.length > 0 ? (
              filteredTips.map((tip) => (
                <Card key={tip.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <Badge className="w-fit mb-2 bg-healing-100 text-healing-700">
                      {tip.category}
                    </Badge>
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-muted-foreground">{tip.content}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src="/placeholder.svg" alt={tip.author} />
                        <AvatarFallback>{tip.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{tip.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => toggleLike(tip.id)}
                        className={tipLikes[tip.id] ? "text-red-500" : ""}
                      >
                        <Heart className={`h-4 w-4 ${tipLikes[tip.id] ? "fill-red-500" : ""}`} />
                      </Button>
                      <span className="text-sm">
                        {tip.likes + (tipLikes[tip.id] ? 1 : 0)}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 col-span-2 text-muted-foreground">
                No health tips found matching your search.
              </div>
            )}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Health Calendar</CardTitle>
              <CardDescription>
                Upcoming health awareness days and events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "April 7", event: "World Health Day", description: "Global health awareness day under the sponsorship of the World Health Organization" },
                  { date: "April 17", event: "World Hemophilia Day", description: "Increases awareness of hemophilia and other inherited bleeding disorders" },
                  { date: "April 25", event: "World Malaria Day", description: "International observance commemorating global efforts to control malaria" },
                  { date: "May 5", event: "Hand Hygiene Day", description: "Global campaign emphasizing the importance of hand hygiene in healthcare" }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-muted p-2 rounded-md mr-3">
                        <Calendar className="h-5 w-5 text-wellness-600" />
                      </div>
                      <div>
                        <div className="font-medium">{item.date} - {item.event}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                    </div>
                    {index < 3 && <Separator className="my-3" />}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Complete Health Calendar
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="bg-wellness-50 dark:bg-wellness-900/20">
        <CardHeader>
          <CardTitle>Subscribe to Health Updates</CardTitle>
          <CardDescription>
            Receive important health information, scheme updates, and tips directly to your phone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input placeholder="Enter your phone number" className="flex-1" />
            <Button>Subscribe</Button>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            We'll send you SMS updates. You can unsubscribe anytime. Standard message rates may apply.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BulletinPage;
