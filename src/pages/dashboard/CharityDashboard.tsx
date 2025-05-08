
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
import { Eye, Edit, Trash, Plus, Check, X, MapPin } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";

const CharityDashboard = () => {
  const [profileData, setProfileData] = useState({
    name: 'Red Cross Local Chapter',
    email: 'info@redcross-local.org',
    phone: '+1 (123) 456-7890',
    address: '123 Charity St, Anytown, CA 94103',
    description: 'We provide emergency assistance, disaster relief, and education in our local community.',
    profileImage: 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&q=80&w=256&h=256',
    socialLinks: {
      website: 'https://example.org',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com'
    }
  });

  // Sample data for branches
  const [branches, setBranches] = useState([
    { id: 1, name: 'Downtown Office', address: '123 Main St, Anytown', phone: '+1 (123) 456-7890', workHours: '9 AM - 5 PM' },
    { id: 2, name: 'West Side Branch', address: '456 West Ave, Anytown', phone: '+1 (123) 123-4567', workHours: '8 AM - 4 PM' },
  ]);

  // Sample data for donation requests
  const donationRequests = [
    { id: 'DR123', donor: 'John Doe', type: 'Clothes', status: 'Pending', date: '2023-05-12' },
    { id: 'DR124', donor: 'Jane Smith', type: 'Food Items', status: 'Approved', date: '2023-05-10' },
    { id: 'DR125', donor: 'Bob Johnson', type: 'Furniture', status: 'Declined', date: '2023-05-08' },
    { id: 'DR126', donor: 'Sarah Williams', type: 'Money', status: 'Completed', date: '2023-05-05', amount: '$250' },
  ];

  // Sample data for help requests
  const helpRequests = [
    { id: 'HR123', requester: 'Mary Taylor', description: 'Medical assistance needed', status: 'Pending', date: '2023-05-12' },
    { id: 'HR124', requester: 'Steve Brown', description: 'Food supply for family of 4', status: 'Approved', date: '2023-05-10' },
    { id: 'HR125', requester: 'Laura Wilson', description: 'Temporary shelter needed', status: 'Declined', date: '2023-05-08' },
  ];

  // Sample data for posts
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      content: 'We just completed our annual food drive! Thanks to all who contributed - we collected over 1000 pounds of food for local families.', 
      date: '2023-05-10',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=500'
    },
    { 
      id: 2, 
      content: 'Our volunteers spent the weekend rebuilding homes affected by the recent floods. Proud of our team!', 
      date: '2023-05-05',
      image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&q=80&w=500'
    }
  ]);

  const [newPost, setNewPost] = useState({
    content: '',
    image: null
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to update profile
    alert('Profile updated successfully!');
  };

  const handleAddBranch = () => {
    // Logic to add a branch
    const newBranch = {
      id: branches.length + 1,
      name: 'New Branch',
      address: 'Address',
      phone: 'Phone',
      workHours: 'Work Hours'
    };
    setBranches([...branches, newBranch]);
  };

  const handleDeleteBranch = (id: number) => {
    // Logic to delete branch
    setBranches(branches.filter(branch => branch.id !== id));
  };

  const handleDonationAction = (id: string, action: 'approve' | 'decline') => {
    // Logic to approve or decline donation request
    alert(`Donation request ${id} ${action === 'approve' ? 'approved' : 'declined'} successfully!`);
  };

  const handleHelpRequestAction = (id: string, action: 'approve' | 'decline') => {
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
        image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=500'
      };
      setPosts([post, ...posts]);
      setNewPost({ content: '', image: null });
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
            <TabsList className="mb-8 bg-white">
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
                        src={profileData.profileImage} 
                        alt="Charity Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button className="bg-hope-orange hover:bg-hope-dark-orange w-full">
                      Change Logo
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
                          value={profileData.name}
                          onChange={e => setProfileData({...profileData, name: e.target.value})}
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
                        <label htmlFor="address" className="block mb-1 text-sm font-medium">Main Address</label>
                        <textarea 
                          id="address" 
                          rows={2}
                          value={profileData.address}
                          onChange={e => setProfileData({...profileData, address: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                        ></textarea>
                      </div>
                      
                      <div>
                        <label htmlFor="description" className="block mb-1 text-sm font-medium">Description</label>
                        <textarea 
                          id="description" 
                          rows={4}
                          value={profileData.description}
                          onChange={e => setProfileData({...profileData, description: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                        ></textarea>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="website" className="block mb-1 text-sm font-medium">Website</label>
                          <input 
                            id="website" 
                            type="url" 
                            value={profileData.socialLinks.website}
                            onChange={e => setProfileData({
                              ...profileData, 
                              socialLinks: {...profileData.socialLinks, website: e.target.value}
                            })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                          />
                        </div>
                        <div>
                          <label htmlFor="facebook" className="block mb-1 text-sm font-medium">Facebook</label>
                          <input 
                            id="facebook" 
                            type="url" 
                            value={profileData.socialLinks.facebook}
                            onChange={e => setProfileData({
                              ...profileData, 
                              socialLinks: {...profileData.socialLinks, facebook: e.target.value}
                            })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                          />
                        </div>
                        <div>
                          <label htmlFor="twitter" className="block mb-1 text-sm font-medium">Twitter</label>
                          <input 
                            id="twitter" 
                            type="url" 
                            value={profileData.socialLinks.twitter}
                            onChange={e => setProfileData({
                              ...profileData, 
                              socialLinks: {...profileData.socialLinks, twitter: e.target.value}
                            })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                          />
                        </div>
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
                    {branches.map((branch) => (
                      <Card key={branch.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle>{branch.name}</CardTitle>
                            <div className="flex gap-2">
                              <Button variant="outline" size="icon" className="h-7 w-7">
                                <Edit className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleDeleteBranch(branch.id)}>
                                <Trash className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-hope-orange mt-0.5" />
                              <span>{branch.address}</span>
                            </div>
                            <div>
                              <strong className="text-sm">Phone:</strong> {branch.phone}
                            </div>
                            <div>
                              <strong className="text-sm">Working Hours:</strong> {branch.workHours}
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
                      {donationRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>{request.id}</TableCell>
                          <TableCell>{request.donor}</TableCell>
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
                          <TableCell>{request.requester}</TableCell>
                          <TableCell className="max-w-xs truncate">{request.description}</TableCell>
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
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
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
                
                {posts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img 
                              src={profileData.profileImage} 
                              alt={profileData.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-semibold">{profileData.name}</div>
                            <div className="text-xs text-gray-500">{post.date}</div>
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
                      {post.image && (
                        <div className="rounded-lg overflow-hidden">
                          <img 
                            src={post.image}
                            alt="Post attachment"
                            className="w-full h-auto"
                          />
                        </div>
                      )}
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
