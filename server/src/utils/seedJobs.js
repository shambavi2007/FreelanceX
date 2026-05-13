require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Job = require('../models/Job');
const User = require('../models/User');

const sampleJobs = [
  {
    title: 'React.js Frontend Developer for E-commerce Website',
    description: 'We are looking for an experienced React.js developer to build a modern e-commerce platform. The project includes product listing, cart, checkout, and payment integration. Must have experience with Redux and REST APIs.',
    budget: { min: 15000, max: 30000 },
    budgetType: 'fixed',
    category: 'Web Development',
    experienceLevel: 'intermediate',
    duration: '1-3-months',
    skills: ['React', 'Redux', 'JavaScript', 'Tailwind CSS', 'REST API'],
    status: 'active'
  },
  {
    title: 'Node.js Backend Developer for Mobile App API',
    description: 'Need a skilled Node.js developer to build RESTful APIs for our mobile application. The backend should include user authentication, real-time notifications, and database management using MongoDB.',
    budget: { min: 20000, max: 40000 },
    budgetType: 'fixed',
    category: 'Web Development',
    experienceLevel: 'expert',
    duration: '1-3-months',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'Socket.io'],
    status: 'active'
  },
  {
    title: 'UI/UX Designer for SaaS Dashboard',
    description: 'Looking for a creative UI/UX designer to design a professional SaaS analytics dashboard. You will create wireframes, prototypes, and final designs in Figma. Experience with data visualization is a plus.',
    budget: { min: 10000, max: 20000 },
    budgetType: 'fixed',
    category: 'Graphic Design',
    experienceLevel: 'intermediate',
    duration: 'less-than-1-month',
    skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping', 'Adobe XD'],
    status: 'active'
  },
  {
    title: 'Content Writer for Tech Blog (10 Articles)',
    description: 'We need a talented content writer to produce 10 high-quality articles for our technology blog. Topics include AI, cloud computing, and software development. Each article should be 1500-2000 words with SEO optimization.',
    budget: { min: 5000, max: 10000 },
    budgetType: 'fixed',
    category: 'Content Writing',
    experienceLevel: 'intermediate',
    duration: 'less-than-1-month',
    skills: ['Content Writing', 'SEO', 'Technical Writing', 'Research', 'Blogging'],
    status: 'active'
  },
  {
    title: 'Flutter Mobile App Developer',
    description: 'Seeking an experienced Flutter developer to build a cross-platform mobile app for iOS and Android. The app includes user authentication, real-time chat, push notifications, and payment gateway integration.',
    budget: { min: 30000, max: 60000 },
    budgetType: 'fixed',
    category: 'Mobile Development',
    experienceLevel: 'expert',
    duration: '3-6-months',
    skills: ['Flutter', 'Dart', 'Firebase', 'REST API', 'iOS', 'Android'],
    status: 'active'
  },
  {
    title: 'Digital Marketing Specialist for Startup',
    description: 'We are a growing startup looking for a digital marketing expert to manage our social media, run Google and Facebook ads, and improve our SEO rankings. Must have proven track record with measurable results.',
    budget: { min: 8000, max: 15000 },
    budgetType: 'fixed',
    category: 'Digital Marketing',
    experienceLevel: 'intermediate',
    duration: '1-3-months',
    skills: ['SEO', 'Google Ads', 'Facebook Ads', 'Social Media', 'Analytics'],
    status: 'active'
  },
  {
    title: 'Python Data Analyst for Business Intelligence',
    description: 'Looking for a Python data analyst to analyze our sales data, create visualizations, and build automated reports. Experience with Pandas, NumPy, and data visualization libraries required.',
    budget: { min: 12000, max: 25000 },
    budgetType: 'fixed',
    category: 'Data Analysis',
    experienceLevel: 'intermediate',
    duration: 'less-than-1-month',
    skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'SQL', 'Power BI'],
    status: 'active'
  },
  {
    title: 'WordPress Website Developer',
    description: 'Need a WordPress developer to build a professional business website with custom theme, contact forms, blog section, and SEO optimization. The site should be mobile responsive and fast loading.',
    budget: { min: 8000, max: 18000 },
    budgetType: 'fixed',
    category: 'Web Development',
    experienceLevel: 'entry',
    duration: 'less-than-1-month',
    skills: ['WordPress', 'PHP', 'CSS', 'JavaScript', 'SEO', 'Elementor'],
    status: 'active'
  },
  {
    title: 'Video Editor for YouTube Channel',
    description: 'We run a popular YouTube channel and need a skilled video editor to edit 8-10 videos per month. Must be proficient in Adobe Premiere Pro or Final Cut Pro. Experience with motion graphics is a bonus.',
    budget: { min: 6000, max: 12000 },
    budgetType: 'fixed',
    category: 'Video Editing',
    experienceLevel: 'intermediate',
    duration: '3-6-months',
    skills: ['Adobe Premiere Pro', 'Final Cut Pro', 'After Effects', 'Color Grading', 'Motion Graphics'],
    status: 'active'
  },
  {
    title: 'Full Stack MERN Developer for Fintech App',
    description: 'We are building a fintech application and need a full stack MERN developer. The project includes user dashboard, transaction management, real-time notifications, and third-party API integrations.',
    budget: { min: 40000, max: 80000 },
    budgetType: 'fixed',
    category: 'Web Development',
    experienceLevel: 'expert',
    duration: '3-6-months',
    skills: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Redux', 'AWS'],
    status: 'active'
  }
];

const seedJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Find any client user to assign as job owner
    let client = await User.findOne({ role: 'client' });

    if (!client) {
      // Create a demo client if none exists
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('demo123456', 10);
      client = await User.create({
        name: 'Demo Client',
        email: 'democlient@freelancex.com',
        password: hashedPassword,
        role: 'client',
        isActive: true
      });
      console.log('✅ Created demo client user');
    }

    // Add client reference to all jobs
    const jobsWithClient = sampleJobs.map(job => ({ ...job, client: client._id }));

    // Insert jobs
    const inserted = await Job.insertMany(jobsWithClient);
    console.log(`✅ Successfully added ${inserted.length} sample jobs!`);

    await mongoose.disconnect();
    console.log('✅ Done! Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedJobs();
