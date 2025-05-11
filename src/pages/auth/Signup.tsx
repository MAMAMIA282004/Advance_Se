
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import Icon from '@/components/ui/icon';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from '@/lib/validations';
import { IRegisterForm } from '@/interfaces/interfaces';
import { RegisterCharityCall, RegisterUserCall } from '@/Api/Auth/authinicatiton';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'user' | 'charity'>('user');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IRegisterForm>({
    resolver: yupResolver(registerSchema),
  });

  const submitFormData = async (data: IRegisterForm) => {
    const formData = new FormData();
    formData.append(userType === 'charity' ? "CharityName" : "FullName", data.fullName || '');
    formData.append('Email', data.email || '');
    formData.append('Password', data.password || '');
    formData.append('ConfirmPassword', data.reEnterPassword || '');
    formData.append('PhoneNumber', data.PhoneNumber || '');
    formData.append('Address', data.address || '');

    if (userType === 'charity' && data.pdf) {
      formData.append('Country', "Egypt");
      formData.append('Description', "NAN");
      formData.append('Document', data.pdf[0]);
      try {
        const res = await RegisterCharityCall(formData as IRegisterForm);
        if (res.status === 200) {
          reset();
          navigate('/login');
        }
      } catch (error) {
        console.error('Error submitting form data:', error);
        throw error;
      }
    }

    else if (userType === 'user') {
      try {
        const res = await RegisterUserCall(formData as IRegisterForm);
        if (res.status === 200) {
          reset();
          navigate('/login');
        }
      } catch (error) {
        console.error('Error submitting form data:', error);
        throw error;
      }
    }
  };

  return (
    <MainLayout hideFooter>
      <div className="flex flex-col items-center md:flex-row">
        {/* Left side with image - Hidden on mobile */}
        <div className="hidden md:flex md:flex-col md:w-1/2 p-10">
          <div className="flex items-center justify-center gap-2 text-hope-orange mb-10">
            <div className="flex justify-center items-center">
              <img src="/lovable-uploads/signup.png" alt="HopeGivers illustration" className="w-full" />
            </div>
          </div>
        </div>

        {/* Right side with form */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <div className="flex mb-4 items-center">
                <Icon size={10}></Icon>
                <h1 className='ml-2 text-4xl text-hope-orange font-bold'>HopeGivers</h1>
              </div>
              <p className="text-gray-600">Please fill your detail to access your account</p>
            </div>

            {/* Toggle between User and Charity */}
            <div className="flex border border-gray-300 rounded-full p-1 mb-6">
              <button
                onClick={() => setUserType('user')}
                className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${userType === 'user'
                  ? 'bg-hope-orange text-white'
                  : 'text-gray-500 hover:text-hope-dark-orange'
                  }`}
              >
                Regular User
              </button>
              <button
                onClick={() => setUserType('charity')}
                className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${userType === 'charity'
                  ? 'bg-hope-orange text-white'
                  : 'text-gray-500 hover:text-hope-dark-orange'
                  }`}
              >
                Charity
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(submitFormData)}>
              <div>
                <input
                  {...register('fullName')}
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                />
              </div>

              <div>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                />
              </div>

              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="relative">
                <input
                  {...register('reEnterPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div>
                <input
                  {...register('address')}
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                />
              </div>

              <div>
                <input
                  {...register('PhoneNumber')}
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                />
              </div>

              {userType === 'charity' && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Verification Document (PDF)
                  </label>
                  <div className="border border-dashed border-gray-300 rounded-lg p-4">
                    <div className="text-center">
                      <p className="text-gray-500 text-sm">Upload PDF file to verify your charity status</p>
                      <input
                        {...register('pdf')}
                        type="file"
                        accept=".pdf"
                        multiple={false}
                        className="block w-full text-sm text-gray-500 mt-3
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-hope-orange file:text-white
                          hover:file:bg-hope-dark-orange"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    * Please upload legal documentation confirming your charity status. This will be reviewed by our team.
                  </p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-hope-orange hover:bg-hope-dark-orange text-white py-3 font-medium"
              >
                Sign Up
              </Button>

              <div className="flex items-center justify-center my-4">
                <span className="border-b flex-grow border-gray-300"></span>
                <span className="px-3 text-gray-500 text-sm">Or sign up with</span>
                <span className="border-b flex-grow border-gray-300"></span>
              </div>

              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="h-4 w-4" fill="currentColor">
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
                Sign Up with Google
              </Button>
            </form>

            <p className="text-center mt-8 text-gray-600">
              Already have an account? <Link to="/login" className="text-hope-orange font-medium hover:underline">Sign In</Link>
            </p>

            {userType === 'user' && (
              <p className="text-center mt-2 text-sm text-gray-500">
                Are you a charity? <span className="text-hope-orange cursor-pointer hover:underline" onClick={() => setUserType('charity')}>Sign up here</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Signup;
