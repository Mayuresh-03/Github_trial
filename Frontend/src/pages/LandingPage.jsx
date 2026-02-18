import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* --- Navigation Bar --- */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 shadow-sm fixed top-0 z-50">
        <div className="flex items-center gap-2">
          {/* Logo Placeholder */}
          <div className="h-8 w-8 bg-blue-600 rounded-lg"></div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">ProjectName</span>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            to="/login" 
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Log in
          </Link>
          <Link 
            to="/signup" 
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Sign up
          </Link>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <main className="grow flex items-center justify-center pt-20 pb-12 px-4 sm:px-12">
        <div className="max-w-4xl text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Build something <span className="text-blue-600">amazing</span> with your new setup.
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            This is your starting point. A robust architecture ready for your next big idea, complete with authentication, routing, and a scalable file structure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
            <Link 
              to="/login"
              className="w-full sm:w-auto px-8 py-4 bg-gray-50 text-gray-700 text-lg font-semibold rounded-xl border border-gray-200 hover:bg-gray-100 transition-all"
            >
              View Demo
            </Link>
          </div>
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="border-t border-gray-100 py-8 text-center bg-gray-50">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} ProjectName. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;