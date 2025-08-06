import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import Icon from '../../components/ui/icon';
import { LoginCall } from '@/Api/Auth/authinicatiton';
import { IUserData } from '@/interfaces/interfaces';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/lib/validations'
import { toast } from 'sonner';
import { SetUserData, GetDashboardPath } from '@/lib/utils';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsSubmitting(true);
    try {
      const response: { statusCode: number, message: string, data: IUserData } = await LoginCall(data.email, data.password);

      console.log('Login response:', response); // Debug log

      // Check for successful response
      if (response?.statusCode === 200 && response?.data) {
        const userData = response.data;

        console.log('User data received:', userData); // Debug log
        console.log('Roles data:', userData.roles, 'Type:', typeof userData.roles); // Debug roles

        // Enhanced user data storage
        SetUserData(userData);

        toast.success('Login successful!');

        // Enhanced redirect based on user role
        const dashboardPath = GetDashboardPath();
        console.log('Dashboard path:', dashboardPath); // Debug path
        navigate(dashboardPath);
        return;
      }

      // Handle cases where statusCode is 200 but data is null or missing
      if (response?.statusCode === 200 && !response?.data) {
        toast.error(response?.message || 'Invalid credentials. Please check your email and password.');
        return;
      }

      // Handle other status codes
      if (response?.statusCode !== 200) {
        toast.error(response?.message || 'Login failed. Please try again.');
        return;
      }

      // Fallback error
      toast.error('Login failed. Please check your credentials.');

    } catch (error: unknown) {
      console.error('Login error:', error);
      let errorMessage = 'Login failed. Please check your credentials.';

      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string, errors?: string[] } } };
        errorMessage = axiosError.response?.data?.message ||
          axiosError.response?.data?.errors?.[0] ||
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
    <MainLayout>
      <div className="enhanced-auth-container">
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Left side with image - Hidden on mobile */}
          <div className="hidden md:flex md:flex-col md:w-1/2 enhanced-auth-side p-10">
            <div className="flex justify-center items-center h-full">
              <img src="/lovable-uploads/login.png" alt="HopeGivers illustration" className="max-w-md w-full" />
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
                <p className="enhanced-auth-subtitle">Welcome back! Please sign in to your account</p>
              </div>

              <form className="enhanced-auth-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="enhanced-auth-input-group">
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="Email Address"
                    autoComplete='email'
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
                    autoComplete='current-password'
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

                <button
                  type="submit"
                  className="enhanced-auth-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <div className="enhanced-auth-link">
                <p className="enhanced-auth-link-text">
                  Don't have an account? <Link to="/signup" className="enhanced-auth-link-anchor">Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
