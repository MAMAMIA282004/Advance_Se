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
import { toast } from 'sonner';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'user' | 'charity'>('user');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IRegisterForm>({
    resolver: yupResolver(registerSchema),
  });

  const submitFormData = async (data: IRegisterForm) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append(userType === 'charity' ? "CharityName" : "FullName", data.fullName || '');
      formData.append('Email', data.email || '');
      formData.append('Password', data.password || '');
      formData.append('ConfirmPassword', data.reEnterPassword || '');
      formData.append('PhoneNumber', data.PhoneNumber || '');
      formData.append('Address', data.address || '');

      let res;
      if (userType === 'charity' && data.pdf) {
        formData.append('Country', "Egypt");
        formData.append('Description', "NAN");
        formData.append('Document', data.pdf[0]);
        res = await RegisterCharityCall(formData as IRegisterForm);
      } else if (userType === 'user') {
        res = await RegisterUserCall(formData as IRegisterForm);
      }

      // Check if registration was successful
      if (res && (res.status === 200 || res.status === 201)) {
        toast.success('Registration successful! Please login to continue.');
        reset();
        navigate('/login');
      } else {
        // Handle unexpected response status
        const errorMessage = res?.data?.message || 'Registration failed. Please try again.';
        toast.error(errorMessage);
      }
    } catch (error: unknown) {
      console.error('Registration error:', error);
      let errorMessage = 'Registration failed. Please try again.';

      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { data?: { message?: string }, message?: string } } };
        errorMessage = axiosError.response?.data?.data?.message ||
          axiosError.response?.data?.message ||
          errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout hideFooter>
      <div className="enhanced-auth-container">
        <div className="flex flex-col items-center md:flex-row min-h-screen">
          {/* Left side with image - Hidden on mobile */}
          <div className="hidden md:flex md:flex-col md:w-1/2 enhanced-auth-side p-10">
            <div className="flex items-center justify-center gap-2 text-hope-orange h-full">
              <div className="flex justify-center items-center">
                <img src="/lovable-uploads/signup.png" alt="HopeGivers illustration" className="w-full" />
              </div>
            </div>
          </div>

          {/* Right side with form */}
          <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-10 relative z-10">
            <div className="enhanced-auth-form-container">
              <div className="enhanced-auth-header">
                <div className="enhanced-auth-logo">
                  <Icon size={10}></Icon>
                  <h1 className="enhanced-auth-title">HopeGivers</h1>
                </div>
                <p className="enhanced-auth-subtitle">Create your account and start making a difference</p>
              </div>

              {/* Enhanced Toggle between User and Charity */}
              <div className="enhanced-auth-toggle">
                <button
                  type="button"
                  onClick={() => setUserType('user')}
                  className={`enhanced-auth-toggle-btn ${userType === 'user' ? 'active' : ''}`}
                >
                  Regular User
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('charity')}
                  className={`enhanced-auth-toggle-btn ${userType === 'charity' ? 'active' : ''}`}
                >
                  Charity
                </button>
              </div>

              <form className="enhanced-auth-form" onSubmit={handleSubmit(submitFormData)}>
                <div className="enhanced-auth-input-group">
                  <input
                    {...register('fullName')}
                    type="text"
                    placeholder={userType === 'charity' ? 'Charity Name' : 'Full Name'}
                    className={`enhanced-auth-input ${errors.fullName ? 'error' : ''}`}
                  />
                  {errors.fullName && (
                    <div className="enhanced-auth-error">
                      <span>⚠</span> {String(errors.fullName.message)}
                    </div>
                  )}
                </div>

                <div className="enhanced-auth-input-group">
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="Email Address"
                    className={`enhanced-auth-input ${errors.email ? 'error' : ''}`}
                  />
                  {errors.email && (
                    <div className="enhanced-auth-error">
                      <span>⚠</span> {String(errors.email.message)}
                    </div>
                  )}
                </div>

                <div className="enhanced-auth-input-group">
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className={`enhanced-auth-input ${errors.password ? 'error' : ''}`}
                  />
                  <button
                    type="button"
                    className="enhanced-auth-input-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {errors.password && (
                    <div className="enhanced-auth-error">
                      <span>⚠</span> {String(errors.password.message)}
                    </div>
                  )}
                </div>

                <div className="enhanced-auth-input-group">
                  <input
                    {...register('reEnterPassword')}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    className={`enhanced-auth-input ${errors.reEnterPassword ? 'error' : ''}`}
                  />
                  <button
                    type="button"
                    className="enhanced-auth-input-icon"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {errors.reEnterPassword && (
                    <div className="enhanced-auth-error">
                      <span>⚠</span> {String(errors.reEnterPassword.message)}
                    </div>
                  )}
                </div>

                <div className="enhanced-auth-input-group">
                  <input
                    {...register('address')}
                    type="text"
                    placeholder="Address"
                    className={`enhanced-auth-input ${errors.address ? 'error' : ''}`}
                  />
                  {errors.address && (
                    <div className="enhanced-auth-error">
                      <span>⚠</span> {String(errors.address.message)}
                    </div>
                  )}
                </div>

                <div className="enhanced-auth-input-group">
                  <input
                    {...register('PhoneNumber')}
                    type="tel"
                    placeholder="Phone Number"
                    className={`enhanced-auth-input ${errors.PhoneNumber ? 'error' : ''}`}
                  />
                  {errors.PhoneNumber && (
                    <div className="enhanced-auth-error">
                      <span>⚠</span> {String(errors.PhoneNumber.message)}
                    </div>
                  )}
                </div>

                {userType === 'charity' && (
                  <div className="enhanced-auth-input-group">
                    <label className="block text-sm font-semibold text-hope-gray-700 mb-3">
                      Verification Document (PDF)
                    </label>
                    <div className="enhanced-auth-file-upload">
                      <div className="text-center relative z-10">
                        <p className="text-hope-gray-600 text-sm mb-2">Upload PDF file to verify your charity status</p>
                        <input
                          {...register('pdf')}
                          type="file"
                          accept=".pdf"
                          multiple={false}
                          required={userType === 'charity'}
                          className="enhanced-auth-file-input"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-hope-gray-500 mt-2">
                      * Please upload legal documentation confirming your charity status. This will be reviewed by our team.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  className="enhanced-auth-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating account...' : 'Create Account'}
                </button>
              </form>

              <div className="enhanced-auth-link">
                <p className="enhanced-auth-link-text">
                  Already have an account? <Link to="/login" className="enhanced-auth-link-anchor">Sign In</Link>
                </p>

                {userType === 'user' && (
                  <p className="text-center mt-2 text-sm text-hope-gray-500">
                    Are you a charity? <span className="enhanced-auth-link-anchor cursor-pointer" onClick={() => setUserType('charity')}>Sign up here</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Signup;
