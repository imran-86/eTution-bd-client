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
        // console.log(res.data);
        
        return res.data;
    }
  })
  // console.log(userInfo);
  
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <ListCollapse />
          </label>
          <div className="px-4">Welcome e-tuition-bd</div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
              to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <House />
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {
              userInfo?.role === 'admin' && <div>
                <Link
                to="/dashboard/manage-tuition"
                >    
                <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Manage Tuition"
              >
                {/* Settings icon */}
               <NotebookTabs />
                <span className="is-drawer-close:hidden">Manage tuition</span>
              </button>
            </li>
            </Link>
             <Link
                to="/dashboard/manage-users"
                >    
                <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Manage Users"
              >
                {/* Settings icon */}
               <SquareUser></SquareUser>
                <span className="is-drawer-close:hidden">Manage Users</span>
              </button>
            </li>
            </Link>
            </div>
            }
            {

            }
            {
              userInfo?.role === 'student' && <div>
                  {/* List item */}
                <Link
                to="/dashboard/approved-tuition"
                >
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My tuition"
              >
                {/* Settings icon */}
                <Landmark />
                <span className="is-drawer-close:hidden">My tuition</span>
              </button>
            </li>
            </Link>

            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Applied Tutor"
              >
                {/* Settings icon */}
                <FileUser />
                <span className="is-drawer-close:hidden">Applied Tutor</span>
              </button>
              
            </li>
             <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Payment History"
              >
                {/* Settings icon */}
              <BadgeDollarSign />
                <span className="is-drawer-close:hidden">Payment History</span>
              </button>
              
            </li>

             {/* List item */}
             <Link 
             to="/dashboard/post-tuition"
             >
             <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Post tuition"
              >
                {/* Settings icon */}
                <Milestone />
                <span className="is-drawer-close:hidden">Post tuition</span>
              </button>
              
            </li>
             </Link>
             <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Profile settings"
              >
                {/* Settings icon */}
                <UserRoundPen />
                <span className="is-drawer-close:hidden">Profile Settings</span>
              </button>
             
            </li>

              </div>
            }
           
         
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
