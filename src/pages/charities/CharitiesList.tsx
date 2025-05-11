
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import { Search, Filter, MapPin } from 'lucide-react';
import { GetAllCharities } from '@/Api/charities/charities';
import { IHomeCharities } from '@/interfaces/interfaces';
import { useEffect } from 'react';

const CharitiesList = () => {

  const [charities, setCharities] = useState<IHomeCharities[]>([]);

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const data = await GetAllCharities();
        setCharities(data);
      } catch (error) {
        console.error('Error fetching charities:', error);
      }
    };

    fetchCharities();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const filteredCharities = charities.filter(charity => {
    const matchesSearch = charity.charityName.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch;
  });

  return (
    <MainLayout>
      <div className="bg-hope-gray py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-hope-dark-gray mb-4">
              Find Charities to Support
            </h1>
            <p className="text-lg text-gray-600">
              Browse through verified charities and make a difference by donating or volunteering.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-10">
            <div className="md:flex md:space-x-4">
              <div className="relative flex-grow mb-4 md:mb-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for charities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                />
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-gray-600">
            Showing {filteredCharities.length} {filteredCharities.length === 1 ? 'charity' : 'charities'}
          </div>

          {/* Charities List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCharities.map((charity) => (
              <Link
                to={`/charity/${charity.userName}`}
                key={charity.userName}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                      <img
                        src={charity.photoUrl ? `https://ma3ansawa.runasp.net/${charity.photoUrl}` : `https://ui-avatars.com/api/?name=${charity.charityName}`}
                        alt={charity.charityName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="text-xl font-semibold text-hope-dark-gray">{charity.charityName}</h2>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-3 w-3 mr-1" />
                      {charity.address}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100">
                  <Button
                    className="w-full bg-transparent hover:bg-hope-gray text-hope-orange py-3 rounded-none"
                    variant="ghost"
                  >
                    View Charity
                  </Button>
                </div>
              </Link>
            ))}
          </div>

          {filteredCharities.length === 0 && (
            <div className="text-center py-16 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">No charities found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
              <Button onClick={() => { setSearchTerm(''); setSelectedCategory('All Categories'); }} className="bg-hope-orange hover:bg-hope-dark-orange">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CharitiesList;
