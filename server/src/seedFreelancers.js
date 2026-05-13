require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('./models/User');

const freelancers = [
  {
    name: 'Arjun Sharma',
    email: 'arjun.sharma@demo.com',
    password: 'password123',
    role: 'freelancer',
    bio: 'Full-stack React & Node.js developer with 5 years of experience building scalable web apps.',
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'REST APIs'],
    experience: 5,
    hourlyRate: 800,
    profileCompleted: true
  },
  {
    name: 'Priya Nair',
    email: 'priya.nair@demo.com',
    password: 'password123',
    role: 'freelancer',
    bio: 'UI/UX designer and frontend developer specializing in Figma, Tailwind CSS, and React.',
    skills: ['Figma', 'React', 'Tailwind CSS', 'Graphic Design', 'Prototyping'],
    experience: 3,
    hourlyRate: 600,
    profileCompleted: true
  },
  {
    name: 'Rahul Verma',
    email: 'rahul.verma@demo.com',
    password: 'password123',
    role: 'freelancer',
    bio: 'Python developer and data analyst. Expert in machine learning, pandas, and data visualization.',
    skills: ['Python', 'Data Analysis', 'Machine Learning', 'Pandas', 'Matplotlib'],
    experience: 4,
    hourlyRate: 750,
    profileCompleted: true
  },
  {
    name: 'Sneha Patel',
    email: 'sneha.patel@demo.com',
    password: 'password123',
    role: 'freelancer',
    bio: 'Creative content writer with expertise in blogs, SEO articles, and social media copy.',
    skills: ['Content Writing', 'SEO', 'Copywriting', 'Blog Writing', 'Social Media'],
    experience: 2,
    hourlyRate: 350,
    profileCompleted: true
  },
  {
    name: 'Karan Mehta',
    email: 'karan.mehta@demo.com',
    password: 'password123',
    role: 'freelancer',
    bio: 'Mobile app developer building cross-platform apps with React Native and Flutter.',
    skills: ['React Native', 'Flutter', 'Mobile Development', 'Firebase', 'iOS', 'Android'],
    experience: 4,
    hourlyRate: 900,
    profileCompleted: true
  },
  {
    name: 'Divya Krishnan',
    email: 'divya.krishnan@demo.com',
    password: 'password123',
    role: 'freelancer',
    bio: 'Digital marketing specialist focused on Google Ads, Meta campaigns, and growth hacking.',
    skills: ['Digital Marketing', 'Google Ads', 'SEO', 'Meta Ads', 'Analytics'],
    experience: 3,
    hourlyRate: 500,
    profileCompleted: true
  },
  {
    name: 'Amit Joshi',
    email: 'amit.joshi@demo.com',
    password: 'password123',
    role: 'freelancer',
    bio: 'Video editor and motion graphics designer. Experienced with Premiere Pro and After Effects.',
    skills: ['Video Editing', 'After Effects', 'Premiere Pro', 'Motion Graphics', 'YouTube'],
    experience: 3,
    hourlyRate: 550,
    profileCompleted: true
  },
  {
    name: 'Meera Iyer',
    email: 'meera.iyer@demo.com',
    password: 'password123',
    role: 'freelancer',
    bio: 'Backend developer specializing in Node.js microservices, PostgreSQL, and cloud deployments.',
    skills: ['Node.js', 'PostgreSQL', 'AWS', 'Docker', 'Microservices'],
    experience: 6,
    hourlyRate: 1000,
    profileCompleted: true
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  let added = 0;
  for (const data of freelancers) {
    const exists = await User.findOne({ email: data.email });
    if (!exists) {
      await User.create(data);
      console.log(`✅ Added: ${data.name}`);
      added++;
    } else {
      console.log(`⏭  Skipped (already exists): ${data.name}`);
    }
  }

  console.log(`\nDone. ${added} freelancer(s) added.`);
  await mongoose.disconnect();
}

seed().catch(err => { console.error(err); process.exit(1); });
