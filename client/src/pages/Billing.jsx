import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCreditCard, FiArrowLeft, FiPlus, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Billing = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState({
    cardNumber: '', cardHolder: '', expiry: '', cvv: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.cardNumber || !formData.cardHolder || !formData.expiry || !formData.cvv) {
      toast.error('Please fill in all fields');
      return;
    }
    const last4 = formData.cardNumber.replace(/\s/g, '').slice(-4);
    setCards([...cards, { ...formData, last4, id: Date.now() }]);
    setFormData({ cardNumber: '', cardHolder: '', expiry: '', cvv: '' });
    setShowForm(false);
    toast.success('Payment method added successfully!');
  };

  const handleRemove = (id) => {
    setCards(cards.filter(c => c.id !== id));
    toast.success('Card removed');
  };

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <button onClick={() => navigate('/dashboard')} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6">
          <FiArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Billing & Payments</h1>
              <p className="text-gray-600 mt-1">Manage your payment methods</p>
            </div>
            <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center space-x-2">
              <FiPlus className="w-4 h-4" />
              <span>Add Card</span>
            </button>
          </div>

          {/* Saved Cards */}
          {cards.length > 0 && (
            <div className="mb-6 space-y-3">
              <h2 className="text-sm font-medium text-gray-700">Saved Cards</h2>
              {cards.map(card => (
                <div key={card.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FiCreditCard className="w-6 h-6 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">•••• •••• •••• {card.last4}</p>
                      <p className="text-sm text-gray-500">{card.cardHolder} · Expires {card.expiry}</p>
                    </div>
                  </div>
                  <button onClick={() => handleRemove(card.id)} className="text-red-500 hover:text-red-700">
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add Card Form */}
          {showForm && (
            <form onSubmit={handleSubmit} className="space-y-4 border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900">Add New Card</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <div className="relative">
                  <FiCreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })}
                    className="input-field"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Holder Name</label>
                <input
                  type="text"
                  value={formData.cardHolder}
                  onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Name on card"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    value={formData.expiry}
                    onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="password"
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="•••"
                    maxLength={4}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 btn-primary py-3">Save Card</button>
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 btn-secondary py-3">Cancel</button>
              </div>
            </form>
          )}

          {cards.length === 0 && !showForm && (
            <div className="text-center py-12">
              <FiCreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No payment methods added yet</p>
              <button onClick={() => setShowForm(true)} className="btn-primary">Add Payment Method</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Billing;
