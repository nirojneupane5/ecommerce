import React,{useState} from 'react'
import { NavLink,Outlet,useNavigate,useLocation } from 'react-router-dom'
import SearchFood from '../../pages/SearchFood/SearchFood';
 const GuestNav = () => {
  const navigate=useNavigate();
    const location=useLocation();
  const [searchItem,setSearchItem]=useState('');
    const [searchResult,setSearchResult]=useState([]);

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
  return (
    <>
    <div className="nav">
    <div className="container">
    <div className="row">
        <div className="col-md-6" id="logo">
           <h3>Dairy management system </h3>
        </div>
        <div className="col-md-6">
            <ul id="list">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/signUp">SignUp</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li> 
                <li>
                  <form onSubmit={handleSubmit}>
                    <div className="d-flex">
                    <input type="text" className='form-control' placeholder='search'
                    onChange={(e)=>setSearchItem(e.target.value)} value={searchItem}/>
                    <button className="btn btn-primary" >Search</button>
                    </div>
                  </form>
                  </li> 
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

export default GuestNav
