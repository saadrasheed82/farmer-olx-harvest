import React from 'react';
import { Calendar, User, Clock, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Modern Farming Techniques for Better Yield",
      excerpt: "Learn about the latest farming techniques that can help increase your crop yield while maintaining sustainability...",
      image: "/blog/modern-farming.jpg",
      category: "Farming Techniques",
      author: "Dr. Ali Ahmed",
      date: "March 15, 2024",
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Understanding Crop Insurance in Pakistan",
      excerpt: "A comprehensive guide to agricultural insurance options available to farmers in Pakistan and how to choose the right coverage...",
      image: "/blog/crop-insurance.jpg",
      category: "Financial Guide",
      author: "Fatima Khan",
      date: "March 12, 2024",
      readTime: "6 min read"
    },
    {
      id: 3,
      title: "Best Practices for Livestock Management",
      excerpt: "Expert tips on maintaining healthy livestock, disease prevention, and maximizing productivity in your cattle farm...",
      image: "/blog/livestock.jpg",
      category: "Livestock",
      author: "Hassan Malik",
      date: "March 10, 2024",
      readTime: "10 min read"
    },
    {
      id: 4,
      title: "Sustainable Water Management for Agriculture",
      excerpt: "Discover efficient irrigation techniques and water conservation methods to make your farm more sustainable...",
      image: "/blog/irrigation.jpg",
      category: "Sustainability",
      author: "Zainab Ali",
      date: "March 8, 2024",
      readTime: "7 min read"
    }
  ];

  const categories = [
    "Farming Techniques",
    "Market Insights",
    "Financial Guide",
    "Sustainability",
    "Livestock",
    "Technology",
    "Success Stories",
    "Industry News"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-8">Agricultural Insights</h1>
              
              <div className="space-y-8">
                {blogPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <div className="h-48 md:h-full bg-gray-200">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=600&fit=crop';
                            }}
                          />
                        </div>
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                        </div>
                        
                        <h2 className="text-xl font-semibold mb-2">
                          <Link to={`/blog/${post.id}`} className="hover:text-green-600 transition-colors">
                            {post.title}
                          </Link>
                        </h2>
                        
                        <p className="text-gray-600 mb-4">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {post.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:w-1/3">
              {/* Categories */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Categories</h2>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link
                        to={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center justify-between text-gray-600 hover:text-green-600 transition-colors"
                      >
                        {category}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-green-50 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Stay Updated</h2>
                <p className="text-gray-600 mb-4">
                  Subscribe to our newsletter for the latest farming tips and market insights.
                </p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 mb-4"
                />
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog; 