import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiTrendingUp, FiUsers, FiDollarSign, FiTarget, FiAward } from 'react-icons/fi';

const GrowBusiness = () => {
  const strategies = [
    {
      title: "Increase Your Rates Strategically",
      content: [
        "Track your results and showcase ROI to justify higher rates",
        "Specialize in high-value skills that are in demand",
        "Build a portfolio of successful case studies",
        "Gradually increase rates with existing clients as you deliver value",
        "Position yourself as an expert, not just a service provider"
      ]
    },
    {
      title: "Build Long-term Client Relationships",
      content: [
        "Focus on understanding your client's business goals",
        "Proactively suggest improvements and optimizations",
        "Become indispensable by learning their systems and processes",
        "Offer retainer agreements for ongoing work",
        "Ask for referrals from satisfied clients"
      ]
    },
    {
      title: "Scale Your Operations",
      content: [
        "Create templates and systems to work more efficiently",
        "Consider subcontracting work to other freelancers",
        "Develop passive income streams like courses or templates",
        "Build a personal brand and online presence",
        "Network with other professionals in your industry"
      ]
    },
    {
      title: "Diversify Your Income Streams",
      content: [
        "Offer different service tiers (basic, premium, enterprise)",
        "Create digital products related to your expertise",
        "Teach or mentor other freelancers",
        "Write and sell industry-specific content",
        "Develop SaaS tools for your niche market"
      ]
    },
    {
      title: "Position Yourself as an Expert",
      content: [
        "Write blog posts and articles about your expertise",
        "Speak at industry conferences and events",
        "Create valuable content on social media",
        "Get featured in industry publications",
        "Build thought leadership in your niche"
      ]
    },
    {
      title: "Optimize Your Business Operations",
      content: [
        "Use project management tools to stay organized",
        "Automate repetitive tasks and communications",
        "Track your time and profitability by project type",
        "Set clear boundaries and working hours",
        "Invest in professional development and new skills"
      ]
    }
  ];

  const milestones = [
    {
      icon: <FiTarget className="w-8 h-8 text-blue-600" />,
      title: "$50K+ Annual Revenue",
      description: "Focus on consistent client acquisition and quality delivery",
      tips: ["Build a strong portfolio", "Maintain 5-star ratings", "Develop core skills"]
    },
    {
      icon: <FiTrendingUp className="w-8 h-8 text-green-600" />,
      title: "$100K+ Annual Revenue",
      description: "Scale operations and increase rates strategically",
      tips: ["Specialize in high-value services", "Build long-term relationships", "Increase rates gradually"]
    },
    {
      icon: <FiAward className="w-8 h-8 text-purple-600" />,
      title: "$200K+ Annual Revenue",
      description: "Become a recognized expert and build multiple income streams",
      tips: ["Create passive income", "Build a personal brand", "Mentor others"]
    }
  ];

  const premiumOpportunities = [
    {
      type: "Enterprise Clients",
      description: "Large companies with bigger budgets and long-term projects",
      requirements: "Strong portfolio, excellent communication, proven track record"
    },
    {
      type: "Retainer Agreements",
      description: "Ongoing monthly contracts for consistent income",
      requirements: "Established relationship, proven value, reliable delivery"
    },
    {
      type: "Consulting Projects",
      description: "High-level strategic work with premium pricing",
      requirements: "Deep expertise, business acumen, thought leadership"
    },
    {
      type: "Product Development",
      description: "Creating and selling your own products or services",
      requirements: "Market knowledge, technical skills, entrepreneurial mindset"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Grow Your Freelance Business
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Strategies and tips to scale your freelancing career and increase your income
            </p>
          </div>
        </div>
      </section>

      {/* Growth Strategies */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Proven Growth Strategies
            </h2>
            <p className="text-lg text-gray-600">
              Learn from successful freelancers who have scaled their businesses
            </p>
          </div>

          <div className="space-y-12">
            {strategies.map((strategy, index) => (
              <div key={index} className="bg-white">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{strategy.title}</h3>
                <div className="space-y-4">
                  {strategy.content.map((item, itemIndex) => (
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

      {/* Revenue Milestones */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Revenue Milestones
            </h2>
            <p className="text-lg text-gray-600">
              Your roadmap to freelance success at different income levels
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex justify-center mb-4">
                  {milestone.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{milestone.title}</h3>
                <p className="text-gray-600 mb-6 text-center">{milestone.description}</p>
                <div className="space-y-2">
                  {milestone.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Opportunities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Premium Opportunities
            </h2>
            <p className="text-lg text-gray-600">
              High-value opportunities for experienced freelancers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {premiumOpportunities.map((opportunity, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{opportunity.type}</h3>
                <p className="text-gray-700 mb-4">{opportunity.description}</p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Requirements:</h4>
                  <p className="text-blue-800 text-sm">{opportunity.requirements}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to scale your freelance business?
          </h2>
          <p className="text-lg text-primary-100 mb-8">
            Start implementing these strategies today and take your freelance career to the next level
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/jobs" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Find Premium Jobs
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

export default GrowBusiness;