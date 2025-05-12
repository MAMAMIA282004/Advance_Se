
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IHomeCharities } from '@/interfaces/interfaces';

const CharityCard: React.FC<{ charity: IHomeCharities }> = ({ charity }: { charity: IHomeCharities }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="p-5">
        <div className="flex flex-col space-y-3 mb-4">
          <img
            src={charity.photoUrl ? `https://ma3ansawa.runasp.net/${charity.photoUrl}` : `https://ui-avatars.com/api/?name=${charity.charityName}`}
            alt={`${charity.userName} logo`}
            className="object-cover w-full lg:h-[25rem] h-[20rem]"
          />
          <div>
            <h3 className="font-semibold text-lg line-clamp-1">{charity.charityName}</h3>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-5 line-clamp-3">
          {charity.address}
        </p>

        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm" asChild className="text-hope-orange border-hope-orange hover:bg-hope-orange hover:text-white">
            <Link to={`/charity/${charity.userName}`}>
              View Profile
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CharityCard;
