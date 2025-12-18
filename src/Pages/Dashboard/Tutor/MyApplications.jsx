import { use, useState, useEffect } from 'react';
import { Eye, BookOpen, MapPin, DollarSign, Calendar, User, Clock, CheckCircle, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Context/AuthContext';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

export default function MyApplications() {
  const [selectedTuition, setSelectedTuition] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [formData, setFormData] = useState({
    qualifications: '',
    experience: '',
    expectedSalary: ''
  });
  
  const {user} = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: myTuitions = [], isLoading, refetch } = useQuery({
    queryKey: ['myTuitions', 'Approved'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/tutor/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleView = (tuition) => {
    setSelectedTuition(tuition);
    setFormData({
      qualifications: tuition.qualifications || '',
      experience: tuition.experience || '',
      expectedSalary: tuition.expectedSalary || ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTuition(null);
    setFormData({
      qualifications: '',
      experience: '',
      expectedSalary: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    try {
      const result = await Swal.fire({
        title: 'Update Application?',
        text: 'Do you want to update your application details?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#4f46e5',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, Update!'
      });

      if (result.isConfirmed) {
        await axiosSecure.patch(`/applications/${selectedTuition._id}`, {
          qualifications: formData.qualifications,
          experience: formData.experience,
          expectedSalary: parseFloat(formData.expectedSalary),
          updatedAt: new Date().toISOString()
        });

        await refetch();
        
        Swal.fire({
          title: 'Updated!',
          text: 'Your application has been updated successfully.',
          icon: 'success'
        });

        closeModal();
      }
      
      setUpdateLoading(false);
    } catch (error) {
      console.error('Error updating application:', error);
      setUpdateLoading(false);
      
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update application.',
        icon: 'error'
      });
    }
  };

  const handleDelete = (tuition) => {
    const id = tuition._id;
    Swal.fire({
      title: "Delete Application?",
      text: `Do you want to delete ${tuition.tuitionTitle}'s application?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        setActionLoading(true);
        axiosSecure
          .delete(`/applications/delete/${id}`)
          .then(() => {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your application has been deleted.",
              icon: "success",
            });
            setActionLoading(false);
          })
          .catch((error) => {
            console.error("Error deleting application:", error);
            setActionLoading(false);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete application.",
              icon: "error",
            });
          });
      }
    });
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your tuitions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            My Applications
          </h1>
          <p className="text-lg text-gray-600">
            View your Applications
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Applications</p>
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
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No application found</h3>
            <p className="text-gray-600 mb-6">
              You don't have any application requests at the moment
            </p>
            <button
              onClick={() => window.location.href = "/all-tuitions"}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              Apply Tuitions
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
                <div className={`p-6 text-white ${
                  tuition.status === 'Approved' 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600' 
                    : tuition.status === 'Pending'
                    ? 'bg-gradient-to-r from-yellow-600 to-orange-600'
                    : 'bg-gradient-to-r from-red-600 to-pink-600'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold">{tuition.tuitionTitle}</h3>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {tuition.status}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold">৳{tuition.expectedSalary}/month</span>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {tuition.experience}
                    </p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 gap-3 pt-3 border-t border-gray-200">
                    <div className="text-center bg-gray-50 rounded-lg p-2">
                      <div className="text-xs text-gray-500">Applied at</div>
                      <div className="text-sm font-semibold text-gray-800">
                        {new Date(tuition.appliedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {tuition.status === 'Pending' && (
                  <div className="flex gap-2 px-6 pb-6">
                    <button
                      onClick={() => handleView(tuition)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(tuition)}
                      disabled={actionLoading}
                      className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {showModal && selectedTuition && selectedTuition.status === 'Pending' && (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white sticky top-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Edit Application</h2>
                    <p className="text-indigo-100">{selectedTuition.tuitionTitle}</p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Body - Form */}
              <form onSubmit={handleUpdate} className="p-6 space-y-6">
                {/* Tuition Info (Read-only) */}
                <div className="bg-indigo-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Tuition Information</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">Subject:</span>
                      <span className="ml-2 font-semibold">{selectedTuition.tuitionTitle.split(' - ')[0]}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Student:</span>
                      <span className="ml-2 font-semibold">{selectedTuition.studentEmail}</span>
                    </div>
                  </div>
                </div>

                {/* Qualifications */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qualifications <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    placeholder="e.g., BSc in Mathematics from XYZ University"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    placeholder="e.g., 3 years of teaching experience in high school"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Expected Salary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Salary (৳) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={handleInputChange}
                    required
                    min="0"
                    placeholder="Enter your expected salary"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Application Date */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Applied on: {new Date(selectedTuition.appliedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updateLoading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updateLoading ? 'Updating...' : 'Update Application'}
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