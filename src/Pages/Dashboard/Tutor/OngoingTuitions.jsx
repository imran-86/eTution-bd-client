import { use, useState } from 'react';
import { Eye, BookOpen, MapPin, DollarSign, Calendar, User, Clock, CheckCircle, X, Send } from 'lucide-react';

import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Context/AuthContext';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

export default function OngoingTuitions() {

  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure(); 

  
  const { data: approvedTuitions = [], isLoading } = useQuery({
    queryKey: ['approvedTuitions', 'Approved'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/ongoing/${user?.email}?status=Approved`);
      console.log(res.data);
      return res.data;
    },
  });



 
 

  

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Ongoing tuitions...</p>
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
            Ongoing Tuitions
          </h1>
          <p className="text-lg text-gray-600">
             Approved tuition report
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total tuitions </p>
              <p className="text-4xl font-bold text-green-600">{approvedTuitions.length}</p>
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Table */}
        {approvedTuitions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Ongoing Tuitions</h3>
            <p className="text-gray-600">
              There are no approved tuition requests available at the moment
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Tuition Title</th>

                  
                    <th className="px-6 py-4 text-left text-sm font-semibold">Salary</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Student Email</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Applied at</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {approvedTuitions.map((tuition, index) => (
                    <tr 
                      key={tuition._id}
                      className={`hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900">{tuition.tuitionTitle}</div>
                         
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900">{tuition.expectedSalary}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700">{tuition.studentEmail}</span>
                      </td>
                      <td className="px-6 py-4">
                       
                          <span className="text-gray-700 text-sm">{tuition.appliedAt}</span>
                        
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