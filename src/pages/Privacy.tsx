import React from 'react';
import Layout from '@/components/Layout';

const Privacy = () => {
  const sections = [
    {
      title: "Information We Collect",
      content: [
        "Personal Information: Name, email address, phone number, and location when you create an account",
        "Profile Information: Farm details, business information, and profile pictures that you choose to share",
        "Transaction Data: Information about your listings, purchases, and communications on the platform",
        "Usage Data: How you interact with our platform, including browsing patterns and device information"
      ]
    },
    {
      title: "How We Use Your Information",
      content: [
        "To provide and maintain our services",
        "To process your transactions and communications",
        "To improve our platform and user experience",
        "To send you updates and marketing communications (with your consent)",
        "To ensure platform security and prevent fraud"
      ]
    },
    {
      title: "Information Sharing",
      content: [
        "With other users as necessary for transactions",
        "With service providers who assist in our operations",
        "When required by law or to protect our rights",
        "With your consent for specific purposes"
      ]
    },
    {
      title: "Data Security",
      content: [
        "We implement industry-standard security measures",
        "Regular security audits and updates",
        "Encrypted data transmission",
        "Secure data storage practices"
      ]
    },
    {
      title: "Your Rights",
      content: [
        "Access your personal information",
        "Correct inaccurate data",
        "Request deletion of your data",
        "Opt-out of marketing communications",
        "Control your privacy settings"
      ]
    },
    {
      title: "Cookies and Tracking",
      content: [
        "We use cookies to improve user experience",
        "Track platform usage and performance",
        "Remember your preferences",
        "You can control cookie settings in your browser"
      ]
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 text-center mb-8">
            Last updated: March 15, 2024
          </p>

          <p className="text-gray-600 mb-8">
            At FarmX, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
          </p>

          {sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {section.content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          <div className="bg-gray-50 p-6 rounded-lg mt-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about our Privacy Policy, please contact us:
            </p>
            <div className="text-gray-600">
              <p>Email: privacy@farmx.pk</p>
              <p>Phone: +92 300 1234567</p>
              <p>Address: Office #123, Tech Hub, Lahore, Pakistan</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy; 