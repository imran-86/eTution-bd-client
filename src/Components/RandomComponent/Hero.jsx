import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Users, Award, ArrowRight } from 'lucide-react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Transform Your Learning Journey",
      subtitle: "Connect with Expert Tutors Anytime, Anywhere",
      description: "Join thousands of students achieving their academic goals with personalized one-on-one tutoring sessions",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
      gradient: "from-blue-600 to-indigo-700"
    },
    {
      title: "Share Your Knowledge",
      subtitle: "Become a Tutor and Make a Difference",
      description: "Educate worldwide, grow your teaching career remotely.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      title: "Learn at Your Own Pace",
      subtitle: "Flexible Scheduling, Unlimited Possibilities",
      description: "Access quality education tailored to your schedule with 24/7 support and interactive learning tools",
      image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=80",
      gradient: "from-teal-600 to-cyan-600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="max-w-10/12 mx-auto relative min-h-screen overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pt-12  ">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Left Content */}
          <div className="text-white space-y-8 ">
            <div className="py-4 h-72">
              <div className="inline-block">
                <span className={`px-4 py-2 mb-5 bg-gradient-to-r ${slides[currentSlide].gradient} rounded-full text-sm font-semibold text-white shadow-lg animate-fade-in`}>
                  🎓 #1 Online Tutoring Platform
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-up">
                {slides[currentSlide].title}
              </h1>
              
              <h2 className={`text-1xl md:text-2xl font-semibold bg-gradient-to-r ${slides[currentSlide].gradient} bg-clip-text text-transparent animate-slide-up`}>
                {slides[currentSlide].subtitle}
              </h2>
              
              <p className="text-xl md:text-lg text-gray-300 leading-relaxed animate-slide-up">
                {slides[currentSlide].description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-slide-up">
              <button className={`group px-8 py-4 bg-gradient-to-r ${slides[currentSlide].gradient} text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2`}>
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Content - Image Slider */}
          <div className="relative">
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ${
                    index === currentSlide
                      ? 'opacity-100 translate-x-0'
                      : index < currentSlide
                      ? 'opacity-0 -translate-x-full'
                      : 'opacity-0 translate-x-full'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-tr ${slide.gradient} opacity-40`}></div>
                </div>
              ))}

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all group"
              >
                <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all group"
              >
                <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-64 bg-white rounded-2xl p-6 shadow-2xl max-w-xs hidden lg:block animate-float">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${slides[currentSlide].gradient} rounded-full flex items-center justify-center`}>
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">100+</div>
                  <div className="text-sm text-gray-600">Subjects Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}