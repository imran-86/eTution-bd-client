import React from 'react';

const HowPlatformWorks = () => {
    return (
        <div>
            <section className="py-16 px-4 ">
        <div className="w-10/12 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              How the Platform Works
            </h2>
            <p className="text-lg text-purple-300">
              Get started in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="relative mb-4">
                <span className="absolute -top-6 -left-2 text-6xl font-bold text-blue-100">1</span>
                <h3 className="text-xl font-bold text-gray-900 relative z-10">Create Account</h3>
              </div>
              <p className="text-gray-600">
                Sign up as a student or tutor in seconds. Complete your profile with relevant details.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="relative mb-4">
                <span className="absolute -top-6 -left-2 text-6xl font-bold text-green-100">2</span>
                <h3 className="text-xl font-bold text-gray-900 relative z-10">Browse & Apply</h3>
              </div>
              <p className="text-gray-600">
                Students post tuition requirements. Tutors browse and apply for suitable opportunities.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="relative mb-4">
                <span className="absolute -top-6 -left-2 text-6xl font-bold text-purple-100">3</span>
                <h3 className="text-xl font-bold text-gray-900 relative z-10">Start Learning</h3>
              </div>
              <p className="text-gray-600">
                Connect with your matched tutor and begin your learning journey with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>
        </div>
    );
};

export default HowPlatformWorks;