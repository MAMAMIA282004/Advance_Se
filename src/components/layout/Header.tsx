import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, Search, Settings, LogOut } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '../ui/dropdown-menu';
import Icon from '../ui/icon';
import { IUserData } from '@/interfaces/interfaces';
import { GetUserData, Logout } from '@/lib/utils';

const Header = () => {
  const userData: IUserData = GetUserData();
  const [isLoggedIn, setIsLoggedIn] = useState(userData !== null);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function ChangeMenuState() {
    setMenuOpen(!menuOpen);
  }

  const handleLogout = () => {
    Logout();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className={`professional-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <NavLink to="/" className="flex items-center gap-2">
          <Icon size={8}></Icon>
          <span className="header-logo">HopeGivers</span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/charities"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Charities
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            About
          </NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <div className="professional-search">
            <input
              type="text"
              placeholder="Search..."
            />
            <Search className="search-icon" />
          </div>

          {!isLoggedIn ? (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate('/login')}
                className="btn-ghost-professional"
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate('/signup')}
                className="btn-primary-professional"
              >
                Sign Up
              </Button>
            </>
          ) : (
            <DropdownMenu open={menuOpen} onOpenChange={ChangeMenuState}>
              <DropdownMenuTrigger asChild>
                <Button className="btn-primary-professional p-2 rounded-full focus:outline-none">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='flex flex-col p-2 min-w-[180px]'>
                {userData?.roles.length > 1 ? (
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/admin" className="nav-link py-2 px-3 flex items-center gap-2">
                      <Settings className="h-4 w-4" /> Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                ) : userData?.roles[0] === 'charity' ? (
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/charity" className="nav-link py-2 px-3 flex items-center gap-2">
                      <Settings className="h-4 w-4" /> Charity Dashboard
                    </Link>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/user" className="nav-link py-2 px-3 flex items-center gap-2">
                      <Settings className="h-4 w-4" /> User Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Button
                    type='button'
                    name='logout'
                    variant='ghost'
                    className="nav-link w-full justify-start py-2 px-3 flex items-center gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="btn-ghost-professional">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="flex flex-col gap-4 mt-8">
                <Link to="/" className="nav-link text-lg font-medium py-2 px-3">
                  Home
                </Link>
                <Link to="/charities" className="nav-link text-lg font-medium py-2 px-3">
                  Charities
                </Link>
                <Link to="/about" className="nav-link text-lg font-medium py-2 px-3">
                  About
                </Link>
                <div className="border-t pt-6 mt-4">
                  {!isLoggedIn ? (
                    <div className="flex flex-col gap-3">
                      <Button
                        onClick={() => navigate('/login')}
                        variant="outline"
                        className="btn-secondary-professional w-full"
                      >
                        Sign In
                      </Button>
                      <Button
                        onClick={() => navigate('/signup')}
                        className="btn-primary-professional w-full"
                      >
                        Sign Up
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {userData?.roles.length > 1 ? (
                        <Link to="/dashboard/admin" className="nav-link text-lg py-2 px-3 flex items-center gap-2">
                          <Settings className="h-5 w-5" /> Admin Dashboard
                        </Link>
                      ) : userData?.roles[0] === 'charity' ? (
                        <Link to="/dashboard/charity" className="nav-link text-lg py-2 px-3 flex items-center gap-2">
                          <Settings className="h-5 w-5" /> Charity Dashboard
                        </Link>
                      ) : (
                        <Link to="/dashboard/user" className="nav-link text-lg py-2 px-3 flex items-center gap-2">
                          <Settings className="h-5 w-5" /> User Dashboard
                        </Link>
                      )}
                      <Button
                        type='button'
                        name='logout'
                        variant='ghost'
                        className="nav-link w-full justify-start text-lg py-2 px-3 flex items-center gap-2"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-5 w-5" /> Logout
                      </Button>
                    </div>
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


