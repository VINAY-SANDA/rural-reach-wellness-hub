
import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { toast } from '@/hooks/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { UserProfile, PatientProfile, DoctorProfile, CommunityProfile } from '@/types/database.types';
import { Pencil, Save, User } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { userProfile, userRole, updateProfile, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState<Partial<UserProfile>>({});
  
  if (isLoading || !userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wellness-600 mx-auto"></div>
          <p className="mt-4 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveChanges = async () => {
    try {
      await updateProfile(updatedProfile);
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  const renderPatientProfileContent = () => {
    const patientProfile = userProfile as PatientProfile;
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            {isEditing ? (
              <Input
                id="age"
                name="age"
                type="number"
                defaultValue={patientProfile.age?.toString() || ''}
                onChange={handleInputChange}
              />
            ) : (
              <p>{patientProfile.age || 'Not specified'}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            {isEditing ? (
              <Input
                id="gender"
                name="gender"
                defaultValue={patientProfile.gender || ''}
                onChange={handleInputChange}
              />
            ) : (
              <p>{patientProfile.gender || 'Not specified'}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="medical_history">Medical History</Label>
          {isEditing ? (
            <Textarea
              id="medical_history"
              name="medical_history"
              rows={4}
              defaultValue={patientProfile.medical_history || ''}
              onChange={handleInputChange}
            />
          ) : (
            <p className="p-2 bg-gray-50 rounded-md min-h-[100px]">
              {patientProfile.medical_history || 'No medical history recorded'}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label>Allergies</Label>
          <div className="flex flex-wrap gap-2">
            {patientProfile.allergies?.map((allergy, index) => (
              <Badge key={index} variant="outline">{allergy}</Badge>
            )) || <p>No allergies recorded</p>}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Current Medications</Label>
          <div className="flex flex-wrap gap-2">
            {patientProfile.medications?.map((medication, index) => (
              <Badge key={index} variant="outline">{medication}</Badge>
            )) || <p>No medications recorded</p>}
          </div>
        </div>
      </div>
    );
  };
  
  const renderDoctorProfileContent = () => {
    const doctorProfile = userProfile as DoctorProfile;
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="specialization">Specialization</Label>
            {isEditing ? (
              <Input
                id="specialization"
                name="specialization"
                defaultValue={doctorProfile.specialization || ''}
                onChange={handleInputChange}
              />
            ) : (
              <p>{doctorProfile.specialization || 'Not specified'}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="qualification">Qualification</Label>
            {isEditing ? (
              <Input
                id="qualification"
                name="qualification"
                defaultValue={doctorProfile.qualification || ''}
                onChange={handleInputChange}
              />
            ) : (
              <p>{doctorProfile.qualification || 'Not specified'}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="experience_years">Years of Experience</Label>
            {isEditing ? (
              <Input
                id="experience_years"
                name="experience_years"
                type="number"
                defaultValue={doctorProfile.experience_years?.toString() || ''}
                onChange={handleInputChange}
              />
            ) : (
              <p>{doctorProfile.experience_years ? `${doctorProfile.experience_years} years` : 'Not specified'}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="license_number">License Number</Label>
            {isEditing ? (
              <Input
                id="license_number"
                name="license_number"
                defaultValue={doctorProfile.license_number || ''}
                onChange={handleInputChange}
              />
            ) : (
              <p>{doctorProfile.license_number || 'Not specified'}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Languages</Label>
          <div className="flex flex-wrap gap-2">
            {doctorProfile.languages?.map((language, index) => (
              <Badge key={index} variant="outline">{language}</Badge>
            )) || <p>No languages specified</p>}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Consultation Schedule</Label>
          {doctorProfile.consultation_schedule ? (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {doctorProfile.consultation_schedule.days.map((day, index) => (
                  <Badge key={index} variant="outline">{day}</Badge>
                ))}
              </div>
              <p>Hours: {doctorProfile.consultation_schedule.hours}</p>
            </div>
          ) : (
            <p>No consultation schedule specified</p>
          )}
        </div>
      </div>
    );
  };
  
  const renderCommunityProfileContent = () => {
    const communityProfile = userProfile as CommunityProfile;
    
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="organization_name">Organization Name</Label>
          {isEditing ? (
            <Input
              id="organization_name"
              name="organization_name"
              defaultValue={communityProfile.organization_name || ''}
              onChange={handleInputChange}
            />
          ) : (
            <p>{communityProfile.organization_name || 'Not specified'}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label>Service Areas</Label>
          <div className="flex flex-wrap gap-2">
            {communityProfile.service_area?.map((area, index) => (
              <Badge key={index} variant="outline">{area}</Badge>
            )) || <p>No service areas specified</p>}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Programs Offered</Label>
          <div className="flex flex-wrap gap-2">
            {communityProfile.programs_offered?.map((program, index) => (
              <Badge key={index} variant="outline">{program}</Badge>
            )) || <p>No programs specified</p>}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contact_number">Contact Number</Label>
          {isEditing ? (
            <Input
              id="contact_number"
              name="contact_number"
              defaultValue={communityProfile.contact_number || ''}
              onChange={handleInputChange}
            />
          ) : (
            <p>{communityProfile.contact_number || 'Not specified'}</p>
          )}
        </div>
      </div>
    );
  };
  
  const renderRoleSpecificContent = () => {
    switch (userRole) {
      case 'patient':
        return renderPatientProfileContent();
      case 'doctor':
        return renderDoctorProfileContent();
      case 'community':
        return renderCommunityProfileContent();
      default:
        return <p>Invalid user role</p>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and settings
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your account details and preferences</CardDescription>
            </div>
            <Button 
              variant={isEditing ? "default" : "outline"} 
              size="sm"
              onClick={() => isEditing ? handleSaveChanges() : setIsEditing(true)}
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32">
                <AvatarImage src={userProfile.avatar_url || ''} alt={userProfile.full_name} />
                <AvatarFallback>
                  <User className="h-16 w-16" />
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" className="mt-4">
                Update Photo
              </Button>
            </div>
            
            <div className="flex-1">
              <Tabs defaultValue="general" className="w-full">
                <TabsList>
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="role-specific">{userRole?.charAt(0).toUpperCase() + userRole?.slice(1)} Details</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      {isEditing ? (
                        <Input
                          id="full_name"
                          name="full_name"
                          defaultValue={userProfile.full_name}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p>{userProfile.full_name}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <p>{userProfile.email}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <p className="capitalize">{userProfile.role}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="joined">Joined</Label>
                      <p>{new Date(userProfile.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="role-specific" className="mt-4">
                  {renderRoleSpecificContent()}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {isEditing && (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfilePage;
