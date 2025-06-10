import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

const Terms = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: `By accessing or using FarmX, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.`
    },
    {
      title: "User Registration",
      content: [
        "You must be 18 years or older to use this service",
        "You must provide accurate and complete information when creating an account",
        "You are responsible for maintaining the security of your account",
        "You must notify us immediately of any unauthorized access"
      ]
    },
    {
      title: "Listing Rules",
      content: [
        "All listings must be for agricultural products or services",
        "Listings must include accurate descriptions and images",
        "Prohibited items must not be listed",
        "Prices must be stated clearly in Pakistani Rupees",
        "You must have the right to sell listed items"
      ]
    },
    {
      title: "Transaction Guidelines",
      content: [
        "All transactions should be conducted through the platform",
        "Sellers must accurately represent their products",
        "Buyers must make payments as agreed",
        "Both parties must honor their commitments",
        "Disputes should be resolved through our resolution process"
      ]
    },
    {
      title: "Prohibited Activities",
      content: [
        "Posting false or misleading information",
        "Harassment or abuse of other users",
        "Circumventing platform fees",
        "Creating multiple accounts for deceptive purposes",
        "Violating any applicable laws or regulations"
      ]
    },
    {
      title: "Content Ownership",
      content: [
        "You retain rights to content you post",
        "You grant FarmX license to use your content",
        "You must not violate others' intellectual property rights",
        "We may remove content that violates these terms"
      ]
    },
    {
      title: "Platform Fees",
      content: [
        "We may charge fees for certain services",
        "Fee structures will be clearly communicated",
        "Fees are non-refundable unless required by law",
        "Payment terms must be followed as specified"
      ]
    },
    {
      title: "Termination",
      content: [
        "We may terminate accounts for violations",
        "Users may delete their accounts at any time",
        "Some obligations survive termination",
        "We reserve the right to refuse service"
      ]
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Terms of Service</h1>
        
        <div className="max-w-4xl mx-auto">
          {sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
              {Array.isArray(section.content) ? (
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {section.content.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">{section.content}</p>
              )}
            </div>
          ))}

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 mb-4">
                For more information about how we handle your data, please read our{' '}
                <Link to="/privacy" className="text-green-600 hover:text-green-700">
                  Privacy Policy
                </Link>.
              </p>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="text-gray-600">
                <p>Email: legal@farmx.pk</p>
                <p>Phone: +92 300 1234567</p>
                <p>Address: Office #123, Tech Hub, Lahore, Pakistan</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Terms; 