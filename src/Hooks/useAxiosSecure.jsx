import axios from 'axios';
import React, { use, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

const axiosSecure = axios.create({
    baseURL: 'https://e-tuition-bd-server-gules.vercel.app'
})

const useAxiosSecure = () => {
   const {logOut} = use(AuthContext);
   // console.log(logOut);
   
   const navigate = useNavigate();
    useEffect(()=>{

      
       const reqInterceptor =  axiosSecure.interceptors.request.use(config =>{
            config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
            return config;
         })

         

         const resInterceptor = axiosSecure.interceptors.response.use((response)=>{
            return response;
         },(error)=>{
         //  console.log(error);

         const statusCode = error.status;
         if(statusCode===401 || statusCode===403){
           logOut()
           .then(()=>{
           navigate('/login')
           })
           
         }

          return Promise.reject(error);
          
         })


         return () =>{
           axiosSecure.interceptors.request.eject(reqInterceptor);
           axiosSecure.interceptors.response.eject(resInterceptor);
         }

    },[logOut, navigate])

    return axiosSecure;
};

export default useAxiosSecure;