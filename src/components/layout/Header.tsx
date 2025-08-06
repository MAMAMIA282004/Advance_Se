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
import { GetUserData, Logout, IsAuthenticated, HasRole, GetDashboardPath } from '@/lib/utils';

const Header = () => {
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  useEffect(() => {
    // Check authentication status on component mount and route changes
    const checkAuth = () => {
      const isAuth = IsAuthenticated();
      const user = GetUserData();
      setIsLoggedIn(isAuth);
      setUserData(user);
    };

    checkAuth();

    // Listen for storage changes (if user logs in/out in another tab)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  function ChangeMenuState() {
    setMenuOpen(!menuOpen);
  }

  const handleLogout = () => {
    Logout();
    setIsLoggedIn(false);
    setUserData(null);
    navigate('/');
  };

  const handleDashboardNavigation = () => {
    const dashboardPath = GetDashboardPath();
    navigate(dashboardPath);
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
                {/* Check if user has multiple roles or use HasRole for single role */}
                {((Array.isArray(userData?.roles) && userData.roles.length > 1) ||
                  (typeof userData?.roles === 'string' && userData.roles.includes(','))) ? (
                  // Multiple roles - show all available dashboards
                  <>
                    {HasRole('Admin') && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin-dashboard" className="nav-link py-2 px-3 flex items-center gap-2">
                          <Settings className="h-4 w-4" /> Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {HasRole('Charity') && (
                      <DropdownMenuItem asChild>
                        <Link to="/charity-dashboard" className="nav-link py-2 px-3 flex items-center gap-2">
                          <Settings className="h-4 w-4" /> Charity Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {HasRole('User') && (
                      <DropdownMenuItem asChild>
                        <Link to="/user-dashboard" className="nav-link py-2 px-3 flex items-center gap-2">
                          <Settings className="h-4 w-4" /> User Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                  </>
                ) : (
                  // Single role - show primary dashboard
                  <DropdownMenuItem asChild>
                    <Link to={GetDashboardPath()} className="nav-link py-2 px-3 flex items-center gap-2">
                      <Settings className="h-4 w-4" /> Dashboard
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
                      {/* Check if user has multiple roles */}
                      {((Array.isArray(userData?.roles) && userData.roles.length > 1) ||
                        (typeof userData?.roles === 'string' && userData.roles.includes(','))) ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button className="btn-primary-professional w-full">
                              Dashboard <Settings className="w-4 h-4 ml-2" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {HasRole('Admin') && (
                              <DropdownMenuItem onClick={() => navigate('/admin-dashboard')}>
                                Admin Dashboard
                              </DropdownMenuItem>
                            )}
                            {HasRole('Charity') && (
                              <DropdownMenuItem onClick={() => navigate('/charity-dashboard')}>
                                Charity Dashboard
                              </DropdownMenuItem>
                            )}
                            {HasRole('User') && (
                              <DropdownMenuItem onClick={() => navigate('/user-dashboard')}>
                                User Dashboard
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <Button
                          onClick={handleDashboardNavigation}
                          className="btn-primary-professional w-full"
                        >
                          <Settings className="h-5 w-5 mr-2" /> Dashboard
                        </Button>
                      )}
                      <Button
                        type='button'
                        name='logout'
                        variant='outline'
                        className="btn-secondary-professional w-full"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-5 w-5 mr-2" /> Logout
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


