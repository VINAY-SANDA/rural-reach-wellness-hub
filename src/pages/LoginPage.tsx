
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, MailIcon, UserRound, Hospital, Users, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { UserRole } from '@/types/database.types';
import { toast } from '@/hooks/use-toast';

const LoginPage = () => {
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: 'patient' as UserRole,
  });

  const handleRoleChange = (role: UserRole) => {
    setCredentials({ ...credentials, role });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // For Supabase login, we don't need to pass the role here
      // as it will be retrieved from the profile
      await login(credentials.email, credentials.password);
      // Navigation is handled in the login function
    } catch (error: any) {
      console.error('Login error:', error);
      // Check if the error was already handled in the login function
      if (!error.handled) {
        toast({
          title: "Login failed",
          description: error.message || "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
    }
  };

  const renderRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'patient':
        return <UserRound className="w-5 h-5" />;
      case 'doctor':
        return <Hospital className="w-5 h-5" />;
      case 'community':
        return <Users className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wellness-50 to-wellness-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-wellness-700">Rural Reach</h1>
          <p className="text-muted-foreground">Wellness Hub</p>
        </div>

        <Card className="border border-wellness-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="patient" className="w-full mb-6">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger 
                  value="patient" 
                  onClick={() => handleRoleChange('patient')}
                  className="data-[state=active]:bg-wellness-600 data-[state=active]:text-white"
                >
                  <UserRound className="mr-2 h-4 w-4" />
                  Patient
                </TabsTrigger>
                <TabsTrigger 
                  value="doctor" 
                  onClick={() => handleRoleChange('doctor')}
                  className="data-[state=active]:bg-wellness-600 data-[state=active]:text-white"
                >
                  <Hospital className="mr-2 h-4 w-4" />
                  Doctor
                </TabsTrigger>
                <TabsTrigger 
                  value="community" 
                  onClick={() => handleRoleChange('community')}
                  className="data-[state=active]:bg-wellness-600 data-[state=active]:text-white"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Community
                </TabsTrigger>
              </TabsList>

              <TabsContent value="patient">
                <form onSubmit={handleLogin} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={credentials.email}
                      onChange={handleInputChange}
                      required
                      className="pl-10 relative"
                    />
                    <div className="absolute -mt-9 ml-3 text-muted-foreground">
                      <MailIcon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="space-y-2 relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={credentials.password}
                      onChange={handleInputChange}
                      required
                      className="pl-10"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Lock className="w-5 h-5" />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-wellness-600 hover:bg-wellness-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign in as Patient"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="doctor">
                <form onSubmit={handleLogin} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Doctor Email/ID"
                      value={credentials.email}
                      onChange={handleInputChange}
                      required
                      className="pl-10"
                    />
                    <div className="absolute -mt-9 ml-3 text-muted-foreground">
                      <MailIcon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="space-y-2 relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={credentials.password}
                      onChange={handleInputChange}
                      required
                      className="pl-10"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Lock className="w-5 h-5" />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-wellness-600 hover:bg-wellness-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign in as Doctor"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="community">
                <form onSubmit={handleLogin} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Service Provider ID"
                      value={credentials.email}
                      onChange={handleInputChange}
                      required
                      className="pl-10"
                    />
                    <div className="absolute -mt-9 ml-3 text-muted-foreground">
                      <MailIcon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="space-y-2 relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={credentials.password}
                      onChange={handleInputChange}
                      required
                      className="pl-10"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Lock className="w-5 h-5" />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-wellness-600 hover:bg-wellness-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign in as Service Provider"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              <a href="#" className="text-wellness-600 hover:text-wellness-800">
                Forgot your password?
              </a>
            </div>
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-wellness-600 hover:text-wellness-800">
                Register here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
