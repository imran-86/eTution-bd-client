import { use, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Camera,
  Save,
  Lock,
  UserCircle,
} from "lucide-react";

import { AuthContext } from "../../../Context/AuthContext";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

export default function ProfileSettings() {
  const { user, setUser, updateUser } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    role: user?.role || "",
    photoURL: user?.photoURL || "",
  });
  const [loading, setLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(user?.photoURL || "");

  // Fetch current user data
  const { data: userData, refetch } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile/${user?.email}`);
      //   console.log(res.data[0].name);

      setFormData({
        name: res.data[0].name,
        phone: res.data[0].phone,
        role: res.data[0].role,
        photoURL: res.data[0].photoURL || "",
      });
      //   console.log(formData);

      setPhotoPreview(res.data.photoURL || "");
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      let photoURL = formData.photoURL;

      if (photoFile) {
        const formDataPhoto = new FormData();
        formDataPhoto.append("photo", photoFile);
        photoURL = photoPreview;
      }

      const updateData = {
        name: formData.name,
        phone: formData.phone,
        photoURL: photoURL,
      };

      await axiosSecure.put(`/users/profile/${user?.email}`, updateData);

      if (updateUser) {
        await updateUser({ displayName: formData.name, photoURL: photoURL })
          .then(() => {
            setUser({
              ...user,
              displayName: formData.name,
              photoURL: photoURL,
            });
          })
          .catch((err) => {
            console.log(err);
            setUser(user);
          });
      }

      refetch();
      setLoading(false);

      Swal.fire({
        title: "Success!",
        text: "Profile updated successfully",
        icon: "success",
        confirmButtonColor: "#4F46E5",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      setLoading(false);

      Swal.fire({
        title: "Error!",
        text: "Failed to update profile",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Profile Settings
          </h1>
          <p className="text-lg text-gray-600">
            Update your personal information and profile picture
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <div className="text-center">
                {/* Profile Picture */}
                <div className="relative inline-block mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    {user ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserCircle className="w-20 h-20 text-white" />
                    )}
                  </div>
                  <label
                    htmlFor="photo-upload"
                    className="absolute bottom-0 right-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-indigo-700 transition-all shadow-lg"
                  >
                    <Camera className="w-5 h-5 text-white" />
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {formData.name}
                </h2>
                <p className="text-gray-600 mb-1">{user?.email}</p>
                <span
                  className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
                    user?.role === "Tutor" || user?.role === "tutor"
                      ? "bg-purple-100 text-purple-700"
                      : user?.role === "Admin" || user?.role === "admin"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {user?.role}
                </span>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Member since</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {new Date(userData?.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                <h2 className="text-2xl font-bold text-white">
                  Personal Information
                </h2>
                <p className="text-purple-300">
                  Update your profile details below
                </p>
              </div>
              {/* {
                <div>
                    <h1 className='bg-red-400 w-3'>{formData?.email}</h1>
                    <p>hfoewhfoewihfioewhoihf</p>
                </div>
               
              } */}
              <div className="p-6 space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline w-4 h-4 mr-1" />
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={formData.name}
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline w-4 h-4 mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user?.email}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Email cannot be changed
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline w-4 h-4 mr-1" />
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Photo URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Camera className="inline w-4 h-4 mr-1" />
                    Photo URL (Optional)
                  </label>
                  <input
                    type="url"
                    name="photoURL"
                    value={formData.photoURL}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="https://example.com/photo.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Or upload a photo using the camera icon above
                  </p>
                </div>

                {/* Role (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <UserCircle className="inline w-4 h-4 mr-1" />
                    Account Type
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-blue-900">
                        Security Note
                      </p>
                      <p className="text-sm text-blue-700">
                        To change your password, please use the "Forgot
                        Password" option on the login page or contact support.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
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
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
