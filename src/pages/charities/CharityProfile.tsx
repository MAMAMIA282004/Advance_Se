import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import { Heart, Phone, Mail, MapPin, Send, DollarSign, ChevronRight, ChevronLeft, EllipsisVertical, CheckCircle, Star, Users, Gift, HandHelping, Home, MessageCircle, Flag } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { GetCharityByUsername } from '@/Api/charities/charities';
import { ICharityBranch, ICharityPost, ICharityProfile } from '@/interfaces/interfaces';
import { CreateComment, DeleteComment, EditComment, GetCharityPosts } from '@/Api/posts/posts';
import { GetCharityBranches } from '@/Api/branches/branches';
import { Slide } from 'react-slideshow-image';
import { DonateWithItem, DonateWithMoney } from '@/Api/donations/donations';
import { RequestHelp } from '@/Api/helpRequest/helpRequests';
import { GetUserData } from '@/lib/utils';
import { CreateReport } from '@/Api/reports/reports';
import { toast } from 'sonner';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Form data interfaces
interface DonationFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  itemDescription: string;
}

interface HelpRequestFormData {
  phone: string;
  address: string;
  description: string;
}

interface CommentFormData {
  content: string;
}

// Validation schemas
const donationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required').matches(/^\d+$/, 'Phone number must contain numbers only'),
  address: yup.string().required('Address is required'),
  itemDescription: yup.string().required('Item description is required'),
});

const helpRequestSchema = yup.object({
  phone: yup.string().required('Phone number is required').matches(/^\d+$/, 'Phone number must contain numbers only'),
  address: yup.string().required('Address is required'),
  description: yup.string().required('Description is required'),
});

const commentSchema = yup.object({
  content: yup.string().required('Comment cannot be empty').min(1, 'Comment cannot be empty'),
});

const CharityProfile = () => {
  const userName = useLocation().pathname.split('/')[2];
  const userData = GetUserData();
  const isUser = userData?.roles[0] === 'user';
  const isAdmin = userData?.roles.includes('admin');
  const isCharity = userData?.roles[0] === 'charity';
  const [charity, setCharity] = useState<ICharityProfile | null>({
    charityName: "",
    address: "",
    profilePhotoURL: null,
    wallpaperPhotoUrl: null,
    description: "",
    email: "",
    userName: "",
    phone: "",
  });
  const [charityPosts, setCharityPosts] = useState<ICharityPost[] | null>(null);
  const [charityBranches, setCharityBranches] = useState<ICharityBranch[] | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<Record<number, boolean>>({});

  const { register: registerDonation, handleSubmit: handleDonationSubmit, formState: { errors: donationErrors }, reset: resetDonation } = useForm({
    resolver: yupResolver(donationSchema)
  });

  const { register: registerHelp, handleSubmit: handleHelpSubmit, formState: { errors: helpErrors }, reset: resetHelp } = useForm({
    resolver: yupResolver(helpRequestSchema)
  });

  const { register: registerComment, handleSubmit: handleCommentSubmit, formState: { errors: commentErrors }, reset: resetComment } = useForm({
    resolver: yupResolver(commentSchema)
  });

  const handleEditComment = async (commentId: number) => {
    const newContent = prompt("Edit your comment:");
    if (newContent && newContent.trim()) {
      try {
        const response = await EditComment(commentId, { content: newContent });
        if (response.status === 200) {
          alert("Comment updated successfully!");
        } else {
          alert("Failed to update the comment. Please try again.");
        }
      } catch (error) {
        console.error("Error updating comment:", error);
        alert("An error occurred while updating your comment. Please try again later.");
      }
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (confirmDelete) {
      try {
        const response = await DeleteComment(commentId);
        if (response.status === 200) {
          alert("Comment deleted successfully!");
        } else {
          alert("Failed to update the comment. Please try again.");
        }
        console.log(`Delete comment with ID: ${commentId}`);
      } catch (error) {
        console.error("Error deleting comment:", error);
        alert("Failed to delete the comment. Please try again.");
      }
    }
  };

  const [newComment, setNewComment] = useState('');
  const [donationAmount, setDonationAmount] = useState<number | ''>('');
  const [isCommenting, setIsCommenting] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchCharityData = async () => {
      try {
        const [charity, charityPosts, charityBranches] = await Promise.all([
          GetCharityByUsername(userName),
          GetCharityPosts(userName),
          GetCharityBranches(userName),
        ]);
        setCharity(charity);
        setCharityPosts(charityPosts);
        setCharityBranches(charityBranches);
      } catch (error) {
        console.error("Error fetching charity data:", error);
      }
    };

    fetchCharityData();
  }, [userName]);

  // Donation form fields
  const [donationForm, setDonationForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    itemDescription: '',
    image: []
  });

  // Help request form fields
  const [helpForm, setHelpForm] = useState({
    phone: '',
    address: '',
    description: '',
    image: []
  });

  const handleNewComment = async (postId: number, data: { content: string }) => {
    if (!isUser) {
      toast.error('Only regular users can comment on posts');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('PostId', postId.toString());
      formData.append('Content', data.content);
      const response = await CreateComment(formData);
      if (response.status === 200) {
        toast.success('Comment added successfully!');
        resetComment();
        setIsCommenting({ ...isCommenting, [postId]: false });
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to add comment. Please try again.');
    }
  };

  const onSubmitDonation = async (data: DonationFormData) => {
    if (!isUser) {
      toast.error('Only regular users can make donations');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('charityUserName', charity.userName);
      formData.append('description', data.itemDescription);
      formData.append('address', data.address);
      formData.append('phone', data.phone);
      donationForm.image.forEach((image: File) => {
        formData.append('photos', image);
      });

      const res = await DonateWithItem(formData);
      if (res.status === 200) {
        toast.success('Donation request submitted successfully!');
        resetDonation();
        setDonationForm({
          name: '',
          email: '',
          phone: '',
          address: '',
          itemDescription: '',
          image: []
        });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error &&
        error.response && typeof error.response === 'object' &&
        'data' in error.response &&
        error.response.data && typeof error.response.data === 'object' &&
        'message' in error.response.data
        ? (error.response.data as { message: string }).message
        : 'Failed to submit donation request. Please try again.';
      toast.error(errorMessage);
    }
  };

  const onSubmitHelp = async (data: HelpRequestFormData) => {
    if (!isUser) {
      toast.error('Only regular users can submit help requests');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('charityUserName', charity.userName);
      formData.append('description', data.description);
      formData.append('address', data.address);
      formData.append('phone', data.phone);
      helpForm.image.forEach((image: File) => {
        formData.append('photos', image);
      });

      const res = await RequestHelp(formData);
      if (res.status === 200) {
        toast.success('Help request submitted successfully!');
        resetHelp();
        setHelpForm({
          phone: '',
          description: '',
          address: '',
          image: []
        });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error &&
        error.response && typeof error.response === 'object' &&
        'data' in error.response &&
        error.response.data && typeof error.response.data === 'object' &&
        'message' in error.response.data
        ? (error.response.data as { message: string }).message
        : 'Failed to submit help request. Please try again.';
      toast.error(errorMessage);
    }
  };

  const handleMoneyDonation = async () => {
    if (!isUser) {
      toast.error('Only regular users can make monetary donations');
      return;
    }

    if (!donationAmount) {
      toast.error('Please enter a donation amount');
      return;
    }

    try {
      const res = await DonateWithMoney(charity.userName, donationAmount);
      if (res && res.url) {
        window.location.href = res.url;
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error &&
        error.response && typeof error.response === 'object' &&
        'data' in error.response &&
        error.response.data && typeof error.response.data === 'object' &&
        'message' in error.response.data
        ? (error.response.data as { message: string }).message
        : 'Failed to initiate payment. Please try again.';
      toast.error(errorMessage);
    }
  };

  const toggleComment = (postId: number) => {
    setIsCommenting({ ...isCommenting, [postId]: !isCommenting[postId] });
  };

  const handleReport = async (type: 'Post' | 'Comment', id: number) => {
    const confirmReport = window.confirm(`Are you sure you want to report this ${type}?`);
    if (confirmReport) {
      try {
        // Replace with your API call for reporting
        const response = await CreateReport({
          reason: "Sexual Content!",
          targetId: id,
          type: type
        });

        if (response.status === 200) {
          alert(`${type} reported successfully!`);
        } else {
          alert(`Failed to report the ${type}. Please try again.`);
        }
      } catch (error) {
        console.error(`Error reporting ${type}:`, error);
        alert(`An error occurred while reporting the ${type}. Please try again later.`);
      }
    }
  };

  return (
    <>
      <MainLayout>
        {/* Enhanced Cover Image & Basic Info */}
        {charity !== null && <div className="relative">
          <div className="h-80 md:h-96 w-full overflow-hidden relative">
            <img
              src={charity.wallpaperPhotoUrl ? `https://ma3ansawa.runasp.net${charity.wallpaperPhotoUrl}` : `https://ui-avatars.com/api/?name=${charity.charityName}`}
              alt={`${charity.charityName} cover`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

            {/* Trust Badge */}
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center">
              <CheckCircle className="w-5 h-5 text-hope-green-500 mr-2" />
              <span className="text-hope-green-700 font-semibold text-sm">Verified Charity</span>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center relative -mt-32 z-10">
              <div className="enhanced-profile-card text-center max-w-4xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="relative">
                    <img
                      src={charity.profilePhotoURL ? `https://ma3ansawa.runasp.net${charity.profilePhotoURL}` : `https://ui-avatars.com/api/?name=${charity.charityName}`}
                      alt={charity.charityName}
                      className="w-32 h-32 lg:w-48 lg:h-48 rounded-full object-cover border-6 border-white shadow-xl"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-hope-orange-500 text-white rounded-full p-2">
                      <Star className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="flex-grow text-center lg:text-left">
                    <h1 className="text-3xl lg:text-4xl font-bold text-hope-gray-900 mb-3">{charity.charityName}</h1>
                    <p className="text-hope-gray-600 text-lg mb-4 max-w-2xl">
                      {charity.description || "Making a positive impact in communities through dedicated charitable work and support programs."}
                    </p>

                    {/* Stats Row */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-hope-orange-600">4.9★</div>
                        <div className="text-sm text-hope-gray-600">Trust Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-hope-blue-600">1.2K</div>
                        <div className="text-sm text-hope-gray-600">Donors</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-hope-green-600">50K+</div>
                        <div className="text-sm text-hope-gray-600">Lives Helped</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-hope-purple-600">15</div>
                        <div className="text-sm text-hope-gray-600">Years Active</div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    {userData && userData?.userName !== userName && (
                      <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                        <Button className="btn-primary-professional">
                          <Heart className="w-5 h-5 mr-2" />
                          Donate Now
                        </Button>
                        <Button className="btn-secondary-professional">
                          <Users className="w-5 h-5 mr-2" />
                          Volunteer
                        </Button>
                        <Button className="btn-ghost-professional">
                          <Send className="w-5 h-5 mr-2" />
                          Contact
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}

        {/* Enhanced Tabs Section */}
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="home">
            {(userData && userData?.userName !== userName) && (
              <div className="mb-8">
                <TabsList className="enhanced-tabs-list inline-flex">
                  <TabsTrigger value="home" className="enhanced-tabs-trigger">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </TabsTrigger>
                  {isUser && (
                    <>
                      <TabsTrigger value="donate" className="enhanced-tabs-trigger">
                        <Gift className="w-4 h-4 mr-2" />
                        Donate
                      </TabsTrigger>
                      <TabsTrigger value="help" className="enhanced-tabs-trigger">
                        <HandHelping className="w-4 h-4 mr-2" />
                        Request Help
                      </TabsTrigger>
                    </>
                  )}
                  <TabsTrigger value="contact" className="enhanced-tabs-trigger">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact
                  </TabsTrigger>
                </TabsList>
              </div>
            )}

            {/* Enhanced Home Tab Content */}
            <TabsContent value="home">
              <div className="grid lg:grid-cols-3 gap-8 mt-8">
                {/* About Section */}
                {charity && (
                  <div className="lg:col-span-1">
                    <div className="enhanced-card sticky top-8">
                      <div className="enhanced-card-content">
                        <div className="flex items-center mb-6">
                          <div className="w-12 h-12 bg-hope-blue-100 rounded-full flex items-center justify-center mr-4">
                            <Users className="w-6 h-6 text-hope-blue-600" />
                          </div>
                          <h2 className="text-xl font-bold text-hope-gray-900">About Us</h2>
                        </div>

                        <p className="text-hope-gray-700 mb-6 leading-relaxed">{charity.description}</p>

                        <div className="space-y-4">
                          <div className="enhanced-card bg-hope-gray-50">
                            <div className="enhanced-card-content p-4">
                              <div className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-hope-orange-500 mt-1 flex-shrink-0" />
                                <div>
                                  <p className="font-semibold text-hope-gray-900">Email</p>
                                  <p className="text-hope-gray-600 text-sm">{charity.email}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="enhanced-card bg-hope-gray-50">
                            <div className="enhanced-card-content p-4">
                              <div className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-hope-green-500 mt-1 flex-shrink-0" />
                                <div>
                                  <p className="font-semibold text-hope-gray-900">Phone</p>
                                  <p className="text-hope-gray-600 text-sm">{charity.phone}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="enhanced-card bg-hope-gray-50">
                            <div className="enhanced-card-content p-4">
                              <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-hope-blue-500 mt-1 flex-shrink-0" />
                                <div>
                                  <p className="font-semibold text-hope-gray-900">Address</p>
                                  <p className="text-hope-gray-600 text-sm">{charity.address}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Trust Indicators */}
                        <div className="mt-6 pt-6 border-t border-hope-gray-200">
                          <h3 className="font-semibold text-hope-gray-900 mb-4">Trust & Safety</h3>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <CheckCircle className="w-5 h-5 text-hope-green-500 mr-3" />
                              <span className="text-sm text-hope-gray-700">Verified Organization</span>
                            </div>
                            <div className="flex items-center">
                              <Star className="w-5 h-5 text-hope-orange-500 mr-3" />
                              <span className="text-sm text-hope-gray-700">4.9/5 Trust Rating</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="w-5 h-5 text-hope-blue-500 mr-3" />
                              <span className="text-sm text-hope-gray-700">1,200+ Happy Donors</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Posts Section */}
                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-hope-gray-900 mb-2">Latest Updates</h2>
                    <p className="text-hope-gray-600">See what we've been up to and the impact we're making</p>
                  </div>

                  {charityPosts && charityPosts?.map((post) => (
                    <div key={post.id} className="enhanced-post-card">
                      <div className="enhanced-post-header">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <img
                              src={charity.profilePhotoURL ? `https://ma3ansawa.runasp.net${charity.profilePhotoURL}` : `https://ui-avatars.com/api/?name=${charity.charityName}`}
                              alt={charity.userName}
                              className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-hope-orange-200"
                            />
                            <div>
                              <p className="font-semibold text-hope-gray-900">{charity.charityName}</p>
                              <p className="text-sm text-hope-gray-500">
                                {new Date(post.createAt).toLocaleString('en-US', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  hour12: true
                                })}
                              </p>
                            </div>
                          </div>
                          {(userData && userData?.userName === post.userName) && (
                            <div className="relative">
                              <Button
                                variant="ghost"
                                className="p-2 hover:bg-hope-gray-100"
                                onClick={() => setIsMenuOpen((prev) => ({ ...prev, [post.id]: !prev[post.id] }))}
                              >
                                <EllipsisVertical className="w-5 h-5" />
                              </Button>
                              {isMenuOpen[post.id] && (
                                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                  <a
                                    href={`/manage-post/${post.id}`}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    Manage Post
                                  </a>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="enhanced-post-content">
                        <p className="text-lg text-hope-gray-800 mb-4 leading-relaxed">{post.content}</p>

                        {post.photos.length > 0 && (
                          <div className="mb-4">
                            {post.photos.length >= 2 ? (
                              <div className="slide-container relative">
                                <Slide
                                  autoplay={false}
                                  canSwipe={false}
                                  infinite={false}
                                  nextArrow={
                                    <span className='h-full bg-[#ffffff70] hover:bg-[#ffffff90] w-16 right-0 absolute flex items-center justify-center rounded-l-lg'>
                                      <ChevronRight className="text-gray-800" />
                                    </span>
                                  }
                                  prevArrow={
                                    <span className='h-full bg-[#ffffff70] hover:bg-[#ffffff90] w-16 left-0 absolute flex items-center justify-center rounded-r-lg'>
                                      <ChevronLeft className="text-gray-800" />
                                    </span>
                                  }
                                >
                                  {post.photos.map((url, index) => (
                                    <div key={index} className='w-full flex justify-center h-[400px]'>
                                      <img
                                        draggable={false}
                                        src={`https://ma3ansawa.runasp.net${url.imgName}`}
                                        alt=""
                                        className='w-full object-cover rounded-lg'
                                      />
                                    </div>
                                  ))}
                                </Slide>
                              </div>
                            ) : (
                              <img
                                src={post.photos[0].imgName ? `https://ma3ansawa.runasp.net${post.photos[0].imgName}` : `https://ui-avatars.com/api/?name=${charity.charityName}`}
                                alt="Post attachment"
                                className='w-full h-[400px] object-cover rounded-lg'
                              />
                            )}
                          </div>
                        )}
                      </div>

                      <div className="enhanced-post-actions">
                        <Button
                          variant="outline"
                          className="text-hope-blue-600 border-hope-blue-300 hover:bg-hope-blue-50"
                          onClick={() => toggleComment(post.id)}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          {post.comments.length > 0 ? `Comments (${post.comments.length})` : "Add Comment"}
                        </Button>

                        <Button
                          variant="outline"
                          className="text-hope-red-500 border-hope-red-300 hover:bg-hope-red-50"
                          onClick={() => handleReport('Post', post.id)}
                        >
                          <Flag className="w-4 h-4 mr-2" />
                          Report
                        </Button>
                      </div>

                      {/* Enhanced Comment Section */}
                      {(post.comments.length > 0 || isCommenting[post.id]) && (
                        <div className="mt-6 pt-6 border-t border-hope-gray-200">
                          <h4 className="font-semibold text-hope-gray-900 mb-4">Comments</h4>
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="enhanced-comment">
                              <div className="flex items-start gap-3">
                                <img
                                  src={comment.user_PhotoUrl ? `https://ma3ansawa.runasp.net${comment.user_PhotoUrl}` : `https://ui-avatars.com/api/?name=${comment.user_FullName}`}
                                  alt={comment.user_FullName}
                                  className="enhanced-comment-avatar"
                                />
                                <div className="enhanced-comment-content flex-grow">
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <p className="font-semibold text-hope-gray-900 text-sm">{comment.user_FullName}</p>
                                      <p className="text-xs text-hope-gray-500">{comment.createdAt}</p>
                                    </div>
                                    {comment.user_FullName === userData?.fullName && (
                                      <div className="relative">
                                        <Button
                                          variant="ghost"
                                          className="p-1 h-auto"
                                          onClick={() => setIsMenuOpen((prev) => ({ ...prev, [comment.id]: !prev[comment.id] }))}
                                        >
                                          <EllipsisVertical className="w-4 h-4" />
                                        </Button>
                                        {isMenuOpen[comment.id] && (
                                          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                            <Button
                                              variant="ghost"
                                              className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                              onClick={() => handleEditComment(comment.id)}
                                            >
                                              Edit
                                            </Button>
                                            <Button
                                              variant="ghost"
                                              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                                              onClick={() => handleDeleteComment(comment.id)}
                                            >
                                              Delete
                                            </Button>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  <p className="text-hope-gray-800">{comment.content}</p>
                                  {comment.user_FullName !== userData?.fullName && (
                                    <div className="flex justify-end mt-2">
                                      <Button
                                        variant="ghost"
                                        className="text-hope-red-500 hover:bg-hope-red-50 p-1 h-auto text-sm"
                                        onClick={() => handleReport('Comment', comment.id)}
                                      >
                                        Report
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}

                          {isCommenting[post.id] && isUser && (
                            <form onSubmit={handleCommentSubmit((data) => handleNewComment(post.id, data))} className="mt-4">
                              <div className="enhanced-form-group">
                                <Textarea
                                  {...registerComment('content')}
                                  placeholder="Write your comment..."
                                  className={`enhanced-form-textarea ${commentErrors.content ? 'error' : ''}`}
                                />
                                {commentErrors.content && (
                                  <p className="enhanced-form-error">{commentErrors.content.message}</p>
                                )}
                              </div>
                              <div className="flex gap-3 mt-4">
                                <Button type="submit" className="btn-primary-professional">
                                  Submit Comment
                                </Button>
                                <Button type="button" className="btn-secondary-professional" onClick={() => toggleComment(post.id)}>
                                  Cancel
                                </Button>
                              </div>
                            </form>
                          )}

                          {!isCommenting[post.id] && isUser && (
                            <Button
                              variant="outline"
                              className="text-hope-orange-600 border-hope-orange-300 hover:bg-hope-orange-50 mt-4"
                              onClick={() => toggleComment(post.id)}
                            >
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Add Comment
                            </Button>
                          )}

                          {!isUser && (
                            <p className="text-center text-hope-gray-500 mt-4 py-4 bg-hope-gray-50 rounded-lg">
                              Only regular users can comment on posts
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {charityPosts && charityPosts.length === 0 && (
                    <div className="enhanced-card text-center py-12">
                      <div className="enhanced-card-content">
                        <div className="w-24 h-24 bg-hope-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <MessageCircle className="w-12 h-12 text-hope-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-hope-gray-800">No posts yet</h3>
                        <p className="text-hope-gray-600">
                          This charity hasn't shared any updates yet. Check back later for news and updates!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Enhanced Donate Tab Content - Only show for regular users */}
            {userData && userData?.userName !== userName && isUser && (
              <TabsContent value="donate">
                <div className="grid lg:grid-cols-2 gap-8 mt-8">
                  {/* Enhanced Money Donation */}
                  <div className="enhanced-form">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-hope-orange-100 rounded-full flex items-center justify-center mr-4">
                        <DollarSign className="h-8 w-8 text-hope-orange-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-hope-gray-900">Monetary Donation</h2>
                        <p className="text-hope-gray-600">Support our mission with a financial contribution</p>
                      </div>
                    </div>

                    <p className="text-hope-gray-700 mb-6 leading-relaxed">
                      Your financial contribution helps us continue our mission and make a lasting difference in our community.
                      Every dollar counts and goes directly towards our charitable programs.
                    </p>

                    <div className="enhanced-form-group">
                      <label className="enhanced-form-label">Enter donation amount ($)</label>
                      <input
                        type="number"
                        min="1"
                        placeholder="0.00"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value === '' ? '' : Number(e.target.value))}
                        className="enhanced-form-input text-lg font-semibold"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {[10, 25, 50, 100, 250, 500].map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          onClick={() => setDonationAmount(amount)}
                          className={`p-3 font-semibold ${donationAmount === amount
                            ? 'border-hope-orange-500 bg-hope-orange-50 text-hope-orange-700'
                            : 'border-hope-gray-300 hover:border-hope-orange-300'}`}
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>

                    {/* Trust Indicators */}
                    <div className="bg-hope-green-50 border border-hope-green-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center mb-2">
                        <CheckCircle className="w-5 h-5 text-hope-green-600 mr-2" />
                        <span className="font-semibold text-hope-green-800">Secure & Trusted</span>
                      </div>
                      <p className="text-hope-green-700 text-sm">
                        Your donation is processed securely through our verified payment system.
                        100% of your donation goes directly to the charity.
                      </p>
                    </div>

                    <Button
                      className="w-full btn-primary-professional text-lg py-4"
                      onClick={handleMoneyDonation}
                      disabled={!isUser || !donationAmount}
                    >
                      {!isUser ? 'Only users can donate' : (
                        <>
                          <Heart className="w-5 h-5 mr-2" />
                          Continue to Secure Payment
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Enhanced Items Donation */}
                  <div className="enhanced-form">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-hope-blue-100 rounded-full flex items-center justify-center mr-4">
                        <Gift className="h-8 w-8 text-hope-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-hope-gray-900">Donate Items</h2>
                        <p className="text-hope-gray-600">Share your goods with those in need</p>
                      </div>
                    </div>

                    <p className="text-hope-gray-700 mb-6 leading-relaxed">
                      Donate clothes, food, electronics, or other items to help those in need.
                      We'll arrange pickup or you can drop off items at our location.
                    </p>

                    <form onSubmit={handleDonationSubmit(onSubmitDonation)} className="space-y-6">
                      <div className="enhanced-form-group">
                        <label className="enhanced-form-label">Full Name</label>
                        <input
                          {...registerDonation('name')}
                          className={`enhanced-form-input ${donationErrors.name ? 'error' : ''}`}
                          placeholder="Enter your full name"
                        />
                        {donationErrors.name && (
                          <p className="enhanced-form-error">{donationErrors.name.message}</p>
                        )}
                      </div>

                      <div className="enhanced-form-group">
                        <label className="enhanced-form-label">Email Address</label>
                        <input
                          {...registerDonation('email')}
                          type="email"
                          className={`enhanced-form-input ${donationErrors.email ? 'error' : ''}`}
                          placeholder="your.email@example.com"
                        />
                        {donationErrors.email && (
                          <p className="enhanced-form-error">{donationErrors.email.message}</p>
                        )}
                      </div>

                      <div className="enhanced-form-group">
                        <label className="enhanced-form-label">Phone Number</label>
                        <input
                          {...registerDonation('phone')}
                          type="tel"
                          className={`enhanced-form-input ${donationErrors.phone ? 'error' : ''}`}
                          placeholder="+1 (555) 000-0000"
                        />
                        {donationErrors.phone && (
                          <p className="enhanced-form-error">{donationErrors.phone.message}</p>
                        )}
                      </div>

                      <div className="enhanced-form-group">
                        <label className="enhanced-form-label">Pickup Address</label>
                        <textarea
                          {...registerDonation('address')}
                          rows={3}
                          className={`enhanced-form-textarea ${donationErrors.address ? 'error' : ''}`}
                          placeholder="Enter your full address for item pickup"
                        ></textarea>
                        {donationErrors.address && (
                          <p className="enhanced-form-error">{donationErrors.address.message}</p>
                        )}
                      </div>

                      <div className="enhanced-form-group">
                        <label className="enhanced-form-label">Items Description</label>
                        <textarea
                          {...registerDonation('itemDescription')}
                          rows={4}
                          className={`enhanced-form-textarea ${donationErrors.itemDescription ? 'error' : ''}`}
                          placeholder="Describe the items you'd like to donate (clothing, electronics, furniture, etc.)"
                        ></textarea>
                        {donationErrors.itemDescription && (
                          <p className="enhanced-form-error">{donationErrors.itemDescription.message}</p>
                        )}
                      </div>

                      <div className="enhanced-form-group">
                        <label className="enhanced-form-label">Upload Images (Optional)</label>
                        <div className="border-2 border-dashed border-hope-gray-300 rounded-lg p-6 text-center hover:border-hope-orange-400 transition-colors">
                          <Gift className="w-12 h-12 text-hope-gray-400 mx-auto mb-4" />
                          <p className="text-hope-gray-600 mb-2">Drag & drop images or click to upload</p>
                          <p className="text-hope-gray-500 text-sm">PNG, JPG up to 10MB each</p>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => setDonationForm({ ...donationForm, image: [...donationForm.image, (e.target.files?.[0])] })}
                            className="hidden"
                            id="donation-files"
                          />
                          <label htmlFor="donation-files" className="btn-secondary-professional mt-4 cursor-pointer inline-flex items-center">
                            Choose Files
                          </label>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full btn-primary-professional text-lg py-4"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Submit Donation Request
                      </Button>
                    </form>
                  </div>
                </div>
              </TabsContent>
            )}

            {/* Enhanced Help Request Tab Content - Only show for regular users */}
            {userData && userData?.userName !== userName && isUser && (
              <TabsContent value="help">
                <div className="max-w-4xl mx-auto mt-8">
                  <div className="enhanced-form">
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-hope-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HandHelping className="h-10 w-10 text-hope-blue-600" />
                      </div>
                      <h2 className="text-3xl font-bold text-hope-gray-900 mb-3">Request Assistance</h2>
                      <p className="text-hope-gray-600 text-lg">
                        We're here to help you in times of need. Fill out this form and we'll connect you with the right support.
                      </p>
                    </div>

                    <div className="bg-hope-blue-50 border border-hope-blue-200 rounded-lg p-6 mb-8">
                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-hope-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-hope-blue-800 mb-2">Your Privacy is Protected</h3>
                          <p className="text-hope-blue-700 text-sm leading-relaxed">
                            All information you provide is kept confidential and only shared with verified charity representatives
                            who can help with your specific needs. We never share personal information with third parties.
                          </p>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleHelpSubmit(onSubmitHelp)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="enhanced-form-group">
                          <label className="enhanced-form-label">Contact Phone</label>
                          <input
                            {...registerHelp('phone')}
                            type="tel"
                            className={`enhanced-form-input ${helpErrors.phone ? 'error' : ''}`}
                            placeholder="+1 (555) 000-0000"
                          />
                          {helpErrors.phone && (
                            <p className="enhanced-form-error">{helpErrors.phone.message}</p>
                          )}
                        </div>

                        <div className="enhanced-form-group">
                          <label className="enhanced-form-label">Your Address</label>
                          <input
                            {...registerHelp('address')}
                            className={`enhanced-form-input ${helpErrors.address ? 'error' : ''}`}
                            placeholder="City, State, ZIP"
                          />
                          {helpErrors.address && (
                            <p className="enhanced-form-error">{helpErrors.address.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="enhanced-form-group">
                        <label className="enhanced-form-label">Description of Assistance Needed</label>
                        <textarea
                          {...registerHelp('description')}
                          rows={6}
                          className={`enhanced-form-textarea ${helpErrors.description ? 'error' : ''}`}
                          placeholder="Please describe your situation and what kind of help you need. Include any relevant details that will help us understand how we can best assist you."
                        ></textarea>
                        {helpErrors.description && (
                          <p className="enhanced-form-error">{helpErrors.description.message}</p>
                        )}
                      </div>

                      <div className="enhanced-form-group">
                        <label className="enhanced-form-label">Upload Supporting Documents (Optional)</label>
                        <div className="border-2 border-dashed border-hope-gray-300 rounded-lg p-6 text-center hover:border-hope-blue-400 transition-colors">
                          <HandHelping className="w-12 h-12 text-hope-gray-400 mx-auto mb-4" />
                          <p className="text-hope-gray-600 mb-2">Upload any supporting documents or images</p>
                          <p className="text-hope-gray-500 text-sm">PNG, JPG, PDF up to 10MB each</p>
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => setHelpForm({ ...helpForm, image: [...helpForm.image, e.target.files?.[0]] })}
                            className="hidden"
                            id="help-files"
                          />
                          <label htmlFor="help-files" className="btn-secondary-professional mt-4 cursor-pointer inline-flex items-center">
                            Choose Files
                          </label>
                        </div>
                      </div>

                      <div className="bg-hope-gray-50 rounded-lg p-6">
                        <h3 className="font-semibold text-hope-gray-900 mb-3">What happens next?</h3>
                        <div className="space-y-3 text-sm text-hope-gray-700">
                          <div className="flex items-center">
                            <span className="w-6 h-6 bg-hope-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">1</span>
                            We review your request within 24 hours
                          </div>
                          <div className="flex items-center">
                            <span className="w-6 h-6 bg-hope-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">2</span>
                            We connect you with appropriate resources
                          </div>
                          <div className="flex items-center">
                            <span className="w-6 h-6 bg-hope-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">3</span>
                            A representative contacts you to discuss next steps
                          </div>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full btn-primary-professional text-lg py-4"
                      >
                        <Send className="w-6 h-6 mr-2" />
                        Submit Help Request
                      </Button>
                    </form>
                  </div>
                </div>
              </TabsContent>
            )}

            {/* Enhanced Contact Tab Content */}
            {userData && userData?.userName !== userName && (
              <TabsContent value="contact">
                <div className="grid lg:grid-cols-3 gap-8 mt-8">
                  <div className="lg:col-span-1">
                    <div className="enhanced-card">
                      <div className="enhanced-card-content">
                        <div className="flex items-center mb-6">
                          <div className="w-12 h-12 bg-hope-orange-100 rounded-full flex items-center justify-center mr-4">
                            <MapPin className="w-6 h-6 text-hope-orange-600" />
                          </div>
                          <h2 className="text-xl font-bold text-hope-gray-900">Main Office</h2>
                        </div>

                        {charity && (
                          <div className="space-y-6">
                            <div className="enhanced-card bg-hope-gray-50">
                              <div className="enhanced-card-content p-4">
                                <div className="flex items-start gap-3">
                                  <MapPin className="h-6 w-6 text-hope-orange-500 mt-1 flex-shrink-0" />
                                  <div>
                                    <p className="font-semibold text-hope-gray-900 mb-1">Address</p>
                                    <p className="text-hope-gray-600">{charity.address}</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="enhanced-card bg-hope-gray-50">
                              <div className="enhanced-card-content p-4">
                                <div className="flex items-start gap-3">
                                  <Mail className="h-6 w-6 text-hope-blue-500 mt-1 flex-shrink-0" />
                                  <div>
                                    <p className="font-semibold text-hope-gray-900 mb-1">Email</p>
                                    <a href={`mailto:${charity.email}`} className="text-hope-blue-600 hover:text-hope-blue-700 transition-colors">
                                      {charity.email}
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="enhanced-card bg-hope-gray-50">
                              <div className="enhanced-card-content p-4">
                                <div className="flex items-start gap-3">
                                  <Phone className="h-6 w-6 text-hope-green-500 mt-1 flex-shrink-0" />
                                  <div>
                                    <p className="font-semibold text-hope-gray-900 mb-1">Phone</p>
                                    <a href={`tel:${charity.phone}`} className="text-hope-green-600 hover:text-hope-green-700 transition-colors">
                                      {charity.phone}
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="bg-hope-blue-50 border border-hope-blue-200 rounded-lg p-4">
                              <h3 className="font-semibold text-hope-blue-800 mb-2">Office Hours</h3>
                              <div className="text-hope-blue-700 text-sm space-y-1">
                                <div className="flex justify-between">
                                  <span>Monday - Friday:</span>
                                  <span>9:00 AM - 5:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Saturday:</span>
                                  <span>10:00 AM - 2:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Sunday:</span>
                                  <span>Closed</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="enhanced-card">
                      <div className="enhanced-card-content">
                        <div className="flex items-center mb-6">
                          <div className="w-12 h-12 bg-hope-green-100 rounded-full flex items-center justify-center mr-4">
                            <Users className="w-6 h-6 text-hope-green-600" />
                          </div>
                          <h2 className="text-xl font-bold text-hope-gray-900">Other Locations</h2>
                        </div>

                        {charityBranches && charityBranches.length > 0 ? (
                          <div className="grid gap-6">
                            {charityBranches.map((branch, idx) => (
                              <div key={idx} className="enhanced-card bg-hope-gray-50">
                                <div className="enhanced-card-content p-6">
                                  <h3 className="font-bold text-lg text-hope-gray-900 mb-4">{branch.description}</h3>
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3">
                                      <MapPin className="h-5 w-5 text-hope-orange-500 mt-1 flex-shrink-0" />
                                      <div>
                                        <p className="font-medium text-hope-gray-900 text-sm">Address</p>
                                        <p className="text-hope-gray-600 text-sm">{branch.address}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                      <Phone className="h-5 w-5 text-hope-green-500 mt-1 flex-shrink-0" />
                                      <div>
                                        <p className="font-medium text-hope-gray-900 text-sm">Phone</p>
                                        <a href={`tel:${branch.phoneNumber}`} className="text-hope-green-600 hover:text-hope-green-700 transition-colors text-sm">
                                          {branch.phoneNumber}
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <div className="w-24 h-24 bg-hope-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                              <MapPin className="w-12 h-12 text-hope-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-hope-gray-800">No additional locations</h3>
                            <p className="text-hope-gray-600">
                              This charity currently operates from one main location. Contact the main office for all inquiries.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </MainLayout>
    </>
  );
};

export default CharityProfile;
