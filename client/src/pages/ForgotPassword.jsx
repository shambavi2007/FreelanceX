import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiMail, FiArrowLeft } from 'react-icons/fi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success('Password reset link sent (demo mode)');
    }, 900);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(6, 78, 59, 0.82), rgba(30, 58, 138, 0.82)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80')"
      }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-900">Forgot password?</h1>
        <p className="text-gray-600 mt-2">Enter your account email and we will send reset instructions.</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button type="submit" className="btn-primary w-full" disabled={sending}>
            {sending ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <Link to="/login" className="mt-4 inline-flex items-center text-sm text-green-700 hover:text-green-800">
          <FiArrowLeft className="w-4 h-4 mr-1" />
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
