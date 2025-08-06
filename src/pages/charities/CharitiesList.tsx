
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import { Search, Filter, MapPin, Users, Star, Heart, CheckCircle } from 'lucide-react';
import { GetAllCharities } from '@/Api/charities/charities';
import { IHomeCharities } from '@/interfaces/interfaces';
import { useEffect } from 'react';

const CharitiesList = () => {
  const [charities, setCharities] = useState<IHomeCharities[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        setIsLoading(true);
        const data = await GetAllCharities();
        setCharities(data);
      } catch (error) {
        console.error('Error fetching charities:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharities();
  }, []);

  const filteredCharities = charities.filter(charity => {
    const matchesSearch = charity.charityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      charity.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <MainLayout>
      {/* Enhanced Header */}
      <div className="enhanced-page-header">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold text-sm">
              <Heart className="w-5 h-5 mr-2" />
              Verified Partners
            </div>
            <h1 className="enhanced-page-title">
              Find Charities to Support
            </h1>
            <p className="enhanced-page-subtitle">
              Browse through our carefully verified charities and make a meaningful difference by donating or volunteering with organizations that matter to you.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">

            {/* Enhanced Search Section */}
            <div className="enhanced-search mb-12">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="relative flex-grow">
                  <Search className="enhanced-search-icon" />
                  <input
                    type="text"
                    placeholder="Search charities by name, location, or cause..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="enhanced-search-input"
                  />
                </div>
                <div className="flex gap-4">
                  <Button className="btn-secondary-professional">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <Button className="btn-primary-professional">
                    <MapPin className="w-4 h-4 mr-2" />
                    Near Me
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-hope-orange-600">{filteredCharities.length}</div>
                  <div className="text-sm text-hope-gray-600">Total Charities</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-hope-blue-600">100%</div>
                  <div className="text-sm text-hope-gray-600">Verified</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-hope-green-600">50+</div>
                  <div className="text-sm text-hope-gray-600">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-hope-purple-600">24/7</div>
                  <div className="text-sm text-hope-gray-600">Support</div>
                </div>
              </div>
            </div>

            {/* Results Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-hope-gray-800">
                  Showing {filteredCharities.length} {filteredCharities.length === 1 ? 'charity' : 'charities'}
                </h2>
                {searchTerm && (
                  <span className="bg-hope-orange-100 text-hope-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                    for "{searchTerm}"
                  </span>
                )}
              </div>
              <select className="enhanced-form-input w-48">
                <option>Sort by Relevance</option>
                <option>Sort by Name</option>
                <option>Sort by Location</option>
                <option>Recently Added</option>
              </select>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="enhanced-card">
                    <div className="enhanced-skeleton h-48 mb-4"></div>
                    <div className="enhanced-card-content">
                      <div className="enhanced-skeleton h-6 mb-2"></div>
                      <div className="enhanced-skeleton h-4 mb-2"></div>
                      <div className="enhanced-skeleton h-4 w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Enhanced Charities Grid */}
            {!isLoading && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCharities.map((charity, index) => (
                  <div
                    key={charity.userName}
                    className="enhanced-charity-card animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <img
                              src={charity.photoUrl ? `https://ma3ansawa.runasp.net${charity.photoUrl}` : `https://ui-avatars.com/api/?name=${charity.charityName}`}
                              alt={charity.charityName}
                              className="enhanced-charity-image mr-4"
                            />
                            <div>
                              <h3 className="enhanced-card-title text-lg">{charity.charityName}</h3>
                              <div className="flex items-center mt-1">
                                <CheckCircle className="w-4 h-4 text-hope-green-500 mr-1" />
                                <span className="text-hope-green-600 text-sm font-medium">Verified</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center bg-hope-orange-100 rounded-full px-3 py-1">
                            <Star className="w-4 h-4 text-hope-orange-500 mr-1" />
                            <span className="text-hope-orange-700 text-sm font-medium">4.9</span>
                          </div>
                        </div>

                        <p className="text-hope-gray-600 text-sm mb-4 line-clamp-3">
                          {charity.description || "Dedicated to making a positive impact in the community through various charitable initiatives and support programs for those in need."}
                        </p>

                        <div className="flex items-center justify-between text-sm text-hope-gray-500 mb-6">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="truncate">{charity.address}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            <span>1.2k donors</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Link
                            to={`/charity/${charity.userName}`}
                            className="block w-full text-center bg-hope-orange-500 hover:bg-hope-orange-600 text-white py-3 px-4 rounded-xl transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                          >
                            View Profile
                          </Link>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant="outline"
                              className="text-hope-blue-600 border-hope-blue-300 hover:bg-hope-blue-50"
                              size="sm"
                            >
                              <Heart className="w-4 h-4 mr-1" />
                              Donate
                            </Button>
                            <Button
                              variant="outline"
                              className="text-hope-green-600 border-hope-green-300 hover:bg-hope-green-50"
                              size="sm"
                            >
                              <Users className="w-4 h-4 mr-1" />
                              Volunteer
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && filteredCharities.length === 0 && (
              <div className="text-center py-16">
                <div className="enhanced-card max-w-md mx-auto">
                  <div className="enhanced-card-content p-8 text-center">
                    <div className="w-24 h-24 bg-hope-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="w-12 h-12 text-hope-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-hope-gray-800">No charities found</h3>
                    <p className="text-hope-gray-600 mb-6">
                      We couldn't find any charities matching your search criteria. Try adjusting your filters or search terms.
                    </p>
                    <Button
                      onClick={() => { setSearchTerm(''); setSelectedCategory('All Categories'); }}
                      className="btn-primary-professional"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Call to Action */}
            {!isLoading && filteredCharities.length > 0 && (
              <div className="mt-16 text-center">
                <div className="enhanced-card max-w-2xl mx-auto">
                  <div className="enhanced-card-content p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4 text-hope-gray-800">Ready to Make a Difference?</h3>
                    <p className="text-hope-gray-600 mb-6">
                      Join thousands of donors who are already making an impact through our verified charity partners.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button className="btn-primary-professional">
                        <Heart className="w-5 h-5 mr-2" />
                        Start Donating
                      </Button>
                      <Button className="btn-secondary-professional">
                        <Users className="w-5 h-5 mr-2" />
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CharitiesList;
