import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPhone, FiShield, FiArrowLeft, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

const VerifyPhone = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }
    toast.success(`OTP sent to ${phone}`);
    setStep(2);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      toast.error('Please enter the OTP');
      return;
    }
    toast.success('Phone number verified successfully!');
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <button onClick={() => navigate('/dashboard')} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6">
          <FiArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiShield className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Verify Phone Number</h1>
            <p className="text-gray-600 mt-2">Secure your account and build trust with clients</p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-field"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="w-full btn-primary py-3">
                Send OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <p className="text-sm text-gray-600 text-center">Enter the 6-digit OTP sent to <strong>{phone}</strong></p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">OTP Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-center text-2xl tracking-widest"
                  placeholder="------"
                  maxLength={6}
                  required
                />
              </div>
              <button type="submit" className="w-full btn-primary py-3 flex items-center justify-center space-x-2">
                <FiCheck className="w-5 h-5" />
                <span>Verify</span>
              </button>
              <button type="button" onClick={() => setStep(1)} className="w-full btn-secondary py-3">
                Change Number
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyPhone;
