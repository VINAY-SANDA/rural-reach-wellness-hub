
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, PillIcon, Users, FileText, Mic, CalendarClock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const features = [
    {
      title: 'AI Health Chat',
      description: 'Check symptoms and get health advice through our AI chatbot.',
      icon: MessageSquare,
      link: '/chat',
      color: 'bg-wellness-100 text-wellness-700'
    },
    {
      title: 'Voice Assistant',
      description: 'Speak to our assistant to navigate the app or check symptoms.',
      icon: Mic,
      link: '/voice',
      color: 'bg-healing-100 text-healing-700'
    },
    {
      title: 'Medication Tracker',
      description: 'Manage and track your medications with reminders.',
      icon: PillIcon,
      link: '/medications',
      color: 'bg-amber-100 text-amber-700'
    },
    {
      title: 'Community Centers',
      description: 'Find healthcare centers and community resources near you.',
      icon: Users,
      link: '/community',
      color: 'bg-indigo-100 text-indigo-700'
    },
    {
      title: 'Health Bulletin',
      description: 'Stay updated with health news, schemes and subsidies.',
      icon: FileText,
      link: '/bulletin',
      color: 'bg-rose-100 text-rose-700'
    },
    {
      title: 'Doctor Consultation',
      description: 'Book consultations with qualified doctors near you.',
      icon: CalendarClock,
      link: '/consultation',
      color: 'bg-purple-100 text-purple-700'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Welcome to Rural Reach Wellness Hub</h1>
        <p className="text-muted-foreground">
          Bridging the gap between rural communities and healthcare resources.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index} className="overflow-hidden border-t-4" style={{ borderTopColor: feature.color.split(' ')[1] }}>
            <CardHeader className="pb-2">
              <div className={`rounded-full w-12 h-12 flex items-center justify-center ${feature.color}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <CardTitle className="mt-2">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-2">
              <Link to={feature.link} className="w-full">
                <Button variant="outline" className="w-full">Access Now</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="bg-wellness-600 text-white">
        <CardHeader>
          <CardTitle>Need Immediate Help?</CardTitle>
          <CardDescription className="text-wellness-100">
            Speak with a healthcare provider or find emergency services.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <Button variant="secondary" className="bg-white text-wellness-700 hover:bg-gray-100">
              Call Emergency Services
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-wellness-700">
              Message a Doctor
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
