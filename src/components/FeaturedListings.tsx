
import React from 'react';
import { Heart, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const listings = [
  {
    id: 1,
    title: "High Quality Holstein Cattle - 15 Head",
    price: "Rs 2,50,000",
    location: "Faisalabad, Punjab",
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=400&h=300&fit=crop",
    category: "Livestock",
    postedDate: "2 days ago",
    featured: true
  },
  {
    id: 2,
    title: "John Deere 5310 Tractor - Excellent Condition",
    price: "Rs 18,50,000",
    location: "Multan, Punjab", 
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=400&h=300&fit=crop",
    category: "Equipment",
    postedDate: "1 day ago",
    featured: true
  },
  {
    id: 3,
    title: "Premium Wheat Seeds - 100kg Bags",
    price: "Rs 15,000",
    location: "Lahore, Punjab",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop",
    category: "Crops",
    postedDate: "3 days ago",
    featured: false
  },
  {
    id: 4,
    title: "50 Acre Agricultural Land for Sale",
    price: "Rs 5,00,00,000",
    location: "Sahiwal, Punjab",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=300&fit=crop",
    category: "Land",
    postedDate: "1 week ago",
    featured: true
  },
  {
    id: 5,
    title: "Healthy Goat Herd - 25 Goats",
    price: "Rs 1,25,000", 
    location: "Karachi, Sindh",
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=400&h=300&fit=crop",
    category: "Livestock",
    postedDate: "5 days ago",
    featured: false
  },
  {
    id: 6,
    title: "Modern Irrigation System Complete Setup",
    price: "Rs 75,000",
    location: "Peshawar, KPK",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop",
    category: "Irrigation",
    postedDate: "4 days ago",
    featured: false
  }
];

const FeaturedListings = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Listings</h2>
          <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {listing.featured && (
                  <span className="absolute top-2 left-2 bg-yellow-500 text-gray-900 px-2 py-1 text-xs font-semibold rounded">
                    FEATURED
                  </span>
                )}
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50">
                  <Heart className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {listing.category}
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    {listing.price}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {listing.title}
                </h3>

                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {listing.location}
                </div>

                <div className="flex items-center text-xs text-gray-400">
                  <Calendar className="h-3 w-3 mr-1" />
                  {listing.postedDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
