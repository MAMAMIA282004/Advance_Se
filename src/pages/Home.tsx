
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import { Heart, ArrowRight, Gift, HandHelping, Star, Users } from 'lucide-react';
import CharityCard from '@/components/charity/CharityCard';
import { GetAllCharities } from '@/Api/charities/charities';
import { IHomeCharities } from '@/interfaces/interfaces';
import { useEffect, useState } from 'react';

const Home = () => {
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
      <section className="bg-white py-10 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className='text-hope-orange text-center pb-10 font-bold text-5xl'> Get Involved Today</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
            <div className="rounded-lg flex flex-col h-full">
              <div className="aspect-w-4 aspect-[4/3]">
                <img src="/lovable-uploads/donate.jpg" className='w-full h-full object-cover' alt="donate" />
              </div>
              <h2 className='px-2 py-5 text-lg font-medium flex items-center justify-center flex-grow'>Support others by donating money or items they truly need </h2>
            </div>
            <div className="rounded-lg flex flex-col h-full">
              <div className="aspect-w-4 aspect-[4/3]">
                <img src="/lovable-uploads/requestHelp.jpeg" className='w-full h-full object-cover' alt="donate" />
              </div>
              <h2 className='px-2 py-5 text-lg font-medium flex items-center justify-center flex-grow'> If you're in need, we're here to connect you with real help</h2>
            </div>
            <div className="rounded-lg flex flex-col h-full">
              <div className="aspect-w-4 aspect-[4/3]">
                <img src="/lovable-uploads/volunteer.jpg" className='w-full h-full object-cover' alt="donate" />
              </div>
              <h2 className='px-2 py-5 text-lg font-medium flex items-center justify-center flex-grow'> Join our platform as a verified charity and reach more people in need</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Charities */}
      <section className="py-10">
        <div className="container text-center lg:text-start mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="lg:w-1/2 space-y-3">
            <h2 className="text-4xl font-extrabold text-hope-orange">Who We Are</h2>
            <h3 className="text-xl font-semibold">Introduction</h3>
            <p className="text-gray-800 leading-7">
              HopeGivers was founded with a simple but powerful mission: to connect those in need with those who want to help. We believe that everyone has something to give, whether it's money, time, skills, or material goods. Our platform makes it easy and transparent to support verified charities that are making a real difference in communities.
            </p>
            <p className="text-gray-800 leading-7">
              We carefully vet each charity that joins our platform to ensure they are legitimate and effectively using donations. Users can browse charities, learn about their work, and choose to donate money or goods. For those in need, we provide a simple way to request help from appropriate organizations.            </p>
          </div>

          <div className="lg:w-1/2">
            <img src="/lovable-uploads/whoAreWe.jpg" alt="Who We Are Image" className="w-full max-h-fit object-cover rounded-md shadow-md" />
          </div>
        </div>
      </section>

      {/* Featured Charities */}
      <section className="py-10">
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
              <CharityCard key={charity.userName} charity={charity} />
            ))}
          </div>
        </div>
      </section>

    </MainLayout>
  );
};

export default Home;
