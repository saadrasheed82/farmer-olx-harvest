
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, Grid, List, SlidersHorizontal, MapPin, Calendar, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Category = () => {
  const { categoryId } = useParams();
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');

  const categoryData = {
    livestock: {
      name: 'Livestock',
      description: 'Buy and sell cattle, goats, sheep, poultry and more',
      subcategories: ['Cattle', 'Goats', 'Sheep', 'Poultry', 'Buffalo', 'Horses']
    },
    crops: {
      name: 'Crops & Seeds',
      description: 'Premium quality seeds and harvested crops',
      subcategories: ['Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Vegetables', 'Fruits']
    },
    equipment: {
      name: 'Farm Equipment',
      description: 'Tractors, harvesters and farming machinery',
      subcategories: ['Tractors', 'Harvesters', 'Plows', 'Tillers', 'Sprayers', 'Seeders']
    }
  };

  const category = categoryData[categoryId as keyof typeof categoryData] || categoryData.livestock;

  const sampleListings = [
    {
      id: 1,
      title: "Premium Holstein Cattle - Excellent Health",
      price: "Rs 2,50,000",
      location: "Faisalabad, Punjab",
      image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=400&h=300&fit=crop",
      postedDate: "2 days ago",
      urgent: false
    },
    {
      id: 2,
      title: "Healthy Dairy Cows - High Milk Production",
      price: "Rs 1,80,000",
      location: "Multan, Punjab",
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=400&h=300&fit=crop",
      postedDate: "1 day ago",
      urgent: true
    },
    // Add more sample listings...
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Category Header */}
      <div className="bg-green-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
          <p className="text-gray-600 mb-4">{category.description}</p>
          
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500">
            <span>Home</span> &gt; <span className="text-green-600">{category.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </h3>
              
              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Pakistan</SelectItem>
                    <SelectItem value="punjab">Punjab</SelectItem>
                    <SelectItem value="sindh">Sindh</SelectItem>
                    <SelectItem value="kpk">KPK</SelectItem>
                    <SelectItem value="balochistan">Balochistan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="flex space-x-2">
                  <Input placeholder="Min" />
                  <Input placeholder="Max" />
                </div>
              </div>

              {/* Subcategories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subcategory
                </label>
                <div className="space-y-2">
                  {category.subcategories.map((sub) => (
                    <label key={sub} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">{sub}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700">
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">1,234 results found</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex border rounded">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Listings Grid */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {sampleListings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-48 object-cover"
                    />
                    {listing.urgent && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                        URGENT
                      </span>
                    )}
                    <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50">
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
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

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                <Button variant="outline" disabled>Previous</Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Category;
