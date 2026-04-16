import React from 'react';
import { FiStar, FiShield, FiCreditCard } from 'react-icons/fi';

const Features = () => {
  const whyChooseUs = [
    {
      icon: <FiStar className="w-6 h-6" />,
      title: "Top Quality Talent",
      description: "Access to pre-vetted freelancers with proven track records"
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "Secure & Safe",
      description: "Your payments are protected with our secure escrow system"
    },
    {
      icon: <FiCreditCard className="w-6 h-6" />,
      title: "Easy Payments",
      description: "Simple, transparent pricing with no hidden fees"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose FreelanceX?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              We're committed to providing the best experience for both clients and freelancers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/90 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;