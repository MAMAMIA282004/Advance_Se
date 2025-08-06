
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import { ArrowRight, Gift, HandHelping, Star, Users } from 'lucide-react';
import CharityCard from '@/components/charity/CharityCard';
import { GetAllCharities } from '@/Api/charities/charities';
import { IHomeCharities } from '@/interfaces/interfaces';
import { useEffect, useState } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [featuredCharities, setFeaturedCharities] = useState<IHomeCharities[]>([]);

  useEffect(() => {
    const fetchCharities = async () => {
      const data = await GetAllCharities();
      setFeaturedCharities(data.length >= 3 ? [data[0], data[1], data[2]] : data);
    };

    fetchCharities();
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="hero-professional hero-pattern">
        <div className="container mx-auto py-20 md:py-32">
          <div className="md:w-2/3 lg:w-1/2 text-center md:text-left hero-content animate-fade-in-left">
            <h1 className="hero-title">
              Make a difference with your <span className="highlight">generosity</span>
            </h1>
            <p className="hero-subtitle">
              Connect with trusted charities and create real impact. Whether you're donating or seeking help, HopeGivers brings communities together.
            </p>
            <div className="hero-cta">
              <Button
                onClick={() => navigate('/charities')}
                className="btn-primary-professional animate-pulse"
              >
                Explore Charities
              </Button>
              <Button
                onClick={() => navigate('/signup')}
                className="btn-secondary-professional"
              >
                Join as a Charity
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-professional bg-hope-gray-50">
        <div className="container mx-auto">
          <h2 className="section-title animate-fade-in-up">
            Get Involved Today
          </h2>
          <p className="section-subtitle animate-fade-in-up">
            Discover various ways you can contribute to a better world through HopeGivers. Every action, big or small, makes a difference.
          </p>
          <div className="grid-professional grid-feature">
            <div className="feature-card animate-fade-in-up">
              <img src="/lovable-uploads/donate.jpg" className="feature-image" alt="Donate" />
              <h3 className="feature-title">Support others by donating money or items they truly need</h3>
              <p className="feature-description">Your financial contributions and material donations directly support various causes, providing essential resources to those in need.</p>
            </div>
            <div className="feature-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <img src="/lovable-uploads/requestHelp.jpeg" className="feature-image" alt="Request Help" />
              <h3 className="feature-title">If you're in need, we're here to connect you with real help</h3>
              <p className="feature-description">Access a network of verified charities ready to provide assistance, ensuring you receive the support you deserve.</p>
            </div>
            <div className="feature-card animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <img src="/lovable-uploads/volunteer.jpg" className="feature-image" alt="Volunteer" />
              <h3 className="feature-title">Join our platform as a verified charity and reach more people in need</h3>
              <p className="feature-description">Expand your reach and impact by becoming a part of our trusted network, connecting with a wider community of donors and volunteers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="section-professional bg-white">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center gap-12">
          <div className="lg:w-1/2 space-y-6 animate-fade-in-left">
            <h2 className="section-title text-left">Who We Are</h2>
            <h3 className="text-2xl font-semibold text-hope-gray-800">Introduction</h3>
            <p className="text-hope-gray-600 leading-relaxed">
              HopeGivers was founded with a simple but powerful mission: to connect those in need with those who want to help. We believe that everyone has something to give, whether it's money, time, skills, or material goods. Our platform makes it easy and transparent to support verified charities that are making a real difference in communities.
            </p>
            <p className="text-hope-gray-600 leading-relaxed">
              We carefully vet each charity that joins our platform to ensure they are legitimate and effectively using donations. Users can browse charities, learn about their work, and choose to donate money or goods. For those in need, we provide a simple way to request help from appropriate organizations.
            </p>
          </div>

          <div className="lg:w-1/2 animate-fade-in-right">
            <img src="/lovable-uploads/whoAreWe.jpg" alt="Who We Are Image" className="w-full h-auto object-cover rounded-2xl shadow-xl" />
          </div>
        </div>
      </section>

      {/* Featured Charities Section */}
      <section className="section-professional bg-hope-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8 animate-fade-in-up">
            <h2 className="section-title text-left mb-0">Featured Charities</h2>
            <Button variant="ghost" asChild className="btn-ghost-professional">
              <Link to="/charities" className="flex items-center gap-2">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid-professional grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {featuredCharities.map((charity, index) => (
              <CharityCard key={charity.userName} charity={charity} className={`animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section-professional bg-hope-orange-500 text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto animate-fade-in-up">
            Join HopeGivers today and become a part of a community dedicated to creating positive change. Your support can transform lives.
          </p>
          <div className="flex justify-center gap-4 animate-fade-in-up">
            <Button
              onClick={() => navigate('/signup')}
              className="btn-secondary-professional bg-white text-hope-orange-500 hover:bg-hope-orange-100"
            >
              Sign Up Now
            </Button>
            <Button
              onClick={() => navigate('/about')}
              className="btn-ghost-professional text-white border-white hover:bg-white hover:text-hope-orange-500"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;

