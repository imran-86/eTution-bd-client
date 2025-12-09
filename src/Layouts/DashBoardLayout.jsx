import { BadgeDollarSign, FileUser, House, Landmark, ListCollapse, Milestone, UserRoundPen } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router";

const DashBoardLayout = () => {
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


           
             {/* List item */}
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
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
