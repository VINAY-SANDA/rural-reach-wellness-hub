
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
  MapPin, 
  Star, 
  Filter, 
  Search 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

// Mock data for doctors
const doctors = [
  {
    id: 1,
    name: 'Dr. Anita Sharma',
    specialty: 'General Physician',
    rating: 4.8,
    experience: '15 years',
    location: 'Rural Health Center, Mayurbhanj',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Dr. Rajesh Kumar',
    specialty: 'Pediatrician',
    rating: 4.9,
    experience: '12 years',
    location: 'Community Health Center, Koraput',
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Dr. Meena Patel',
    specialty: 'Gynecologist',
    rating: 4.7,
    experience: '10 years',
    location: 'Women\'s Health Center, Balasore',
    availableDays: ['Monday', 'Tuesday', 'Thursday'],
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Dr. Sunil Verma',
    specialty: 'Cardiologist',
    rating: 4.9,
    experience: '18 years',
    location: 'Heart Care Center, Puri',
    availableDays: ['Wednesday', 'Friday', 'Saturday'],
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2070&auto=format&fit=crop'
  }
];

const DoctorConsultationPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredDoctors = doctors.filter(doctor => {
    return (
      (doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (specialty === '' || doctor.specialty === specialty)
    );
  });

  const handleBookConsultation = (doctor: any) => {
    setSelectedDoctor(doctor);
    setIsDialogOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing information",
        description: "Please select both date and time for your appointment.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Appointment Booked",
      description: `Your appointment with ${selectedDoctor.name} is confirmed for ${selectedDate} at ${selectedTime}.`
    });

    setIsDialogOpen(false);
    setSelectedDate('');
    setSelectedTime('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Doctor Consultation</h1>
        <p className="text-muted-foreground">
          Find and book appointments with qualified healthcare professionals
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Find Doctors</CardTitle>
          <CardDescription>Search for available doctors in your area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-full md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name or specialty"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Select value={specialty} onValueChange={setSpecialty}>
                <SelectTrigger>
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Specialties</SelectLabel>
                    <SelectItem value="all">All Specialties</SelectItem>
                    <SelectItem value="General Physician">General Physician</SelectItem>
                    <SelectItem value="Pediatrician">Pediatrician</SelectItem>
                    <SelectItem value="Gynecologist">Gynecologist</SelectItem>
                    <SelectItem value="Cardiologist">Cardiologist</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map(doctor => (
            <Card key={doctor.id} className="overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{doctor.name}</CardTitle>
                <CardDescription>{doctor.specialty}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center">
                  <Star className="mr-2 h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span>{doctor.rating} • {doctor.experience} experience</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{doctor.location}</span>
                </div>
                <div className="mt-2">
                  <span className="text-sm font-medium">Available on:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {doctor.availableDays.map(day => (
                      <span 
                        key={day} 
                        className="bg-wellness-100 text-wellness-700 text-xs px-2 py-1 rounded"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Dialog open={isDialogOpen && selectedDoctor?.id === doctor.id} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-wellness-600 hover:bg-wellness-700"
                      onClick={() => handleBookConsultation(doctor)}
                    >
                      Book Consultation
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Book an Appointment</DialogTitle>
                      <DialogDescription>
                        Select a date and time for your consultation with {doctor.name}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Select Date</Label>
                        <Select value={selectedDate} onValueChange={setSelectedDate}>
                          <SelectTrigger id="date">
                            <Calendar className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Select date" />
                          </SelectTrigger>
                          <SelectContent>
                            {doctor.availableDays.map(day => {
                              // Calculate next occurrence of this day
                              const today = new Date();
                              const dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(day);
                              const diff = (dayIndex + 7 - today.getDay()) % 7;
                              const nextDate = new Date(today);
                              nextDate.setDate(today.getDate() + diff);
                              const dateString = nextDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                              
                              return (
                                <SelectItem key={day} value={`${day}, ${dateString}`}>
                                  {day}, {dateString}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Select Time</Label>
                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                          <SelectTrigger id="time">
                            <Clock className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                            <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                            <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                            <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                            <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                            <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        type="submit" 
                        className="bg-wellness-600 hover:bg-wellness-700"
                        onClick={handleConfirmBooking}
                      >
                        Confirm Booking
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground">No doctors found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorConsultationPage;
