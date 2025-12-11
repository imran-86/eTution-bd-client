import React, { useEffect, useState } from 'react';
import useAxios from '../Hooks/useAxios';
import { div } from 'framer-motion/client';
import { Link } from 'react-router';

const Tutors = () => {

      const [tutors, setTutors] = useState([]);
  const axiosInstance = useAxios();
  useEffect(() => {
    axiosInstance.get("/tutors").then((data) => {
    //   console.log(data.data);
      setTutors(data.data);
    });
  }, []);

    return (
      <div className='py-20'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>Our All Tutors</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect tutoring opportunity that matches your expertise
            and schedule
          </p>
        </div>

        <div className='w-10/12 mx-auto grid grid-cols-1 md:grid-cols-4 gap-5'>
            {
              tutors.map(tutor=><div className=" bg-white rounded-2xl  cursor-pointer overflow-hidden h-52">
                                {/* Card Content */}
                                <div className="p-6 h-full flex flex-col justify-between">
                                    {/* Tutor Info */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                                {tutor.name}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900">
                                                    {tutor.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">{tutor.experience} Experience</p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-start gap-2">
                                                <span className="text-indigo-600 font-semibold text-sm">🎓</span>
                                                <p className="text-sm text-gray-700 line-clamp-2">
                                                    {tutor.qualifications}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                
                                   
                                </div>

                                {/* Hover Overlay */}
                                
                            </div>)
            }
        </div>
      </div>
        
    );
};

export default Tutors;