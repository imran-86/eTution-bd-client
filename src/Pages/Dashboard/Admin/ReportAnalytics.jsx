import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  DollarSign,
  TrendingUp,
  Users,
  CreditCard,
  Calendar,
  Download,
  Eye,
  X,
  Filter,
} from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

export default function ReportsAnalytics() {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [dateFilter, setDateFilter] = useState("all"); // all, today, week, month, year

  const axiosSecure = useAxiosSecure();

  // Fetch all successful transactions
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["transactions", "paid"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  // Fetch analytics summary
  const { data: analytics = {} } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics/summary");
      return res.data;
    },
  });

  // Calculate totals
  const totalEarnings = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalTransactions = transactions.length;

  // Filter transactions by date
  const getFilteredTransactions = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return transactions.filter((t) => {
      const transactionDate = new Date(t.paidAt);

      switch (dateFilter) {
        case "today":
          return transactionDate >= today;
        case "week":
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return transactionDate >= weekAgo;
        case "month":
          const monthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
          );
          return transactionDate >= monthAgo;
        case "year":
          const yearAgo = new Date(
            now.getFullYear() - 1,
            now.getMonth(),
            now.getDate()
          );
          return transactionDate >= yearAgo;
        default:
          return true;
      }
    });
  };

  const filteredTransactions = getFilteredTransactions();
  const filteredEarnings = filteredTransactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  const handleView = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTransaction(null);
  };

  const exportToCSV = () => {
    const headers = [
      "Date",
      "Transaction ID",
      "Student Email",
      "Tuition",
      "Amount",
      "Status",
    ];
    const csvData = filteredTransactions.map((t) => [
      new Date(t.paidAt).toLocaleDateString(),
      t.transactionId,
      t.studentEmail,
      t.tuitionName,
      t.amount,
      t.paymentStatus,
    ]);

    const csv = [headers, ...csvData].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions_${dateFilter}_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Reports & Analytics
          </h1>
          <p className="text-lg text-gray-600">
            Monitor platform earnings and transaction history
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-gray-600 text-sm mb-1">Total Earnings</p>
            <p className="text-3xl font-bold text-gray-900">
              ৳{totalEarnings.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Total Transactions</p>
            <p className="text-3xl font-bold text-gray-900">
              {totalTransactions}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Active Users</p>
            <p className="text-3xl font-bold text-gray-900">
              {analytics.activeUsers || 0}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Avg Transaction</p>
            <p className="text-3xl font-bold text-gray-900">
              ৳
              {totalTransactions > 0
                ? Math.round(totalEarnings / totalTransactions)
                : 0}
            </p>
          </div>
        </div>

        {/* Filters and Export */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                Filter by:
              </span>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last Month</option>
                <option value="year">Last Year</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600">Filtered Earnings</p>
                <p className="text-xl font-bold text-green-600">
                  ৳{filteredEarnings.toLocaleString()}
                </p>
              </div>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        {filteredTransactions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Transactions Found
            </h3>
            <p className="text-gray-600">
              No transactions match the selected filter
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Transaction ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Student
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
                    <th className="px-6 py-4 text-center text-sm font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTransactions.map((transaction, index) => (
                    <tr
                      key={transaction._id}
                      className={`hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">
                            {new Date(transaction.paidAt).toLocaleDateString(
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
                        <span className="font-mono text-sm text-gray-700">
                          {transaction.transactionId.substring(0, 20)}...
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">
                          {transaction.studentEmail}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-900">
                          {transaction.tuitionName}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-lg font-bold text-green-600">
                          ৳{transaction.amount}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          {transaction.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <button
                            onClick={() => handleView(transaction)}
                            className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-all"
                          >
                            <Eye className="w-4 h-4" />
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

        {/* View Transaction Modal */}
        {showModal && selectedTransaction && (
          <div className="fixed inset-0  bg-transparent bg-opacity-50 flex items-center justify-center p-4 z-50 transition ease-in-out duration-500">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white sticky top-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">
                      Transaction Details
                    </h2>
                    <p className="text-purple-300">
                      Complete transaction information
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

              <div className="p-6 space-y-6">
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                  <p className="text-gray-600 text-sm mb-2">Amount</p>
                  <p className="text-5xl font-bold text-green-600">
                    ৳{selectedTransaction.amount}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
                    <span className="text-gray-600">Transaction ID</span>
                    <span className="font-mono font-semibold text-gray-900 text-sm">
                      {selectedTransaction.transactionId}
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
                    <span className="text-gray-600">Tracking ID</span>
                    <span className="font-mono font-semibold text-gray-900">
                      {selectedTransaction.trackingId}
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
                    <span className="text-gray-600">Student Email</span>
                    <span className="font-semibold text-gray-900">
                      {selectedTransaction.studentEmail}
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
                    <span className="text-gray-600">Tuition</span>
                    <span className="font-semibold text-gray-900">
                      {selectedTransaction.tuitionName}
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
                    <span className="text-gray-600">Payment Date</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(selectedTransaction.paidAt).toLocaleDateString(
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

                  <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
                    <span className="text-gray-600">Status</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      {selectedTransaction.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
