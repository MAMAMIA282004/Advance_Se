
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import NotFound from "./pages/NotFound";
import UserDashboard from "./pages/dashboard/UserDashboard";
import CharityDashboard from "./pages/dashboard/CharityDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import CharitiesList from "./pages/charities/CharitiesList";
import CharityProfile from "./pages/charities/CharityProfile";
import About from "./pages/About";
import { GetUserData, HasRole } from "./lib/utils";
import DonationSuccess from "./pages/DonationSuccess";

const queryClient = new QueryClient();

const userData = GetUserData();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {userData === null && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
          {(userData && HasRole("user")) &&
            <>
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/donationSuccess" element={<DonationSuccess />} />
            </>
          }
          {(userData && HasRole("charity")) &&
            <Route path="/charity-dashboard" element={<CharityDashboard />} />
          }
          {(userData && HasRole("admin")) &&
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          }
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/charities" element={<CharitiesList />} />
          <Route path="/charity/:username" element={<CharityProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
