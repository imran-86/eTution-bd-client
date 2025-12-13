import { BadgeDollarSign, FileUser, House, Landmark, ListCollapse, Milestone, NotebookTabs, SquareUser, UserRoundPen } from "lucide-react";
import React, { use } from "react";
import { Link, Outlet } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";

const DashBoardLayout = () => {
  
  const {user} = use(AuthContext);
  const axiosInstance = useAxios();
  const {data: userInfo = []} = useQuery({
    queryKey: ['user',user?.email],
    queryFn: async ()=>{
        const res = await axiosInstance.get(`/user?email=${user.email}`);
        return res.data;
    }
  })
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg ">
        <div className="p-6 border-b">
           <Link
                  to="/"
                  >
                    <svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
           
            <circle cx="30" cy="30" r="26" fill="url(#gradient1)" />
            
           
            <path d="M20 18C20 17.4477 20.4477 17 21 17H28C28.5523 17 29 17.4477 29 18V42C29 42.5523 28.5523 43 28 43H21C20.4477 43 20 42.5523 20 42V18Z" fill="white" />
            <path d="M31 18C31 17.4477 31.4477 17 32 17H39C39.5523 17 40 17.4477 40 18V42C40 42.5523 39.5523 43 39 43H32C31.4477 43 31 42.5523 31 42V18Z" fill="white" />
            
            
            <path d="M30 14L18 19L30 24L42 19L30 14Z" fill="#FFD700" stroke="#FFD700" stroke-width="1.5" stroke-linejoin="round"/>
            <path d="M42 19V25L30 30L18 25V19" stroke="#FFD700" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            
            
            <text x="65" y="28" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#4F46E5">
              TutorHub
            </text>
            <text x="65" y="44" font-family="Arial, sans-serif" font-size="10" fill="#6B7280">
              Learn. Teach. Grow.
            </text>
            
            <defs>
              <linearGradient id="gradient1" x1="4" y1="4" x2="56" y2="56" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#6366F1"/>
                <stop offset="50%" stop-color="#8B5CF6"/>
                <stop offset="100%" stop-color="#EC4899"/>
              </linearGradient>
            </defs>
          </svg>
                  </Link>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {/* Home */}
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
              >
                <House className="w-5 h-5" />
                <span>Homepage</span>
              </Link>
            </li>

            {/* Admin Routes */}
            {userInfo?.role === 'admin' && (
              <>
                <li>
                  <Link
                    to="/dashboard/manage-tuition"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
                  >
                    <NotebookTabs className="w-5 h-5" />
                    <span>Manage Tuitions</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/manage-users"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
                  >
                    <SquareUser className="w-5 h-5" />
                    <span>Manage Users</span>
                  </Link>
                </li>
              </>
            )}

            {/* Tutor Routes */}
            {userInfo?.role === 'tutor' && (
              <>
                <li>
                  <Link
                    to="/dashboard/ongoing-tuitions"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition"
                  >
                    <NotebookTabs className="w-5 h-5" />
                    <span>Ongoing Tuitions</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/profile-settings"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition"
                  >
                    <UserRoundPen className="w-5 h-5" />
                    <span>Profile Settings</span>
                  </Link>
                </li>
              </>
            )}

            {/* Student Routes */}
            {userInfo?.role === 'student' && (
              <>
                <li>
                  <Link
                    to="/dashboard/approved-tuition"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <Landmark className="w-5 h-5" />
                    <span>My Tuitions</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/applied-tutors"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <FileUser className="w-5 h-5" />
                    <span>Applied Tutors</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/payment-history"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <BadgeDollarSign className="w-5 h-5" />
                    <span>Payment History</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/post-tuition"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <Milestone className="w-5 h-5" />
                    <span>Post Tuition</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/profile-settings"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <UserRoundPen className="w-5 h-5" />
                    <span>Profile Settings</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

       
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user?.displayName || user?.email}!</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className='bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-5'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashBoardLayout;