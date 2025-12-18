import React from 'react';

const Features = () => {
    return (
        <div>
             <section className="py-16 px-4 ">
        <div className="max-w-10/12 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Why Choose TuitionHub?
            </h2>
            <p className="text-lg text-purple-300">
              The best platform for connecting students and tutors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-start p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Tutors</h3>
              <p className="text-gray-700">
                All tutors are thoroughly verified with background checks and credential validation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-start p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Affordable Pricing</h3>
              <p className="text-gray-700">
                Competitive rates with transparent pricing. No hidden fees or commissions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-start p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Schedule</h3>
              <p className="text-gray-700">
                Choose your preferred time slots and duration. Learn at your own pace.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-start p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Safe & Secure</h3>
              <p className="text-gray-700">
                Your data is protected with industry-standard encryption and security measures.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="flex flex-col items-start p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Assurance</h3>
              <p className="text-gray-700">
                Regular feedback and rating system ensures high-quality tutoring services.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="flex flex-col items-start p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-700">
                Our dedicated support team is available round the clock to assist you.
              </p>
            </div>
          </div>
        </div>
      </section>
        </div>
    );
};

export default Features;