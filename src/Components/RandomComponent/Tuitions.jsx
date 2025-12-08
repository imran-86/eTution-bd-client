import React, { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';

const Tuitions = () => {
    const [tuitions, setTuitions] = useState([]);
  const axiosInstance = useAxios();
  useEffect(() => {
    axiosInstance.get("/tuitions").then((data) => {
    //   console.log(data.data);
      setTuitions(data.data);
    });
  }, []);
    return (
        <div>
            
        </div>
    );
};

export default Tuitions;