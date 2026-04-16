import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiStar, FiTrendingUp, FiMessageCircle, FiDollarSign, FiShield } from 'react-icons/fi';

const FreelancerGuide = () => {
  const sections = [
    {
      title: "Setting Up Your Profile",
      content: [
        "Choose a professional profile photo that represents you well",
        "Write a compelling headline that highlights your main expertise",
        "Create a detailed overview showcasing your skills and experience",
        "Add your best work samples to your portfolio",
        "List all relevant skills and get them verified when possible",
        "Set competitive hourly rates based on your experience level"
      ]
    },
    {
      title: "Optimizing for Success",
      content: [
        "Complete all profile sections to increase visibility",
        "Use keywords that clients search for in your field",
        "Regularly update your portfolio with recent work",
        "Maintain a high response rate to client messages",
        "Keep your availability status current",
        "Showcase client testimonials and case studies"
      ]
    },
    {
      title: "Writing Winning Proposals",
      content: [
        "Read the job description carefully and address specific requirements",
        "Personalize each proposal - avoid generic templates",
        "Highlight relevant experience and portfolio pieces",
        "Ask thoughtful questions to show genuine interest",
        "Provide a clear timeline and breakdown of your approach",
        "End with a professional call-to-action"
      ]
    },
    {
      title: "Managing Client Relationships",
      content: [
        "Communicate clearly and professionally at all times",
        "Set realistic expectations and deliver on promises",
        "Provide regular updates on project progress",
        "Be proactive about potential issues or delays",
        "Ask for feedback throughout the project",
        "Go above and beyond to exceed client expectations"
      ]
    },
    {
      title: "Delivering Quality Work",
      content: [
        "Understand the project requirements thoroughly before starting",
        "Create a detailed project plan with milestones",
        "Use professional tools and follow industry best practices",
        "Test and review your work before submission",
        "Provide clear documentation and instructions",
        "Offer revisions and support as needed"
      ]
    },
    {
      title: "Building Long-term Success",
      content: [
        "Focus on building lasting client relationships",
        "Ask satisfied clients for testimonials and referrals",
        "Continuously improve your skills and stay updated",
        "Diversify your client base to reduce dependency",
        "Consider specializing in a profitable niche",
        "Maintain a professional online presence"
      ]
    }
  ];

  const tips = [
    {
      icon: <FiStar className="w-6 h-6 text-yellow-600" />,
      title: "Build Your Reputation",
      description: "Focus on delivering exceptional work to earn 5-star reviews and repeat clients"
    },
    {
      icon: <FiMessageCircle className="w-6 h-6 text-blue-600" />,
      title: "Communicate Effectively",
      description: "Quick, clear communication sets you apart from other freelancers"
    },
    {
      icon: <FiTrendingUp className="w-6 h-6 text-green-600" />,
      title: "Continuous Learning",
      description: "Stay updated with industry trends and continuously improve your skills"
    }
  ];

  const commonMistakes = [
    "Submitting generic proposals without reading the job description",
    "Setting rates too low to compete instead of showcasing value",
    "Poor communication or delayed responses to client messages",
    "Over-promising and under-delivering on project timelines",
    "Not asking clarifying questions before starting work",
    "Neglecting to update portfolio with recent, relevant work"
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How to Use FreelanceX as a Freelancer
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master the platform and maximize your freelancing success with our comprehensive guide
            </p>
          </div>
        </div>
      </section>

      {/* Guide Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="bg-white">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
                <div className="space-y-4">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start">
                      <FiCheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro Tips */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pro Tips from Top Freelancers
            </h2>
            <p className="text-lg text-gray-600">
              Learn from freelancers who consistently earn top ratings and high income
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {tips.map((tip, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="flex justify-center mb-4">
                  {tip.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{tip.title}</h3>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Common Mistakes to Avoid
            </h2>
            <p className="text-lg text-gray-600">
              Learn from others' mistakes and avoid these common pitfalls
            </p>
          </div>

          <div className="bg-red-50 rounded-xl p-8">
            <div className="space-y-4">
              {commonMistakes.map((mistake, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-700">{mistake}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to start your freelance journey?
          </h2>
          <p className="text-lg text-primary-100 mb-8">
            Apply these strategies and start building your successful freelance career on FreelanceX
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Create Profile
            </Link>
            <Link to="/jobs" className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors">
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreelancerGuide;