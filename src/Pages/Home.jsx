import React from 'react';
import Hero from '../Components/RandomComponent/Hero';
import LatestTuitions from '../Components/RandomComponent/LatestTuitions';
import LatestTutors from '../Components/RandomComponent/LatestTutors';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <LatestTuitions></LatestTuitions>
            <LatestTutors></LatestTutors>
        </div>
    );
};

export default Home;