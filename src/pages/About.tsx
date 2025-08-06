
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Users, Shield, Heart, Globe, Target, Award, CheckCircle, Star } from 'lucide-react';

const About = () => {
  return (
    <MainLayout>
      {/* Enhanced Header */}
      <div className="enhanced-page-header">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold text-sm">
              <Heart className="w-5 h-5 mr-2" />
              Our Story
            </div>
            <h1 className="enhanced-page-title">About HopeGivers</h1>
            <p className="enhanced-page-subtitle">
              Connecting hearts, changing lives, and building stronger communities through the power of generosity and compassion.
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">

            {/* Mission Section */}
            <div className="enhanced-card mb-12">
              <div className="enhanced-card-content p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-hope-orange-100 rounded-full flex items-center justify-center mr-4">
                    <Target className="w-8 h-8 text-hope-orange-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-hope-orange-600">Our Mission</h2>
                </div>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  HopeGivers was founded with a simple but powerful mission: to connect those in need with those who want to help.
                  We believe that everyone has something to give, whether it's money, time, skills, or material goods.
                  Our platform makes it easy and transparent to support verified charities that are making a real difference in communities.
                </p>

                {/* Statistics */}
                <div className="enhanced-stats grid-cols-4">
                  <div className="enhanced-stat-card">
                    <span className="enhanced-stat-number">10K+</span>
                    <span className="enhanced-stat-label">Active Donors</span>
                  </div>
                  <div className="enhanced-stat-card">
                    <span className="enhanced-stat-number">500+</span>
                    <span className="enhanced-stat-label">Verified Charities</span>
                  </div>
                  <div className="enhanced-stat-card">
                    <span className="enhanced-stat-number">50+</span>
                    <span className="enhanced-stat-label">Countries Served</span>
                  </div>
                  <div className="enhanced-stat-card">
                    <span className="enhanced-stat-number">$2M+</span>
                    <span className="enhanced-stat-label">Total Donated</span>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="enhanced-card mb-12">
              <div className="enhanced-card-content p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-hope-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Shield className="w-8 h-8 text-hope-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-hope-blue-600">How It Works</h2>
                </div>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                  We carefully vet each charity that joins our platform to ensure they are legitimate and effectively using donations.
                  Users can browse charities, learn about their work, and choose to donate money or goods.
                  For those in need, we provide a simple way to request help from appropriate organizations.
                </p>

                {/* Process Steps */}
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-hope-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-hope-green-600">1</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">Verify</h3>
                    <p className="text-gray-600">We thoroughly verify all charities to ensure legitimacy and transparency</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-hope-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-hope-orange-600">2</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">Connect</h3>
                    <p className="text-gray-600">We connect donors with causes they care about most</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-hope-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-hope-blue-600">3</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">Impact</h3>
                    <p className="text-gray-600">We track and report the real impact of every donation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Values Section */}
            <div className="enhanced-card mb-12">
              <div className="enhanced-card-content p-8">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-hope-green-100 rounded-full flex items-center justify-center mr-4">
                    <Heart className="w-8 h-8 text-hope-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-hope-green-600">Our Values</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="enhanced-card border-l-4 border-hope-orange-500">
                    <div className="enhanced-card-content">
                      <div className="flex items-center mb-3">
                        <CheckCircle className="w-6 h-6 text-hope-orange-500 mr-3" />
                        <h3 className="font-bold text-lg">Transparency</h3>
                      </div>
                      <p className="text-gray-600">We believe donors deserve to know exactly how their contributions are being used to create meaningful impact.</p>
                    </div>
                  </div>
                  <div className="enhanced-card border-l-4 border-hope-blue-500">
                    <div className="enhanced-card-content">
                      <div className="flex items-center mb-3">
                        <Globe className="w-6 h-6 text-hope-blue-500 mr-3" />
                        <h3 className="font-bold text-lg">Accessibility</h3>
                      </div>
                      <p className="text-gray-600">Help should be available to everyone who needs it, regardless of their circumstances or location.</p>
                    </div>
                  </div>
                  <div className="enhanced-card border-l-4 border-hope-green-500">
                    <div className="enhanced-card-content">
                      <div className="flex items-center mb-3">
                        <Target className="w-6 h-6 text-hope-green-500 mr-3" />
                        <h3 className="font-bold text-lg">Efficiency</h3>
                      </div>
                      <p className="text-gray-600">We maximize impact by connecting donors directly with verified charities and minimizing overhead costs.</p>
                    </div>
                  </div>
                  <div className="enhanced-card border-l-4 border-hope-red-500">
                    <div className="enhanced-card-content">
                      <div className="flex items-center mb-3">
                        <Users className="w-6 h-6 text-hope-red-500 mr-3" />
                        <h3 className="font-bold text-lg">Community</h3>
                      </div>
                      <p className="text-gray-600">We're building a global network of givers and recipients united by compassion and shared humanity.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="enhanced-card">
              <div className="enhanced-card-content p-8">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-hope-purple-100 rounded-full flex items-center justify-center mr-4">
                    <Award className="w-8 h-8 text-hope-purple-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-hope-purple-600">Our Team</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                      HopeGivers is run by a dedicated team of professionals who are passionate about making a difference.
                      Our diverse backgrounds in technology, non-profit management, and community organizing come together
                      to create a platform that truly serves both donors and those in need.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-hope-orange-500 mr-3" />
                        <span className="text-gray-700">Award-winning platform design</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-hope-green-500 mr-3" />
                        <span className="text-gray-700">99.9% uptime reliability</span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-hope-blue-500 mr-3" />
                        <span className="text-gray-700">Bank-level security standards</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="enhanced-profile-card">
                      <div className="mb-4">
                        <div className="w-24 h-24 bg-gradient-to-r from-hope-orange-500 to-hope-red-500 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold">
                          HG
                        </div>
                      </div>
                      <h3 className="font-bold text-lg mb-2">Leadership Team</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Experienced professionals from leading tech companies, non-profits, and international organizations
                      </p>
                      <div className="flex justify-center space-x-4 text-sm text-gray-500">
                        <span>10+ Years Experience</span>
                        <span>•</span>
                        <span>Global Network</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
