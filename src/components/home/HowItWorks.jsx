import React from 'react';
import { ClipboardList, Upload, TrendingUp, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: "Add Opportunities",
      description: "Manually input jobs or import from various job sites with our smart parser",
      color: "blue"
    },
    {
      icon: <ClipboardList className="w-6 h-6" />,
      title: "Track Progress",
      description: "Monitor application status from applied to offer with visual tracking",
      color: "indigo"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Get Hired Faster",
      description: "Use analytics to improve your strategy and land your dream job",
      color: "purple"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How CareerPilot Works
          </h2>
          <p className="text-lg text-gray-600">
            Streamline your job search with our simple yet powerful process designed to get you hired faster
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              {/* Step Number */}
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-sm font-semibold text-gray-600">
                0{index + 1}
              </div>
              
              {/* Icon Container */}
              <div className={`w-16 h-16 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                {step.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Demo Visual */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-gray-200">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              See It In Action
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Watch how CareerPilot transforms your job search from chaotic to organized in minutes
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
              Watch Demo
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;