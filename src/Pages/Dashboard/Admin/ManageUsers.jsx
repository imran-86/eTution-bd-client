import { useState } from "react";
import {
  Eye,
  Edit,
  Trash2,
  Users,
  Mail,
  Phone,
  UserCircle,
  GraduationCap,
  Save,
  X,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

export default function ManageUsers() {
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    qualifications: "",
    expectedSalary: "",
    experience: "",
  });

  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      setLoading(false);
      return res.data;
    },
  });

  const handleView = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      qualifications: user.qualifications || "",
      expectedSalary: user.expectedSalary || "",
      experience: user.experience || "",
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = () => {
    setActionLoading(true);

    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to update this user information?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .put(`/users/${selectedUser._id}`, editFormData)
            .then((result) => {
              // console.log(result);

              refetch();
              Swal.fire({
                title: "Updated!",
                text: "User information has been updated.",
                icon: "success",
              });

              setShowEditModal(false);
            });
        }
      });

      setActionLoading(false);
    } catch (error) {
      // console.error("Error updating user:", error);
      setActionLoading(false);

      Swal.fire({
        title: "Error!",
        text: "Failed to update user.",
        icon: "error",
      });
    }
  };

  const handleDelete = (userId, userName) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${userName}? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${userId}`).then((result) => {
          // console.log(result);

          refetch();

          Swal.fire({
            title: "Deleted!",
            text: "User has been deleted.",
            icon: "success",
          });
        });
      }
    });
  };

  const closeModals = () => {
    setShowViewModal(false);
    setShowEditModal(false);
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Manage Users
          </h1>
          <p className="text-lg text-purple-300">
            View, edit, and manage all registered users
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-4xl font-bold text-indigo-600">
                  {users.length}
                </p>
              </div>
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Students</p>
                <p className="text-4xl font-bold text-purple-600">
                  {users.filter((u) => u.role === "student").length}
                </p>
              </div>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Tutors</p>
                <p className="text-4xl font-bold text-pink-600">
                  {users.filter((u) => u.role === "tutor").length}
                </p>
              </div>
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                <UserCircle className="w-8 h-8 text-pink-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-gray-900">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700">{user.email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700">{user.phone}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "Tutor"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleView(user)}
                          className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-all"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(user)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all"
                          title="Edit Profile"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id, user.name)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* View Modal */}
        {showViewModal && selectedUser && (
          <div className="fixed inset-0  bg-transparent bg-opacity-50 flex items-center justify-center p-4 z-50 transition ease-in-out duration-500">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white sticky top-0">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold">
                      {selectedUser.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-1">
                        {selectedUser.name}
                      </h2>
                      <p className="text-purple-300">{selectedUser.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={closeModals}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
                      <Mail className="w-5 h-5 text-indigo-600" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-semibold text-gray-900">
                          {selectedUser.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
                      <Phone className="w-5 h-5 text-indigo-600" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-semibold text-gray-900">
                          {selectedUser.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tutor Specific Information */}
                {selectedUser.role === "Tutor" && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      Professional Details
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">
                          Qualifications
                        </p>
                        <p className="font-semibold text-gray-900">
                          {selectedUser.qualifications}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-1">
                            Experience
                          </p>
                          <p className="font-semibold text-gray-900">
                            {selectedUser.experience}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-1">
                            Expected Salary
                          </p>
                          <p className="font-semibold text-gray-900">
                            ৳{selectedUser.expectedSalary}/month
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Account Information */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Account Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Joined:</span>
                      <span className="font-semibold text-gray-900">
                        {new Date(selectedUser.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && selectedUser && (
          <div className="fixed inset-0  bg-transparent bg-opacity-50 flex items-center justify-center p-4 z-50 transition ease-in-out duration-500">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white sticky top-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Edit User</h2>
                    <p className="text-purple-300">{selectedUser.name}</p>
                  </div>
                  <button
                    onClick={closeModals}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={editFormData.phone}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    name="role"
                    value={editFormData.role}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="student">student</option>
                    <option value="tutor">tutor</option>
                    <option value="admin">admin</option>
                  </select>
                </div>

                {/* Tutor Specific Fields */}
                {editFormData.role === "Tutor" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Qualifications
                      </label>
                      <input
                        type="text"
                        name="qualifications"
                        value={editFormData.qualifications}
                        onChange={handleEditChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Experience
                        </label>
                        <input
                          type="text"
                          name="experience"
                          value={editFormData.experience}
                          onChange={handleEditChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expected Salary
                        </label>
                        <input
                          type="number"
                          name="expectedSalary"
                          value={editFormData.expectedSalary}
                          onChange={handleEditChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleSaveEdit}
                    disabled={actionLoading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50"
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
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    onClick={closeModals}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                  >
                    Cancel
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
