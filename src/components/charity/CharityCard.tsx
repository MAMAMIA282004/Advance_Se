
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IHomeCharities } from '@/interfaces/interfaces';

const CharityCard: React.FC<{ charity: IHomeCharities, className?: string, style?: React.CSSProperties }> = ({ charity, className, style }) => {
  return (
    <div className={`charity-card-professional ${className || ''}`} style={style}>
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={charity.photoUrl ? `https://ma3ansawa.runasp.net/${charity.photoUrl}` : `https://ui-avatars.com/api/?name=${charity.charityName}`}
          alt={`${charity.userName} logo`}
          className="charity-card-image"
        />
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-hope-gray-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          {charity.address}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-xl text-hope-gray-900 mb-2 line-clamp-1">{charity.charityName}</h3>
        <p className="text-hope-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {charity.description || "No description available for this charity."}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <Button variant="outline" size="sm" asChild className="btn-secondary-professional">
            <Link to={`/charity/${charity.userName}`}>
              View Profile
            </Link>
          </Button>
          {charity.isVerified && (
            <span className="flex items-center text-hope-green-600 text-sm font-medium">
              <CheckCircle className="h-4 w-4 mr-1" /> Verified
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharityCard;
