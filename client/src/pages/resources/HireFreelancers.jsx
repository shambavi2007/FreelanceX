import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiUsers, FiDollarSign, FiClock, FiStar, FiShield } from 'react-icons/fi';

const HireGuide = () => {
  const sections = [
    {
      title: "Before You Start",
      content: [
        "Define your project scope and requirements clearly",
        "Set a realistic budget and timeline",
        "Identify the specific skills you need",
        "Prepare any necessary project materials or briefs"
      ]
    },
    {
      title: "Writing an Effective Job Post",
      content: [
        "Use a clear, descriptive title that includes key skills",
        "Provide detailed project requirements and expectations",
        "Include your budget range and preferred timeline",
        "Specify your communication preferences and working style",
        "Add relevant files, mockups, or reference materials"
      ]
    },
    {
      title: "Evaluating Freelancers",
      content: [
        "Review portfolios for relevant work samples",
        "Check client feedback and overall ratings",
        "Look for freelancers with similar project experience",
        "Consider their communication style and responsiveness",
        "Verify their availability matches your timeline"
      ]
    },
    {
      title: "Making the Right Choice",
      content: [
        "Don't always choose the lowest bid - consider value",
        "Interview top candidates to assess fit",
        "Ask for clarifications on their approach",
        "Check references from previous clients",
        "Trust your instincts about communication and professionalism"
      ]
    },
    {
      title: "Managing Your Project",
      content: [
        "Set clear milestones and deadlines",
        "Maintain regular communication throughout the project",
        "Provide timely feedback and approvals",
        "Use FreelanceX's built-in tools for tracking progress",
        "Be available for questions and clarifications"
      ]
    },
    {
      title: "Ensuring Success",
      content: [
        "Pay milestones promptly upon completion",
        "Provide honest, constructive feedback",
        "Build long-term relationships with great freelancers",
        "Leave detailed reviews to help other clients",
        "Consider ongoing or repeat work opportunities"
      ]
    }
  ];

  const tips = [
    {
      icon: <FiUsers className="w-6 h-6 text-blue-600" />,
      title: "Quality Over Price",
      description: "Experienced freelancers may cost more but often deliver better results faster"
    },
    {
      icon: <FiClock className="w-6 h-6 text-green-600" />,
      title: "Clear Communication",
      description: "Set expectations early and maintain regular check-ins throughout the project"
    },
    {
      icon: <FiShield className="w-6 h-6 text-purple-600" />,
      title: "Use Escrow Protection",
      description: "Always use FreelanceX's secure payment system for your protection"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How to Hire Freelancers on FreelanceX
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your complete guide to finding and hiring the perfect freelancer for your project
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
              Pro Tips for Hiring Success
            </h2>
            <p className="text-lg text-gray-600">
              Expert advice from successful clients
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

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to hire your first freelancer?
          </h2>
          <p className="text-lg text-primary-100 mb-8">
            Put these tips into practice and find the perfect freelancer for your project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Post a Job
            </Link>
            <Link to="/resources" className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors">
              More Resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HireGuide;