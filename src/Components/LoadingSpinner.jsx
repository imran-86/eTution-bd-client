import React from 'react';

const LoadingSpinner = () => {
    return (
        <div>

        <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-90">
            <div>
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
                <h6 className="text-6xl  text-gray-800 mt-4">Loading...</h6>
            </div>
        </div>
        </div>
    );
};

export default LoadingSpinner;