import { use, useState } from 'react';
import { Eye, BookOpen, MapPin, DollarSign, Calendar, User, Clock, CheckCircle, X } from 'lucide-react';

import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Context/AuthContext';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

export default function ApprovedTuition() {
  const [selectedTuition, setSelectedTuition] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const {user} = use(AuthContext);
//   if(user){
//     console.log(user.email);
    
//   }
  const axiosSecure = useAxiosSecure();

 
  const { data: myTuitions = [] , isLoading } = useQuery({
    queryKey: ['myTuitions', 'Approved'],
    queryFn: async () => {
       const res = await axiosSecure.get(`/tuitions/user/${user?.email}`);
      
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleView = (tuition) => {
    setSelectedTuition(tuition);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTuition(null);
  };

   if (isLoading || !user) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your tuitions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            My Tuitions
          </h1>
          <p className="text-lg text-gray-600">
            View your approved tuition requests
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Approved Tuitions</p>
              <p className="text-4xl font-bold text-green-600">{myTuitions.length}</p>
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Tuitions Display */}
        {myTuitions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Approved Tuitions Yet</h3>
            <p className="text-gray-600 mb-6">
              You don't have any approved tuition requests at the moment
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all">
              Post New Tuition
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myTuitions.map((tuition) => (
              <div
                key={tuition._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold">{tuition.subject}</h3>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Approved
                    </span>
                  </div>
                  <p className="text-green-100">{tuition.class}</p>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm">{tuition.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-700">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold">৳{tuition.budget}/month</span>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {tuition.description}
                    </p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
                    <div className="text-center bg-gray-50 rounded-lg p-2">
                      <div className="text-xs text-gray-500">Days/Week</div>
                      <div className="text-lg font-semibold text-gray-800">{tuition.daysPerWeek}</div>
                    </div>
                    <div className="text-center bg-gray-50 rounded-lg p-2">
                      <div className="text-xs text-gray-500">Duration</div>
                      <div className="text-sm font-semibold text-gray-800">{tuition.duration}</div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex gap-2 px-6 pb-6">
                  <button
                    onClick={() => handleView(tuition)}
                    className="cursor-pointer w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all"
                  >
                    <Eye className="w-4 h-4" />
                    View Full Details
                  </button>
                    <button
                   
                    className="cursor-pointer w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all"
                  >
                    <DollarSign className="w-4 h-4" />
                    {
                      tuition.paymentStatus === 'Paid' ? <span>Paid</span> : <span>Make Payment</span>  
                    }
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Modal */}
        {showModal && selectedTuition && (
          <div className="fixed inset-0  bg-transparent bg-opacity-50 flex items-center justify-center p-4 z-50 transition ease-in-out duration-500">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white sticky top-0">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-3xl font-bold">{selectedTuition.subject}</h2>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Approved
                      </span>
                    </div>
                    <p className="text-green-100">{selectedTuition.class}</p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Tuition Details */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Tuition Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm text-gray-600">Subject</span>
                      </div>
                      <p className="font-semibold text-gray-900">{selectedTuition.subject}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm text-gray-600">Class</span>
                      </div>
                      <p className="font-semibold text-gray-900">{selectedTuition.class}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm text-gray-600">Location</span>
                      </div>
                      <p className="font-semibold text-gray-900">{selectedTuition.location}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-600">Budget</span>
                      </div>
                      <p className="font-semibold text-gray-900">৳{selectedTuition.budget}/month</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-gray-600">Tutor Preference</span>
                      </div>
                      <p className="font-semibold text-gray-900">{selectedTuition.tutorGender}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-gray-600">Student Gender</span>
                      </div>
                      <p className="font-semibold text-gray-900">{selectedTuition.studentGender}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-600">Days Per Week</span>
                      </div>
                      <p className="font-semibold text-gray-900">{selectedTuition.daysPerWeek} days</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-orange-600" />
                        <span className="text-sm text-gray-600">Duration</span>
                      </div>
                      <p className="font-semibold text-gray-900">{selectedTuition.duration} per session</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">{selectedTuition.description}</p>
                  </div>
                </div>

                {/* Status Information */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Status Information</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-900">Tuition Approved</p>
                        <p className="text-sm text-green-700">
                          Your tuition request has been approved. Tutors can now apply for this position.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Posted Date */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Posted on: {new Date(selectedTuition.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}