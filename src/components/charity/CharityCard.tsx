
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CharityCardProps {
  charity: {
    id: number;
    name: string;
    category: string;
    logo: string;
    description: string;
    verified: boolean;
  };
}

const CharityCard: React.FC<CharityCardProps> = ({ charity }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="p-5">
        <div className="flex items-center mb-4">
          <img 
            src={charity.logo} 
            alt={`${charity.name} logo`} 
            className="w-12 h-12 rounded-full object-cover mr-3" 
          />
          <div>
            <h3 className="font-semibold text-lg line-clamp-1">{charity.name}</h3>
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-500">{charity.category}</span>
              {charity.verified && (
                <div className="flex items-center text-green-500 ml-2">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  <span className="text-xs">Verified</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-5 line-clamp-3">
          {charity.description}
        </p>
        
        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm" asChild className="text-hope-orange border-hope-orange hover:bg-hope-orange hover:text-white">
            <Link to={`/charity/${charity.id}`}>
              View Profile
            </Link>
          </Button>
          <Button size="sm" asChild className="bg-hope-orange hover:bg-hope-dark-orange text-white">
            <Link to={`/donate/${charity.id}`}>
              Donate
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CharityCard;
