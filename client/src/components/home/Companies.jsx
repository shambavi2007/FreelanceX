import React from 'react';

const Companies = () => {
  const companies = [
    {
      name: 'Microsoft',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png'
    },
    {
      name: 'Google',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png'
    },
    {
      name: 'Airbnb',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_Bélo.svg/512px-Airbnb_Logo_Bélo.svg.png'
    },
    {
      name: 'Netflix',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/512px-Netflix_2015_logo.svg.png'
    },
    {
      name: 'Spotify',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/512px-Spotify_logo_without_text.svg.png'
    },
    {
      name: 'Uber',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/512px-Uber_logo_2018.png'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Trusted by leading companies worldwide
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of businesses that trust FreelanceX to connect them with top talent
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {companies.map((company, index) => (
            <div 
              key={index}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
            >
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="h-8 md:h-12 w-auto object-contain"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/120x40/6B7280/FFFFFF?text=${company.name}`;
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl font-bold text-green-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Average Client Rating</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-gray-600">Customer Support</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-600">Secure Payments</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Companies;