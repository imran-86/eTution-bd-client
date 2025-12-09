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

export default function ManageTuition() {
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();
  const { data: pendingTuitions = [] } = useQuery({
    queryKey: ["pendingTuitions" , 'Pending'],
    queryFn: async () => {
      const res = await axiosInstance
        .get("/tuitions?status=Pending")
        setLoading(false)
      return res.data;
    },
  });

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
                           
                            className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-all"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            
                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all"
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                           
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

      
      </div>
    </div>
  );
}
