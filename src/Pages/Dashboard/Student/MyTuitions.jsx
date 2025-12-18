import { use, useState, useEffect } from 'react';
import { Eye, BookOpen, MapPin, DollarSign, Calendar, User, Clock, CheckCircle, X, CircleSlash, School, Locate, LocationEdit, CalendarDays } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Context/AuthContext';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

export default function MyTuitions() {
  const [selectedTuition, setSelectedTuition] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const { user } = use(AuthContext);
  

  const initialFormData = {
    subject: '',
    class: '',
    location: '',
    budget: '',
    tutorGender: '',
    studentGender: '',
    daysPerWeek: '',
    duration: '',
    description: '',
    status: 'Pending',
    studentEmail: user?.email
  };
  
  const [formData, setFormData] = useState(initialFormData);
  const axiosSecure = useAxiosSecure();

  
  const { data: myTuitions = [], isLoading, refetch } = useQuery({
    queryKey: ['myTuitions', 'Approved'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions/student/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  
  const handleView = (tuition) => {
    setSelectedTuition(tuition);
    
    
    setFormData({
      subject: tuition.subject || '',
      class: tuition.class || '',
      location: tuition.location || '',
      budget: tuition.budget || '',
      tutorGender: tuition.tutorGender || '',
      studentGender: tuition.studentGender || '',
      daysPerWeek: tuition.daysPerWeek || '',
      duration: tuition.duration || '',
      description: tuition.description || '',
      status: tuition.status || 'Pending',
      studentEmail: user?.email
    });
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTuition(null);
    setFormData(initialFormData);
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
        title: 'Update Tuition?',
        text: 'Do you want to update your tuition details?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#4f46e5',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, Update!'
      });

      if (result.isConfirmed) {
        
        const updateData = {
          subject: formData.subject,
          class: formData.class,
          location: formData.location,
          budget: parseFloat(formData.budget) || 0,
          tutorGender: formData.tutorGender,
          studentGender: formData.studentGender,
          daysPerWeek: parseInt(formData.daysPerWeek) || 0,
          duration: formData.duration,
          description: formData.description,
          updatedAt: new Date().toISOString()
        };

    
        const response = await axiosSecure.patch(`/tuitions/${selectedTuition._id}`, updateData);
        
        // console.log('Update response:', response.data);
        
        await refetch();
        
        Swal.fire({
          title: 'Updated!',
          text: 'Your tuition has been updated successfully.',
          icon: 'success'
        });

        closeModal();
      }
      
      setUpdateLoading(false);
    } catch (error) {
    //   console.error('Error updating tuition:', error);
      setUpdateLoading(false);
      
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to update tuition.',
        icon: 'error'
      });
    }
  };

  const handleDelete = (tuition) => {
    const id = tuition._id;
    Swal.fire({
      title: "Delete Tuition?",
      text: `Do you want to delete ${tuition.subject}'s tuition?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        setActionLoading(true);
        axiosSecure
          .delete(`/tuitions/delete/${id}`)
          .then(() => {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your tuition has been deleted.",
              icon: "success",
            });
            setActionLoading(false);
          })
          .catch((error) => {
            // console.error("Error deleting tuition:", error);
            setActionLoading(false);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete tuition.",
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
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            My Tuitions
          </h1>
          <p className="text-lg text-purple-300">
            Manage your posted tuitions
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Tuitions</p>
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
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No tuitions found</h3>
            <p className="text-gray-600 mb-6">
              You haven't posted any tuitions yet
            </p>
            <button
              onClick={() => window.location.href = "/post-tuition"}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
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
                <div className={`p-6 text-white ${
                  tuition.status === 'Approved' 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600' 
                    : tuition.status === 'Pending'
                    ? 'bg-gradient-to-r from-yellow-600 to-orange-600'
                    : 'bg-gradient-to-r from-red-600 to-pink-600'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold">{tuition.subject}</h3>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {tuition.status}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <School className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold">{tuition.class}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold">৳{tuition.budget}/month</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <LocationEdit className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold">{tuition.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CalendarDays className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold">{tuition.daysPerWeek} days/week</span>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {tuition.description}
                    </p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 gap-3 pt-3 border-t border-gray-200">
                    <div className="text-center bg-gray-50 rounded-lg p-2">
                      <div className="text-xs text-gray-500">Created at</div>
                      <div className="text-sm font-semibold text-gray-800">
                        {new Date(tuition.createdAt).toLocaleDateString()}
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
                      Edit
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
        {showModal && selectedTuition && (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white sticky top-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Edit Tuition</h2>
                    <p className="text-indigo-100">{selectedTuition.subject} - {selectedTuition.class}</p>
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
              <form onSubmit={handleUpdate} className="p-6 space-y-4">
                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                </div>

                {/* Class */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class/Grade <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="class"
                    value={formData.class}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="e.g., Class 9-10, HSC, SSC"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="e.g., Dhanmondi, Dhaka"
                  />
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget (৳/month) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">৳</span>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      min="1"
                      required
                      className="w-full pl-8 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="5000"
                    />
                  </div>
                </div>

                {/* Tutor Gender Preference */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Tutor Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="tutorGender"
                    value={formData.tutorGender}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  >
                    <option value="">Select Preference</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Any">Any</option>
                  </select>
                </div>

                {/* Student Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="studentGender"
                    value={formData.studentGender}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                {/* Days Per Week */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Days Per Week <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="daysPerWeek"
                    value={formData.daysPerWeek}
                    onChange={handleInputChange}
                    min="1"
                    max="7"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="e.g., 3"
                  />
                </div>

                {/* Duration Per Day */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (per day) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="e.g., 2 hours, 1.5 hours"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="Describe the tuition requirements..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
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
                    {updateLoading ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline-block mr-2"></span>
                        Updating...
                      </>
                    ) : (
                      'Update Tuition'
                    )}
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