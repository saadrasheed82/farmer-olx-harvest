import React from 'react';
import { Star } from 'lucide-react';
import Layout from '@/components/Layout';

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
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Success Stories</h1>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 text-center mb-8">
            Read about how FarmX has helped farmers across Pakistan transform their agricultural businesses.
          </p>

          <div className="space-y-8">
            {stories.map((story, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="h-48 w-full object-cover md:h-full"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-center mb-2">
                      <h2 className="text-xl font-semibold">{story.name}</h2>
                      <span className="text-sm text-gray-500 ml-2">• {story.location}</span>
                    </div>
                    <div className="text-sm text-green-600 mb-3">{story.category}</div>
                    <p className="text-gray-600 mb-4">{story.story}</p>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-5 w-5 fill-current" />
                      <span className="ml-2 text-gray-700 font-medium">{story.achievement}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-green-50 p-6 rounded-lg mt-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Share Your Story</h2>
            <p className="text-gray-600 mb-4">
              Have you found success using FarmX? We'd love to hear your story and share it with our community.
            </p>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Submit Your Story
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuccessStories; 