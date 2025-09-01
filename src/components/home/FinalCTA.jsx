import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const FinalCTA = () => {
  const benefits = [
    "Free forever plan available",
    "No credit card required",
    "Setup in under 2 minutes",
    "24/7 customer support"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Transform Your Job Search?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of job seekers who found their dream careers with CareerPilot
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle className="w-4 h-4 text-green-300 mr-2" />
              <span className="text-white text-sm">{benefit}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="group inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transform hover:-translate-y-0.5 transition-all duration-300 shadow-2xl"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/demo"
            className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            Watch Demo
          </Link>
        </div>

        <p className="text-blue-200 text-sm mt-6">
          Join 50,000+ job seekers already using CareerPilot
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;