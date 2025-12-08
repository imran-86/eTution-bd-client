import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { User } from "lucide-react";

const Navbar = () => {

  const {user,logOut} = use(AuthContext);

  const handleSignOut= () =>{
      logOut()
      .then(result=>{
        console.log(result);
        
      })
  }

  const links = <>
     <li><NavLink className='mr-4'>Home</NavLink></li>
     <li><NavLink to="/tuitions" className='mr-4'>Tuitions</NavLink></li>
     <li><NavLink to="/tutors" className='mr-4'>Tutor</NavLink></li>
     <li><NavLink to="/about" className='mr-4'>About</NavLink></li>
     <li><NavLink className='mr-4'>Contact Us</NavLink></li>
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
        <a className="btn btn-ghost text-xl">daisyUI</a>
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
      <User></User>
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
