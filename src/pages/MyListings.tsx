import React from 'react';
import { Heart, MapPin, Calendar, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useUserListings, useDeleteListing } from '@/hooks/useListings';
import { useAuth } from '@/hooks/useAuth';
import { format } from 'date-fns';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const MyListings = () => {
  const { user } = useAuth();
  const { data: listings, isLoading } = useUserListings(user?.id);
  const deleteListing = useDeleteListing();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [listingToDelete, setListingToDelete] = React.useState<string | null>(null);

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleEdit = (listingId: string) => {
    navigate(`/edit-listing/${listingId}`);
  };

  const handleDelete = async () => {
    if (!listingToDelete) return;

    try {
      await deleteListing.mutateAsync(listingToDelete);
      toast({
        title: "Listing deleted",
        description: "Your listing has been deleted successfully."
      });
      setListingToDelete(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the listing. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
          <Link to="/sell">
            <Button>Post New Ad</Button>
          </Link>
        </div>

        {listings && listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={listing.images?.[0] || "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=400&h=300&fit=crop"}
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                  />
                  {listing.status === 'active' && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded">
                      ACTIVE
                    </span>
                  )}
                  {listing.status === 'sold' && (
                    <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs font-semibold rounded">
                      SOLD
                    </span>
                  )}
                  {listing.status === 'expired' && (
                    <span className="absolute top-2 left-2 bg-gray-500 text-white px-2 py-1 text-xs font-semibold rounded">
                      EXPIRED
                    </span>
                  )}
                  {listing.status === 'draft' && (
                    <span className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 text-xs font-semibold rounded">
                      DRAFT
                    </span>
                  )}
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

                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {listing.title}
                  </h3>

                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {listing.location_city}, {listing.location_province}
                  </div>

                  <div className="flex items-center text-xs text-gray-400 mb-4">
                    <Calendar className="h-3 w-3 mr-1" />
                    {format(new Date(listing.created_at), 'MMM d, yyyy')}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleEdit(listing.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-red-600 hover:text-red-700"
                      onClick={() => setListingToDelete(listing.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Listings Yet</h2>
            <p className="text-gray-600 mb-6">Start selling your agricultural products today!</p>
            <Link to="/sell">
              <Button>Post Your First Ad</Button>
            </Link>
          </div>
        )}
      </div>

      <AlertDialog open={!!listingToDelete} onOpenChange={() => setListingToDelete(null)}>
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

      <Footer />
    </div>
  );
};

export default MyListings; 