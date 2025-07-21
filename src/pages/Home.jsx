import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Home = ({ isAuthenticated }) => {

  // const testSweetAlert = async () => {
  //   try {
  //     console.log('Testing SweetAlert...');
      
  //     const result = await Swal.fire({
  //       title: 'Test Alert',
  //       text: 'This is a test of SweetAlert2. Click OK to see another dialog.',
  //       icon: 'question',
  //       showCancelButton: true,
  //       confirmButtonText: 'OK',
  //       cancelButtonText: 'Cancel'
  //     });
      
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: 'Success!',
  //         text: 'SweetAlert2 is working correctly!',
  //         icon: 'success',
  //         timer: 2000,
  //         showConfirmButton: false
  //       });
  //     }
  //   } catch (error) {
  //     console.error('SweetAlert test error:', error);
  //     alert('SweetAlert failed: ' + error.message);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000435]  to-[#000435] flex items-center justify-center ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Task<span className="text-indigo-600">Tracker</span>
          </h1>
      
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            {isAuthenticated ? (
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
            
            {/* Temporary test button */}
            {/* <button
              onClick={testSweetAlert}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors"
            >
              Test SweetAlert
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
