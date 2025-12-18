import React from 'react';
import Hero from '../Components/RandomComponent/Hero';
import LatestTuitions from '../Components/RandomComponent/LatestTuitions';
import LatestTutors from '../Components/RandomComponent/LatestTutors';
import Features from '../Components/Features';
import HowPlatformWorks from '../Components/HowPlatformWorks';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <LatestTuitions></LatestTuitions>
            <LatestTutors></LatestTutors>
            <HowPlatformWorks></HowPlatformWorks>
            <Features></Features>
            
        </div>
    );
};

export default Home;