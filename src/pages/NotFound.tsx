
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-hope-gray px-4">
        <h1 className="text-8xl md:text-9xl font-bold text-hope-orange mb-4">404</h1>
        <p className="text-2xl md:text-3xl text-hope-dark-gray mb-8 text-center">
          Oops! We couldn't find that page
        </p>
        <p className="text-gray-600 max-w-md text-center mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button 
          className="bg-hope-orange hover:bg-hope-dark-orange text-white"
          size="lg"
          asChild
        >
          <Link to="/">
            Return to Home
          </Link>
        </Button>
      </div>
    </MainLayout>
  );
};

export default NotFound;
