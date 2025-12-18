import { use, useState } from "react";
import {
  Eye,
  Check,
  X,
  UserCircle,
  GraduationCap,
  Briefcase,
  DollarSign,
  Mail,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Context/AuthContext";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

export default function AppliedTutors() {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const { user } = use(AuthContext);

  const axiosSecure = useAxiosSecure();
  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["applications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications/student/${user?.email}`
      );
      // console.log(res.data);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleAccept = async (application) => {
    // console.log("Application to accept:", application);

    try {
      const result = await Swal.fire({
        title: "Accept Application?",
        text: `Do you want to pay ৳${application.expectedSalary} for this tutor?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#10b981",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Please Pay!",
      });

      if (result.isConfirmed) {
        setActionLoading(true);

        const paymentInfo = {
          price: application.expectedSalary,
          tuitionId: application.tuitionId,
          studentEmail: application.studentEmail,
          tuitionTitle: application.tuitionTitle,
          tutorId: application.tutorId,
          applicationId: application._id,
          tutorEmail: application.tutorEmail
        };

        // console.log(paymentInfo);
        const response = await axiosSecure.post(
          "/payment-checkout-session",
          paymentInfo
        );
        // console.log("Stripe ", response.data);

        if (response.data.url) {
          window.location.href = response.data.url;
        } else {
          throw new Error("No checkout URL received");
        }
      }
    } catch (error) {
      // console.error("Error creating payment session:", error);
      setActionLoading(false);

      Swal.fire({
        title: "Error!",
        text: "Failed to create payment session.",
        icon: "error",
      });
    }
  };

  const handleReject = (applicationId, tutorName) => {
    Swal.fire({
      title: "Reject Application?",
      text: `Do you want to reject ${tutorName}'s application?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, reject",
    }).then((result) => {
      if (result.isConfirmed) {
        setActionLoading(true);
        axiosSecure
          .patch(`/applications/${applicationId}`, { status: "Rejected" })
          .then(() => {
            refetch();
            Swal.fire({
              title: "Rejected!",
              text: "Tutor application has been rejected.",
              icon: "success",
            });
            setActionLoading(false);
          })
          .catch((error) => {
            // console.error("Error rejecting application:", error);
            setActionLoading(false);
            Swal.fire({
              title: "Error!",
              text: "Failed to reject application.",
              icon: "error",
            });
          });
      }
    });
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    // <div>
    //     {applications.length}
    // </div>
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Tutor Applications
          </h1>
          <p className="text-lg text-purple-300">
            Review and manage tutor applications for your tuition posts
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Applications</p>
              <p className="text-4xl font-bold text-indigo-600">
                {applications.length}
              </p>
            </div>
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <UserCircle className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Applications Display */}
        {applications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCircle className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Applications Yet
            </h3>
            <p className="text-gray-600">
              You haven't received any tutor applications for your tuition posts
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold">
                      {application.tutorName}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">
                        {application.tutorName}
                      </h3>
                      <p className="text-purple-300 text-sm">
                        {application.tutorEmail}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      application.status === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : application.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {application.status || "Pending"}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-2">
                    <GraduationCap className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        Qualifications
                      </p>
                      <p className="text-sm text-gray-700 font-medium">
                        {application.qualifications}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Briefcase className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Experience</p>
                      <p className="text-sm text-gray-700 font-medium">
                        {application.experience}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <DollarSign className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        Expected Salary
                      </p>
                      <p className="text-sm text-gray-700 font-bold">
                        ৳{application.expectedSalary}/month
                      </p>
                    </div>
                  </div>

                  {/* Tuition Info */}
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Applied For</p>
                    <p className="text-sm text-gray-900 font-semibold">
                      {application.tuitionTitle}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-6 pb-6 space-y-2">
                  {application.status !== "Accepted" &&
                    application.status !== "Rejected" && (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleAccept(application)}
                          disabled={actionLoading}
                          className="flex items-center justify-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all disabled:opacity-50 text-sm"
                        >
                          <Check className="w-4 h-4" />
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleReject(application._id, application.tutorName)
                          }
                          disabled={actionLoading}
                          className="flex items-center justify-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all disabled:opacity-50 text-sm"
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
