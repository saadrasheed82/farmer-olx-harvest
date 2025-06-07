
import React from 'react';
import { Link } from 'react-router-dom';
import { Cow, Wheat, Tractor, Home, Truck, Wrench, Droplets, TreePine } from 'lucide-react';

const categories = [
  { 
    id: 'livestock', 
    name: 'Livestock', 
    icon: Cow, 
    count: '2,456 ads',
    subcategories: ['Cattle', 'Goats', 'Sheep', 'Poultry', 'Buffalo']
  },
  { 
    id: 'crops', 
    name: 'Crops & Seeds', 
    icon: Wheat, 
    count: '1,823 ads',
    subcategories: ['Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Vegetables']
  },
  { 
    id: 'equipment', 
    name: 'Farm Equipment', 
    icon: Tractor, 
    count: '987 ads',
    subcategories: ['Tractors', 'Harvesters', 'Plows', 'Tillers', 'Sprayers']
  },
  { 
    id: 'land', 
    name: 'Agricultural Land', 
    icon: Home, 
    count: '654 ads',
    subcategories: ['For Sale', 'For Rent', 'Partnerships', 'Warehouses']
  },
  { 
    id: 'vehicles', 
    name: 'Farm Vehicles', 
    icon: Truck, 
    count: '432 ads',
    subcategories: ['Trucks', 'Pickups', 'Trailers', 'ATVs']
  },
  { 
    id: 'tools', 
    name: 'Tools & Parts', 
    icon: Wrench, 
    count: '789 ads',
    subcategories: ['Hand Tools', 'Spare Parts', 'Maintenance', 'Storage']
  },
  { 
    id: 'irrigation', 
    name: 'Irrigation', 
    icon: Droplets, 
    count: '345 ads',
    subcategories: ['Pumps', 'Pipes', 'Sprinklers', 'Drip Systems']
  },
  { 
    id: 'forestry', 
    name: 'Forestry', 
    icon: TreePine, 
    count: '234 ads',
    subcategories: ['Timber', 'Saplings', 'Wood Products', 'Tools']
  }
];

const CategoryGrid = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Browse Categories
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200 group"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
                    <IconComponent className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-600">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500">{category.count}</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  {category.subcategories.slice(0, 3).map((sub) => (
                    <p key={sub} className="text-xs text-gray-600">{sub}</p>
                  ))}
                  {category.subcategories.length > 3 && (
                    <p className="text-xs text-green-600">+{category.subcategories.length - 3} more</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
