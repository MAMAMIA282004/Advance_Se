
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import { Search, Filter, MapPin } from 'lucide-react';

const CharitiesList = () => {
  const charities = [
    {
      id: 1,
      name: 'Red Cross Local Chapter',
      logo: 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&q=80&w=150&h=150',
      description: 'We provide emergency assistance, disaster relief, and education in our local community.',
      category: 'Disaster Relief',
      location: 'San Francisco, CA'
    },
    {
      id: 2,
      name: 'Food Bank Inc.',
      logo: 'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?auto=format&fit=crop&q=80&w=150&h=150',
      description: 'Working to end hunger in our community by providing meals to those in need.',
      category: 'Food & Hunger',
      location: 'Los Angeles, CA'
    },
    {
      id: 3,
      name: 'Shelter Hope',
      logo: 'https://images.unsplash.com/photo-1604328727766-a151d1045ab4?auto=format&fit=crop&q=80&w=150&h=150',
      description: 'Providing temporary housing and support services to homeless individuals and families.',
      category: 'Homelessness',
      location: 'Chicago, IL'
    },
    {
      id: 4,
      name: 'Children\'s Fund',
      logo: 'https://images.unsplash.com/photo-1599084993091-1cb5c0e6920b?auto=format&fit=crop&q=80&w=150&h=150',
      description: 'Supporting educational programs and healthcare for underprivileged children.',
      category: 'Education',
      location: 'New York, NY'
    },
    {
      id: 5,
      name: 'Wildlife Conservation Group',
      logo: 'https://images.unsplash.com/photo-1592486058517-36236ba247c8?auto=format&fit=crop&q=80&w=150&h=150',
      description: 'Protecting endangered species and their habitats through conservation efforts.',
      category: 'Environment',
      location: 'Seattle, WA'
    },
    {
      id: 6,
      name: 'Veterans Support Alliance',
      logo: 'https://images.unsplash.com/photo-1528938102132-4a9276b8e320?auto=format&fit=crop&q=80&w=150&h=150',
      description: 'Providing support services and resources to veterans and their families.',
      category: 'Veterans',
      location: 'Austin, TX'
    },
  ];

  const categories = [
    'All Categories',
    'Disaster Relief',
    'Food & Hunger',
    'Homelessness',
    'Education',
    'Health',
    'Environment',
    'Veterans',
    'Animals',
    'Arts & Culture',
    'Community Development'
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const filteredCharities = charities.filter(charity => {
    const matchesSearch = charity.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         charity.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || charity.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
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
              <div className="relative min-w-[220px]">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hope-orange/50 bg-white"
                >
                  {categories.map((category, idx) => (
                    <option key={idx} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
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
                to={`/charities/${charity.id}`} 
                key={charity.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                      <img 
                        src={charity.logo}
                        alt={charity.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="text-xl font-semibold text-hope-dark-gray">{charity.name}</h2>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{charity.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium px-2 py-1 bg-hope-orange/10 text-hope-orange rounded-full">
                      {charity.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-3 w-3 mr-1" />
                      {charity.location}
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
              <Button onClick={() => {setSearchTerm(''); setSelectedCategory('All Categories');}} className="bg-hope-orange hover:bg-hope-dark-orange">
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
