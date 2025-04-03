
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PillIcon, Bell, Clock, InfoIcon, PlusCircle, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Medication = {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  notes?: string;
};

const MedicationsPage: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: 1,
      name: 'Paracetamol',
      dosage: '500mg',
      frequency: 'Twice daily',
      time: '08:00, 20:00',
      notes: 'Take with food'
    },
    {
      id: 2,
      name: 'Metformin',
      dosage: '1000mg',
      frequency: 'Once daily',
      time: '08:00',
      notes: 'Take with breakfast'
    },
    {
      id: 3,
      name: 'Amlodipine',
      dosage: '5mg',
      frequency: 'Once daily',
      time: '20:00',
      notes: 'For blood pressure'
    }
  ]);
  
  const [newMedication, setNewMedication] = useState<Omit<Medication, 'id'>>({
    name: '',
    dosage: '',
    frequency: 'Once daily',
    time: '',
    notes: ''
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const filteredMedications = medications.filter(med => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddMedication = () => {
    const newId = medications.length > 0 ? Math.max(...medications.map(m => m.id)) + 1 : 1;
    
    setMedications([
      ...medications,
      {
        id: newId,
        ...newMedication
      }
    ]);
    
    setNewMedication({
      name: '',
      dosage: '',
      frequency: 'Once daily',
      time: '',
      notes: ''
    });
    
    setIsDialogOpen(false);
  };
  
  const handleDeleteMedication = (id: number) => {
    setMedications(medications.filter(med => med.id !== id));
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMedication({
      ...newMedication,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setNewMedication({
      ...newMedication,
      [name]: value
    });
  };

  const medicationInfo = {
    "Paracetamol": {
      description: "Common pain reliever and fever reducer",
      sideEffects: "Rare side effects include nausea, stomach pain, and liver problems with high doses",
      precautions: "Don't exceed recommended dose. Avoid alcohol."
    },
    "Metformin": {
      description: "Used to treat type 2 diabetes",
      sideEffects: "Digestive issues, vitamin B12 deficiency with long-term use",
      precautions: "Take with meals to reduce stomach upset. Monitor kidney function."
    },
    "Amlodipine": {
      description: "Calcium channel blocker used to treat high blood pressure",
      sideEffects: "Swelling in ankles/feet, dizziness, flushing, headache",
      precautions: "Don't stop taking suddenly. Avoid grapefruit."
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Medication Management</h1>
        <p className="text-muted-foreground">
          Track and manage your medications, set reminders, and access medication information.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Your Medications</CardTitle>
            <CardDescription>
              Manage your prescriptions and dosages
            </CardDescription>
            <div className="flex gap-2 mt-2">
              <Input 
                placeholder="Search medications..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Medication</DialogTitle>
                    <DialogDescription>
                      Enter the details of your medication below
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={newMedication.name}
                        onChange={handleChange}
                        className="col-span-3"
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="dosage" className="text-right">Dosage</Label>
                      <Input
                        id="dosage"
                        name="dosage"
                        value={newMedication.dosage}
                        onChange={handleChange}
                        className="col-span-3"
                        placeholder="e.g., 500mg"
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="frequency" className="text-right">Frequency</Label>
                      <Select 
                        value={newMedication.frequency} 
                        onValueChange={(value) => handleSelectChange('frequency', value)}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Once daily">Once daily</SelectItem>
                          <SelectItem value="Twice daily">Twice daily</SelectItem>
                          <SelectItem value="Three times daily">Three times daily</SelectItem>
                          <SelectItem value="Every other day">Every other day</SelectItem>
                          <SelectItem value="Weekly">Weekly</SelectItem>
                          <SelectItem value="As needed">As needed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="time" className="text-right">Time</Label>
                      <Input
                        id="time"
                        name="time"
                        value={newMedication.time}
                        onChange={handleChange}
                        className="col-span-3"
                        placeholder="e.g., 08:00, 20:00"
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="notes" className="text-right">Notes</Label>
                      <Input
                        id="notes"
                        name="notes"
                        value={newMedication.notes}
                        onChange={handleChange}
                        className="col-span-3"
                        placeholder="Optional notes"
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddMedication} disabled={!newMedication.name || !newMedication.dosage}>Add Medication</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          
          <CardContent>
            {filteredMedications.length > 0 ? (
              <div className="space-y-4">
                {filteredMedications.map((med) => (
                  <Card key={med.id} className="border-l-4 border-l-wellness-600">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{med.name}</CardTitle>
                          <CardDescription>{med.dosage}</CardDescription>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteMedication(med.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{med.frequency}</span>
                        </div>
                        <div className="flex items-center">
                          <Bell className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{med.time}</span>
                        </div>
                      </div>
                      {med.notes && (
                        <div className="mt-2 text-sm text-muted-foreground">
                          Note: {med.notes}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="w-full">
                            <InfoIcon className="mr-2 h-4 w-4" />
                            More Info
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{med.name} Information</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            {medicationInfo[med.name as keyof typeof medicationInfo] ? (
                              <>
                                <div>
                                  <h4 className="font-medium mb-1">Description</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {medicationInfo[med.name as keyof typeof medicationInfo].description}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-1">Side Effects</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {medicationInfo[med.name as keyof typeof medicationInfo].sideEffects}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-1">Precautions</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {medicationInfo[med.name as keyof typeof medicationInfo].precautions}
                                  </p>
                                </div>
                              </>
                            ) : (
                              <p className="text-muted-foreground">
                                Detailed information not available for this medication.
                              </p>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm ? "No medications match your search" : "No medications added yet"}
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="flex flex-col space-y-6 md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>
                Your medication reminders for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: '08:00 AM', medications: ['Paracetamol (500mg)', 'Metformin (1000mg)'] },
                  { time: '01:00 PM', medications: [] },
                  { time: '08:00 PM', medications: ['Paracetamol (500mg)', 'Amlodipine (5mg)'] }
                ].map((schedule, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4 text-center">
                      <div className="bg-muted w-12 text-sm rounded-md py-1">{schedule.time}</div>
                    </div>
                    <div className="flex-1 border-l-2 pl-4 pb-6">
                      {schedule.medications.length > 0 ? (
                        <div>
                          {schedule.medications.map((med, i) => (
                            <div key={i} className="flex items-center mb-1">
                              <PillIcon className="h-4 w-4 mr-2 text-wellness-600" />
                              <span>{med}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-muted-foreground">No medications scheduled</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Bell className="mr-2 h-4 w-4" />
                Set Up Reminders
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Medication Guide</CardTitle>
              <CardDescription>
                Information to help you manage your medications safely
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="storage">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="storage">Storage</TabsTrigger>
                  <TabsTrigger value="interactions">Interactions</TabsTrigger>
                  <TabsTrigger value="tips">Tips</TabsTrigger>
                </TabsList>
                
                <TabsContent value="storage" className="space-y-4">
                  <p className="text-sm">
                    Store medications in a cool, dry place away from direct sunlight, unless otherwise specified.
                  </p>
                  <ul className="text-sm list-disc pl-4 space-y-1">
                    <li>Keep medications in their original containers</li>
                    <li>Store away from children and pets</li>
                    <li>Check expiration dates regularly</li>
                    <li>Some medications may require refrigeration</li>
                  </ul>
                </TabsContent>
                
                <TabsContent value="interactions" className="space-y-4">
                  <p className="text-sm">
                    Medications can interact with each other, foods, or supplements, potentially reducing effectiveness or causing side effects.
                  </p>
                  <ul className="text-sm list-disc pl-4 space-y-1">
                    <li>Always inform your doctor about all medications you take</li>
                    <li>Ask about food or beverage restrictions</li>
                    <li>Check for interactions before taking new medications</li>
                  </ul>
                </TabsContent>
                
                <TabsContent value="tips" className="space-y-4">
                  <p className="text-sm">
                    Tips for managing your medications effectively:
                  </p>
                  <ul className="text-sm list-disc pl-4 space-y-1">
                    <li>Use pill organizers for complex schedules</li>
                    <li>Set alarms or use our reminder system</li>
                    <li>Keep a list of all your medications with you</li>
                    <li>Dispose of expired medications properly</li>
                    <li>Always follow healthcare provider's instructions</li>
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MedicationsPage;
