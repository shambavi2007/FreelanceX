import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiUsers, FiCheckCircle } from 'react-icons/fi';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FiSearch className="w-8 h-8" />,
      title: "Post Your Project",
      description: "Tell us what you need done and receive free quotes from our talented freelancers within minutes.",
      step: "01",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Choose Freelancers",
      description: "Compare profiles, reviews, and proposals then interview your favorites. Start working with them immediately.",
      step: "02",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FiCheckCircle className="w-8 h-8" />,
      title: "Get Work Done",
      description: "Use our platform to chat, share files, and collaborate until your project is completed to your satisfaction.",
      step: "03",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How FreelanceX Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started is easy. Find freelancers, review their work, and hire the best fit — all on FreelanceX.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative text-center group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 z-0"></div>
              )}
              
              {/* Step Number */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r ${step.color} text-white rounded-full flex items-center justify-center font-bold text-lg z-10 shadow-lg`}
              >
                {step.step}
              </motion.div>
              
              {/* Card */}
              <motion.div
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="bg-gray-50 rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:bg-white"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} p-4 mx-auto mb-6`}
                >
                  <div className="text-white w-full h-full flex items-center justify-center">
                    {step.icon}
                  </div>
                </motion.div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;