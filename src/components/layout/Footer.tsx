import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Icon from '../ui/icon';

const Footer = () => {
  return (
    <footer className="professional-footer">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Icon size={8}></Icon>
              <span className="header-logo text-white">HopeGivers</span>
            </div>
            <p className="text-hope-gray-400 leading-relaxed">
              Connecting generous donors with impactful charities to make a difference in our communities.
            </p>
            <div className="flex space-x-4 footer-social-icons">
              <a href="#" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
              <a href="#" aria-label="Twitter"><Twitter className="h-5 w-5" /></a>
              <a href="#" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="footer-heading">Main Links</h3>
            <ul className="footer-links">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/categories" className="hover:underline">Categories</Link></li>
              <li><Link to="/search" className="hover:underline">Search</Link></li>
              <li><Link to="/about" className="hover:underline">About us</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="footer-heading">Company</h3>
            <ul className="footer-links">
              <li><Link to="/blog" className="hover:underline">Blog</Link></li>
              <li><Link to="/careers" className="hover:underline">Careers</Link></li>
              <li><Link to="/news" className="hover:underline">News</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="footer-heading">Stay Updated</h3>
            <p className="text-hope-gray-400">Subscribe to our newsletter for the latest updates.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="py-2 px-4 rounded-lg bg-hope-gray-700 text-white placeholder-hope-gray-400 focus:outline-none focus:ring-2 focus:ring-hope-orange-500 w-full"
              />
              <Button
                type="submit"
                className="btn-primary-professional flex-shrink-0"
              >
                <Mail className="h-4 w-4 mr-2" /> Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-hope-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-hope-gray-500 text-sm">
          <p className="mb-4 md:mb-0">© {new Date().getFullYear()} HopeGivers. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/terms" className="hover:underline">Terms and conditions</Link>
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link to="/cookies" className="hover:underline">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


