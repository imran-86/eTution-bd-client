import { use, useState } from 'react';
import { Eye, BookOpen, MapPin, DollarSign, Calendar, User, Clock, CheckCircle, X, Send } from 'lucide-react';
import useAxios from '../../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Context/AuthContext';
import Swal from 'sweetalert2';

export default function OngoingTuitions() {
  const [selectedTuition, setSelectedTuition] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
  qualifications: '',
  experience: '',
  expectedSalary: ''
});
  
  const { user } = use(AuthContext);
  const axiosInstance = useAxios();

  
  const { data: approvedTuitions = [], isLoading } = useQuery({
    queryKey: ['approvedTuitions', 'Approved'],
    queryFn: async () => {
      const res = await axiosInstance.get('/tuitions/ongoing?status=Approved');
      console.log(res.data);
      return res.data;
    },
  });
  const handleInputChange = (e) => {
  const { name, value } = e.target;
  setApplicationForm({
    ...applicationForm,
    [name]: value
  });
};
 
  const handleApply = (tuition) => {
    setSelectedTuition(tuition);
    setShowApplyModal(true);
  };
  const closeApplyModal = () => {
  setShowApplyModal(false);
  setSelectedTuition(null);
  setApplicationForm({
    qualifications: '',
    experience: '',
    expectedSalary: ''
  });
};

  const handleSubmitApplication = (event) => {
    event.preventDefault();
    setApplyLoading(true);
    
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to apply for this tuition?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#10b981',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, apply!'
      }).then(result => {
        if (result.isConfirmed) {
         
            axiosInstance.post(`/applications`, {
             tuitionId: selectedTuition._id,
      tuitionTitle:`${selectedTuition.subject} - ${selectedTuition.class}`,
      studentEmail : selectedTuition.studentEmail,
      tutorName: user?.name,
      tutorEmail: user?.email,
      qualifications: applicationForm.qualifications,
      experience: applicationForm.experience,
      expectedSalary: parseFloat(applicationForm.expectedSalary),
      status: 'Pending',
      appliedAt: new Date().toISOString()
          });

          axiosInstance.post('/tutors', {
            name : user?.name,
            email : user?.email,
            qualifications : applicationForm.qualifications,
            experience : applicationForm.experience,
            submittedAt : new Date().toISOString()

          })
          
          console.log('Application submitted for:', selectedTuition._id);
          
          Swal.fire({
            title: 'Applied!',
            text: 'Your application has been submitted successfully.',
            icon: 'success'
          });
          closeApplyModal();
          setShowApplyModal(false);
         
          
        }
      });
      
      setApplyLoading(false);
    } catch (error) {
      console.error('Error submitting application:', error);
      setApplyLoading(false);
      
      Swal.fire({
        title: 'Error!',
        text: 'Failed to submit application.',
        icon: 'error'
      });
    }
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
                            onClick={() => handleApply(tuition)}
                            className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-sm font-semibold flex items-center gap-1"
                          >
                            <Send className="w-4 h-4" />
                            Apply
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

      

       
       {/* Apply Modal */}
{showApplyModal && selectedTuition && user && (
  <div className="fixed inset-0  bg-transparent bg-opacity-50 flex items-center justify-center p-4 z-50 transition ease-in-out duration-500 z-50">
    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      
      {/* Modal Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white sticky top-0">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold mb-2">Apply for Tuition</h2>
            <p className="text-green-100">{selectedTuition.subject} - {selectedTuition.class}</p>
          </div>
          <button
            type="button"
            onClick={closeApplyModal}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Modal Body */}
      <form onSubmit={handleSubmitApplication} className="p-6 space-y-6">
        
        {/* Info Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Please review the tuition information below before submitting your application.
          </p>
        </div>
        
        {/* Tuition Summary */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Tuition Summary</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
           
            <div>
                 
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
          </div>
        </div>

        {/* Tutor Information*/}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Your Information</h3>
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={user?.name || ''}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
              />
            </div>

            {/* Email  */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
              />
            </div>

            {/* Qualifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qualifications *
              </label>
              <textarea
                name="qualifications"
                value={applicationForm.qualifications}
                onChange={handleInputChange}
                required
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your educational qualifications..."
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience *
              </label>
              <input
                type="text"
                name="experience"
                value={applicationForm.experience}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., 3 years of teaching experience"
              />
            </div>

            {/* Expected Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Salary (per month) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">৳</span>
                <input
                  type="number"
                  name="expectedSalary"
                  value={applicationForm.expectedSalary}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full pl-8 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="5000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={applyLoading}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all disabled:opacity-50"
          >
            {applyLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Application
              </>
            )}
          </button>
          <button
            type="button"
            onClick={closeApplyModal}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
          >
            Cancel
          </button>
        </div>
        
      </form>
    
      
    </div>
  </div>
)}
      </div>
    </div>
  );
}