import React from 'react';
import Navbar from '../Components/Shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Shared/Footer';

const RootLayouts = () => {
    return (
        <div>
            <Navbar ></Navbar>
            <div className='bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
             <Outlet ></Outlet>
            </div>
            
            <Footer></Footer>

        </div>
    );
};

export default RootLayouts;