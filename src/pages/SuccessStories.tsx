import React from 'react';
import { Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SuccessStories = () => {
  const stories = [
    {
      name: "Muhammad Ali",
      location: "Multan, Punjab",
      image: "/success-stories/farmer1.jpg",
      story: "After joining FarmX, I was able to sell my cotton crop directly to textile manufacturers. This eliminated middlemen and increased my profits by 40%. The platform's direct communication feature helped me negotiate better prices.",
      achievement: "Increased profit margins by 40%",
      category: "Cotton Farming"
    },
    {
      name: "Fatima Bibi",
      location: "Larkana, Sindh",
      image: "/success-stories/farmer2.jpg",
      story: "As a small-scale rice farmer, I struggled to find buyers for my organic rice. Through FarmX, I connected with export companies and now supply to organic food stores across Pakistan. My farming business has grown threefold in just one year.",
      achievement: "Expanded to international markets",
      category: "Organic Rice"
    },
    {
      name: "Ahmed Khan",
      location: "Peshawar, KPK",
      image: "/success-stories/farmer3.jpg",
      story: "I used FarmX to find quality agricultural equipment at reasonable prices. The platform's verification system ensured I got genuine machinery. This helped me modernize my farm operations and increase productivity significantly.",
      achievement: "Modernized farming operations",
      category: "Farm Equipment"
    },
    {
      name: "Zainab Hassan",
      location: "Quetta, Balochistan",
      image: "/success-stories/farmer4.jpg",
      story: "Through FarmX, I found buyers interested in my premium quality apples. The platform's reach helped me expand my customer base beyond local markets. Now I supply to major cities across Pakistan.",
      achievement: "Nationwide distribution network",
      category: "Apple Farming"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Success Stories</h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            Real stories from farmers who transformed their agricultural business with FarmX
          </p>

          <div className="space-y-12">
            {stories.map((story, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gray-100">
                    <div className="h-64 bg-gray-200">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=600&fit=crop';
                        }}
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center mb-4">
                      <h2 className="text-2xl font-semibold mr-4">{story.name}</h2>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mr-3">
                        {story.category}
                      </span>
                      <span>{story.location}</span>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      "{story.story}"
                    </p>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="font-semibold text-green-800">Key Achievement:</div>
                      <div className="text-green-700">{story.achievement}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-green-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Share Your Success Story</h2>
            <p className="text-gray-600 mb-6">
              Have you achieved success using FarmX? We'd love to hear your story and share it with our community.
            </p>
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Submit Your Story
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SuccessStories; 