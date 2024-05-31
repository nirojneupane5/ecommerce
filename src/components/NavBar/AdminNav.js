import React,{useContext} from 'react'
import { NavLink,Outlet,useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const AdminNav = () => {
  const navigate=useNavigate('');
  const {setAuthenticated}=useContext(AuthContext);
  const handleLogout=()=>{
    const confirmed=window.confirm("Are you sure you want to logout?")
      if(confirmed){
      localStorage.removeItem('token');
      console.log("Logout Successfull");
      setAuthenticated(false);
      navigate('/');
      }
  }
  return (
    <>
    <div className="nav">
    <div className="container">
    <div className="row">
        <div className="col-md-3" id="logo">
           <h3>Dairy management system</h3>
        </div>
        <div className="col-md-9">
            <ul id="list">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                 <li><NavLink to="/addFood">Add Product</NavLink></li> 
                 <li><NavLink to="/displayFood">Display Product</NavLink></li> 
                 <li><button className="btn btn-dark" onClick={handleLogout}>Logout</button></li>
            </ul>
        </div>
    </div>
  </div>
  </div>
  <main>
    <Outlet />
    
  </main>
  </>
  )
}

export default AdminNav