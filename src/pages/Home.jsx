import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const Home = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 via-white to-navy-100 flex items-center justify-center ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Task<span className="text-indigo-600">Tracker</span>
          </h1>
        
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            {isLoggedIn ? (
              <Link
                to="/tasks"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Go to Tasks
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </Link>
            )}
           
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default Home;
