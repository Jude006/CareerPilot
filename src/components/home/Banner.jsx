import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BarChart3, 
  Briefcase, 
  ChevronDown, 
  Search,
  TrendingUp,
  Zap
} from 'lucide-react';

const Banner = () => {
  return (
    <div className="relative min-h-screen pt-20 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Background elements - more subtle */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50/80 backdrop-blur-sm text-blue-700 text-sm font-medium mb-8 border border-blue-100/50 animate-fade-in">
            <Zap className="w-4 h-4 mr-2" />
            Trusted by thousands of job seekers worldwide
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
            Transform Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              Job Search
            </span>{' '}
            Journey
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 animate-slide-up animation-delay-200">
            Track applications, discover opportunities, and land your dream job with our intelligent career management platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in animation-delay-400">
            <Link
              to="/register"
              className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transform hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/demo"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-white hover:border-gray-300 hover:shadow-md transition-all duration-300"
            >
              Watch Demo
            </Link>
          </div>

          {/* Stats - More compact */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-16 animate-fade-in animation-delay-600">
            <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-2xl font-bold text-blue-600 mb-1">10K+</div>
              <div className="text-sm text-gray-600">Jobs Tracked</div>
            </div>
            <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-2xl font-bold text-blue-600 mb-1">95%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-2xl font-bold text-blue-600 mb-1">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
            <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-2xl font-bold text-blue-600 mb-1">50+</div>
              <div className="text-sm text-gray-600">Job Boards</div>
            </div>
          </div>
        </div>

        {/* Feature cards - Modern compact design */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto animate-fade-in animation-delay-800">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 hover:translate-y-1 transition-all duration-300 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Tracking</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Organize applications with intelligent status tracking and reminders.</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-100 hover:translate-y-1 transition-all duration-300 group">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <Search className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Discovery</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Find curated opportunities matching your skills from top companies.</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-cyan-100 hover:translate-y-1 transition-all duration-300 group">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Gain insights into your job search performance with detailed reports.</p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="text-center mt-12 animate-bounce">
          <ChevronDown className="w-5 h-5 text-gray-400 mx-auto" />
          <span className="text-xs text-gray-500 mt-1">Scroll to explore</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;