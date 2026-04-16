import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiSearch, FiDollarSign, FiTrendingUp, FiShield, FiClock } from 'react-icons/fi';

const HowToFindWork = () => {
  const steps = [
    {
      number: "01",
      icon: <FiUser className="w-8 h-8" />,
      title: "Create Your Profile",
      description: "Build a compelling profile that showcases your skills and experience",
      details: [
        "Add a professional photo and compelling headline",
        "Write a detailed overview of your expertise",
        "Showcase your best work in your portfolio",
        "List your skills and get verified",
        "Set your hourly rate and availability"
      ]
    },
    {
      number: "02",
      icon: <FiSearch className="w-8 h-8" />,
      title: "Apply to Jobs",
      description: "Find projects that match your skills and submit winning proposals",
      details: [
        "Browse jobs that match your expertise",
        "Write personalized proposals for each job",
        "Highlight relevant experience and portfolio items",
        "Ask clarifying questions to show interest",
        "Follow up professionally with potential clients"
      ]
    },
    {
      number: "03",
      icon: <FiDollarSign className="w-8 h-8" />,
      title: "Get Paid Securely",
      description: "Complete projects and receive payments through our secure system",
      details: [
        "Communicate regularly with your client",
        "Deliver high-quality work on time",
        "Use milestone payments for larger projects",
        "Get paid automatically upon completion",
        "Build long-term client relationships"
      ]
    }
  ];

  const tips = [
    {
      icon: <FiTrendingUp className="w-6 h-6 text-green-600" />,
      title: "Optimize Your Profile",
      description: "Complete profiles get 10x more views and job invitations"
    },
    {
      icon: <FiShield className="w-6 h-6 text-blue-600" />,
      title: "Build Your Reputation",
      description: "Deliver quality work to earn 5-star reviews and repeat clients"
    },
    {
      icon: <FiClock className="w-6 h-6 text-purple-600" />,
      title: "Be Responsive",
      description: "Quick responses to messages increase your chances of getting hired"
    }
  ];

  const earnings = [
    { skill: "Web Development", range: "$25-$150/hr", demand: "High" },
    { skill: "Graphic Design", range: "$20-$100/hr", demand: "High" },
    { skill: "Content Writing", range: "$15-$75/hr", demand: "Medium" },
    { skill: "Digital Marketing", range: "$30-$120/hr", demand: "High" },
    { skill: "Data Analysis", range: "$35-$140/hr", demand: "High" },
    { skill: "Mobile Development", range: "$40-$160/hr", demand: "Very High" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How to Find Work
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Learn how to grow your independent career on FreelanceX
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Path to Freelance Success
            </h2>
            <p className="text-lg text-gray-600">
              Follow these steps to start earning on FreelanceX
            </p>
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                        {step.number}
                      </div>
                      <div className="text-primary-600">
                        {step.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-lg text-gray-600 mb-6">{step.description}</p>
                    
                    <ul className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 h-80 flex items-center justify-center">
                      <div className="text-6xl text-gray-400">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pro Tips for Success
            </h2>
            <p className="text-lg text-gray-600">
              Insider secrets from top-earning freelancers
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

      {/* Earnings Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Earning Potential by Skill
            </h2>
            <p className="text-lg text-gray-600">
              See what freelancers in your field are earning
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Skill</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Hourly Rate</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Demand</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {earnings.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.skill}</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">{item.range}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          item.demand === 'Very High' ? 'bg-green-100 text-green-800' :
                          item.demand === 'High' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.demand}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-green-600 to-blue-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to start your freelance journey?
          </h2>
          <p className="text-lg text-primary-100 mb-8">
            Join thousands of freelancers earning on FreelanceX
          </p>
          <Link 
            to="/jobs" 
            className="inline-flex items-center bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Find Work
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowToFindWork;