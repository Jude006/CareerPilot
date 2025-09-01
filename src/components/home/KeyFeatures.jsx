import React from 'react';
import { BarChart3, Download, Shield, Zap, Brain, Target } from 'lucide-react';

const KeyFeatures = () => {
  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Track your interview success rate, application metrics, and optimize your strategy"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Export to Excel",
      description: "Download your job data in CSV or Excel format for further analysis"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Storage",
      description: "Your data is encrypted and secure. We never share your information"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Quick Import",
      description: "One-click import from LinkedIn, Indeed, and other job platforms"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Recommendations",
      description: "Get personalized job suggestions based on your profile and preferences"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Goal Tracking",
      description: "Set weekly application goals and track your progress effortlessly"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Your Job Search
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to manage your job search efficiently and effectively
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;