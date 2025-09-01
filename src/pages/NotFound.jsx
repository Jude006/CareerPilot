import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, Clock, AlertCircle } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center">
        {/* Animated 404 Number */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-gray-900 opacity-10">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-bounce">
              <div className="text-8xl font-bold text-blue-600">4</div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
              <div className="text-8xl font-bold text-indigo-600">0</div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center animate-bounce animation-delay-1000">
              <div className="text-8xl font-bold text-purple-600">4</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            Oops! The page you're looking for seems to have taken a wrong turn. Don't worry, 
            we're redirecting you back to safety in just a moment.
          </p>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center mb-8">
            <Clock className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-600">
              Redirecting in <span className="font-bold">3</span> seconds...
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </div>

          {/* Search Suggestion */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-2">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Can't find what you need?</span>
            </div>
            <p className="text-sm text-gray-600">
              Try using our search feature or contact our support team for assistance.
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-sm text-gray-500">
          If you're not redirected automatically, click one of the buttons above.
        </p>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-300 rounded-full animate-float opacity-50"></div>
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-indigo-300 rounded-full animate-float animation-delay-2000 opacity-30"></div>
      <div className="absolute bottom-1/4 left-1/3 w-8 h-8 bg-purple-300 rounded-full animate-float animation-delay-4000 opacity-40"></div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default NotFound;