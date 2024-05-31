import React,{useState} from 'react'
import './Dashboard.css';
import DisplayAllUser from '../../pages/User/DisplayAllUser';
import ViewProductPurchase from '../../pages/Product/ViewProductPurchase';
import Home from '../../pages/Home';
import { DisplayReview } from '../../pages/Rating/DisplayReview';
import { BsFillInfoCircleFill,BsFillBasket3Fill,BsPeopleFill } from "react-icons/bs";

const AdminDashboard = () => {
  const[categoryData,setCategoryData]=useState('Home')
  const handleClick=(category)=>{
    setCategoryData(category === 'Info' ? 'Home' : category);
  }
  return (
    <div className="container-fluid" id='main'>
        <div className="row">
        <div className="col-md-2 align-item-center" id='admin-sidebar'>
        <button className="btn btn-primary  w-100 border-0" id='admin-button'onClick={()=>handleClick('Home')}>
         <BsFillInfoCircleFill/> Info</button>
          <button className="btn btn-primary  w-100 border-0" id='admin-button'onClick={()=>handleClick('Customer')}>
           <BsPeopleFill/>View Customer</button>
           <button className="btn btn-primary  w-100 border-0" id='admin-button'onClick={()=>handleClick('Product')}>
           <BsFillBasket3Fill/>Product purchase</button>
           <button className="btn btn-primary  w-100 border-0" id='admin-button'onClick={()=>handleClick('Review')}>
           <BsFillBasket3Fill/>Display review</button>
        </div>
        <div className="col-md-10" id='body'>
          {categoryData && (
            <>
             <div>{categoryData==='Customer' && <DisplayAllUser/>}</div>
             <div>{categoryData==='Product' && <ViewProductPurchase/>}</div>
             <div>{categoryData==='Review' && <DisplayReview/>}</div>
             <div>{categoryData === 'Home' && <Home />}</div>
            </>
          )}
        </div>
        </div>
    </div>
  )
}
export default AdminDashboard;