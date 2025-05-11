
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

const About = () => {
  return (
    <MainLayout>
      <div className="bg-hope-gray py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-hope-dark-gray mb-6 text-center">About HopeGivers</h1>

            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-hope-orange">Our Mission</h2>
              <p className="text-gray-700 mb-6">
                HopeGivers was founded with a simple but powerful mission: to connect those in need with those who want to help.
                We believe that everyone has something to give, whether it's money, time, skills, or material goods.
                Our platform makes it easy and transparent to support verified charities that are making a real difference in communities.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-hope-orange">How It Works</h2>
              <p className="text-gray-700 mb-6">
                We carefully vet each charity that joins our platform to ensure they are legitimate and effectively using donations.
                Users can browse charities, learn about their work, and choose to donate money or goods.
                For those in need, we provide a simple way to request help from appropriate organizations.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-hope-orange">Our Values</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-4 border-hope-orange pl-4">
                  <h3 className="font-medium mb-2">Transparency</h3>
                  <p className="text-gray-600 text-sm">We believe donors deserve to know exactly how their contributions are being used.</p>
                </div>
                <div className="border-l-4 border-hope-orange pl-4">
                  <h3 className="font-medium mb-2">Accessibility</h3>
                  <p className="text-gray-600 text-sm">Help should be available to everyone who needs it, regardless of circumstance.</p>
                </div>
                <div className="border-l-4 border-hope-orange pl-4">
                  <h3 className="font-medium mb-2">Efficiency</h3>
                  <p className="text-gray-600 text-sm">We maximize impact by connecting donors directly with verified charities.</p>
                </div>
                <div className="border-l-4 border-hope-orange pl-4">
                  <h3 className="font-medium mb-2">Community</h3>
                  <p className="text-gray-600 text-sm">We're building a global network of givers and recipients united by compassion.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-6 text-hope-orange">Our Team</h2>
              <p className="text-gray-700 mb-6">
                HopeGivers is run by a dedicated team of professionals who are passionate about making a difference.
                Our diverse backgrounds in technology, non-profit management, and community organizing come together
                to create a platform that truly serves both donors and those in need.
              </p>

            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
