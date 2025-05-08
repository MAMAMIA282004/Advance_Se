
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Heart, Menu, X, Search } from 'lucide-react';
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <Link to="/" className="flex items-center gap-2 text-hope-orange">
          <Heart className="h-6 w-6 fill-hope-orange stroke-hope-orange" />
          <span className="font-bold text-xl md:text-2xl">HopeGivers</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-hope-dark-gray hover:text-hope-orange transition-colors">
            Home
          </Link>
          <Link to="/charities" className="text-hope-dark-gray hover:text-hope-orange transition-colors">
            Charities
          </Link>
          <Link to="/about" className="text-hope-dark-gray hover:text-hope-orange transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-hope-dark-gray hover:text-hope-orange transition-colors">
            Contact
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="py-2 pl-3 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50 text-sm"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
          
          {!isLoggedIn ? (
            <>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
                className="text-hope-dark-gray hover:text-hope-orange hover:bg-hope-gray"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-hope-orange hover:bg-hope-dark-orange text-white"
              >
                Sign Up
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => navigate('/dashboard')}
              className="bg-hope-orange hover:bg-hope-dark-orange text-white"
            >
              Dashboard
            </Button>
          )}
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-10">
                <Link to="/" className="text-xl font-medium hover:text-hope-orange transition-colors">
                  Home
                </Link>
                <Link to="/charities" className="text-xl font-medium hover:text-hope-orange transition-colors">
                  Charities
                </Link>
                <Link to="/about" className="text-xl font-medium hover:text-hope-orange transition-colors">
                  About
                </Link>
                <Link to="/contact" className="text-xl font-medium hover:text-hope-orange transition-colors">
                  Contact
                </Link>
                <div className="border-t pt-6 mt-2">
                  {!isLoggedIn ? (
                    <div className="flex flex-col gap-3">
                      <Button 
                        onClick={() => navigate('/login')}
                        variant="outline"
                        className="w-full"
                      >
                        Sign In
                      </Button>
                      <Button 
                        onClick={() => navigate('/signup')}
                        className="w-full bg-hope-orange hover:bg-hope-dark-orange text-white"
                      >
                        Sign Up
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => navigate('/dashboard')}
                      className="w-full bg-hope-orange hover:bg-hope-dark-orange text-white"
                    >
                      Dashboard
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
