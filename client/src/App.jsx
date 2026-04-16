import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import WhyFreelanceX from './pages/WhyFreelanceX';
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import PostJob from './pages/PostJob';
import MyJobs from './pages/MyJobs';
import MyProposals from './pages/MyProposals';
import Earnings from './pages/Earnings';
import Billing from './pages/Billing';
import VerifyPhone from './pages/VerifyPhone';
// Why pages
import SuccessStories from './pages/why/SuccessStories';
import HowToHire from './pages/why/HowToHire';
import Reviews from './pages/why/Reviews';
import HowToFindWork from './pages/why/HowToFindWork';
// Resource pages
import Resources from './pages/Resources';
import HireGuide from './pages/resources/HireFreelancers';
import FreelancerGuide from './pages/resources/FreelancerGuide';
import GrowBusiness from './pages/resources/GrowBusiness';
import UseFreelanceX from './pages/resources/UseFreelanceX';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import InfoPage from './pages/InfoPage';
import ForgotPassword from './pages/ForgotPassword';

// Placeholder components for old dashboard routes
const Unauthorized = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900">403</h1>
      <p className="mt-4 text-gray-600">You don't have permission to access this page.</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<><Navbar /><JobDetails /></>} />
          <Route path="/why-freelancex" element={<><Navbar /><WhyFreelanceX /></>} />
          <Route path="/pricing" element={<><Navbar /><Pricing /></>} />
          {/* Why FreelanceX Pages */}
          <Route path="/why/success-stories" element={<><Navbar /><SuccessStories /></>} />
          <Route path="/why/how-to-hire" element={<><Navbar /><HowToHire /></>} />
          <Route path="/why/reviews" element={<><Navbar /><Reviews /></>} />
          <Route path="/why/how-to-find-work" element={<><Navbar /><HowToFindWork /></>} />
          {/* Resource Pages */}
          <Route path="/resources" element={<><Navbar /><Resources /></>} />
          <Route path="/resources/hire-freelancers" element={<><Navbar /><HireGuide /></>} />
          <Route path="/resources/use-freelancex" element={<><Navbar /><UseFreelanceX /></>} />
          <Route path="/resources/hire-guide" element={<><Navbar /><HireGuide /></>} />
          <Route path="/resources/freelancer-guide" element={<><Navbar /><FreelancerGuide /></>} />
          <Route path="/resources/grow-business" element={<><Navbar /><GrowBusiness /></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Route aliases to avoid broken links */}
          <Route path="/hire" element={<Navigate to="/resources/hire-freelancers" replace />} />
          <Route path="/how-to-hire" element={<Navigate to="/why/how-to-hire" replace />} />
          <Route path="/find-work" element={<Navigate to="/why/how-to-find-work" replace />} />
          <Route path="/stories" element={<Navigate to="/why/success-stories" replace />} />
          <Route path="/reviews" element={<Navigate to="/why/reviews" replace />} />

          {/* Footer and utility pages */}
          <Route path="/talent-marketplace" element={<><Navbar /><InfoPage title="Talent Marketplace" subtitle="Browse curated talent pools, shortlist experts, and hire confidently." ctaLabel="Explore Jobs" ctaTo="/jobs" /></>} />
          <Route path="/project-catalog" element={<><Navbar /><InfoPage title="Project Catalog" subtitle="Discover ready-to-start service packages from trusted freelancers." ctaLabel="Find Freelancers" ctaTo="/resources/hire-freelancers" /></>} />
          <Route path="/enterprise" element={<><Navbar /><InfoPage title="FreelanceX Enterprise" subtitle="Scale hiring with compliance, reporting, and dedicated support." ctaLabel="Contact Support" ctaTo="/support" /></>} />
          <Route path="/contracts" element={<><Navbar /><InfoPage title="Direct Contracts" subtitle="Collaborate with clients directly and manage work transparently." ctaLabel="Start Working" ctaTo="/jobs" /></>} />
          <Route path="/plus" element={<><Navbar /><InfoPage title="Freelancer Plus" subtitle="Unlock premium tools, boosted visibility, and faster growth." ctaLabel="Upgrade Profile" ctaTo="/edit-profile" /></>} />
          <Route path="/support" element={<><Navbar /><InfoPage title="Help & Support" subtitle="Get help with account, payments, jobs, and platform usage." ctaLabel="Go to Dashboard" ctaTo="/dashboard" /></>} />
          <Route path="/blog" element={<><Navbar /><InfoPage title="FreelanceX Blog" subtitle="Insights, hiring tips, and freelancing best practices." ctaLabel="Read Resources" ctaTo="/resources" /></>} />
          <Route path="/about" element={<><Navbar /><InfoPage title="About FreelanceX" subtitle="We help businesses and freelancers connect and grow together." ctaLabel="Get Started" ctaTo="/register" /></>} />
          <Route path="/leadership" element={<><Navbar /><InfoPage title="Leadership" subtitle="Meet the team building the future of remote work." ctaLabel="Join FreelanceX" ctaTo="/register" /></>} />
          <Route path="/careers" element={<><Navbar /><InfoPage title="Careers" subtitle="Build your career with a team passionate about impact." ctaLabel="See Opportunities" ctaTo="/jobs" /></>} />
          <Route path="/press" element={<><Navbar /><InfoPage title="Press" subtitle="Latest media mentions, announcements, and brand assets." ctaLabel="Company Page" ctaTo="/about" /></>} />
          <Route path="/privacy" element={<><Navbar /><InfoPage title="Privacy Policy" subtitle="Learn how we collect, use, and protect your data." ctaLabel="Back to Home" ctaTo="/" /></>} />
          <Route path="/terms" element={<><Navbar /><InfoPage title="Terms of Service" subtitle="Platform terms for clients, freelancers, and visitors." ctaLabel="Back to Home" ctaTo="/" /></>} />
          <Route path="/cookies" element={<><Navbar /><InfoPage title="Cookie Policy" subtitle="Details about cookie usage and preference controls." ctaLabel="Back to Home" ctaTo="/" /></>} />

          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50">
                  <Navbar />
                  <Dashboard />
                </div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/post-job" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50">
                  <Navbar />
                  <PostJob />
                </div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50">
                  <Navbar />
                  <Profile />
                </div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50">
                  <Navbar />
                  <Settings />
                </div>
              </ProtectedRoute>
            } 
          />
          <Route path="/edit-profile" element={<ProtectedRoute><div className="min-h-screen bg-gray-50"><Navbar /><EditProfile /></div></ProtectedRoute>} />
          <Route path="/my-jobs" element={<ProtectedRoute><div className="min-h-screen bg-gray-50"><Navbar /><MyJobs /></div></ProtectedRoute>} />
          <Route path="/my-proposals" element={<ProtectedRoute><div className="min-h-screen bg-gray-50"><Navbar /><MyProposals /></div></ProtectedRoute>} />
          <Route path="/earnings" element={<ProtectedRoute><div className="min-h-screen bg-gray-50"><Navbar /><Earnings /></div></ProtectedRoute>} />
          <Route path="/billing" element={<ProtectedRoute><div className="min-h-screen bg-gray-50"><Navbar /><Billing /></div></ProtectedRoute>} />
          <Route path="/verify-phone" element={<ProtectedRoute><div className="min-h-screen bg-gray-50"><Navbar /><VerifyPhone /></div></ProtectedRoute>} />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;