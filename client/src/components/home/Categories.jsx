import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiCode, 
  FiPenTool, 
  FiEdit3, 
  FiTrendingUp, 
  FiSmartphone, 
  FiBarChart2,
  FiVideo,
  FiGlobe
} from 'react-icons/fi';

const Categories = () => {
  const categories = [
    {
      name: 'Web Development',
      icon: <FiCode className="w-8 h-8" />,
      jobs: '12,543',
      description: 'Build websites and web applications',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Graphic Design',
      icon: <FiPenTool className="w-8 h-8" />,
      jobs: '8,921',
      description: 'Create visual content and branding',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Content Writing',
      icon: <FiEdit3 className="w-8 h-8" />,
      jobs: '6,789',
      description: 'Write engaging content and copy',
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Digital Marketing',
      icon: <FiTrendingUp className="w-8 h-8" />,
      jobs: '5,432',
      description: 'Promote brands and drive growth',
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'Mobile Development',
      icon: <FiSmartphone className="w-8 h-8" />,
      jobs: '4,567',
      description: 'Build iOS and Android apps',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      name: 'Data Analysis',
      icon: <FiBarChart2 className="w-8 h-8" />,
      jobs: '3,210',
      description: 'Analyze data and create insights',
      color: 'from-teal-500 to-blue-500'
    },
    {
      name: 'Video Editing',
      icon: <FiVideo className="w-8 h-8" />,
      jobs: '2,876',
      description: 'Edit and produce video content',
      color: 'from-rose-500 to-pink-500'
    },
    {
      name: 'Translation',
      icon: <FiGlobe className="w-8 h-8" />,
      jobs: '1,954',
      description: 'Translate content across languages',
      color: 'from-amber-500 to-orange-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore thousands of projects in the most in-demand categories
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                {/* Icon with gradient background */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white w-full h-full flex items-center justify-center">
                    {category.icon}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {category.description}
                </p>
                <div className="text-green-600 font-semibold text-sm">
                  {category.jobs} jobs available
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            View All Categories
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;