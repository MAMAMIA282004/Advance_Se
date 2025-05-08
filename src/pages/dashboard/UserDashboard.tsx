
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Download, FileText } from 'lucide-react';

const UserDashboard = () => {
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (123) 456-7890',
    address: '123 Main St, Anytown, CA 94103',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  });

  // Sample data for donations and help requests
  const donationRequests = [
    { id: 'DR123', charity: 'Red Cross', type: 'Clothes', status: 'Pending', date: '2023-05-12' },
    { id: 'DR124', charity: 'Food Bank', type: 'Food Items', status: 'Approved', date: '2023-05-10' },
    { id: 'DR125', charity: 'Shelter Hope', type: 'Furniture', status: 'Declined', date: '2023-05-08' },
    { id: 'DR126', charity: 'Children\'s Fund', type: 'Money', status: 'Completed', date: '2023-05-05' },
  ];

  const helpRequests = [
    { id: 'HR123', charity: 'Red Cross', description: 'Medical assistance', status: 'Pending', date: '2023-05-12' },
    { id: 'HR124', charity: 'Food Bank', description: 'Food supply', status: 'Approved', date: '2023-05-10' },
    { id: 'HR125', charity: 'Shelter Hope', description: 'Temporary shelter', status: 'Declined', date: '2023-05-08' },
  ];

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to update profile
    alert('Profile updated successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'declined': return 'text-red-600 bg-red-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleCancelRequest = (id: string) => {
    // Logic to cancel request
    alert(`Request ${id} cancelled successfully!`);
  };

  return (
    <MainLayout>
      <div className="bg-hope-gray py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-hope-dark-gray mb-6">User Dashboard</h1>
          
          <Tabs defaultValue="profile">
            <TabsList className="mb-8 bg-white">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="donations">Donation Requests</TabsTrigger>
              <TabsTrigger value="help">Help Requests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="w-48 h-48 rounded-full overflow-hidden mb-6">
                      <img 
                        src={profileData.profileImage} 
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button className="bg-hope-orange hover:bg-hope-dark-orange w-full">
                      Change Picture
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-5">
                      <div>
                        <label htmlFor="fullName" className="block mb-1 text-sm font-medium">Full Name</label>
                        <input 
                          id="fullName" 
                          type="text" 
                          value={profileData.fullName}
                          onChange={e => setProfileData({...profileData, fullName: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block mb-1 text-sm font-medium">Email Address</label>
                        <input 
                          id="email" 
                          type="email" 
                          value={profileData.email}
                          onChange={e => setProfileData({...profileData, email: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block mb-1 text-sm font-medium">Phone Number</label>
                        <input 
                          id="phone" 
                          type="tel" 
                          value={profileData.phone}
                          onChange={e => setProfileData({...profileData, phone: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block mb-1 text-sm font-medium">Address</label>
                        <textarea 
                          id="address" 
                          rows={3}
                          value={profileData.address}
                          onChange={e => setProfileData({...profileData, address: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                        ></textarea>
                      </div>
                      
                      <div>
                        <Button type="submit" className="bg-hope-orange hover:bg-hope-dark-orange">
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="donations">
              <Card>
                <CardHeader>
                  <CardTitle>Your Donation Requests</CardTitle>
                  <CardDescription>Track the status of your donation requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Charity</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {donationRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>{request.id}</TableCell>
                          <TableCell>{request.charity}</TableCell>
                          <TableCell>{request.type}</TableCell>
                          <TableCell>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                              {request.status}
                            </span>
                          </TableCell>
                          <TableCell>{request.date}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              {request.status === 'Pending' && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleCancelRequest(request.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="help">
              <Card>
                <CardHeader>
                  <CardTitle>Your Help Requests</CardTitle>
                  <CardDescription>Track the status of your requests for assistance</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Charity</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {helpRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>{request.id}</TableCell>
                          <TableCell>{request.charity}</TableCell>
                          <TableCell>{request.description}</TableCell>
                          <TableCell>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                              {request.status}
                            </span>
                          </TableCell>
                          <TableCell>{request.date}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <FileText className="h-4 w-4" />
                              </Button>
                              {request.status === 'Pending' && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleCancelRequest(request.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserDashboard;
