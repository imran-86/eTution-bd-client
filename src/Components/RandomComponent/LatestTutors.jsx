import React, { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import { motion } from 'framer-motion';

const LatestTutors = () => {
    const [latestTutors, setLatestTutors] = useState([]);
    const axiosInstance = useAxios();
    
    useEffect(() => {
        axiosInstance.get("/tutors").then((data) => {
            setLatestTutors(data.data);
        });
    }, []);

    // Duplicate the tutors array for seamless loop
    const duplicatedTutors = [...latestTutors, ...latestTutors];
    // console.log(duplicatedTutors);
    

    return (
        <div className="py-16 overflow-hidden">
            <div className="w-10/12 mx-auto px-4 mb-12">
                {/* Section Header */}
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Meet Our Expert Tutors
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Highly qualified educators ready to help you achieve your academic goals
                    </p>
                </div>
            </div>

            {/* Framer Motion Slider */}
            <div className='w-10/12 mx-auto overflow-hidden'>
              <div className='relative'>
                <motion.div
                    className='flex'
                    animate={{
                        x: [0, -100 * latestTutors.length],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                    whileHover={{ animationPlayState: "paused" }}
                >
                    {duplicatedTutors?.map((tutor, index) => (
                        <motion.div
                            key={`${tutor.id}-${index}`}
                            className="mx-4 w-80 flex-shrink-0 group"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500 overflow-hidden h-52">
                                {/* Card Content */}
                                <div className="p-6 h-full flex flex-col justify-between">
                                    {/* Tutor Info */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-16 h-16 rounded-full flex items-center justify-center  font-bold">
                                                <img src={tutor.photoURL} alt="" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900">
                                                    {tutor.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    Experience : 
                                                     {tutor.experience}</p>
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
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-95 transition-opacity duration-500 flex items-center justify-center">
                                    <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <button className="cursor-pointer px-8 py-4 bg-white text-indigo-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl">
                                            View Details →
                                        </button>
                                        <p className="text-white text-sm mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                            Click to see full profile
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            </div>
            
        </div>
    );
};

export default LatestTutors;