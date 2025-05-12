
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Heart, Menu, X, Search, Settings, LogOut } from 'lucide-react';
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
        <NavLink to="/" className="flex items-center gap-2 text-hope-orange">
          <Icon size={8}></Icon>
          <span className="font-bold text-xl md:text-2xl">HopeGivers</span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-hope-dark-gray hover:text-hope-orange transition-colors ${isActive ? "text-hope-orange border-b border-hope-orange" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/charities"
            className={({ isActive }) =>
              `text-hope-dark-gray hover:text-hope-orange transition-colors ${isActive ? "text-hope-orange border-b border-hope-orange" : ""
              }`
            }
          >
            Charities
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-hope-dark-gray hover:text-hope-orange transition-colors ${isActive ? "text-hope-orange border-b border-hope-orange" : ""
              }`
            }
          >
            About
          </NavLink>
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
                      Admin Dashboard
                    </Link>
                    : userData?.roles[0] === 'charity' ?
                      <Link to="/dashboard/charity" className="text-hope-dark-gray px-2 py-3 hover:text-hope-orange transition-colors">
                        Charity Dashboard
                      </Link> :
                      <Link to="/dashboard/user" className="text-hope-dark-gray px-2 py-3 hover:text-hope-orange transition-colors">
                        User Dashboard
                      </Link>
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
                    <div className="flex flex-col gap-3">
                      {userData?.roles.length > 1 ?
                        <Link to="/dashboard/admin" className="flex gap-3 items-center text-lg text-hope-dark-gray px-2 py-3 hover:text-hope-orange transition-colors">
                          <Settings />
                          <p>Admin Dashboard</p>
                        </Link>
                        : userData?.roles[0] === 'charity' ?
                          <Link to="/dashboard/charity" className="flex gap-3 items-center text-lg text-hope-dark-gray px-2 py-3 hover:text-hope-orange transition-colors">
                            <Settings />
                            <p>Charity Dashboard</p>
                          </Link> :
                          < Link to="/dashboard/user" className="flex gap-3 items-center text-lg text-hope-dark-gray px-2 py-3 hover:text-hope-orange transition-colors">
                            <Settings />
                            <p>User Dashboard</p>
                          </Link >
                      }
                      <div className="flex gap-3 items-center text-lg text-hope-dark-gray px-3 py-3 hover:text-hope-orange transition-colors">
                        <LogOut />
                        <Button type='submit' name='logout' variant='ghost' className="text-hope-dark-gray p-0 hover:bg-white text-lg hover:text-hope-orange transition-colors" onClick={() => Logout()}>Logout</Button>
                      </div>
                    </div>
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
