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
import { useEffect } from 'react';
import { GetUserProfileData, UpdateUserPassword } from '@/Api/user/user';
import { IChangePasswordForm, IUserData, IUserDonation, IUserHelpRequest } from '@/interfaces/interfaces';
import { UpdateUserProfile } from '@/Api/user/user';
import { ChangeHelpRequestStatus, GetUserHelpRequests } from '@/Api/helpRequest/helpRequests';
import { ChangeDonationStatus, GetUserDonationRequests } from '@/Api/donations/donations';
import { DialogFooter, Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { toast } from 'sonner';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordChangeSchema } from '@/lib/validations';

const UserDashboard = () => {
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<IUserDonation | null>(null);
  const [selectedHelpRequest, setSelectedHelpRequest] = useState<IUserHelpRequest | null>(null);
  const [profileData, setProfileData] = useState<IUserData>();
  const [donationRequests, setDonationRequests] = useState<IUserDonation[]>([]);
  const [useHelpRequests, setHelpRequests] = useState<IUserHelpRequest[]>([]);
  const [passwordData, setPasswordData] = useState<IChangePasswordForm>();
  const [profilePhoto, setProfilePhoto] = useState<File | null>(profileData?.profilePhotoUrl ? new File([], profileData?.profilePhotoUrl) : null);

  const { register: registerPassword, handleSubmit: handlePasswordSubmit, formState: { errors: passwordErrors }, reset: resetPassword } = useForm({
    resolver: yupResolver(passwordChangeSchema)
  });

  const handleOpenDialog = (isOpen: boolean) => {
    setViewDialogOpen(isOpen);
  };

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePhoto(e.target.files[0]);
    }
  };

  const fetchUserProfileData = async () => {
    try {
      const response = await GetUserProfileData();
      setProfileData(response);
    } catch (error) {
      console.error('Error fetching user profile data:', error);
    }
  };

  const fetchDonationRequests = async () => {
    try {
      const response = await GetUserDonationRequests();
      setDonationRequests(response);
    } catch (error) {
      console.error('Error fetching donation requests:', error);
    }
  };

  const fetchHelpRequests = async () => {
    try {
      const response = await GetUserHelpRequests();
      setHelpRequests(response);
    } catch (error) {
      console.error('Error fetching help requests:', error);
    }
  };

  useEffect(() => {
    fetchUserProfileData();
    fetchDonationRequests();
    fetchHelpRequests();
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Email', profileData?.email || '');
    formData.append('Phone', profileData?.phoneNumber || '');
    formData.append('Adress', profileData?.address || '');
    formData.append('FullName', profileData?.fullName || '');
    if (profilePhoto) {
      formData.append('ProfilePhoto', profilePhoto);
    }
    try {
      const response = await UpdateUserProfile(formData);
      if (response.status === 200) {
        alert('Profile updated successfully!');
        fetchUserProfileData();
      } else {
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile.');
    }
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

  const handleCancelRequest = async (id: number, type: "donate" | "help") => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this request?');
    if (!confirmCancel) return;
    try {
      let response;
      if (type === "donate")
        response = await ChangeDonationStatus(id, 'Cancelled');
      else
        response = await ChangeHelpRequestStatus(id, 'Cancelled');
      if (response.status === 200) {
        toast.success('Request cancelled successfully!');
        if (type === "donate")
          fetchDonationRequests();
        else
          fetchHelpRequests();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel the request. Please try again.');
    }
  };

  const onSubmitPasswordChange = async (data) => {
    try {
      const response = await UpdateUserPassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
      });

      if (response.status === 200) {
        toast.success('Password changed successfully!');
        resetPassword();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password. Please try again.');
    }
  };

  return (
    <MainLayout>
      <div className="bg-hope-gray py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-hope-dark-gray mb-6">User Dashboard</h1>

          <Tabs defaultValue="profile">
            <TabsList className="mb-8 bg-white flex justify-around">
              <TabsTrigger className='data-[state=active]:text-hope-orange data-[state=active]:font-semibold rounded-none data-[state=active]:lg:border-b-2 data-[state=active]:border-b border-hope-orange data-[state=active]:lg:text-lg data-[state=active]:shadow-none' value="profile">Profile</TabsTrigger>
              <TabsTrigger className='data-[state=active]:text-hope-orange data-[state=active]:font-semibold rounded-none data-[state=active]:lg:border-b-2 data-[state=active]:border-b border-hope-orange data-[state=active]:lg:text-lg data-[state=active]:shadow-none' value="donations">Donation Requests</TabsTrigger>
              <TabsTrigger className='data-[state=active]:text-hope-orange data-[state=active]:font-semibold rounded-none data-[state=active]:lg:border-b-2 data-[state=active]:border-b border-hope-orange data-[state=active]:lg:text-lg data-[state=active]:shadow-none' value="help">Help Requests</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <img
                      src={profilePhoto ? URL.createObjectURL(profilePhoto) : profileData?.profilePhotoUrl ? `https://ma3ansawa.runasp.net${profileData?.profilePhotoUrl}` : `https://ui-avatars.com/api/?name=${profileData?.userName}`}
                      alt="Profile"
                      className="w-3/4 object-cover rounded-full"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePhotoChange}
                      className="text-xs w-full text-gray-500 file:mr-2 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-hope-orange mt-10 file:text-white hover:file:bg-hope-dark-orange"
                    />
                  </CardContent>
                </Card>

                <div className='w-full md:col-span-2 space-y-10'>
                  {/* Card for Profile Information */}
                  <Card>
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
                            value={profileData?.fullName}
                            onChange={e => setProfileData({ ...profileData, fullName: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block mb-1 text-sm font-medium">Email Address</label>
                          <input
                            id="email"
                            type="email"
                            value={profileData?.email}
                            disabled
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block mb-1 text-sm font-medium">Phone Number</label>
                          <input
                            id="phone"
                            type="tel"
                            value={profileData?.phoneNumber}
                            onChange={e => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                          />
                        </div>

                        <div>
                          <label htmlFor="address" className="block mb-1 text-sm font-medium">Address</label>
                          <textarea
                            id="address"
                            rows={3}
                            value={profileData?.address}
                            onChange={e => setProfileData({ ...profileData, address: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                          ></textarea>
                        </div>
                        <div>
                          <Button type="submit" className="bg-hope-orange hover:bg-hope-dark-orange" onClick={handleProfileUpdate}>
                            Save Changes
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Card for Password Information */}
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                      <CardDescription>Update your Password</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handlePasswordSubmit(onSubmitPasswordChange)} className="space-y-4">
                        <div>
                          <label className="block mb-1 text-sm font-medium">Current Password</label>
                          <input
                            type="password"
                            {...registerPassword('currentPassword')}
                            className={`w-full px-4 py-2 rounded-lg border ${passwordErrors.currentPassword ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {passwordErrors.currentPassword && (
                            <p className="text-red-500 text-sm mt-1">{passwordErrors.currentPassword.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block mb-1 text-sm font-medium">New Password</label>
                          <input
                            type="password"
                            {...registerPassword('newPassword')}
                            className={`w-full px-4 py-2 rounded-lg border ${passwordErrors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {passwordErrors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">{passwordErrors.newPassword.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block mb-1 text-sm font-medium">Confirm New Password</label>
                          <input
                            type="password"
                            {...registerPassword('confirmNewPassword')}
                            className={`w-full px-4 py-2 rounded-lg border ${passwordErrors.confirmNewPassword ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {passwordErrors.confirmNewPassword && (
                            <p className="text-red-500 text-sm mt-1">{passwordErrors.confirmNewPassword.message}</p>
                          )}
                        </div>

                        <Button type="submit" className="w-full bg-hope-orange hover:bg-hope-dark-orange text-white">
                          Change Password
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
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
                        <TableHead>Description</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {donationRequests?.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>{request.id}</TableCell>
                          <TableCell>{request.charityName}</TableCell>
                          <TableCell>{request.description ? request.description : <p className='text-gray-400 text-lg font-bold text-center'>-</p>}</TableCell>
                          <TableCell>{request.type}</TableCell>
                          <TableCell className='text-center'>{request.amount ? request.amount : <p className='text-gray-400 text-lg font-bold text-center'>-</p>}</TableCell>
                          <TableCell>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                              {request.status}
                            </span>
                          </TableCell>
                          <TableCell>{request.createdAt}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" onClick={() => { setSelectedDonation(request); setSelectedHelpRequest(null); handleOpenDialog(true); }}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              {request.status === 'Pending' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleCancelRequest(request.id, "donate")}
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
                      {useHelpRequests?.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>{request.id}</TableCell>
                          <TableCell>{request.charityName}</TableCell>
                          <TableCell>{request.description}</TableCell>
                          <TableCell>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                              {request.status}
                            </span>
                          </TableCell>
                          <TableCell>{request.createdAt}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" onClick={() => { setSelectedHelpRequest(request); setSelectedDonation(null); handleOpenDialog(true); }}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              {request.status === 'Pending' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleCancelRequest(request.id, "help")}
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
      {/* View Dialog for Charity/User/Report details */}
      <Dialog open={viewDialogOpen} onOpenChange={handleOpenDialog} >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedDonation ? 'Donation Details' : 'Help Request Details'}
            </DialogTitle>
            <DialogDescription>
              {selectedDonation ? 'View donation information and verification status' : 'View help request information and verification status'}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {selectedDonation && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Donation Information</h3>
                  <div className="mt-2 space-y-2">
                    <p><strong>ID:</strong> {selectedDonation.id}</p>
                    <p><strong>Charity Name:</strong> {selectedDonation.charityName}</p>
                    <p><strong>Email:</strong> {selectedDonation.charityName}</p>
                    <p><strong>Description:</strong> {selectedDonation.description}</p>
                    <p><strong>Type:</strong> {selectedDonation.type}</p>
                    <p><strong>Amount:</strong> {selectedDonation.amount}</p>
                    <p><strong>Status:</strong> {selectedDonation.status}</p>
                    <p><strong>Registration Date:</strong>
                      {new Date(selectedDonation.createdAt).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false, })}
                    </p>
                    <p><strong>Donation Verified:</strong> {selectedDonation.status === "Approved" ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>
            )}

            {selectedHelpRequest && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Help request Information</h3>
                  <div className="mt-2 space-y-2">
                    <p><strong>ID:</strong> {selectedHelpRequest.id}</p>
                    <p><strong>Charity Name:</strong> {selectedHelpRequest.charityName}</p>
                    <p><strong>Description:</strong> {selectedHelpRequest.description}</p>
                    <p><strong>Address:</strong> {selectedHelpRequest.address}</p>
                    <p><strong>Status:</strong> {selectedHelpRequest.status}</p>
                    <p><strong>Registration Date:</strong>
                      {new Date(selectedHelpRequest.createdAt).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false, })}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setViewDialogOpen(false); }}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout >
  );
};

export default UserDashboard;
