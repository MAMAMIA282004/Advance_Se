import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import { Heart, Phone, Mail, MapPin, Send, DollarSign, ChevronRight, ChevronLeft, EllipsisVertical } from 'lucide-react';
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
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add comment. Please try again.');
    }
  };

  const onSubmitDonation = async (data: any) => {
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
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit donation request. Please try again.');
    }
  };

  const onSubmitHelp = async (data: any) => {
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
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit help request. Please try again.');
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
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to initiate payment. Please try again.');
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
        {/* Cover Image & Basic Info */}
        {charity !== null && <div className="relative">
          <div className="h-64 md:h-80 w-full overflow-hidden">
            <img
              src={charity.wallpaperPhotoUrl ? `https://ma3ansawa.runasp.net${charity.wallpaperPhotoUrl}` : `https://ui-avatars.com/api/?name=${charity.charityName}`}
              alt={`${charity.charityName} cover`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-center relative -mt-44">
              <div className="rounded-xl p-4 md:p-6 flex flex-col items-center gap-4 md:gap-8">
                <div className="w-48 h-48 rounded-full overflow-hidden">
                  <img
                    src={charity.profilePhotoURL ? `https://ma3ansawa.runasp.net${charity.profilePhotoURL}` : `https://ui-avatars.com/api/?name=${charity.charityName}`}
                    alt={charity.charityName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center md:text-left">
                  <h1 className="text-2xl md:text-3xl font-bold text-hope-dark-gray">{charity.charityName}</h1>
                </div>

              </div>
            </div>
          </div>
        </div>}

        {/* Tabs Section */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="home">
            {((userData && userData?.userName !== userName)) && <div className="border-b">
              <TabsList className="bg-transparent justify-evenly h-auto mb-0 w-full">
                <TabsTrigger value="home" className="rounded-none border-b-2 border-transparent data-[state=active]:border-hope-orange data-[state=active]:bg-transparent">
                  Home
                </TabsTrigger>
                {isUser && (
                  <>
                    <TabsTrigger value="donate" className="rounded-none border-b-2 border-transparent data-[state=active]:border-hope-orange data-[state=active]:bg-transparent">
                      Donate
                    </TabsTrigger>
                    <TabsTrigger value="help" className="rounded-none border-b-2 border-transparent data-[state=active]:border-hope-orange data-[state=active]:bg-transparent">
                      Request Help
                    </TabsTrigger>
                  </>
                )}
                <TabsTrigger value="contact" className="rounded-none border-b-2 border-transparent data-[state=active]:border-hope-orange data-[state=active]:bg-transparent">
                  Contact
                </TabsTrigger>
              </TabsList>
            </div>}

            {/* Home Tab Content */}
            <TabsContent value="home">
              <div className="grid md:grid-cols-1 gap-8 mt-8">
                {charity &&
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
                              <p className="text-gray-600">{charity.email}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Phone className="h-5 w-5 text-hope-orange mt-0.5" />
                            <div>
                              <p className="font-medium">Phone</p>
                              <p className="text-gray-600">{charity.phone}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-hope-orange mt-0.5" />
                            <div>
                              <p className="font-medium">Address</p>
                              <p className="text-gray-600">{charity.address}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>}

                {/* Right Column - Posts */}
                <div>

                  {charityPosts &&
                    charityPosts?.map((post) => (
                      <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                        <div className="p-6">
                          <div className="flex justify-between">
                            <div className="flex items-center mb-4">
                              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                                <img
                                  src={charity.profilePhotoURL ? `https://ma3ansawa.runasp.net${charity.profilePhotoURL}` : `https://ui-avatars.com/api/?name=${charity.charityName}`}
                                  alt={charity.userName}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium">{charity.charityName}</p>
                                <p className="text-xs text-gray-500">{new Date(post.createAt).toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', hour12: true })}</p>
                              </div>
                            </div>
                            {(userData && userData?.userName === post.userName) && <div className="relative">
                              <Button
                                variant="ghost"
                                className="p-2"
                                onClick={() => setIsMenuOpen((prev) => ({ ...prev, [post.id]: !prev[post.id] }))}
                              >
                                <EllipsisVertical />
                              </Button>
                              {isMenuOpen[post.id] && (
                                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg">
                                  <a
                                    href={`/manage-post/${post.id}`}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    Manage Post
                                  </a>
                                </div>
                              )}
                            </div>}
                          </div>

                          <p className="mb-4 text-lg">{post.content}</p>

                          {post.photos.length >= 2 ?
                            <div className="slide-container relative">
                              <Slide
                                autoplay={false}
                                canSwipe={false}
                                infinite={false}
                                nextArrow={
                                  (
                                    <span className='h-full bg-[#ffffff70] hover:bg-[#ffffff90] w-16 right-0 absolute flex items-center justify-center'>
                                      <ChevronRight className="text-gray-800" />
                                    </span>
                                  )
                                }
                                prevArrow={
                                  (
                                    <span className='h-full bg-[#ffffff70] hover:bg-[#ffffff90] w-16 left-0 absolute flex items-center justify-center'>
                                      <ChevronLeft className="text-gray-800" />
                                    </span>
                                  )
                                }
                              >
                                {post.photos.map((url, index) => (
                                  <div key={index} className='w-full flex justify-center h-[35rem]'>
                                    <img draggable={false} src={`https://ma3ansawa.runasp.net${url.imgName}`} alt="" className='w-full object-contain' />
                                  </div>
                                ))}
                              </Slide>
                            </div>
                            :
                            <>
                              <img
                                src={post.photos[0].imgName ? `https://ma3ansawa.runasp.net${post.photos[0].imgName}` : `https://ui-avatars.com/api/?name=${charity.charityName}`}
                                alt="Post attachment"
                                className='w-full h-[35rem] object-cover'
                              />
                            </>
                          }

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
                              onClick={() => handleReport('Post', post.id)}
                            >
                              Report
                            </Button>
                          </div>

                          {/* Comment Section */}
                          {(post.comments.length > 0 || isCommenting[post.id]) && (
                            <div className="mt-4 pt-4 border-t">
                              {post.comments.map((comment) => (
                                <div key={comment.id} className="flex mb-4">
                                  <img
                                    src={comment.user_PhotoUrl ? `https://ma3ansawa.runasp.net${comment.user_PhotoUrl}` : `https://ui-avatars.com/api/?name=${comment.user_FullName}`}
                                    alt={comment.user_FullName}
                                    className="w-8 h-8 rounded-full bg-gray-300 mr-3 flex-shrink-0 object-cover"
                                  />
                                  <div className="bg-gray-50 rounded-lg p-3 flex-grow">
                                    <div className="flex justify-between">
                                      <div className="">
                                        <p className="font-medium text-gray-600 text-sm">{comment.user_FullName}</p>
                                        <p className="text-xs text-gray-500">{comment.createdAt}</p>
                                      </div>
                                      {comment.user_FullName === userData?.fullName && <div className="relative">
                                        <Button
                                          variant="ghost"
                                          className="p-2"
                                          onClick={() => setIsMenuOpen((prev) => ({ ...prev, [comment.id]: !prev[comment.id] }))}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M12 6v.01M12 12v.01M12 18v.01"
                                            />
                                          </svg>
                                        </Button>
                                        {isMenuOpen[comment.id] && (
                                          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg">
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
                                      </div>}
                                    </div>
                                    <p className="mt-1 text-lg">{comment.content}</p>
                                    {comment.user_FullName !== userData?.fullName && <div className="flex justify-end">
                                      <Button
                                        className="hover:bg-transparent mt-1"
                                        onClick={() => handleReport('Comment', comment.id)}
                                      >
                                        Report
                                      </Button>
                                    </div>}
                                  </div>
                                </div>
                              ))}

                              {isCommenting[post.id] && isUser && (
                                <form onSubmit={handleCommentSubmit((data) => handleNewComment(post.id, data))} className="mt-4">
                                  <Textarea
                                    {...registerComment('content')}
                                    placeholder="Write your comment..."
                                    className={`w-full ${commentErrors.content ? 'border-red-500' : ''}`}
                                  />
                                  {commentErrors.content && (
                                    <p className="text-red-500 text-sm mt-1">{commentErrors.content.message}</p>
                                  )}
                                  <div className="flex gap-2 mt-2">
                                    <Button type="submit" className="bg-hope-orange hover:bg-hope-dark-orange text-white">
                                      Submit
                                    </Button>
                                    <Button type="button" variant="outline" onClick={() => toggleComment(post.id)}>
                                      Cancel
                                    </Button>
                                  </div>
                                </form>
                              )}

                              {!isCommenting[post.id] && isUser && (
                                <Button
                                  variant="ghost"
                                  className="text-hope-orange mt-2"
                                  onClick={() => toggleComment(post.id)}
                                >
                                  Add Comment
                                </Button>
                              )}

                              {!isUser && (
                                <p className="text-center text-gray-500 mt-2">
                                  Only regular users can comment on posts
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </TabsContent>

            {/* Donate Tab Content - Only show for regular users */}
            {isUser && (
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
                        disabled={!isUser || !donationAmount}
                      >
                        {!isUser ? 'Only users can donate' : 'Continue to Payment'}
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

                      <form onSubmit={handleDonationSubmit(onSubmitDonation)} className="space-y-4">
                        <div>
                          <label className="block mb-1 text-sm font-medium">Name</label>
                          <input
                            {...registerDonation('name')}
                            className={`w-full px-4 py-2 rounded-lg border ${donationErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {donationErrors.name && (
                            <p className="text-red-500 text-sm mt-1">{donationErrors.name.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block mb-1 text-sm font-medium">Email Address</label>
                          <input
                            {...registerDonation('email')}
                            className={`w-full px-4 py-2 rounded-lg border ${donationErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {donationErrors.email && (
                            <p className="text-red-500 text-sm mt-1">{donationErrors.email.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block mb-1 text-sm font-medium">Phone Number</label>
                          <input
                            {...registerDonation('phone')}
                            className={`w-full px-4 py-2 rounded-lg border ${donationErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {donationErrors.phone && (
                            <p className="text-red-500 text-sm mt-1">{donationErrors.phone.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block mb-1 text-sm font-medium">Address for Pickup</label>
                          <textarea
                            {...registerDonation('address')}
                            rows={2}
                            className={`w-full px-4 py-2 rounded-lg border ${donationErrors.address ? 'border-red-500' : 'border-gray-300'}`}
                          ></textarea>
                          {donationErrors.address && (
                            <p className="text-red-500 text-sm mt-1">{donationErrors.address.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block mb-1 text-sm font-medium">Description of Items</label>
                          <textarea
                            {...registerDonation('itemDescription')}
                            rows={3}
                            className={`w-full px-4 py-2 rounded-lg border ${donationErrors.itemDescription ? 'border-red-500' : 'border-gray-300'}`}
                          ></textarea>
                          {donationErrors.itemDescription && (
                            <p className="text-red-500 text-sm mt-1">{donationErrors.itemDescription.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block mb-1 text-sm font-medium">Upload Images (Optional)</label>
                          <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
                            <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={(e) => setDonationForm({ ...donationForm, image: [...donationForm.image, (e.target.files?.[0])] })}
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
            )}

            {/* Help Request Tab Content - Only show for regular users */}
            {isUser && (
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

                      <form onSubmit={handleHelpSubmit(onSubmitHelp)} className="space-y-4">
                        <div>
                          <label className="block mb-1 text-sm font-medium">
                            Contact Phone
                          </label>
                          <input
                            {...registerHelp('phone')}
                            className={`w-full px-4 py-2 rounded-lg border ${helpErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {helpErrors.phone && (
                            <p className="text-red-500 text-sm mt-1">{helpErrors.phone.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block mb-1 text-sm font-medium">Address</label>
                          <input
                            {...registerHelp('address')}
                            className={`w-full px-4 py-2 rounded-lg border ${helpErrors.address ? 'border-red-500' : 'border-gray-300'}`}
                          ></input>
                          {helpErrors.address && (
                            <p className="text-red-500 text-sm mt-1">{helpErrors.address.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block mb-1 text-sm font-medium">
                            Description of Assistance Needed
                          </label>
                          <textarea
                            {...registerHelp('description')}
                            rows={4}
                            className={`w-full px-4 py-2 rounded-lg border ${helpErrors.description ? 'border-red-500' : 'border-gray-300'}`}
                          ></textarea>
                          {helpErrors.description && (
                            <p className="text-red-500 text-sm mt-1">{helpErrors.description.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block mb-1 text-sm font-medium">Upload Supporting Images (Optional)</label>
                          <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
                            <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => setHelpForm({ ...helpForm, image: [...helpForm.image, e.target.files?.[0]] })}
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
            )}

            {/* Contact Tab Content */}
            <TabsContent value="contact">
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div className="md:col-span-1">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-6">Main Office</h2>

                      {charity && <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-hope-orange mt-0.5" />
                          <div>
                            <p className="font-medium">Address</p>
                            <p className="text-gray-600">{charity.address}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Mail className="h-5 w-5 text-hope-orange mt-0.5" />
                          <div>
                            <p className="font-medium">Email</p>
                            <p className="text-gray-600">{charity.email}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Phone className="h-5 w-5 text-hope-orange mt-0.5" />
                          <div>
                            <p className="font-medium">Phone</p>
                            <p className="text-gray-600">{charity.phone}</p>
                          </div>
                        </div>
                      </div>}

                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-6">Other Branches</h2>

                      <div className="grid md:grid-cols-2 gap-6">
                        {charityBranches && charityBranches?.map((branch, idx) => (
                          <div key={idx} className="border rounded-lg p-4">
                            <h3 className="font-semibold mb-3">{branch.description}</h3>
                            <div className="space-y-3 text-sm">
                              <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-hope-orange mt-0.5" />
                                <span>{branch.address}</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <Phone className="h-4 w-4 text-hope-orange mt-0.5" />
                                <span>{branch.phoneNumber}</span>
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
          </Tabs >
        </div >
      </MainLayout >
    </>
  );
};

export default CharityProfile;
