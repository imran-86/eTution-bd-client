import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { User } from "lucide-react";

const Navbar = () => {

  const {user,logOut} = use(AuthContext);
  // if(user){
  //   console.log(user);
    
  // }

  const handleSignOut= () =>{
      logOut()
      .then(result=>{
        console.log(result);
        
      })
  }

  const links = <>
     <li><NavLink className='mr-4'>Home</NavLink></li>
     <li><NavLink to="/all-tuitions" className='mr-4'>Tuitions</NavLink></li>
     <li><NavLink to="/tutors" className='mr-4'>Tutor</NavLink></li>
     <li><NavLink to="/about" className='mr-4'>About</NavLink></li>
     <li><NavLink className='mr-4'>Contact</NavLink></li>
     {
      user&&<li><NavLink to="/dashboard" className='mr-4'>Dashboard</NavLink></li>
     }
     
  </>
  return (
    <div className="navbar bg-base-100 shadow-sm md:px-30 sticky top-0 z-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
           {links}
          </ul>
        </div>
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
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
           {links}
        </ul>
      </div>
      <div className="navbar-end">
  {user ? (
    <div className="dropdown dropdown-end">
     
      <div 
        tabIndex={0} 
        role="button" 
        className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 rounded-full p-1 transition-all"
      >
       
        <div className="hidden md:flex flex-col items-end">
          <span className="font-semibold text-gray-800 text-sm">
            {user?.displayName || user?.name || 'User'}
          </span>
          <span className="text-xs text-gray-500">
            {user?.email || user?.email}
          </span>
        </div>
        
       
        <div className="avatar">
          <div className="w-10 h-10 rounded-full ring-2 ring-primary ring-offset-2">
            <img 
              src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.name || user?.email}&background=random`} 
              alt={user?.displayName || 'User'}
              className="object-cover"
            />
          </div>
        </div>
        
       
        <svg 
          className="w-4 h-4 text-gray-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
    
      <ul 
        tabIndex={0} 
        className="dropdown-content z-[100] mt-3 p-3 shadow-xl bg-white rounded-xl w-64 border border-gray-100"
      >
        
        <div className="px-3 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <img 
              src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.name}&background=3B82F6`} 
              alt="Profile" 
              className="w-12 h-12 rounded-full border-2 border-gray-200"
            />
            <div>
              <h3 className="font-bold text-gray-900">
                {user?.displayName || user?.name}
              </h3>
              <p className="text-sm text-gray-500">{user?.email}</p>
              {user?.role && (
                <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  {user.role}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Menu Items */}
        <li className="my-1">
          <Link 
            to="/dashboard/profile-settings" 
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-gray-900"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>My Profile</span>
          </Link>
        </li>
        
        <li className="my-1">
          <Link 
            to="/dashboard" 
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-gray-900"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Dashboard</span>
          </Link>
        </li>
        
        <li className="my-1">
          <Link 
            to="/dashboard/profile-settings" 
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-gray-900"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Settings</span>
          </Link>
        </li>
        
        <div className="my-2 border-t border-gray-100"></div>
        
        <li className="my-1">
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <Link 
        to="/login" 
        className="text-gray-700 hover:text-primary font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Sign In
      </Link>
      <Link 
        to="/register" 
        className="bg-primary text-white font-medium px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
      >
        Get Started
      </Link>
    </div>
  )}
</div>
    </div>
  );
};

export default Navbar;
