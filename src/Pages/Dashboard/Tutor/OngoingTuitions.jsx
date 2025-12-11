import { useState } from 'react';
import { Eye, BookOpen, MapPin, DollarSign, Calendar, User, Clock, CheckCircle, X } from 'lucide-react';
import useAxios from '../../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

export default function OngoingTuitions() {
  const [selectedTuition, setSelectedTuition] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const axiosInstance = useAxios();

  const { data: approvedTuitions = [], isLoading } = useQuery({
    queryKey: ['approvedTuitions', 'Approved'],
    queryFn: async () => {
      const res = await axiosInstance.get('/tuitions/ongoing?status=Approved');
      console.log(res.data);
      return res.data;
    },
  });

  const handleView = (tuition) => {
    setSelectedTuition(tuition);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTuition(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading available tuitions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Available Tuitions
          </h1>
          <p className="text-lg text-gray-600">
            Browse and apply for approved tuition opportunities
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Available Opportunities</p>
              <p className="text-4xl font-bold text-green-600">{approvedTuitions.length}</p>
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Table */}
        {approvedTuitions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Available Tuitions</h3>
            <p className="text-gray-600">
              There are no approved tuition requests available at the moment
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Student</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Subject</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Class</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Budget</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Schedule</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {approvedTuitions.map((tuition, index) => (
                    <tr 
                      key={tuition._id}
                      className={`hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900">{tuition.studentName}</div>
                          <div className="text-sm text-gray-500">{tuition.studentEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900">{tuition.subject}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700">{tuition.class}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gray-500" />
                          <span className="text-gray-700 text-sm">{tuition.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-green-600">৳{tuition.budget}/mo</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="text-gray-700">{tuition.daysPerWeek} days/week</div>
                          <div className="text-gray-500">{tuition.duration}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleView(tuition)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all text-sm font-semibold flex items-center gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
                        Available
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
                {/* Student Information */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Student Information</h3>
                  <div className="space-y-2 bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-semibold text-gray-900">{selectedTuition.studentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-semibold text-gray-900">{selectedTuition.studentEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gender:</span>
                      <span className="font-semibold text-gray-900">{selectedTuition.studentGender}</span>
                    </div>
                  </div>
                </div>

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
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-600">Days Per Week</span>
                      </div>
                      <p className="font-semibold text-gray-900">{selectedTuition.daysPerWeek} days</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
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
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Requirements</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">{selectedTuition.description}</p>
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

                {/* Apply Button */}
                <div className="pt-4 border-t border-gray-200">
                  <button className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg">
                    Apply for This Tuition
                  </button>
                  <p className="text-center text-sm text-gray-500 mt-3">
                    Click to submit your application for this tuition opportunity
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