import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { User } from "lucide-react";

const Navbar = () => {

  const {user,logOut} = use(AuthContext);
  if(user){
    console.log(user);
    
  }

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
      <div className="navbar-end space-x-2">
        {
          user?
          <div className="dropdown dropdown-end">
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      <div>
        <User></User>
        <p>{user?.displayName}</p>
      </div>
    </div>
     <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
      <li><a>Profile</a></li>
      <li><button onClick={handleSignOut}>Logout</button></li>
    </ul>
    </div>:
          <div>
            <Link to="/login">Login</Link> <span>/</span><Link to="/register">Register</Link>
          </div>
        }
        
      </div>
    </div>
  );
};

export default Navbar;
