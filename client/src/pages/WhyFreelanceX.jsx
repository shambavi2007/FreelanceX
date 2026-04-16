import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiShield, FiClock, FiGlobe, FiDollarSign, FiCheckCircle, FiStar, FiArrowRight, FiZap } from 'react-icons/fi';

const WhyFreelanceX = () => {
  const valueProps = [
    {
      icon: <FiUsers className="w-8 h-8 text-primary-600" />,
      title: "Verified Freelancers",
      description: "Access pre-vetted professionals with proven track records and verified skills."
    },
    {
      icon: <FiShield className="w-8 h-8 text-primary-600" />,
      title: "Secure Payments",
      description: "Protected transactions with escrow system and milestone-based payments."
    },
    {
      icon: <FiClock className="w-8 h-8 text-primary-600" />,
      title: "Flexible Hiring",
      description: "Choose from hourly, fixed-price, or long-term contract arrangements."
    },
    {
      icon: <FiZap className="w-8 h-8 text-primary-600" />,
      title: "AI-Powered Matching",
      description: "Smart algorithms connect you with the perfect talent for your project."
    }
  ];

  const clientSteps = [
    { number: "01", title: "Post Your Job", description: "Describe your project requirements and budget" },
    { number: "02", title: "Review & Hire", description: "Evaluate proposals and select the best freelancer" },
    { number: "03", title: "Pay Securely", description: "Release payments safely through our escrow system" }
  ];

  const freelancerSteps = [
    { number: "01", title: "Create Profile", description: "Showcase your skills and build your portfolio" },
    { number: "02", title: "Apply to Jobs", description: "Find projects that match your expertise" },
    { number: "03", title: "Get Paid", description: "Receive secure payments for completed work" }
  ];

  const clientTestimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
      rating: 5,
      text: "FreelanceX helped us find amazing developers who delivered our mobile app ahead of schedule. The quality exceeded our expectations."
    },
    {
      name: "Michael Chen",
      company: "Digital Marketing Pro",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      rating: 5,
      text: "The platform made it incredibly easy to find skilled designers. Our brand redesign project was completed flawlessly."
    }
  ];

  const freelancerTestimonials = [
    {
      name: "Emma Rodriguez",
      profession: "Full-Stack Developer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      rating: 5,
      text: "FreelanceX has been a game-changer for my career. I've built long-term relationships with clients and grown my income significantly."
    },
    {
      name: "David Park",
      profession: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      rating: 5,
      text: "The quality of projects and clients on FreelanceX is outstanding. I love the secure payment system and professional environment."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Why <span className="text-primary-600">FreelanceX</span>?
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The smarter way to hire and work with top freelancers worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary px-8 py-3">
              Hire Talent
            </Link>
            <Link to="/jobs" className="btn-secondary px-8 py-3">
              Find Work
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Value Section */}
      <section className="py-20" id="trust-value">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for trust and success
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to work confidently with freelancers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center">{prop.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{prop.title}</h3>
                <p className="text-gray-600">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50" id="success-stories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600">
              See what our clients and freelancers have to say
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Client Testimonials */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Client Success</h3>
              <div className="space-y-6">
                {clientTestimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex items-center mb-4">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.company}</p>
                      </div>
                      <div className="ml-auto flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{testimonial.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Freelancer Testimonials */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Freelancer Success</h3>
              <div className="space-y-6">
                {freelancerTestimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex items-center mb-4">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.profession}</p>
                      </div>
                      <div className="ml-auto flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{testimonial.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Get started in just a few simple steps
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* For Clients */}
            <div id="how-to-hire">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">For Clients</h3>
              <div className="space-y-8">
                {clientSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                      {step.number}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Freelancers */}
            <div id="how-to-find-work">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">For Freelancers</h3>
              <div className="space-y-8">
                {freelancerSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                      {step.number}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg text-primary-100 mb-8">
            Join thousands of businesses and freelancers who trust FreelanceX
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Start Hiring
            </Link>
            <Link to="/register" className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors">
              Start Freelancing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyFreelanceX;