
import React from 'react';
import { Link } from 'react-router-dom';
import { Beef, Wheat, Tractor, Home, Truck, Wrench, Droplets, TreePine } from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';

const iconMap = {
  'Beef': Beef,
  'Wheat': Wheat,
  'Tractor': Tractor,
  'Home': Home,
  'Truck': Truck,
  'Wrench': Wrench,
  'Droplets': Droplets,
  'TreePine': TreePine
};

const CategoryGrid = () => {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Browse Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 animate-pulse">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-200 p-3 rounded-lg w-12 h-12"></div>
                  <div className="ml-4">
                    <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Browse Categories
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories?.map((category) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Beef;
            return (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
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
                    <p className="text-sm text-gray-500">{category.subcategories?.length || 0} subcategories</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  {category.subcategories?.slice(0, 3).map((sub) => (
                    <p key={sub.id} className="text-xs text-gray-600">{sub.name}</p>
                  ))}
                  {(category.subcategories?.length || 0) > 3 && (
                    <p className="text-xs text-green-600">+{(category.subcategories?.length || 0) - 3} more</p>
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
