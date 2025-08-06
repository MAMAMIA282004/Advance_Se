import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import MainLayout from '@/components/layout/MainLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Edit, Trash, Plus, Check, X, FileIcon } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { IChangePasswordForm, ICharityBranch, ICharityDonation, ICharityHelpRequest, ICharityPost, ICharityProfile, ICharityProfileBranches, IUserData, IUserDonation, IUserHelpRequest } from '@/interfaces/interfaces';
import { CreateBranch, DeleteBranch, EditBranch, GetCharityBranches } from '@/Api/branches/branches';
import { GetUserProfileData, UpdateUserPassword, UpdateUserProfile } from '@/Api/user/user';
import { GetUserData } from '@/lib/utils';
import { ChangeDonationStatus, GetCharityDonationRequests } from '@/Api/donations/donations';
import { ChangeHelpRequestStatus, GetCharityHelpRequests } from '@/Api/helpRequest/helpRequests';
import { AddPost, DeletePost, EditPost, GetCharityPosts } from '@/Api/posts/posts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { branchSchema, passwordChangeSchema } from '@/lib/validations';
import { toast } from 'sonner';

const CharityDashboard = () => {

  const [profileData, setProfileData] = useState<IUserData>();
  const [branches, setBranches] = useState<ICharityProfileBranches[]>();
  const [donationRequests, setDonationRequests] = useState<ICharityDonation[]>([]);
  const [helpRequests, setHelpRequests] = useState<ICharityHelpRequest[]>([]);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(profileData?.profilePhotoUrl ? new File([], profileData?.profilePhotoUrl) : null);
  const [wallpaperPhoto, setWallpaperPhoto] = useState<File | null>(profileData?.wallpaperPhotoUrl ? new File([], profileData?.wallpaperPhotoUrl) : null);
  const [posts, setPosts] = useState<ICharityPost[]>();
  const [selectedBranch, setSelectedBranch] = useState<ICharityProfileBranches | null>(null);
  const [selectedDonation, setSelectedDonation] = useState<ICharityDonation>();
  const [selectedHelpRequest, setSelectedHelpRequest] = useState<ICharityHelpRequest>();
  const [branchDialogOpen, setBranchDialogOpen] = useState(false);
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [isEditingBranch, setIsEditingBranch] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ICharityPost>();
  const [postDialog, setPostDialog] = useState(false);
  const [postImages, setPostImages] = useState<File[]>();

  const { register: registerBranch, handleSubmit: handleBranchSubmit, formState: { errors: branchErrors }, reset: resetBranch } = useForm({
    resolver: yupResolver(branchSchema),
    values: selectedBranch ? { address: selectedBranch.address, description: selectedBranch.description, phoneNumber: selectedBranch.phoneNumber } : null
  });

  const { register: registerPassword, handleSubmit: handlePasswordSubmit, formState: { errors: passwordErrors }, reset: resetPassword } = useForm({
    resolver: yupResolver(passwordChangeSchema)
  });

  //#region fetching data
  const fetchProfileData = async () => {
    try {
      const response = await GetUserProfileData();
      if (!response) {
        throw new Error('Failed to fetch profile data');
      }
      setProfileData(response);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };
  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await GetCharityBranches(GetUserData()?.userName);
      if (!response) {
        throw new Error('Failed to fetch branches');
      }
      setBranches(response);
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };
  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchDonationRequests = async () => {
    try {
      const response = await GetCharityDonationRequests();
      if (!response) {
        throw new Error('Failed to fetch branches');
      }
      setDonationRequests(response);
    } catch (error) {
      console.error('Error fetching donation requests:', error);
    }
  };
  useEffect(() => {
    fetchDonationRequests();
  }, []);

  const fetchHelpRequests = async () => {
    try {
      const response = await GetCharityHelpRequests();
      if (!response) {
        throw new Error('Failed to fetch branches');
      }
      setHelpRequests(response);
    } catch (error) {
      console.error('Error fetching help requests:', error);
    }
  };
  useEffect(() => {
    fetchHelpRequests();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await GetCharityPosts(GetUserData()?.userName);
      if (!response) {
        throw new Error('Failed to fetch branches');
      }
      setPosts(response);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  //#endregion

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

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePhoto(e.target.files[0]);
    }
  };

  const handleWallpaperPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setWallpaperPhoto(e.target.files[0]);
    }
  };

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
    if (wallpaperPhoto) {
      formData.append('WallpaperPhoto', wallpaperPhoto);
    }
    try {
      const response = await UpdateUserProfile(formData);
      if (response.status === 200) {
        alert('Profile updated successfully!');
        fetchProfileData();
      } else {
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile.');
    }
  };

  const handleDeleteBranch = async (DelBranch: ICharityBranch) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the branch at ${DelBranch.address}?`);
    if (!confirmDelete) return;

    try {
      const res = await DeleteBranch(DelBranch.id);
      if (res.status === 200) {
        alert("Branch deleted successfully!");
        fetchBranches();
      } else {
        alert("Failed to delete branch. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting branch:", error);
      alert("An error occurred while deleting the branch.");
    }
  };

  const handleDonationAction = async (id: number, action: 'Approved' | 'Cancelled') => {
    const confirm = window.confirm(`Are you sure you want to ${action === "Approved" ? "approve" : "cancel"} this donation?`);
    if (!confirm) return;
    try {
      const response = await ChangeDonationStatus(id, action);
      if (response.status !== 200) {
        throw new Error('Failed to fetch donation requests');
      }
      fetchDonationRequests();
      alert(`Donation ${action === "Approved" ? "approved" : "cancelled"} successfully!`);
    } catch (error) {
      console.error(`Error ${action === "Approved" ? "approving" : "cancelling"} donation:`, error);
      alert(`An error occurred while ${action === "Approved" ? "approving" : "cancelling"} the donation.`);
    }
  };

  const handleHelpRequestAction = async (id: number, action: 'Approved' | 'Cancelled') => {
    const confirm = window.confirm(`Are you sure you want to ${action === "Approved" ? "approve" : "cancel"} this help request?`);
    if (!confirm) return;
    try {
      const response = await ChangeHelpRequestStatus(id, action);
      if (response.status !== 200) {
        throw new Error('Failed to fetch help requests');
      }
      fetchHelpRequests();
      alert(`Help request ${action === "Approved" ? "approved" : "cancelled"} successfully!`);
    } catch (error) {
      console.error(`Error ${action === "Approved" ? "approving" : "cancelling"} help request:`, error);
      alert(`An error occurred while ${action === "Approved" ? "approving" : "cancelling"} the help request.`);
    }
  };

  const handleBranchDialogOpen = (branch?: ICharityProfileBranches) => {
    if (branch) {
      setIsEditingBranch(true);
      setSelectedBranch(branch);
    } else {
      setIsEditingBranch(false);
      setSelectedBranch({ address: "", phoneNumber: "", description: "", id: 0 });
    }
    setBranchDialogOpen(true);
  };

  const handleBranchDialogClose = () => {
    setBranchDialogOpen(false);
    setSelectedBranch({ address: "", phoneNumber: "", description: "", id: 0 });
  };

  const handleDetailsDialogOpen = (details: ICharityDonation | ICharityHelpRequest, type: "donation" | "helpRequest") => {
    if (type === 'donation') {
      setSelectedHelpRequest(null);
      setSelectedDonation(details as ICharityDonation);
    } else {
      setSelectedHelpRequest(details as ICharityHelpRequest);
      setSelectedDonation(null);
    }
    setDetailsDialog(true);
  };

  const handleDetailsDialogClose = () => {
    setDetailsDialog(false);
    setSelectedHelpRequest(null);
    setSelectedDonation(null);
  };

  const handleBranchFormSubmit = async (data) => {
    const formData = new FormData();
    formData.append('Address', data.address);
    formData.append('PhoneNumber', data.phoneNumber);
    formData.append('Description', data.description);
    formData.append(`${isEditingBranch ? "NewPhotos" : "Photos"}`, new File([], "placeholder.txt"));

    try {
      if (isEditingBranch) {
        const response = await EditBranch(selectedBranch?.id, formData);
        if (response.status === 200) {
          toast.success("Branch updated successfully!");
          fetchBranches();
          handleBranchDialogClose();
        }
      } else {
        const response = await CreateBranch(formData);
        if (response.status === 200) {
          toast.success("Branch created successfully!");
          fetchBranches();
          handleBranchDialogClose();
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred while processing your request.';
      toast.error(errorMessage);
    }
  };

  const handlePostDialogOpen = (post: ICharityPost) => {
    setSelectedPost(post);
    setPostDialog(true);
  };

  const handlePostDialogClose = () => {
    setPostDialog(false);
    setSelectedPost(null);
  };

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("Content", selectedPost?.content || "");
      postImages?.forEach((image) => {
        data.append("Photos", image);
      });

      const res = await AddPost(data);
      if (res.status === 200) {
        alert("Post added successfully!");
        fetchPosts();
        setSelectedPost(null);
        setPostImages([]);
      } else {
        alert("Failed to add post. Please try again.");
      }
    } catch (error) {
      console.error("Error adding post:", error);
      alert("An error occurred while adding the post.");
    }
  };

  const handleDeletePost = async (id: number) => {
    const conf = confirm(`Are you sure you want to delete this post?`);
    if (!conf) return;
    try {
      const res = await DeletePost(id);
      if (res.status === 200) {
        alert("Post deleted successfully!");
        fetchPosts();
      } else {
        alert("Failed to delete post. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("An error occurred while deleting the post.");
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'declined': return 'text-red-600 bg-red-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <MainLayout>
      <div className="enhanced-dashboard-container">
        {/* Enhanced Dashboard Header */}
        <div className="enhanced-dashboard-header">
          <div className="container mx-auto px-4">
            <h1 className="enhanced-dashboard-title">Charity Dashboard</h1>
            <p className="enhanced-dashboard-subtitle">Manage your charity profile, branches, donations, and help requests</p>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* Enhanced Dashboard Stats */}
          <div className="enhanced-dashboard-stat-grid">
            <div className="enhanced-dashboard-stat-card">
              <span className="enhanced-dashboard-stat-number">{branches?.length || 0}</span>
              <span className="enhanced-dashboard-stat-label">Active Branches</span>
            </div>
            <div className="enhanced-dashboard-stat-card">
              <span className="enhanced-dashboard-stat-number">{donationRequests.length}</span>
              <span className="enhanced-dashboard-stat-label">Donation Requests</span>
            </div>
            <div className="enhanced-dashboard-stat-card">
              <span className="enhanced-dashboard-stat-number">{helpRequests.length}</span>
              <span className="enhanced-dashboard-stat-label">Help Requests</span>
            </div>
            <div className="enhanced-dashboard-stat-card">
              <span className="enhanced-dashboard-stat-number">{posts?.length || 0}</span>
              <span className="enhanced-dashboard-stat-label">Published Posts</span>
            </div>
          </div>

          <div className="enhanced-dashboard-tabs">
            <Tabs defaultValue="profile">
              <TabsList className="enhanced-dashboard-tabs-list">
                <TabsTrigger className="enhanced-dashboard-tab-trigger" value="profile">Profile</TabsTrigger>
                <TabsTrigger className="enhanced-dashboard-tab-trigger" value="branches">Branches</TabsTrigger>
                <TabsTrigger className="enhanced-dashboard-tab-trigger" value="donations">Donations</TabsTrigger>
                <TabsTrigger className="enhanced-dashboard-tab-trigger" value="help">Help Requests</TabsTrigger>
                <TabsTrigger className="enhanced-dashboard-tab-trigger" value="posts">Posts</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="enhanced-dashboard-tab-content">
                <div className="grid md:grid-cols-3 gap-8">
                  <Card className="md:col-span-1">
                    <CardHeader>
                      <CardTitle>Charity Logo</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                      <div className="w-48 h-48 rounded-full overflow-hidden mb-6">
                        <img
                          src={profilePhoto ? URL.createObjectURL(profilePhoto) : profileData?.profilePhotoUrl ? `https://ma3ansawa.runasp.net/${profileData.profilePhotoUrl}` : `https://ui-avatars.com/api/?name=${profileData?.userName}`}
                          alt="Charity Logo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePhotoChange}
                        className="text-xs w-full text-gray-500 file:mr-2 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-hope-orange file:text-white hover:file:bg-hope-dark-orange"
                      />
                    </CardContent>
                    <CardHeader>
                      <CardTitle>Charity Wallpaper</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="w-full h-48 rounded-lg mb-6">
                        <img
                          src={wallpaperPhoto ? URL.createObjectURL(wallpaperPhoto) : profileData?.wallpaperPhotoUrl ? `https://ma3ansawa.runasp.net/${profileData.wallpaperPhotoUrl}` : `https://ui-avatars.com/api/?name=${profileData?.userName}`}
                          alt="Charity Logo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleWallpaperPhotoChange}
                        className="text-xs w-full text-gray-500 file:mr-2 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-hope-orange file:text-white hover:file:bg-hope-dark-orange"
                      />
                    </CardContent>
                  </Card>

                  <div className='w-full md:col-span-2 space-y-10'>
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle>Charity Information</CardTitle>
                        <CardDescription>Update your charity's details</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleProfileUpdate} className="space-y-5">
                          <div>
                            <label htmlFor="name" className="block mb-1 text-sm font-medium">Charity Name</label>
                            <input
                              id="name"
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
                            <label htmlFor="address" className="block mb-1 text-sm font-medium">Main Address</label>
                            <textarea
                              id="address"
                              rows={2}
                              value={profileData?.address}
                              onChange={e => setProfileData({ ...profileData, address: e.target.value })}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                            ></textarea>
                          </div>

                          <div>
                            <label htmlFor="description" className="block mb-1 text-sm font-medium">Description</label>
                            <textarea
                              id="description"
                              rows={4}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                            ></textarea>
                          </div>

                          <div className='w-full border-t border-gray-300 pt-5 flex justify-center'>
                            <Button type="submit" className="px-20 bg-hope-orange hover:bg-hope-dark-orange">
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

              {/* Branches Tab */}
              <TabsContent value="branches">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Charity Branches</CardTitle>
                      <CardDescription>Manage your charity's locations</CardDescription>
                    </div>
                    <Button onClick={() => handleBranchDialogOpen()} className="bg-hope-orange hover:bg-hope-dark-orange flex items-center gap-1">
                      <Plus className="h-4 w-4" /> Add Branch
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {branches?.map((branch, idx) => (
                        <Card key={idx}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <CardTitle>{branch?.address}</CardTitle>
                              <div className="flex gap-2">
                                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => { handleBranchDialogOpen(branch) }}>
                                  <Edit className="h-3.5 w-3.5" />
                                </Button>
                                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleDeleteBranch(branch)}>
                                  <Trash className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-start gap-2">
                                <span>{branch?.description}</span>
                              </div>
                              <div>
                                <strong className="text-sm">Phone:</strong> {branch?.phoneNumber}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Donation Requests Tab */}
              <TabsContent value="donations">
                <Card>
                  <CardHeader>
                    <CardTitle>Donation Requests</CardTitle>
                    <CardDescription>Manage incoming donation requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Donor</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {donationRequests?.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell>{request.id}</TableCell>
                            <TableCell>{request.userName}</TableCell>
                            <TableCell>{request.type}</TableCell>
                            <TableCell>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                {request.status}
                              </span>
                            </TableCell>
                            <TableCell>{request.createdAt}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" onClick={() => handleDetailsDialogOpen(request, 'donation')}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                {request.status === 'Pending' && (
                                  <>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleDonationAction(request.id, 'Approved')}
                                      className="text-green-500 hover:text-green-700"
                                    >
                                      <Check className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleDonationAction(request.id, 'Cancelled')}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </>
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

              {/* Help Requests Tab */}
              <TabsContent value="help">
                <Card>
                  <CardHeader>
                    <CardTitle>Help Requests</CardTitle>
                    <CardDescription>Manage assistance requests from individuals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Requester</TableHead>
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
                            <TableCell>{request.userName}</TableCell>
                            <TableCell className="max-w-xs truncate">{request.description}</TableCell>
                            <TableCell>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                {request.status}
                              </span>
                            </TableCell>
                            <TableCell>{request.createdAt}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" onClick={() => handleDetailsDialogOpen(request, 'helpRequest')}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                {request.status === 'Pending' && (
                                  <>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleHelpRequestAction(request.id, 'Approved')}
                                      className="text-green-500 hover:text-green-700"
                                    >
                                      <Check className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleHelpRequestAction(request.id, 'Cancelled')}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </>
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

              {/* Posts Tab */}
              <TabsContent value="posts">
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Post</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddPost} className="space-y-4">
                      <Textarea
                        placeholder="What would you like to share with your supporters?"
                        value={selectedPost?.content || ""}
                        onChange={(e) => setSelectedPost({ ...selectedPost, content: e.target.value })}
                        className="min-h-32"
                      />
                      <div className="flex items-center gap-4">
                        <input
                          type="file"
                          multiple
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files) {
                              setPostImages(Array.from(files));
                            }
                          }}
                        />
                        <Button
                          type="submit"
                          className="bg-hope-orange hover:bg-hope-dark-orange"
                          disabled={!selectedPost?.content.trim()}
                          onClick={(e) => handleAddPost(e)}
                        >
                          Publish Post
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <div className="mt-8 space-y-6">
                  <h3 className="text-xl font-semibold">Your Posts</h3>

                  {posts?.map((post) => (
                    <Card key={post.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                              <img
                                src={`https://ma3ansawa.runasp.net${profileData?.profilePhotoUrl}`}
                                alt={profileData?.userName}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div>
                              <div className="font-semibold">{profileData?.userName}</div>
                              <div className="text-xs text-gray-500">{post.createAt}</div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handlePostDialogOpen(post)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500"
                              onClick={() => handleDeletePost(post.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">{post.content}</p>
                        {post.photos.length >= 2 ?
                          <div className="slide-container">
                            <Slide slidesToShow={1} infinite={false} canSwipe={false} autoplay={false}>
                              {post.photos.map((url, index) => (
                                <div key={index} className='w-full flex justify-center h-[20rem]'>
                                  <img draggable={false} src={`https://ma3ansawa.runasp.net${url.imgName}`} alt="" className='object-cover' />
                                </div>
                              ))}
                            </Slide>
                          </div>
                          :
                          <>
                            <img
                              src={`https://ma3ansawa.runasp.net${post.photos[0]?.imgName}`}
                              alt="Post attachment"
                              className='w-full max-h-[30rem] object-cover'
                            />
                          </>
                        }
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Dialog For Branches */}
      <Dialog open={branchDialogOpen} onOpenChange={setBranchDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditingBranch ? "Edit Branch" : "Add Branch"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleBranchSubmit(handleBranchFormSubmit)} className="space-y-4">
            <div>
              <label htmlFor="branchAddress" className="block text-sm font-medium">
                Address
              </label>
              <Input
                id="branchAddress"
                {...registerBranch('address')}
                className={branchErrors.address ? 'border-red-500' : ''}
              />
              {branchErrors.address && (
                <p className="text-red-500 text-sm mt-1">{branchErrors.address.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="branchPhone" className="block text-sm font-medium">
                Phone Number
              </label>
              <Input
                id="branchPhone"
                {...registerBranch('phoneNumber')}
                className={branchErrors.phoneNumber ? 'border-red-500' : ''}
              />
              {branchErrors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{branchErrors.phoneNumber.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="branchDescription" className="block text-sm font-medium">
                Description
              </label>
              <Input
                id="branchDescription"
                {...registerBranch('description')}
                className={branchErrors.description ? 'border-red-500' : ''}
              />
              {branchErrors.description && (
                <p className="text-red-500 text-sm mt-1">{branchErrors.description.message}</p>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleBranchDialogClose}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditingBranch ? "Save Changes" : "Add Branch"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog For Donation and help request */}
      <Dialog open={detailsDialog} onOpenChange={setDetailsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-center text-3xl'>Details</DialogTitle>
          </DialogHeader>
          {selectedDonation &&
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <p className="block text-base font-bold">
                  Donor Name:
                </p>
                <p>
                  {selectedDonation.userName}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="block text-base font-bold">
                  Type:
                </p>
                <p>
                  {selectedDonation.type}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="block text-base font-bold">
                  Status:
                </p>
                <p>
                  {selectedDonation.status}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="block text-base font-bold">
                  Created At:
                </p>
                <p>
                  {selectedDonation.createdAt}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="block text-base font-bold">
                  Description:
                </p>
                <p>
                  {selectedDonation.description}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="block text-base font-bold">
                  Amount:
                </p>
                <p>
                  {selectedDonation.amount}
                </p>
              </div>
              {selectedDonation?.photoUrls.length !== 0 &&
                <div className="space-y-1">
                  <p className="block text-base font-bold">
                    Photos:
                  </p>
                  {selectedDonation?.photoUrls.map((url, idx) => (
                    <Link to={`https://ma3ansawa.runasp.net/${url}`} target='_blank' key={idx} className='flex gap-1' >
                      <FileIcon />
                      View Photo
                    </Link>
                  ))}
                </div>
              }
            </div>
          }
          {selectedHelpRequest &&
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <p className="block text-base font-bold">
                  Donor Name:
                </p>
                <p>
                  {selectedHelpRequest.userName}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="block text-base font-bold">
                  Status:
                </p>
                <p>
                  {selectedHelpRequest.status}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="block text-base font-bold">
                  Created At:
                </p>
                <p>
                  {selectedHelpRequest.createdAt}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="block text-base font-bold">
                  Description:
                </p>
                <p>
                  {selectedHelpRequest.description}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="block text-base font-bold">
                  Address:
                </p>
                <p>
                  {selectedHelpRequest.address}
                </p>
              </div>
              {selectedHelpRequest?.photoUrls.length !== 0 &&
                <div className="space-y-1">
                  <p className="block text-base font-bold">
                    Photos:
                  </p>
                  {selectedHelpRequest?.photoUrls.map((url, idx) => (
                    <Link to={`https://ma3ansawa.runasp.net/${url}`} target='_blank' key={idx} className='flex gap-1' >
                      <FileIcon />
                      View Photo
                    </Link>
                  ))}
                </div>
              }
            </div>
          }
          <DialogFooter>
            <Button variant="outline" onClick={handleDetailsDialogClose}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for Adding/Editing Post */}
      <Dialog open={postDialog} onOpenChange={setPostDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="postContent" className="block text-sm font-medium">
                Post Content
              </label>
              <Textarea
                id="postContent"
                required
                value={selectedPost?.content || ""}
                onChange={(e) =>
                  setSelectedPost({ ...selectedPost, content: e.target.value })
                }
                placeholder="Write something..."
              />
            </div>
            <div>
              <label htmlFor="postPhotos" className="block text-sm font-medium">
                Add Photos
              </label>
              <Input
                id="postPhotos"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files) {
                    const photos = Array.from(files).map((file) => file);
                    setPostImages(photos);
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handlePostDialogClose}>
              Cancel
            </Button>
            <Button
              disabled={selectedPost?.content.length === 0}
              onClick={async () => {
                const confirm = window.confirm("Are you sure you want to save changes?");
                if (!confirm) return;
                const formData = new FormData();
                formData.append("Content", selectedPost?.content || "");
                postImages?.forEach((photo) => {
                  formData.append("NewPhotos", photo);
                });
                formData.append("DeleteOldPhotos", postImages.length !== 0 ? "true" : "false");
                try {
                  const res = await EditPost(formData, selectedPost?.id);
                  if (res.status === 200) {
                    alert("Post updated successfully!");
                    fetchPosts();
                  } else {
                    alert("Failed to update post. Please try again.");
                  }
                } catch (error) {
                  console.error("Error updating post:", error);
                  alert("An error occurred while updating the post.");
                }
                handlePostDialogClose();
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default CharityDashboard;
