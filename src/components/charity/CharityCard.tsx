
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, MapPin, Users, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IHomeCharities } from '@/interfaces/interfaces';

const CharityCard: React.FC<{ charity: IHomeCharities, className?: string, style?: React.CSSProperties }> = ({ charity, className, style }) => {
  return (
    <div className={`enhanced-charity-card ${className || ''}`} style={style}>
      <div className="relative">
        <div className="p-6">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <img
                src={charity.photoUrl ? `https://ma3ansawa.runasp.net/${charity.photoUrl}` : `https://ui-avatars.com/api/?name=${charity.charityName}`}
                alt={`${charity.userName} logo`}
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

          {/* Description */}
          <p className="text-hope-gray-600 text-sm mb-4 line-clamp-3">
            {charity.description || "Dedicated to making a positive impact in the community through various charitable initiatives and support programs for those in need."}
          </p>

          {/* Location and Stats */}
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

          {/* Action Buttons */}
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
  );
};

export default CharityCard;
