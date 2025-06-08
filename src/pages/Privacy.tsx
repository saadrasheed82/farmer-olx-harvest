import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Privacy Policy</h1>
          <p className="text-gray-600 text-center mb-8">
            Last updated: March 15, 2024
          </p>

          <div className="prose prose-green max-w-none">
            <p className="text-gray-600 mb-8">
              At FarmX, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your information when you use our platform. Please read this policy 
              carefully to understand our practices regarding your personal data.
            </p>

            <div className="space-y-8">
              {sections.map((section, index) => (
                <section key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                  <ul className="space-y-2">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p className="text-gray-600">Email: privacy@farmx.pk</p>
                <p className="text-gray-600">Phone: +92 300 1234567</p>
                <p className="text-gray-600">Address: Office #123, Tech Hub, Lahore, Pakistan</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy; 