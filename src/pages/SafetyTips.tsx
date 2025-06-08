import React from 'react';
import { Shield, AlertTriangle, Eye, UserCheck, CreditCard, MessageSquare } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SafetyTips = () => {
  const safetyCategories = [
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Account Security",
      tips: [
        "Use a strong, unique password",
        "Enable two-factor authentication if available",
        "Never share your login credentials",
        "Log out when using shared devices"
      ]
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-yellow-600" />,
      title: "Meeting Safety",
      tips: [
        "Meet in public, well-lit places",
        "Bring a friend or family member",
        "Share your meeting location with someone",
        "Trust your instincts"
      ]
    },
    {
      icon: <Eye className="w-8 h-8 text-blue-600" />,
      title: "Product Verification",
      tips: [
        "Inspect products thoroughly before purchase",
        "Request detailed photos and documentation",
        "Verify product certifications",
        "Ask for product history and maintenance records"
      ]
    },
    {
      icon: <UserCheck className="w-8 h-8 text-purple-600" />,
      title: "Seller Verification",
      tips: [
        "Check seller ratings and reviews",
        "Verify business credentials",
        "Look for complete profile information",
        "Be wary of new accounts with no history"
      ]
    },
    {
      icon: <CreditCard className="w-8 h-8 text-red-600" />,
      title: "Payment Safety",
      tips: [
        "Never send money before seeing the product",
        "Use secure payment methods",
        "Keep payment receipts",
        "Be cautious of unusual payment requests"
      ]
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-indigo-600" />,
      title: "Communication Safety",
      tips: [
        "Keep communication within the platform",
        "Don't share personal financial information",
        "Be wary of urgent pressure tactics",
        "Report suspicious behavior"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Safety Tips</h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            Your safety is our top priority. Follow these guidelines for secure trading on FarmX.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {safetyCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg mr-4">
                    {category.icon}
                  </div>
                  <h2 className="text-xl font-semibold">{category.title}</h2>
                </div>
                <ul className="space-y-3">
                  {category.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                      <span className="text-gray-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-red-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-red-700 mb-4">Report Suspicious Activity</h2>
            <p className="text-gray-700 mb-4">
              If you encounter any suspicious behavior or potential scams, please report it immediately:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Use the "Report" button on listings or user profiles</li>
              <li>• Contact our support team at support@farmx.pk</li>
              <li>• Call our safety hotline: +92 300 1234567</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SafetyTips; 