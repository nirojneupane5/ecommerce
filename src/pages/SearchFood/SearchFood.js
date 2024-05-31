import React,{useContext,useEffect,useState} from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DisplayStar from '../Rating/DisplayStar';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/CartSlice';
const SearchFood = ({ searchResult }) => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {userId,authenticated,setAuthenticated}=useContext(AuthContext);
  const[error,setError]=useState('');
  const [ratingInfo, setRatingInfo] = useState([]);
  const [cartInfo, setCartInfo] = useState([]);
  // Check if searchResult is defined and not null

  useEffect(() => {
    const fetchFoods = async () => {
        const url = "http://localhost:4000/api/hawa/displayAllCart";
        const response = await fetch(url);
        const data = await response.json();
        if(response.ok){
          setCartInfo(data)
        }
    }      
    fetchFoods();
  }, []);
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
  if (!searchResult) {
    return (
      <div className="container">
        <div className="row">
          {
            searchResult &&<div>No result Found</div>
          }
          
        </div>
      </div>
    );
  }
  const handleCart=async(food)=>{
    const foodId=food._id;
    const name=food.name;
    const description=food.description;
    const price=food.price;
    const quantity="1";
    if(!cartInfo.foodId===foodId){
      dispatch(addToCart({foodId,name,price}));
    const cartItem={name,description,price,quantity,userId,foodId}
    const url="http://localhost:4000/api/hawa/addCart";
    const response=await fetch(url,{
      method:'POST',
      body:JSON.stringify(cartItem),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const json=await response.json();
    if(!response.ok){
      setError(json.error)
    }else{
      window.alert("Item added to cart");
      setAuthenticated(true);
      navigate('/displayCart')
    }
    }else{
      window.alert("Product already exists in cart");
    }
  }
  const handleClick=()=>{
    window.alert("Plase login to add your cart");
  }
  const handleDetails=(id)=>{
    navigate(`/productDetails/${id}`)
  }

  const length = searchResult.length;
 
  return (
    <div className="container">
    <div className="row">
      {length > 0 ? (
        searchResult.map((food) => {
          const courseRatings = ratingInfo.filter((info) => info.productId === food._id);
          // Calculate average rating for the current course
          const totalRating = courseRatings.reduce((sum, info) => sum + info.rating, 0);

          const averageRating = courseRatings.length > 0 ? totalRating / courseRatings.length : 0;
          return (
            <div className="col-md-4" key={food._id}>
              <div className='card my-2' style={{ border: '2px solid black' }}>
                <img src={`http://localhost:4000/ItemImage/${food.filename}`} width="400px" height="300px" alt="" />
                <h3 className='mx-2'>Product Name: {food.name}</h3>
                <strong className='mx-2'>Price: Rs {food.price}</strong>
                <strong className='mx-2'>Stock remaining: {food.quantity}</strong>
                <div className="d-flex">
                  <div key={food._id}>
                    <DisplayStar star={averageRating} />
                  </div>
                  <p className='mx-5'>Reviews: {courseRatings.length}</p>
                  </div>
                <div style={{ display: 'flex' }}>
                  <button className="btn btn-primary mx-2" style={{ width: '150px' }} onClick={() => { handleDetails(food._id) }}>View Details</button>
                  {authenticated ? (
                    <button className="btn btn-success mx-2" style={{ width: '150px' }} onClick={() => { handleCart(food) }}>Add Cart</button>
                  ) : (
                    <button className="btn btn-success mx-2" style={{ width: '150px' }} onClick={handleClick}>Add Cart</button>
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>No result found</div>
      )}
    </div>
    {error && <div>{error}</div>}
  </div>
  );
};

export default SearchFood;
