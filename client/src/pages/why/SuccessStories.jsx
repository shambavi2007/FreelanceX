import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTrendingUp, FiClock, FiDollarSign } from 'react-icons/fi';

const SuccessStories = () => {
  const stories = [
    {
      clientName: "TechStart Inc.",
      clientAvatar: "https://ui-avatars.com/api/?name=TechStart+Inc&background=4F46E5&color=fff&size=64",
      problem: "Needed a mobile app developed in 6 weeks for product launch",
      freelancerName: "Sarah Chen",
      freelancerSkills: "React Native Developer",
      solution: "Built cross-platform app with real-time features and payment integration",
      results: {
        timeSaved: "4 weeks faster than expected",
        revenue: "$2.5M in first quarter",
        growth: "300% user adoption"
      },
      testimonial: "Sarah delivered beyond our expectations. The app launched on time and exceeded all performance metrics."
    },
    {
      clientName: "Digital Marketing Pro",
      clientAvatar: "https://ui-avatars.com/api/?name=Digital+Marketing&background=059669&color=fff&size=64",
      problem: "Brand redesign needed for market expansion",
      freelancerName: "Alex Rodriguez",
      freelancerSkills: "Brand Designer",
      solution: "Complete brand identity with logo, guidelines, and marketing materials",
      results: {
        timeSaved: "2 months ahead of schedule",
        revenue: "40% increase in conversions",
        growth: "150% brand recognition"
      },
      testimonial: "Alex transformed our brand completely. Our conversion rates improved dramatically after the redesign."
    },
    {
      clientName: "E-commerce Solutions",
      clientAvatar: "https://ui-avatars.com/api/?name=Ecommerce+Solutions&background=DC2626&color=fff&size=64",
      problem: "Website performance issues affecting sales",
      freelancerName: "David Park",
      freelancerSkills: "Full-Stack Developer",
      solution: "Optimized database, improved frontend performance, and implemented caching",
      results: {
        timeSaved: "Reduced load time by 75%",
        revenue: "$500K additional monthly revenue",
        growth: "200% improvement in user experience"
      },
      testimonial: "David's optimization work transformed our website. Sales increased immediately after deployment."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Success Stories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover how teams work strategically and grow together on FreelanceX
          </p>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {stories.map((story, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-8 lg:p-12">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Client Info & Problem */}
                    <div>
                      <div className="flex items-center mb-6">
                        <img 
                          src={story.clientAvatar} 
                          alt={story.clientName}
                          className="w-16 h-16 rounded-full mr-4"
                        />
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{story.clientName}</h3>
                          <p className="text-gray-600">Client</p>
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">The Challenge</h4>
                        <p className="text-gray-700">{story.problem}</p>
                      </div>

                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">The Solution</h4>
                        <p className="text-gray-700 mb-4">{story.solution}</p>
                        <div className="flex items-center text-primary-600">
                          <span className="font-medium">{story.freelancerName}</span>
                          <span className="mx-2">•</span>
                          <span>{story.freelancerSkills}</span>
                        </div>
                      </div>
                    </div>

                    {/* Results */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-6">The Results</h4>
                      
                      <div className="grid gap-6 mb-8">
                        <div className="flex items-center p-4 bg-green-50 rounded-lg">
                          <FiClock className="w-6 h-6 text-green-600 mr-3" />
                          <div>
                            <p className="font-medium text-gray-900">Time Efficiency</p>
                            <p className="text-green-600">{story.results.timeSaved}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                          <FiDollarSign className="w-6 h-6 text-blue-600 mr-3" />
                          <div>
                            <p className="font-medium text-gray-900">Revenue Impact</p>
                            <p className="text-blue-600">{story.results.revenue}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                          <FiTrendingUp className="w-6 h-6 text-purple-600 mr-3" />
                          <div>
                            <p className="font-medium text-gray-900">Growth</p>
                            <p className="text-purple-600">{story.results.growth}</p>
                          </div>
                        </div>
                      </div>

                      <blockquote className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary-500">
                        <p className="text-gray-700 italic">"{story.testimonial}"</p>
                        <cite className="text-sm text-gray-600 mt-2 block">— {story.clientName}</cite>
                      </blockquote>
                    </div>
                  </div>
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
            Ready to create your success story?
          </h2>
          <p className="text-lg text-primary-100 mb-8">
            Join thousands of businesses who have found their perfect freelancer match
          </p>
          <Link 
            to="/register" 
            className="inline-flex items-center bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Hire Talent
            <FiArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;