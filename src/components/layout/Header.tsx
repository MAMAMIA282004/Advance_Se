
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Heart, Menu, X, Search, Settings } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import Icon from '../ui/icon';
import { Switch } from '../ui/switch';
import { IUserData } from '@/interfaces/interfaces';
import { GetUserData, Logout } from '@/lib/utils';

const Header = () => {
  const userData: IUserData = GetUserData();
  const [isLoggedIn, setIsLoggedIn] = useState(userData !== null);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  function ChangeMenuState() {
    setMenuOpen(menuOpen ? false : true)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <Link to="/" className="flex items-center gap-2 text-hope-orange">
          <Icon size={8}></Icon>
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
            <DropdownMenu open={menuOpen} onOpenChange={ChangeMenuState} >
              <DropdownMenuTrigger className="bg-hope-orange hover:bg-hope-dark-orange text-white p-2 rounded-full focus:outline-none"><Settings /></DropdownMenuTrigger>
              <DropdownMenuContent className='flex flex-col'>
                <>
                  {userData?.roles.length > 1 ?
                    <Link to="/dashboard/admin" className="text-hope-dark-gray px-2 py-3 hover:text-hope-orange transition-colors">
                      Admin
                    </Link>
                    : userData?.roles[0] === 'charity' ?
                      <Link to="/dashboard/charity" className="text-hope-dark-gray px-2 py-3 hover:text-hope-orange transition-colors">
                        Charity
                      </Link> :
                      < Link to="/dashboard/user" className="text-hope-dark-gray px-2 py-3 hover:text-hope-orange transition-colors">
                        User
                      </Link >
                  }
                  <Button type='submit' name='logout' variant='ghost' className="text-hope-dark-gray hover:bg-white px-2 py-6 justify-start text-base hover:text-hope-orange transition-colors" onClick={() => Logout()}>Logout</Button>
                </>
              </DropdownMenuContent>
            </DropdownMenu>
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
                    <DropdownMenu open={menuOpen} onOpenChange={ChangeMenuState} >
                      <DropdownMenuTrigger className="bg-hope-orange hover:bg-hope-dark-orange text-white px-3 py-1 rounded-lg focus:outline-none">Dashboard</DropdownMenuTrigger>
                      <DropdownMenuContent className='flex flex-col'>
                        <Link to="/dashboard/user" className="text-hope-dark-gray px-1 py-2 hover:text-hope-orange transition-colors">
                          User
                        </Link>
                        <Link to="/dashboard/charity" className="text-hope-dark-gray px-1 py-2 hover:text-hope-orange transition-colors">
                          Charity
                        </Link>
                        <Link to="/dashboard/admin" className="text-hope-dark-gray px-1 py-2 hover:text-hope-orange transition-colors">
                          Admin
                        </Link>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div >
      </div >
    </header >
  );
};

export default Header;
