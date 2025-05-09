
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import { Heart, Phone, Mail, MapPin, Send, DollarSign } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

// Mock charity data
const charityData = {
  id: 1,
  name: 'Red Cross Local Chapter',
  logo: 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&q=80&w=150&h=150',
  coverImage: '/cover.png',
  description: 'We provide emergency assistance, disaster relief, and education in our local community. Our mission is to prevent and alleviate human suffering in the face of emergencies by mobilizing the power of volunteers and the generosity of donors.',
  category: 'Disaster Relief',
  location: 'San Francisco, CA',
  contactInfo: {
    email: 'info@redcross-local.org',
    phone: '+1 (123) 456-7890',
  },
  branches: [
    {
      id: 1,
      name: 'Downtown Office',
      address: '123 Main St, San Francisco, CA 94105',
      phone: '+1 (123) 456-7890',
    },
    {
      id: 2,
      name: 'West Side Branch',
      address: '456 West Ave, San Francisco, CA 94116',
      phone: '+1 (123) 123-4567',
    },
  ],
  posts: [
    {
      id: 1,
      content: 'We just completed our annual food drive! Thanks to all who contributed - we collected over 1000 pounds of food for local families.',
      date: '2023-05-10',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=500',
      comments: [
        { id: 1, user: 'John Doe', content: 'Amazing work! So proud of our community.', date: '2023-05-10' },
        { id: 2, user: 'Sarah Williams', content: 'I was happy to contribute! Looking forward to the next drive.', date: '2023-05-11' }
      ]
    },
    {
      id: 2,
      content: 'Our volunteers spent the weekend rebuilding homes affected by the recent floods. Proud of our team!',
      date: '2023-05-05',
      image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&q=80&w=500',
      comments: [
        { id: 3, user: 'Michael Brown', content: 'Thank you for your service to the community!', date: '2023-05-05' }
      ]
    }
  ]
};

const CharityProfile = () => {
  const { id } = useParams();
  const [charity] = useState(charityData); // In a real app, you'd fetch this based on the ID
  const [newComment, setNewComment] = useState('');
  const [donationAmount, setDonationAmount] = useState<number | ''>('');
  const [isCommenting, setIsCommenting] = useState<Record<number, boolean>>({});

  // Donation form fields
  const [donationForm, setDonationForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    itemDescription: '',
    image: null
  });

  // Help request form fields
  const [helpForm, setHelpForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    forSelfOrOther: 'self',
    image: null
  });

  const handleNewComment = (postId: number) => {
    if (newComment.trim()) {
      // In a real app, you'd send this to an API
      alert(`Comment added: "${newComment}"`);
      setNewComment('');
      setIsCommenting({ ...isCommenting, [postId]: false });
    }
  };

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd process this donation
    alert('Donation request submitted successfully!');
  };

  const handleHelpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd process this help request
    alert('Help request submitted successfully!');
  };

  const handleMoneyDonation = () => {
    if (donationAmount) {
      // In a real app, redirect to payment gateway
      alert(`Redirecting to payment gateway for $${donationAmount} donation`);
    } else {
      alert('Please enter a donation amount');
    }
  };

  const toggleComment = (postId: number) => {
    setIsCommenting({ ...isCommenting, [postId]: !isCommenting[postId] });
  };

  return (
    <MainLayout>
      {/* Cover Image & Basic Info */}
      <div className="relative">
        <div className="h-64 md:h-80 w-full overflow-hidden">
          <img
            src={charity.coverImage}
            alt={`${charity.name} cover`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center relative -mt-44">
            <div className="rounded-xl p-4 md:p-6 flex flex-col items-center gap-4 md:gap-8">
              <div className="w-48 h-48 rounded-full overflow-hidden">
                <img
                  src={charity.logo}
                  alt={charity.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-hope-dark-gray">{charity.name}</h1>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="home">
          <div className="border-b">
            <TabsList className="bg-transparent justify-evenly h-auto mb-0 w-full">
              <TabsTrigger value="home" className="rounded-none border-b-2 border-transparent data-[state=active]:border-hope-orange data-[state=active]:bg-transparent">
                Home
              </TabsTrigger>
              <TabsTrigger value="donate" className="rounded-none border-b-2 border-transparent data-[state=active]:border-hope-orange data-[state=active]:bg-transparent">
                Donate
              </TabsTrigger>
              <TabsTrigger value="help" className="rounded-none border-b-2 border-transparent data-[state=active]:border-hope-orange data-[state=active]:bg-transparent">
                Request Help
              </TabsTrigger>
              <TabsTrigger value="contact" className="rounded-none border-b-2 border-transparent data-[state=active]:border-hope-orange data-[state=active]:bg-transparent">
                Contact
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Home Tab Content */}
          <TabsContent value="home">
            <div className="grid md:grid-cols-1 gap-8 mt-8">
              {/* Left Column - About */}
              <div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">About Us</h2>
                    <p className="text-gray-700">{charity.description}</p>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-hope-orange mt-0.5" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-gray-600">{charity.contactInfo.email}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-hope-orange mt-0.5" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-gray-600">{charity.contactInfo.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-hope-orange mt-0.5" />
                        <div>
                          <p className="font-medium">Address</p>
                          <p className="text-gray-600">{charity.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Posts */}
              <div>

                {charity.posts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                          <img
                            src={charity.logo}
                            alt={charity.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{charity.name}</p>
                          <p className="text-xs text-gray-500">{post.date}</p>
                        </div>
                      </div>

                      <p className="mb-4">{post.content}</p>

                      {post.image && (
                        <div className="rounded-lg overflow-hidden mb-4">
                          <img
                            src={post.image}
                            alt="Post attachment"
                            className="w-full h-auto"
                          />
                        </div>
                      )}

                      <div className="flex justify-between items-center mt-2">
                        <Button
                          variant="outline"
                          className="text-gray-600"
                          onClick={() => toggleComment(post.id)}
                        >
                          {post.comments.length > 0 ? `Comments (${post.comments.length})` : "Add Comment"}
                        </Button>

                        <Button
                          variant="outline"
                          className="text-red-500"
                        >
                          Report
                        </Button>
                      </div>

                      {/* Comment Section */}
                      {(post.comments.length > 0 || isCommenting[post.id]) && (
                        <div className="mt-4 pt-4 border-t">
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="flex mb-4">
                              <div className="w-8 h-8 rounded-full bg-gray-300 mr-3 flex-shrink-0"></div>
                              <div className="bg-gray-50 rounded-lg p-3 flex-grow">
                                <div className="flex justify-between">
                                  <p className="font-medium text-sm">{comment.user}</p>
                                  <p className="text-xs text-gray-500">{comment.date}</p>
                                </div>
                                <p className="mt-1 text-sm">{comment.content}</p>
                                <Button
                                  variant="ghost"
                                  className="text-red-500 h-auto p-0 text-xs hover:bg-transparent mt-1"
                                >
                                  Report
                                </Button>
                              </div>
                            </div>
                          ))}

                          {isCommenting[post.id] && (
                            <div className="flex mt-4">
                              <div className="w-8 h-8 rounded-full bg-gray-300 mr-3 flex-shrink-0"></div>
                              <div className="flex-grow">
                                <Textarea
                                  placeholder="Write a comment..."
                                  value={newComment}
                                  onChange={(e) => setNewComment(e.target.value)}
                                  className="min-h-[80px]"
                                />
                                <div className="flex justify-end mt-2 space-x-2">
                                  <Button
                                    variant="outline"
                                    onClick={() => setIsCommenting({ ...isCommenting, [post.id]: false })}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    className="bg-hope-orange hover:bg-hope-dark-orange"
                                    onClick={() => handleNewComment(post.id)}
                                    disabled={!newComment.trim()}
                                  >
                                    Post Comment
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}

                          {!isCommenting[post.id] && (
                            <Button
                              variant="ghost"
                              className="text-hope-orange mt-2"
                              onClick={() => toggleComment(post.id)}
                            >
                              Add Comment
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Donate Tab Content */}
          <TabsContent value="donate">
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {/* Money Donation */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="bg-hope-orange/10 p-3 rounded-full mr-4">
                      <DollarSign className="h-6 w-6 text-hope-orange" />
                    </div>
                    <h2 className="text-xl font-semibold">

                    </h2>
                  </div>

                  <p className="text-gray-600 mb-6">
                    Your financial contribution helps us continue our mission and make a difference in our community.
                  </p>

                  <div className="mb-6">
                    <label className="block mb-2 font-medium">Enter donation amount ($)</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="0.00"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[10, 25, 50, 100, 250, 500].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        onClick={() => setDonationAmount(amount)}
                        className={donationAmount === amount ? 'border-hope-orange text-hope-orange' : ''}
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>

                  <Button
                    className="w-full bg-hope-orange hover:bg-hope-dark-orange text-white"
                    onClick={handleMoneyDonation}
                    disabled={!donationAmount}
                  >
                    Continue to Payment
                  </Button>
                </div>
              </div>

              {/* Items Donation */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="bg-hope-orange/10 p-3 rounded-full mr-4">
                      <Heart className="h-6 w-6 text-hope-orange" />
                    </div>
                    <h2 className="text-xl font-semibold">Donate Items</h2>
                  </div>

                  <p className="text-gray-600 mb-6">
                    Donate clothes, food, electronics, or other items to help those in need.
                  </p>

                  <form onSubmit={handleDonationSubmit} className="space-y-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium">Full Name</label>
                      <input
                        type="text"
                        required
                        value={donationForm.name}
                        onChange={(e) => setDonationForm({ ...donationForm, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-medium">Email Address</label>
                      <input
                        type="email"
                        required
                        value={donationForm.email}
                        onChange={(e) => setDonationForm({ ...donationForm, email: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-medium">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={donationForm.phone}
                        onChange={(e) => setDonationForm({ ...donationForm, phone: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-medium">Address for Pickup</label>
                      <textarea
                        rows={2}
                        required
                        value={donationForm.address}
                        onChange={(e) => setDonationForm({ ...donationForm, address: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-medium">Description of Items</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Please describe what you would like to donate"
                        value={donationForm.itemDescription}
                        onChange={(e) => setDonationForm({ ...donationForm, itemDescription: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-medium">Upload Images (Optional)</label>
                      <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setDonationForm({ ...donationForm, image: e.target.files?.[0] || null })}
                          className="w-full mt-2"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-hope-orange hover:bg-hope-dark-orange text-white"
                    >
                      Submit Donation Request
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Help Request Tab Content */}
          <TabsContent value="help">
            <div className="max-w-2xl mx-auto mt-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-hope-orange/10 p-3 rounded-full mr-4">
                      <Send className="h-6 w-6 text-hope-orange" />
                    </div>
                    <h2 className="text-xl font-semibold">Request Assistance</h2>
                  </div>

                  <p className="text-gray-600 mb-8">
                    If you or someone you know needs assistance, please fill out this form. We'll review your request and get back to you as soon as possible.
                  </p>

                  <form onSubmit={handleHelpSubmit} className="space-y-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium">
                        {helpForm.forSelfOrOther === 'self' ? 'Your Full Name' : "Recipient's Full Name"}
                      </label>
                      <input
                        type="text"
                        required
                        value={helpForm.name}
                        onChange={(e) => setHelpForm({ ...helpForm, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1 text-sm font-medium">
                          {helpForm.forSelfOrOther === 'self' ? 'Your Email Address' : "Contact Email"}
                        </label>
                        <input
                          type="email"
                          required
                          value={helpForm.email}
                          onChange={(e) => setHelpForm({ ...helpForm, email: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm font-medium">
                          {helpForm.forSelfOrOther === 'self' ? 'Your Phone Number' : "Contact Phone"}
                        </label>
                        <input
                          type="tel"
                          required
                          value={helpForm.phone}
                          onChange={(e) => setHelpForm({ ...helpForm, phone: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-medium">Address</label>
                      <textarea
                        rows={2}
                        required
                        value={helpForm.address}
                        onChange={(e) => setHelpForm({ ...helpForm, address: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-medium">
                        Description of Assistance Needed
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Please describe what kind of help you need and why"
                        value={helpForm.description}
                        onChange={(e) => setHelpForm({ ...helpForm, description: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-medium">Upload Supporting Images (Optional)</label>
                      <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setHelpForm({ ...helpForm, image: e.target.files?.[0] || null })}
                          className="w-full mt-2"
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full bg-hope-orange hover:bg-hope-dark-orange text-white py-3"
                      >
                        Submit Help Request
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Contact Tab Content */}
          <TabsContent value="contact">
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Main Office</h2>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-hope-orange mt-0.5" />
                        <div>
                          <p className="font-medium">Address</p>
                          <p className="text-gray-600">123 Charity St, San Francisco, CA 94103</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-hope-orange mt-0.5" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-gray-600">{charity.contactInfo.email}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-hope-orange mt-0.5" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-gray-600">{charity.contactInfo.phone}</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Other Branches</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                      {charity.branches.map((branch) => (
                        <div key={branch.id} className="border rounded-lg p-4">
                          <h3 className="font-semibold mb-3">{branch.name}</h3>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-hope-orange mt-0.5" />
                              <span>{branch.address}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Phone className="h-4 w-4 text-hope-orange mt-0.5" />
                              <span>{branch.phone}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout >
  );
};

export default CharityProfile;
