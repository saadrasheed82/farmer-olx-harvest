import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { MapPin, Calendar, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteListing } from '@/hooks/useListings';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface Listing {
  id: string;
  title: string;
  price: number;
  images: string[];
  status: 'active' | 'sold' | 'expired' | 'draft';
  category?: {
    name: string;
  };
  location_city: string;
  location_province: string;
  created_at: string;
}

interface ListingCardProps {
  listing: Listing;
  showEditButton?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, showEditButton = false }) => {
  const deleteListing = useDeleteListing();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await deleteListing.mutateAsync(listing.id);
      toast({
        title: "Listing deleted",
        description: "Your listing has been deleted successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the listing. Please try again.",
        variant: "destructive"
      });
    }
  };

  const statusColors = {
    active: 'bg-green-500',
    sold: 'bg-blue-500',
    expired: 'bg-gray-500',
    draft: 'bg-yellow-500'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden">
      <div className="relative">
        <img
          src={listing.images?.[0] || "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=400&h=300&fit=crop"}
          alt={listing.title}
          className="w-full h-48 object-cover"
        />
        <span className={`absolute top-2 left-2 ${statusColors[listing.status]} text-white px-2 py-1 text-xs font-semibold rounded`}>
          {listing.status.toUpperCase()}
        </span>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
            {listing.category?.name}
          </span>
          <span className="text-lg font-bold text-green-600">
            Rs {listing.price?.toLocaleString()}
          </span>
        </div>

        <Link to={`/listing/${listing.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-green-600 transition-colors">
            {listing.title}
          </h3>
        </Link>

        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          {listing.location_city}, {listing.location_province}
        </div>

        <div className="flex items-center text-xs text-gray-400 mb-4">
          <Calendar className="h-3 w-3 mr-1" />
          {format(new Date(listing.created_at), 'MMM d, yyyy')}
        </div>

        {showEditButton && (
          <div className="flex gap-2">
            <Link to={`/edit-listing/${listing.id}`} className="flex-1">
              <Button 
                variant="outline" 
                size="sm"
                className="w-full"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your listing.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingCard; 