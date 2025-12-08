import React, { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';

const Tuitions = () => {
    const [tuitions, setTuitions] = useState([]);
  const axiosInstance = useAxios();
  useEffect(() => {
    axiosInstance.get("/tuitions").then((data) => {
    //   console.log(data.data);
      setTuitions(data.data);
    });
  }, []);
    return (
        <div className="py-16">
      <div className="w-10/12 mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
         Tuition Opportunities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect tutoring opportunity that matches your expertise
            and schedule
          </p>
        </div>

        {/* Tuition Cards Grid */}
        <div
          className="grid 
        grid-cols-1
        md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {tuitions?.map((tuition) => (
            <div
              key={tuition.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold">{tuition.subject}</h3>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                    {tuition.class}
                  </span>
                </div>
                <p className="text-indigo-100 text-sm">📍 {tuition.location}</p>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                {/* Budget */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Budget</span>
                  <span className="text-2xl font-bold text-green-600">
                    ৳{tuition.budget}
                  </span>
                </div>

                {/* Additional Info */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    Tutor: {tuition.tutorGender}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    Student: {tuition.studentGender}
                  </span>
                </div>

                {/* Action Button */}
                <button className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform group-hover:scale-105">
                  Apply Now
                </button>
              </div>

            </div>
          ))}
        </div>

       
      </div>
    </div>
    );
};

export default Tuitions;