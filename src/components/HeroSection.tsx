
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Tractor, Wheat, Cow } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Pakistan's #1 Farm Marketplace
          </h1>
          <p className="text-xl mb-8 text-green-100">
            Buy and sell agricultural products, livestock, equipment, and land across Pakistan
          </p>
          
          <div className="flex justify-center space-x-6 mb-12">
            <div className="flex items-center text-green-100">
              <Cow className="h-8 w-8 mr-2" />
              <span>Livestock</span>
            </div>
            <div className="flex items-center text-green-100">
              <Wheat className="h-8 w-8 mr-2" />
              <span>Crops</span>
            </div>
            <div className="flex items-center text-green-100">
              <Tractor className="h-8 w-8 mr-2" />
              <span>Equipment</span>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
              Start Buying
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              Post Your Ad
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
