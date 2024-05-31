import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

 const DisplayFood = () => {
  const [product, setProduct] = useState([]);
  const navigate=useNavigate();
  const handleClick=(id)=>{
    navigate(`/updateFood/${id}`);
  }
  useEffect(() => {
    const fetchFoods = async () => {
        const url = "http://localhost:4000/api/hawa/displayFood";
        const response = await fetch(url);
        const data = await response.json();
        if(response.ok){
          setProduct(data)
        }
    }      
    fetchFoods();
  }, []);

  
  const handleDelete=async(_id)=>{
    const url=`http://localhost:4000/api/hawa/deleteFood/${_id}`;
    const response=await fetch(url,{
        method:'DELETE'
    })
    if(response.ok){
      setProduct(prevFoods=>prevFoods.filter(food=>food._id!==_id))
    }
  }
  return (
    <div className='container'>
        <div className="row">
            {product && product.map((info)=>(
              <div className="col-md-4" key={info._id}>
               <div className="card">
               <img src={`http://localhost:4000/ItemImage/${info.filename}`} width="400px" height="300px" alt="" />
               <h3>Product Name: {info.name}</h3>
               <h3>Price: {info.price}</h3>
              <div className="d-flex">
              <butoon className="btn btn-primary mx-2" onClick={()=>{handleDelete(info._id)}} >Delete</butoon>
               <butoon className="btn btn-primary" onClick={()=>{handleClick(info._id)}} >Update</butoon>
              </div>
              </div>
              </div>
            ))}
          </div>
        
    </div>
   
  )
}

export default DisplayFood
