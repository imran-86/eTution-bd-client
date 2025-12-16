import { use, useState } from "react";
import {
  Eye,
  DollarSign,
  CreditCard,
  CheckCircle,
  Calendar,
  Hash,
  X,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Context/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

export default function RevenueHistory() {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/tutor/${user?.email}`);
      console.log(res.data);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleView = (payment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPayment(null);
  };

  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading payment history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Payment History
          </h1>
          <p className="text-lg text-gray-600 text-white">
            View all your payment transactions and receipts
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Payments</p>
                <p className="text-4xl font-bold text-indigo-600">
                  {payments.length}
                </p>
              </div>
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Amount Paid</p>
                <p className="text-4xl font-bold text-green-600">
                  ৳{totalPaid}
                </p>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Table */}
        {payments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Payment History
            </h3>
            <p className="text-gray-600">You haven't made any payments yet</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Tracking ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Tuition
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Date
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {payments.map((payment, index) => (
                    <tr
                      key={payment._id}
                      className={`hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Hash className="w-4 h-4 text-gray-400" />
                          <span className="font-mono text-sm text-gray-700">
                            {payment.trackingId}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900">
                          {payment.tuitionName}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-green-600">
                          ৳{payment.amount}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            payment.paymentStatus === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {payment.paymentStatus === "paid"
                            ? "Paid"
                            : payment.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">
                            {new Date(payment.paidAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => handleView(payment)}
                            className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-all text-sm font-semibold flex items-center gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            View
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

        {/* View Payment Modal */}
        {showModal && selectedPayment && (
          <div className="fixed inset-0  bg-transparent bg-opacity-50 flex items-center justify-center p-4 z-50 transition ease-in-out duration-500">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white sticky top-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Payment Receipt</h2>
                    <p className="text-purple-300 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Payment Successful
                    </p>
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
                {/* Amount Card */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 text-center">
                  <p className="text-gray-600 text-sm mb-2">Amount Paid</p>
                  <p className="text-5xl font-bold text-green-600">
                    ৳{selectedPayment.amount}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    {selectedPayment.currency.toUpperCase()}
                  </p>
                </div>

                {/* Payment Details */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Payment Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
                      <span className="text-gray-600">Tracking ID</span>
                      <span className="font-mono font-semibold text-gray-900">
                        {selectedPayment.trackingId}
                      </span>
                    </div>

                    <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
                      <span className="text-gray-600">Transaction ID</span>
                      <span className="font-mono text-sm text-gray-900">
                        {selectedPayment.transactionId}
                      </span>
                    </div>

                    <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
                      <span className="text-gray-600">Payment Status</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          selectedPayment.paymentStatus === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {selectedPayment.paymentStatus === "paid"
                          ? "Paid"
                          : selectedPayment.paymentStatus}
                      </span>
                    </div>

                    <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
                      <span className="text-gray-600">Payment Date</span>
                      <span className="font-semibold text-gray-900">
                        {new Date(selectedPayment.paidAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tuition Information */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Tuition Information
                  </h3>
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tuition Name</span>
                      <span className="font-semibold text-gray-900">
                        {selectedPayment.tuitionName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Student Information */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Student Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Email</span>
                      <span className="font-semibold text-gray-900">
                        {selectedPayment.studentEmail}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Note */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    For any payment related queries, please contact support with
                    your tracking ID
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
