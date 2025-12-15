import {
  BookOpen,
  Users,
  Award,
  Target,
  Heart,
  Zap,
  Globe,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router";
import img1 from "../assets/photo_2024-10-29_22-22-09.jpg";
export default function AboutUs() {
  const stats = [
    { icon: Users, value: "1K+", label: "Active Students" },
    { icon: BookOpen, value: "50+", label: "Expert Tutors" },
    { icon: Award, value: "98%", label: "Success Rate" },
    { icon: Globe, value: "20+", label: "Versity Tutors" },
  ];

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To democratize education by connecting students with qualified tutors worldwide, making quality learning accessible to everyone, everywhere.",
    },
    {
      icon: Heart,
      title: "Our Vision",
      description:
        "To create a world where every learner has access to personalized education that empowers them to achieve their full potential.",
    },
    {
      icon: Zap,
      title: "Our Values",
      description:
        "Excellence, integrity, innovation, and student-centric approach guide everything we do in our mission to transform education.",
    },
  ];

  const team = [
    {
      name: "Imran Ahmed",
      role: "Founder & CEO",
      image: img1,
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      bio: "Former Silicon Valley engineer passionate about EdTech",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Education",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
      bio: "Master educator with expertise in curriculum development",
    },
    {
      name: "David Kumar",
      role: "Director of Operations",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
      bio: "Operations expert ensuring seamless learning experiences",
    },
  ];

  return (
    <div className="w-10/12 mx-auto ">
      {/* Hero Section */}
      <div className="relative  text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="w-10/12 mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About Our Journey
            </h1>
            <p className="text-xl md:text-2xl text-purple-300 leading-relaxed">
              Empowering learners worldwide through personalized, accessible,
              and high-quality online education
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-300"
            >
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-4 pt-20">
        <div className="">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Our Story
          </h2>
          <div className="prose prose-lg max-w-none text-white leading-relaxed space-y-6">
            <p>
              Founded in 2025, our platform was born from a simple yet powerful
              idea: every student deserves access to quality education,
              regardless of their location or circumstances. What started as a
              small team of passionate educators has grown into a thriving
              global community.
            </p>
            <p>
              We recognized the challenges students face in finding qualified
              tutors and the difficulties educators encounter in reaching
              students who need their expertise. Our platform bridges this gap,
              creating meaningful connections that transform lives through
              learning.
            </p>
            <p>
              Today, we're proud to serve over 50,000 students and work with
              5,000+ expert tutors across 100+ countries. Our commitment remains
              unchanged: to provide personalized, flexible, and effective
              learning experiences that help students achieve their academic
              goals and unlock their full potential.
            </p>
          </div>
        </div>
      </div>

      {/* Mission, Vision, Values */}
      <div className="pt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className=" py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-4">
            Meet Our Team
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Passionate professionals dedicated to transforming education and
            empowering learners worldwide
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-indigo-600 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className=" pb-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Growing Community
          </h2>
          <p className="text-xl text-purple-300 mb-8 max-w-2xl mx-auto">
            Whether you're a student seeking knowledge or a tutor ready to share
            expertise, we're here to help you succeed
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
