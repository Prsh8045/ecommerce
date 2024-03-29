import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
  const {auth}=useAuth()
  return (
    
    <Layout title={"AdminDashboard"} >
     <div className='container-fluid m-3 p-3'>
      <div className='row d-flex justify-content-betweenx'>
        <div className='col-md-6'><AdminMenu/>
         </div> 
        <div className="col-md-5">
          <div className='card p3'>
            <h3>Admin Name: {auth?.user?.name}</h3>
            <h3>Admin Email: {auth?.user?.email}</h3>
            <h3>Admin Contact: {auth?.user?.phone}</h3>
          </div>
        </div>
      </div>
     </div> 

     

    </Layout>
  );
};  

export default AdminDashboard