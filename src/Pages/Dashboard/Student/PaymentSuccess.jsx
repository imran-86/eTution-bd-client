import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Link } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { CheckCircle, CreditCard, Hash, Home, History, ArrowRight, Download } from 'lucide-react';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const [loading, setLoading] = useState(true);

    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId
                    });
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [sessionId, axiosSecure]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Processing payment...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen  flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                {/* Success Animation */}
                <div className="text-center mb-8">
                    <div className="inline-block relative">
                        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl mb-6 mx-auto animate-bounce">
                            <CheckCircle className="w-20 h-20 text-green-600" />
                        </div>
                        {/* Confetti effect */}
                        <div className="absolute top-0 left-0 w-full h-full">
                            <div className="animate-ping absolute top-0 left-0 w-2 h-2 bg-green-400 rounded-full"></div>
                            <div className="animate-ping absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full delay-75"></div>
                            <div className="animate-ping absolute bottom-0 right-0 w-2 h-2 bg-teal-400 rounded-full delay-150"></div>
                            <div className="animate-ping absolute bottom-4 left-4 w-2 h-2 bg-green-300 rounded-full delay-200"></div>
                        </div>
                    </div>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-center">
                        <h1 className="text-4xl font-bold text-white mb-2">Payment Successful!</h1>
                        <p className="text-green-100 text-lg">Your payment has been processed successfully</p>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-6">
                        {/* Success Message */}
                        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                            <p className="text-green-800 text-lg font-semibold mb-2">
                                Thank you for your payment!
                            </p>
                            <p className="text-green-700">
                                We've received your payment and your transaction is complete.
                            </p>
                        </div>

                        {/* Payment Details */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Details</h2>

                            {/* Transaction ID */}
                            <div className="bg-gray-50 rounded-xl p-5 flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <CreditCard className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
                                    <p className="font-mono text-gray-900 font-semibold break-all">
                                        {paymentInfo.transactionId || 'N/A'}
                                    </p>
                                </div>
                            </div>

                            {/* Tracking ID */}
                            <div className="bg-gray-50 rounded-xl p-5 flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Hash className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-600 mb-1">Tracking ID</p>
                                    <p className="font-mono text-gray-900 font-semibold break-all">
                                        {paymentInfo.trackingId || 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Info Box */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                            <p className="text-sm text-blue-800">
                                <strong>Note:</strong> Please save your Transaction ID and Tracking ID for future reference. 
                                You can view this information anytime in your payment history.
                            </p>
                        </div>

                        {/* Download Receipt Button */}
                        <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                            <Download className="w-5 h-5" />
                            Download Receipt
                        </button>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            <Link
                                to="/payment-history"
                                className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                            >
                                <History className="w-5 h-5" />
                                Payment History
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                            <Link
                                to="/"
                                className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
                            >
                                <Home className="w-5 h-5" />
                                Go to Home
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer Message */}
                <div className="text-center mt-8">
                    <p className="text-gray-600">
                        If you have any questions, please contact our support team
                    </p>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes bounce {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }

                .animate-bounce {
                    animation: bounce 2s infinite;
                }

                .delay-75 {
                    animation-delay: 0.75s;
                }

                .delay-150 {
                    animation-delay: 1.5s;
                }

                .delay-200 {
                    animation-delay: 2s;
                }
            `}</style>
        </div>
    );
};

export default PaymentSuccess;