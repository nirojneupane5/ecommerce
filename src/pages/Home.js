import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DisplayStar from './Rating/DisplayStar';
const Home = () => {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [ratingInfo, setRatingInfo] = useState([]);
  useEffect(() => {
    const fetchFoods = async () => {
      const url = "http://localhost:4000/api/hawa/displayFood";
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setFoods(data)
      }
    }
    fetchFoods();
  }, []);
  
  //Display review
  useEffect(() => {
    const fetchReview = async () => {
      const url = "http://localhost:4000/api/hawa/displayReview";
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setRatingInfo(data);

      }
    };
    fetchReview();
  }, [])
  
  const handleDetails = (id) => {
    navigate(`/productDetail/${id}`)
  }
  
  return (
    <div className="container">
      <div className="row">
        {foods.map((food) => {
          const courseRatings = ratingInfo.filter((info) => info.productId === food._id);
          // Calculate average rating for the current course
          const totalRating = courseRatings.reduce((sum, info) => sum + info.rating, 0);

          const averageRating = courseRatings.length > 0 ? totalRating / courseRatings.length : 0;
          return (
            <div className="col-md-4" key={food._id}>
              <div className='card my-2' style={{ border: '2px solid black' }} id='homeCard'>
                <img src={`http://localhost:4000/ItemImage/${food.filename}`} width="413px" height="300px" alt="" />
                <h3 className='mx-2'>Product Name: {food.name}</h3>
                <strong className='mx-2'>Price: Rs {food.price}</strong>
                <strong className='mx-2'>
                  {food.quantity > 0 ? (
                   <div className='text-success'> Stock : In Stock</div>
                  ) : (
                    <div className='text-danger'>Stock: Out of stock</div>
                  )}
                </strong>
                <div className="d-flex">
                  <div key={food._id}>
                    <DisplayStar star={averageRating} />
                  </div>
                  <p className='mx-5'>Reviews: {courseRatings.length}</p>
                </div>
                  <button className="btn btn-primary" onClick={()=>{handleDetails(food._id)}} id='btn-2' style={{width:'100px'}}>Shop now</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default Home;