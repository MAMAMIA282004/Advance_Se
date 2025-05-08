
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <MainLayout hideFooter>
      <div className="min-h-screen bg-hope-gray flex flex-col md:flex-row">
        {/* Left side with image - Hidden on mobile */}
        <div className="hidden md:flex md:flex-col md:w-1/2 bg-white p-10">
          <div className="flex justify-center items-center h-full">
            <img src="public/lovable-uploads/50fe7dd5-46f6-49f6-9487-393d53a78b65.png" alt="HopeGivers illustration" className="max-w-md w-full" />
          </div>
        </div>
        
        {/* Right side with form */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <div className="mb-10 text-center">
              <div className="flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=64&h=64"
                  alt="HopeGivers Logo"
                  className="h-16 w-16 rounded-full border-4 border-hope-orange mb-3" 
                />
              </div>
              <h1 className="text-2xl font-bold text-hope-dark-gray mb-2">HopeGivers</h1>
              <p className="text-gray-600">Please fill your detail to access your account</p>
            </div>
            
            <form className="space-y-5">
              <div>
                <input 
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                />
              </div>
              
              <div className="relative">
                <input 
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
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input 
                    id="remember_me" 
                    type="checkbox" 
                    className="h-4 w-4 text-hope-orange border-gray-300 rounded focus:ring-hope-orange"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-500">
                    Remember me
                  </label>
                </div>
                <div>
                  <Link to="/forgot-password" className="text-sm text-hope-orange hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-hope-orange hover:bg-hope-dark-orange text-white py-3 font-medium"
              >
                Sign In
              </Button>
              
              <div className="flex items-center justify-center my-4">
                <span className="border-b flex-grow border-gray-300"></span>
                <span className="px-3 text-gray-500 text-sm">Or sign in with</span>
                <span className="border-b flex-grow border-gray-300"></span>
              </div>
              
              <Button 
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="h-4 w-4" fill="currentColor">
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                </svg>
                Sign in with Google
              </Button>
            </form>
            
            <p className="text-center mt-8 text-gray-600">
              Don't have an account? <Link to="/signup" className="text-hope-orange font-medium hover:underline">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
