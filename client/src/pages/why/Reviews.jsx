import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiArrowRight } from 'react-icons/fi';

const Reviews = () => {
  const clientReviews = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=4F46E5&color=fff&size=64",
      rating: 5,
      review: "FreelanceX helped us find amazing developers who delivered our mobile app ahead of schedule. The quality exceeded our expectations and the platform made collaboration seamless.",
      project: "Mobile App Development"
    },
    {
      name: "Michael Chen",
      company: "Digital Marketing Pro",
      avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=059669&color=fff&size=64",
      rating: 5,
      review: "The platform made it incredibly easy to find skilled designers. Our brand redesign project was completed flawlessly, and we've seen a 40% increase in conversions.",
      project: "Brand Design"
    },
    {
      name: "Lisa Thompson",
      company: "E-commerce Solutions",
      avatar: "https://ui-avatars.com/api/?name=Lisa+Thompson&background=DC2626&color=fff&size=64",
      rating: 5,
      review: "Working with freelancers on FreelanceX has transformed our business. We can scale our team quickly and access specialized skills whenever we need them.",
      project: "Web Development"
    }
  ];

  const freelancerReviews = [
    {
      name: "Emma Rodriguez",
      profession: "Full-Stack Developer",
      avatar: "https://ui-avatars.com/api/?name=Emma+Rodriguez&background=7C3AED&color=fff&size=64",
      rating: 5,
      review: "FreelanceX has been a game-changer for my career. I've built long-term relationships with clients and grown my income significantly. The payment system is reliable and secure.",
      earnings: "$85,000+ earned"
    },
    {
      name: "David Park",
      profession: "UI/UX Designer",
      avatar: "https://ui-avatars.com/api/?name=David+Park&background=0891B2&color=fff&size=64",
      rating: 5,
      review: "The quality of projects and clients on FreelanceX is outstanding. I love the secure payment system and professional environment. It's helped me build a sustainable freelance business.",
      earnings: "$120,000+ earned"
    },
    {
      name: "Alex Martinez",
      profession: "Content Writer",
      avatar: "https://ui-avatars.com/api/?name=Alex+Martinez&background=D97706&color=fff&size=64",
      rating: 5,
      review: "FreelanceX connects me with clients who value quality work. The platform's tools make it easy to manage projects and communicate effectively with clients.",
      earnings: "$45,000+ earned"
    }
  ];

  const stats = [
    { number: "4.9/5", label: "Average Rating" },
    { number: "98%", label: "Job Success Rate" },
    { number: "500K+", label: "Happy Users" },
    { number: "24/7", label: "Support Available" }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FiStar 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Reviews
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            See what it's like to collaborate on FreelanceX
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Reviews */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Clients Say
            </h2>
            <p className="text-lg text-gray-600">
              Hear from businesses who found success on FreelanceX
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {clientReviews.map((review, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <img 
                    src={review.avatar} 
                    alt={review.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-600">{review.company}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {renderStars(review.rating)}
                </div>
                
                <p className="text-gray-700 mb-4">"{review.review}"</p>
                
                <div className="text-sm text-primary-600 font-medium">
                  Project: {review.project}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Freelancer Reviews */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Freelancers Say
            </h2>
            <p className="text-lg text-gray-600">
              Success stories from our freelancer community
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {freelancerReviews.map((review, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <img 
                    src={review.avatar} 
                    alt={review.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-600">{review.profession}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {renderStars(review.rating)}
                </div>
                
                <p className="text-gray-700 mb-4">"{review.review}"</p>
                
                <div className="text-sm text-green-600 font-medium">
                  {review.earnings}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-green-600 to-blue-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to join our community?
          </h2>
          <p className="text-lg text-primary-100 mb-8">
            Start your journey on FreelanceX today and become part of our success stories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="inline-flex items-center bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Join FreelanceX
              <FiArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;