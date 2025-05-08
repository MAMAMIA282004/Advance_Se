
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-hope-orange text-white">
      <div className="container mx-auto py-10 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 fill-white stroke-white" />
              <span className="font-bold text-xl">HopeGivers</span>
            </div>
            <p className="text-white/80 max-w-xs">
              Connecting generous donors with impactful charities to make a difference in our communities.
            </p>
            <div className="pt-2">
              <h3 className="font-medium mb-2">For news</h3>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="py-2 px-3 text-hope-dark-gray rounded-l-md focus:outline-none w-full max-w-[200px]"
                />
                <Button 
                  type="submit" 
                  className="bg-hope-dark-orange hover:bg-hope-dark-orange/90 rounded-l-none"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div className="space-y-3">
              <h3 className="font-medium text-lg">Main Links</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
                <Link to="/categories" className="block text-white/80 hover:text-white transition-colors">
                  Categories
                </Link>
                <Link to="/search" className="block text-white/80 hover:text-white transition-colors">
                  Search
                </Link>
                <Link to="/about" className="block text-white/80 hover:text-white transition-colors">
                  About us
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-lg">Company</h3>
              <div className="space-y-2">
                <Link to="/blog" className="block text-white/80 hover:text-white transition-colors">
                  Blog
                </Link>
                <Link to="/careers" className="block text-white/80 hover:text-white transition-colors">
                  Careers
                </Link>
                <Link to="/news" className="block text-white/80 hover:text-white transition-colors">
                  News
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/80 text-sm">© 2025 HopeGivers</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/terms" className="text-white/80 hover:text-white text-sm">
              Terms and conditions
            </Link>
            <Link to="/privacy" className="text-white/80 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-white/80 hover:text-white text-sm">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
