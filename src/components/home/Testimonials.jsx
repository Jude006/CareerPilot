import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Gentle Jay",
      role: "Software Developer",
      content: "CareerPilot helped me organize 50+ applications and land my dream job at Google. The analytics showed me where I needed to improve.",
      avatar: "SC",
      rating: 5
    },
    {
      name: "Jude Orifa",
      role: "Marketing Manager",
      content: "The export feature saved me hours of work. I could share my progress with my career coach and prepare better for interviews.",
      avatar: "MR",
      rating: 5
    },
    {
      name: "Itohan",
      role: "Product Designer",
      content: "I went from chaotic spreadsheets to a organized system. Got 3 offers in 2 months using CareerPilot's tracking system.",
      avatar: "JT",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Loved by Job Seekers
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of users who transformed their job search with CareerPilot
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="relative bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-blue-100" />
              
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;