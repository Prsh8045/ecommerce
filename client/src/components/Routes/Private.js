import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';
// import Dashboard from '../../pages/user/Dashboard';

 const  PrivateRoute = () => {
    const [ok,setOk]=useState(false);
    const{auth,setAuth}=useAuth();
   

useEffect(()=>{
    const authCheck= async ()=>{
        const res = await axios.get("/api/v1/auth/user-auth",);
        if(res.data.ok){
            setOk(true)
            
        }else{
            setOk(false)
        }

    };
    if(auth?.token)authCheck();
        
},[auth?.token]);

    
  return (
    ok ? <Outlet/>:<Spinner  path=""/>
  )
};
export default PrivateRoute;

 