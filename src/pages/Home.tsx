
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import { Heart, ArrowRight, Gift, HandHelping, Star, Users } from 'lucide-react';
import CharityCard from '@/components/charity/CharityCard';

// Mock data for featured charities
const featuredCharities = [
  {
    id: 1,
    name: "Children's Hope Foundation",
    category: "Children & Youth",
    logo: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=200&h=200",
    description: "Supporting vulnerable children with education, healthcare and nutrition programs.",
    verified: true
  },
  {
    id: 2,
    name: "Ocean Conservation Alliance",
    logo: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?auto=format&fit=crop&q=80&w=200&h=200",
    category: "Environment",
    description: "Working to protect marine ecosystems and endangered marine species.",
    verified: true
  },
  {
    id: 3,
    name: "Global Hunger Relief",
    logo: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&q=80&w=200&h=200",
    category: "Hunger Relief",
    description: "Fighting food insecurity with sustainable agriculture solutions.",
    verified: false
  }
];

const Home = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="hero-pattern">
        <div className='relative w-full flex items-center h-fit'>
          <img src="/cover.png" alt="coverPhoto" draggable={false} className='absolute object-cover w-full h-full' />
          <div className="container mx-auto z-10 py-32">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center md:text-start">
                Make a difference with your <span className="text-hope-orange">generosity</span>
              </h1>
              <p className="text-lg text-white mb-8 max-w-lg">
                Connect with trusted charities and create real impact. Whether you're donating or seeking help, HopeGivers brings communities together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-hope-gray rounded-lg p-8">
              <div className="flex justify-center mb-4">
                <Gift className="h-12 w-12 text-hope-orange" />
              </div>
              <h3 className="text-4xl font-bold mb-2">1,240+</h3>
              <p className="text-gray-600">Successful Donations</p>
            </div>

            <div className="bg-hope-gray rounded-lg p-8">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-hope-orange" />
              </div>
              <h3 className="text-4xl font-bold mb-2">380+</h3>
              <p className="text-gray-600">Registered Charities</p>
            </div>

            <div className="bg-hope-gray rounded-lg p-8">
              <div className="flex justify-center mb-4">
                <HandHelping className="h-12 w-12 text-hope-orange" />
              </div>
              <h3 className="text-4xl font-bold mb-2">2,500+</h3>
              <p className="text-gray-600">People Helped</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Charities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-hope-dark-gray">Featured Charities</h2>
            <Button variant="ghost" asChild className="text-hope-orange hover:text-hope-dark-orange">
              <Link to="/charities" className="flex items-center gap-2">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCharities.map((charity) => (
              <CharityCard key={charity.id} charity={charity} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-hope-gray py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-hope-dark-gray mb-12">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="relative mb-6 mx-auto">
                <div className="w-16 h-16 bg-hope-orange rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Create an Account</h3>
              <p className="text-gray-600">
                Sign up as a donor or a charity organization with a simple registration process.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="relative mb-6 mx-auto">
                <div className="w-16 h-16 bg-hope-orange rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Browse or Request</h3>
              <p className="text-gray-600">
                Explore verified charities to donate to or submit a request for assistance.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="relative mb-6 mx-auto">
                <div className="w-16 h-16 bg-hope-orange rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Make a Difference</h3>
              <p className="text-gray-600">
                Complete your donation securely or receive the help you need.
              </p>
            </div>
          </div>
        </div>
      </section>

    </MainLayout>
  );
};

export default Home;
