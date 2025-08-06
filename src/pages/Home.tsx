
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import { ArrowRight, Gift, HandHelping, Star, Users, CheckCircle } from 'lucide-react';
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
      {/* Enhanced Hero Section */}
      <section className="hero-professional enhanced-bg-pattern">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center hero-content animate-fade-in-left">
            <div className="mb-6 inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 text-hope-orange-600 font-semibold text-sm shadow-lg">
              <Star className="w-4 h-4 mr-2 text-hope-orange-500" />
              Trusted by 10,000+ donors worldwide
            </div>
            <h1 className="hero-title">
              Make a difference with your <span className="highlight">generosity</span>
            </h1>
            <p className="hero-subtitle text-lg md:text-xl mb-8">
              Connect with trusted charities and create real impact. Whether you're donating or seeking help, HopeGivers brings communities together for a better tomorrow.
            </p>
            <div className="hero-cta mb-12">
              <Button
                onClick={() => navigate('/charities')}
                className="btn-primary-professional animate-pulse mr-4 px-8 py-3 text-lg"
              >
                <Gift className="w-5 h-5 mr-2" />
                Explore Charities
              </Button>
              <Button
                onClick={() => navigate('/signup')}
                className="btn-secondary-professional px-8 py-3 text-lg"
              >
                <Users className="w-5 h-5 mr-2" />
                Join as a Charity
              </Button>
            </div>

            {/* Enhanced Statistics */}
            <div className="enhanced-stats">
              <div className="enhanced-stat-card">
                <span className="enhanced-stat-number">10K+</span>
                <span className="enhanced-stat-label">Happy Donors</span>
              </div>
              <div className="enhanced-stat-card">
                <span className="enhanced-stat-number">500+</span>
                <span className="enhanced-stat-label">Verified Charities</span>
              </div>
              <div className="enhanced-stat-card">
                <span className="enhanced-stat-number">$2M+</span>
                <span className="enhanced-stat-label">Donated</span>
              </div>
              <div className="enhanced-stat-card">
                <span className="enhanced-stat-number">50K+</span>
                <span className="enhanced-stat-label">Lives Impacted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="section-professional bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title animate-fade-in-up">
              Get Involved Today
            </h2>
            <p className="section-subtitle animate-fade-in-up">
              Discover various ways you can contribute to a better world through HopeGivers. Every action, big or small, makes a difference in someone's life.
            </p>
          </div>

          <div className="grid-professional grid-feature">
            <div className="enhanced-card animate-fade-in-up">
              <img src="/lovable-uploads/donate.jpg" className="enhanced-card-image" alt="Donate" />
              <div className="enhanced-card-content">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-hope-orange-100 rounded-full flex items-center justify-center mr-3">
                    <Gift className="w-6 h-6 text-hope-orange-600" />
                  </div>
                  <h3 className="enhanced-card-title">Donate & Make Impact</h3>
                </div>
                <p className="enhanced-card-description">
                  Your financial contributions and material donations directly support various causes, providing essential resources to those in need and creating lasting change.
                </p>
                <div className="enhanced-card-footer">
                  <Button
                    onClick={() => navigate('/charities')}
                    className="btn-primary-professional"
                  >
                    Start Donating
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="enhanced-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <img src="/lovable-uploads/requestHelp.jpeg" className="enhanced-card-image" alt="Request Help" />
              <div className="enhanced-card-content">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-hope-blue-100 rounded-full flex items-center justify-center mr-3">
                    <HandHelping className="w-6 h-6 text-hope-blue-600" />
                  </div>
                  <h3 className="enhanced-card-title">Get the Help You Need</h3>
                </div>
                <p className="enhanced-card-description">
                  Access a network of verified charities ready to provide assistance, ensuring you receive the support you deserve when life gets challenging.
                </p>
                <div className="enhanced-card-footer">
                  <Button
                    onClick={() => navigate('/auth/login')}
                    className="btn-secondary-professional"
                  >
                    Request Help
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="enhanced-card animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <img src="/lovable-uploads/volunteer.jpg" className="enhanced-card-image" alt="Volunteer" />
              <div className="enhanced-card-content">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-hope-green-100 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-6 h-6 text-hope-green-600" />
                  </div>
                  <h3 className="enhanced-card-title">Join Our Network</h3>
                </div>
                <p className="enhanced-card-description">
                  Expand your reach and impact by becoming a part of our trusted network, connecting with a wider community of donors and volunteers worldwide.
                </p>
                <div className="enhanced-card-footer">
                  <Button
                    onClick={() => navigate('/signup')}
                    className="btn-ghost-professional border-hope-green-500 text-hope-green-600 hover:bg-hope-green-50"
                  >
                    Join Network
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Who We Are Section */}
      <section className="section-professional bg-hope-gray-50">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center gap-12">
          <div className="lg:w-1/2 space-y-6 animate-fade-in-left">
            <div className="inline-flex items-center bg-hope-orange-100 rounded-full px-4 py-2 text-hope-orange-700 font-semibold text-sm mb-4">
              <Users className="w-4 h-4 mr-2" />
              About Our Mission
            </div>
            <h2 className="section-title text-left mb-6">Who We Are</h2>
            <div className="enhanced-profile-card">
              <h3 className="text-2xl font-bold text-hope-gray-800 mb-4">Our Story</h3>
              <p className="text-hope-gray-600 leading-relaxed mb-6">
                HopeGivers was founded with a simple but powerful mission: to connect those in need with those who want to help. We believe that everyone has something to give, whether it's money, time, skills, or material goods. Our platform makes it easy and transparent to support verified charities that are making a real difference in communities.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-hope-orange-600">2019</div>
                  <div className="text-sm text-hope-gray-600">Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-hope-orange-600">50+</div>
                  <div className="text-sm text-hope-gray-600">Countries</div>
                </div>
              </div>
              <p className="text-hope-gray-600 leading-relaxed">
                We carefully vet each charity that joins our platform to ensure they are legitimate and effectively using donations. Users can browse charities, learn about their work, and choose to donate money or goods. For those in need, we provide a simple way to request help from appropriate organizations.
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 animate-fade-in-right">
            <div className="relative">
              <img
                src="/lovable-uploads/whoAreWe.jpg"
                alt="Who We Are Image"
                className="w-full h-auto object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-hope-orange-600">4.9★</div>
                  <div className="text-sm text-hope-gray-600">Trust Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Featured Charities Section */}
      <section className="section-professional bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-hope-blue-100 rounded-full px-4 py-2 text-hope-blue-700 font-semibold text-sm mb-4">
              <Star className="w-4 h-4 mr-2" />
              Verified Partners
            </div>
            <h2 className="section-title mb-4">Featured Charities</h2>
            <p className="section-subtitle">
              Meet some of our most impactful charity partners who are making a real difference in their communities
            </p>
          </div>

          <div className="grid-professional grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {featuredCharities.map((charity, index) => (
              <div key={charity.userName} className="enhanced-charity-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={charity.photoUrl ? `https://ma3ansawa.runasp.net${charity.photoUrl}` : `https://ui-avatars.com/api/?name=${charity.charityName}`}
                      alt={charity.charityName}
                      className="enhanced-charity-image mr-4"
                    />
                    <div>
                      <h3 className="enhanced-card-title text-lg">{charity.charityName}</h3>
                      <p className="text-hope-gray-500 text-sm flex items-center">
                        <Star className="w-3 h-3 mr-1 text-hope-orange-500" />
                        Verified Charity
                      </p>
                    </div>
                  </div>

                  <p className="text-hope-gray-600 text-sm mb-4 line-clamp-3">
                    {charity.description || "Dedicated to making a positive impact in the community through various charitable initiatives and support programs."}
                  </p>

                  <div className="flex items-center justify-between text-sm text-hope-gray-500 mb-4">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {charity.address}
                    </span>
                  </div>

                  <Link
                    to={`/charity/${charity.userName}`}
                    className="block w-full text-center bg-hope-orange-500 hover:bg-hope-orange-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" asChild className="btn-secondary-professional px-8 py-3">
              <Link to="/charities" className="flex items-center gap-2">
                View All Charities
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action Section */}
      <section className="enhanced-page-header">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold text-sm">
              <HandHelping className="w-5 h-5 mr-2" />
              Join the Movement
            </div>
            <h2 className="enhanced-page-title mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="enhanced-page-subtitle mb-12">
              Join HopeGivers today and become a part of a community dedicated to creating positive change. Your support can transform lives and build stronger communities around the world.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
              <Button
                onClick={() => navigate('/signup')}
                className="bg-white text-orange-500 hover:bg-hope-orange-50 px-8 py-4 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <Users className="w-6 h-6 mr-2" />
                Sign Up Now
              </Button>
              <Button
                onClick={() => navigate('/about')}
                className="border-2 border-white text-white hover:bg-white hover:text-hope-orange-500 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
              >
                <ArrowRight className="w-6 h-6 mr-2" />
                Learn More
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/80 text-sm">
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-300" />
                4.9/5 Trust Rating
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                SSL Secured
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-300" />
                50,000+ Members
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;

