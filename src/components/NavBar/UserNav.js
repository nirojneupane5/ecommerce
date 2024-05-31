import React,{useState,useContext} from 'react'
import { NavLink,Outlet,useLocation,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { cartCount } from '../../pages/Redux/CartSlice';
import SearchFood from '../../pages/SearchFood/SearchFood';
import AuthContext from '../../context/AuthContext';
const UserNav = () => {
  const {setAuthenticated}=useContext(AuthContext);
  const navigate=useNavigate();
    const location=useLocation();
  const [searchItem,setSearchItem]=useState('');
    const [searchResult,setSearchResult]=useState([]);
  const cartlength=useSelector(cartCount);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const name={searchItem};
    const url='http://localhost:4000/api/hawa/search';
    const response=await fetch(url,{
    method:'POST',
    body:JSON.stringify(name),
    headers:{
        'Content-Type':'application/json'
    }
    });
    const json= await response.json();
    if(response.ok){
    setSearchResult(json);
    console.log(json);
    navigate('/searchProduct');
}
}
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
        <div className="col-md-5" id="logo">
           <h3> Dairy management system</h3>
        </div>
        <div className="col-md-7">
            <ul id="list">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/displayCart">My Cart {cartlength}</NavLink></li>
                <li>
                  <form onSubmit={handleSubmit}>
                    <div className="d-flex">
                    <input type="text" className='form-control' placeholder='search'
                    onChange={(e)=>setSearchItem(e.target.value)} value={searchItem}/>
                    <button className="btn btn-primary" >Search</button>
                    </div>
                  </form>
                  </li> 
                  <li><button className="btn btn-dark" onClick={handleLogout}>Logout</button></li>
            </ul>
        </div>
    </div>
  </div>
  </div>
  <main>
    <Outlet />
    {location.pathname === '/searchProduct' && <SearchFood searchResult={searchResult} />}
  </main>
  </>
  )
}
 export default UserNav