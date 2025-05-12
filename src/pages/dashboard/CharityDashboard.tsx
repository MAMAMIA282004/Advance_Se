
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
import { Eye, Edit, Trash, Plus, Check, X, MapPin } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { ICharityBranch, ICharityDonation, ICharityHelpRequest, ICharityPost, ICharityProfile, ICharityProfileBranches, IUserData, IUserDonation, IUserHelpRequest } from '@/interfaces/interfaces';
import { GetCharityBranches } from '@/Api/branches/branches';
import { GetUserProfileData } from '@/Api/user/user';
import { GetUserData } from '@/lib/utils';
import { GetCharityDonationRequests } from '@/Api/donations/donations';
import { GetCharityHelpRequests } from '@/Api/helpRequest/helpRequests';
import { GetCharityPosts } from '@/Api/posts/posts';

const CharityDashboard = () => {

  const [profileData, setProfileData] = useState<IUserData>();
  const [branches, setBranches] = useState<ICharityProfileBranches[]>();
  const [donationRequests, setDonationRequests] = useState<ICharityDonation[]>([]);
  const [helpRequests, setHelpRequests] = useState<ICharityHelpRequest[]>([]);

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
    fetchDonationRequests();
    fetchHelpRequests();
  }, []);

  const [posts, setPosts] = useState<ICharityPost[]>();
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

  const [newPost, setNewPost] = useState({
    content: '',
    images: null
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to update profile
    alert('Profile updated successfully!');
  };

  const handleAddBranch = () => {

  };

  const handleDeleteBranch = (DelBranch: ICharityBranch) => {
    // Logic to delete branch
    setBranches(branches.filter(branch => branch !== DelBranch));
  };

  const handleDonationAction = (id: number, action: 'approve' | 'decline') => {
    // Logic to approve or decline donation request
    alert(`Donation request ${id} ${action === 'approve' ? 'approved' : 'declined'} successfully!`);
  };

  const handleHelpRequestAction = (id: number, action: 'approve' | 'decline') => {
    // Logic to approve or decline help request
    alert(`Help request ${id} ${action === 'approve' ? 'approved' : 'declined'} successfully!`);
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to add a new post
    if (newPost.content.trim()) {
      const post = {
        id: posts.length + 1,
        content: newPost.content,
        date: new Date().toISOString().split('T')[0],
        images: ['https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=500']
      };
      setNewPost({ content: '', images: null });
    }
  };

  const handleDeletePost = (id: number) => {
    // Logic to delete post
    setPosts(posts.filter(post => post.id !== id));
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

  return (
    <MainLayout>
      <div className="bg-hope-gray py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-hope-dark-gray mb-6">Charity Dashboard</h1>

          <Tabs defaultValue="profile">
            <TabsList className="mb-8 bg-white flex justify-around">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="branches">Branches</TabsTrigger>
              <TabsTrigger value="donations">Donation Requests</TabsTrigger>
              <TabsTrigger value="help">Help Requests</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Charity Logo</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="w-48 h-48 rounded-full overflow-hidden mb-6">
                      <img
                        src={profileData?.profilePhotoUrl ? `https://ma3ansawa.runasp.net/${profileData.wallpaperPhotoUrl}` : `https://ui-avatars.com/api/?name=${profileData?.userName}`}
                        alt="Charity Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button className="bg-hope-orange hover:bg-hope-dark-orange w-full">
                      Change Logo
                    </Button>
                  </CardContent>
                  <CardHeader>
                    <CardTitle>Charity Wallpaper</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-48 rounded-lg mb-6">
                      <img
                        src={profileData?.wallpaperPhotoUrl ? `https://ma3ansawa.runasp.net/${profileData.wallpaperPhotoUrl}` : `https://ui-avatars.com/api/?name=${profileData?.userName}`}
                        alt="Charity Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button className="bg-hope-orange hover:bg-hope-dark-orange w-full">
                      Change Wallpaper
                    </Button>
                  </CardContent>
                </Card>

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
                          value={profileData?.userName}
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
                          onChange={e => setProfileData({ ...profileData, email: e.target.value })}
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

                      <div className='w-full justify-end flex'>
                        <Button variant='outline' className="hover:bg-hope-orange hover:text-white border-hope-orange bg-white border-2 text-black gap-1">
                          Change Password
                        </Button>
                      </div>

                      <div className='w-full border-t border-gray-300 pt-5 flex justify-center'>
                        <Button type="submit" className="px-20 bg-hope-orange hover:bg-hope-dark-orange">
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
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
                  <Button onClick={handleAddBranch} className="bg-hope-orange hover:bg-hope-dark-orange flex items-center gap-1">
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
                              <Button variant="outline" size="icon" className="h-7 w-7">
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
                              <MapPin className="h-4 w-4 text-hope-orange mt-0.5" />
                              <span>{branch?.address}</span>
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
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {request.status === 'Pending' && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDonationAction(request.id, 'approve')}
                                    className="text-green-500 hover:text-green-700"
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDonationAction(request.id, 'decline')}
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
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {request.status === 'Pending' && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleHelpRequestAction(request.id, 'approve')}
                                    className="text-green-500 hover:text-green-700"
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleHelpRequestAction(request.id, 'decline')}
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
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      className="min-h-32"
                    />
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                      >
                        Add Photo
                      </Button>
                      <Button
                        type="submit"
                        className="bg-hope-orange hover:bg-hope-dark-orange"
                        disabled={!newPost.content.trim()}
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
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-semibold">{profileData?.userName}</div>
                            <div className="text-xs text-gray-500">{post.createAt}</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
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
                      {post.photos.length === 3 ?
                        <div className="slide-container">
                          <Slide slidesToShow={2}>
                            {post.photos.map((url, index) => (
                              <div key={index} className='w-full flex justify-center h-full'>
                                <img draggable={false} src={`https://ma3ansawa.runasp.net${url.imgName}`} alt="" className='object-cover' />
                              </div>
                            ))}
                          </Slide>
                        </div>
                        :
                        <>
                          <img
                            src={`https://ma3ansawa.runasp.net${post.photos[0].imgName}`}
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
    </MainLayout>
  );
};

export default CharityDashboard;
