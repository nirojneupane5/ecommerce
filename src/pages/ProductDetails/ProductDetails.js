import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Star from '../Rating/Star';
 const ProductDetails = () => {
    const[name,setName]=useState('');
    const[price,setPrice]=useState('');
    const[description,setDescription]=useState('');
    const[image,setImage]=useState('');
    const[rating,setRating]=useState(0);
    const[error,setError]=useState('');
    const[comment,setComment]=useState('');
    const{id}=useParams();
    const productId=id;

    useEffect(() => {
        const fetchFood = async () => {
            const url = `http://localhost:4000/api/hawa/displayFood/${id}`;
            const response = await fetch(url);
            const data = await response.json();
            if(response.ok){
              setName(data.name)
              setPrice(data.price)
              setDescription(data.description)
              setImage(data.filename)
            }
        }      
        fetchFood();
      }, [id]);
      const handleSubmit=async(e)=>{
        e.preventDefault();
        const userData= {productId,rating,comment};
        const  url= 'http://localhost:4000/api/hawa/addReview';
        const response= await fetch(url, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        const json= await response.json();

        if(!response.ok){
            setError(json.error);
        }
        else{
            setRating(0);
            setComment('');
        }
      }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
        <h3>Product name: {name}</h3>
      <p>Description: {description}</p>
      <strong>Price: Rs {price}</strong>
        
        {error && <div>{error}</div>}
        </div>
        <div className="col-md-4">
        <img src={`http://localhost:4000/ItemImage/${image}`} width="400px" height="300px" alt="" />
        </div>
        <div className="col-md-4">
        <form onSubmit={handleSubmit}>
            <p>Rating:</p><br/>
            <Star stars={rating} onStarClick={setRating} /><br/>
            <textarea placeholder="Review" value={comment} onChange={(e) => setComment(e.target.value)}/><br/>
            <button className="btn btn-primary">Submit Review</button>
        </form>
        </div>
      </div>
    </div>
  )
}
export default ProductDetails;