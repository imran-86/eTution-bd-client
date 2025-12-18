import React, { useState, useEffect, use } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';

import Swal from 'sweetalert2';
import useAxios from '../Hooks/useAxios';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Context/AuthContext';

const TuitionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tuitionData, setTuitionData] = useState([]);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    qualifications: '',
    experience: '',
    expectedSalary: ''
  });

  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  
  
  const {user} = use(AuthContext);

  useEffect(() => {
    axiosInstance.get(`/tuition-details/${id}`).then((data) => {
      console.log(data.data);
      setTuitionData(data.data);
      setLoading(false);
    });
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-orange-100 text-orange-800';
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const openApplyModal = () => {
    setShowApplyModal(true);
  };

  const closeApplyModal = () => {
    setShowApplyModal(false);
    setApplicationForm({
      qualifications: '',
      experience: '',
      expectedSalary: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitApplication = async (event) => {
    event.preventDefault();
    setApplyLoading(true);

    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You want to apply for this tuition?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#10b981',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, apply!'
      });

      if (result.isConfirmed) {
        await axiosSecure.post('/applications', {
          tuitionId: tuitionData._id,
          tuitionTitle: `${tuitionData.subject} - ${tuitionData.class}`,
          studentEmail: tuitionData.studentEmail,
          tutorName: user?.name,
          tutorEmail: user?.email,
          qualifications: applicationForm.qualifications,
          experience: applicationForm.experience,
          expectedSalary: parseFloat(applicationForm.expectedSalary),
          status: 'Pending',
          appliedAt: new Date().toISOString()
        });
        

        
        await axiosSecure.post('/tutors', {
          name: user?.name,
          email: user?.email,
          qualifications: applicationForm.qualifications,
          experience: applicationForm.experience,
          submittedAt: new Date().toISOString()
        });
        // await axiosInstance.patch('/remove-tuitions',{
        //   tuitionId : tuitionData._id
        // })

        

        Swal.fire({
          title: 'Applied!',
          text: 'Your application has been submitted successfully.',
          icon: 'success'
        });

        closeApplyModal();
      }

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
  const handleShowAlert = async () =>{
       const result = await Swal.fire({
        title: 'Want to apply this tuition?',
        text: 'If you want to apply for this tuition you should be logged in?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#10b981',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, apply!'
      })
      if(result.isConfirmed){
        navigate('/login')
      }
  }
  // const handleUpdateInfo = async () =>{
  //       const result = await Swal.fire({
  //       title: 'Want to apply this tuition?',
  //       text: 'Please update your name',
  //       icon: 'question',
  //       showCancelButton: true,
  //       confirmButtonColor: '#10b981',
  //       cancelButtonColor: '#6b7280',
  //       confirmButtonText: 'Yes, update!'
  //     })
  //     if(result.isConfirmed){
  //       navigate('/dashboard/profile-settings')
  //     }
  // }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">{error}</p>
          <button
            onClick={() => navigate('/tuitions')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Tuitions
          </button>
        </div>
      </div>
    );
  }

  if (!tuitionData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-xl">Tuition not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-bold text-white">Tuition Details</h1>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Status Banner */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">{tuitionData.subject}</h2>
                <p className="text-blue-100">{tuitionData.class}</p>
              </div>
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(tuitionData.status)}`}>
                  {tuitionData.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPaymentStatusColor(tuitionData.paymentStatus)}`}>
                  {tuitionData.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="text-base text-gray-900">{tuitionData.location}</p>
                </div>
              </div>

              {/* Budget */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Budget</p>
                  <p className="text-base text-gray-900 font-semibold">৳{tuitionData.budget?.toLocaleString()}</p>
                </div>
              </div>

              {/* Days Per Week */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Days Per Week</p>
                  <p className="text-base text-gray-900">{tuitionData.daysPerWeek} days</p>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Duration</p>
                  <p className="text-base text-gray-900">{tuitionData.duration}</p>
                </div>
              </div>

              {/* Tutor Gender */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Tutor Gender</p>
                  <p className="text-base text-gray-900">{tuitionData.tutorGender}</p>
                </div>
              </div>

              {/* Student Gender */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Student Gender</p>
                  <p className="text-base text-gray-900">{tuitionData.studentGender}</p>
                </div>
              </div>

              {/* Student Email */}
              <div className="flex items-start md:col-span-2">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Student Email</p>
                  <p className="text-base text-gray-900">{tuitionData.studentEmail}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{tuitionData.description}</p>
            </div>

            {/* Timestamps */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Created At</p>
                  <p className="text-sm text-gray-900">{formatDate(tuitionData.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Last Updated</p>
                  <p className="text-sm text-gray-900">{formatDate(tuitionData.updatedAt)}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-6 border-t border-gray-200 flex gap-4">
              <button
                onClick={openApplyModal}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {  user && showApplyModal && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 pt-32">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 flex justify-between items-center sticky top-0">
              <h3 className="text-xl font-bold text-white">Apply for Tuition</h3>
              <button
                onClick={closeApplyModal}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitApplication} className="p-6">
              {/* Tuition Info */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Tuition Information</h4>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Subject:</span> {tuitionData.subject} - {tuitionData.class}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Budget:</span> ৳{tuitionData.budget?.toLocaleString()}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Location:</span> {tuitionData.location}
                </p>
              </div>

              {/* Auto-filled Fields */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={user?.displayName}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Email
                </label>
                <input
                  type="email"
                  value={tuitionData.studentEmail}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                />
              </div>

              {/* Input Fields */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qualifications <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="qualifications"
                  value={applicationForm.qualifications}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  placeholder="e.g., BSc in Mathematics from XYZ University"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="experience"
                  value={applicationForm.experience}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  placeholder="e.g., 3 years of teaching experience in high school"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Salary (৳) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="expectedSalary"
                  value={applicationForm.expectedSalary}
                  onChange={handleInputChange}
                  required
                  min="0"
                  placeholder="Enter your expected salary"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={closeApplyModal}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={applyLoading}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {applyLoading ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {
       showApplyModal && !user && <div>
          {
           handleShowAlert()
          }
        </div>
      }
      {/* {
        showApplyModal && user && !user?.displayName && <div>
          {
            handleUpdateInfo()
          }
        </div>
      } */}
    </div>
  );
};

export default TuitionDetails;