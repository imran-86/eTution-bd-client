import { useState, useEffect } from "react";
import {
  Eye,
  Check,
  X,
  BookOpen,
  AlertCircle,
  MapPin,
  DollarSign,
  Calendar,
  User,
  Clock,
} from "lucide-react";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

export default function ManageTuition() {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTuition, setSelectedTuition] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const axiosInstance = useAxios();
  const { data: pendingTuitions = [], refetch } = useQuery({
    queryKey: ["pendingTuitions", "Pending"],
    queryFn: async () => {
      const res = await axiosInstance.get("/tuitions?status=Pending");
      setLoading(false);
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
 const handleApprove =  (tuitionId) => {
  // console.log(tuitionId);
  setActionLoading(true);
  
  try {
     Swal.fire({
      title: "Are you sure?",
      text: "You want to approved this tuition?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then(result=>{
          if (result.isConfirmed) {

        axiosInstance.patch(`/tuitions/${tuitionId}` , { status: 'Approved' }).then(result=>{
          console.log(result);
            refetch();
            Swal.fire({
        title: "Approved!",
        text: "Tuition has been approved.",
        icon: "success",
      });
        })
        
    
    }
    })

   
    
    setShowModal(false);
    setActionLoading(false);
    
  } catch (error) {
    console.error("Error approving tuition:", error);
    setActionLoading(false);
    
    Swal.fire({
      title: "Error!",
      text: "Failed to approve tuition.",
      icon: "error",
    });
  }
};
const handleReject = async (tuitionId) => {
    setActionLoading(true);
     try {
     Swal.fire({
      title: "Are you sure?",
      text: "You want to rejected this tuition?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then(result=>{
          if (result.isConfirmed) {

        axiosInstance.patch(`/tuitions/${tuitionId}` , { status: 'Rejected' }).then(result=>{
          console.log(result);
             refetch();
      
      Swal.fire({
        title: "Rejected!",
        text: "Tuition has been rejected.",
        icon: "success",
      });
        })
     
    }
    })

   
    
    setShowModal(false);
    setActionLoading(false);
    
  } catch (error) {
    console.error("Error approving tuition:", error);
    setActionLoading(false);
    
    Swal.fire({
      title: "Error!",
      text: "Failed to approve tuition.",
      icon: "error",
    });
  }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading pending tuitions...</p>
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
            Manage Tuitions
          </h1>
          <p className="text-lg text-gray-600">
            Review and approve pending tuition requests
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending Tuitions</p>
              <p className="text-4xl font-bold text-indigo-600">
                {pendingTuitions.length}
              </p>
            </div>
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Table */}
        {pendingTuitions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Pending Tuitions
            </h3>
            <p className="text-gray-600">
              All tuition requests have been processed
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Student
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Subject
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Class
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Budget
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pendingTuitions.map((tuition, index) => (
                    <tr
                      key={tuition.id}
                      className={`hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {tuition.studentName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {tuition.studentEmail}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900">
                          {tuition.subject}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700">{tuition.class}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700">
                          {tuition.location}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-green-600">
                          ৳{tuition.budget}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-500">
                          {tuition.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleView(tuition)}
                            className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-all"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleApprove(tuition._id)}
                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all"
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                           onClick={() => handleReject(tuition._id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                            title="Reject"
                          >
                            <X className="w-4 h-4" />
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
        {showModal && selectedTuition && (
          <div className="fixed inset-0  bg-transparent bg-opacity-50 flex items-center justify-center p-4 z-50 transition ease-in-out duration-500">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white sticky top-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">
                      {selectedTuition.subject}
                    </h2>
                    <p className="text-indigo-100">{selectedTuition.class}</p>
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
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Student Information
                  </h3>
                  <div className="space-y-2 bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-semibold text-gray-900">
                        {selectedTuition.studentEmail}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gender:</span>
                      <span className="font-semibold text-gray-900">
                        {selectedTuition.studentGender}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tuition Details */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Tuition Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm text-gray-600">Subject</span>
                      </div>
                      <p className="font-semibold text-gray-900">
                        {selectedTuition.subject}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm text-gray-600">Class</span>
                      </div>
                      <p className="font-semibold text-gray-900">
                        {selectedTuition.class}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm text-gray-600">Location</span>
                      </div>
                      <p className="font-semibold text-gray-900">
                        {selectedTuition.location}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-600">Budget</span>
                      </div>
                      <p className="font-semibold text-gray-900">
                        ৳{selectedTuition.budget}/month
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-gray-600">
                          Tutor Preference
                        </span>
                      </div>
                      <p className="font-semibold text-gray-900">
                        {selectedTuition.tutorGender}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-600">
                          Days Per Week
                        </span>
                      </div>
                      <p className="font-semibold text-gray-900">
                        {selectedTuition.daysPerWeek} days
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-orange-600" />
                        <span className="text-sm text-gray-600">Duration</span>
                      </div>
                      <p className="font-semibold text-gray-900">
                        {selectedTuition.duration} per session
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Description
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">
                      {selectedTuition.description}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                  onClick={() => handleApprove(selectedTuition._id)}
                    disabled={actionLoading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all disabled:opacity-50"
                  >
                    {actionLoading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        Approve
                      </>
                    )}
                  </button>
                  <button
                   onClick={() => handleReject(selectedTuition._id)}
                    disabled={actionLoading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all disabled:opacity-50"
                  >
                    {actionLoading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <X className="w-5 h-5" />
                        Reject
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
