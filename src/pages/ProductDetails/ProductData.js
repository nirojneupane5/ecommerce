import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/CartSlice';
import { useNavigate, useParams } from 'react-router-dom';
import DisplayStar from '../Rating/DisplayStar';
import Star from '../Rating/Star';
const ProductData = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { authenticated, setAuthenticated, userId, fname, lname } = useContext(AuthContext);
    const [ratingInfo, setRatingInfo] = useState([]);
    const [cartInfo, setCartInfo] = useState([]);
    const [error, setError] = useState("");
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [quantity, setQuantity] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [filename, setFilename] = useState('');

    useEffect(() => {
        const fetchFood = async () => {
            const url = `http://localhost:4000/api/hawa/displayFood/${id}`;
            const response = await fetch(url);
            const data = await response.json();
            if (response.ok) {
                setName(data.name)
                setPrice(data.price)
                setDescription(data.description)
                setImage(data.filename)
                setFilename(data.filename)
                setQuantity(data.quantity)
            }
        }
        fetchFood();
    }, [id]);

    const fetchCart = async () => {
        const url = "http://localhost:4000/api/hawa/displayAllCart";
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            setCartInfo(data)
        }
    }

    //Display all cart
    useEffect(() => {
        fetchCart();
    }, []);
    //Fetch review
    const fetchReview = async () => {
        const url = "http://localhost:4000/api/hawa/displayReview";
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            setRatingInfo(data);

        }
    };
    useEffect(() => {

        fetchReview();
    }, [])
    const handleCart = async (food) => {
        fetchCart();
        const foodId = id;
        const quantity = "1";
        const itemExists = cartInfo.some((item) => item.foodId === foodId && item.userId===userId);
        if (!itemExists) {
            dispatch(addToCart({ foodId, name, price }));
            const cartItem = { name, description, price, quantity, userId, foodId,filename }
            const url = "http://localhost:4000/api/hawa/addCart";
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(cartItem),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json();
            if (!response.ok) {
                setError(json.error)
            } else {
                window.alert("Item added to cart");
                setAuthenticated(true);
                navigate('/displayCart')
            }
        } else {
            window.alert("Product already exists in cart");
            navigate('/displayCart')
        }
    }

    const handleClick = () => {
        if (!authenticated) {
            window.alert("Plase login to add your cart");
            navigate('/login')
        } else {
            window.alert("Product is out of stock")
        }

    }

    const courseRatings = ratingInfo.filter((info) => info.productId === id);
    const totalRating = courseRatings.reduce((sum, info) => sum + info.rating, 0);
    const averageRating = courseRatings.length > 0 ? totalRating / courseRatings.length : 0;
    const handleSubmit = async (e) => {
        if(authenticated){
            const existsRating=ratingInfo.some((item)=>item.userId===userId && item.productId===id);
        if(!existsRating){
            e.preventDefault();
        const productId = id;
        const userData = { userId, fname, lname, productId, rating, comment };
        const url = 'http://localhost:4000/api/hawa/addReview';
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }
        else {
            setRating(0);
            setComment('');
            fetchReview();
        }
        }else{
            window.alert("You have already give review on this product")
        }
        }else{
            window.alert("Please login to add review")
            navigate('/login')
        }  
    }
    return (
        <div className="container">
            <div className="card">
                <div className="row">
                    <div className="col-md-5">
                        <img src={`http://localhost:4000/ItemImage/${image}`} width="400px" height="300px" alt="" />
                    </div>
                    <div className="col-md-7">
                        <h3>Product name: {name}</h3>
                        <div className="d-flex">
                            <DisplayStar star={averageRating} />
                            <p className='mx-5'>{courseRatings.length} Ratings</p>
                        </div>
                        <p><strong>Price: Rs {price}</strong></p>
                        <p>
                            <strong >
                                {quantity > 0 ? (
                                    <div className='text-success'> Stock remaining: {quantity}</div>
                                ) : (
                                    <div className='text-danger'>Stock Remaining: Out of stock</div>
                                )}
                            </strong>
                        </p>
                        <div className="d-flex">
                            {authenticated && quantity > 0 ? (
                                <button className="btn btn-primary" onClick={handleCart}>Add to cart</button>
                            ) : (
                                <button className="btn btn-primary" onClick={handleClick}>Add to cart</button>
                            )
                            }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <p>{description}</p>
                </div>
                <div className='row'>
                    <h5>Add your product review</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="rating">
                            <Star stars={rating} onStarClick={setRating} />
                        </div>
                        <textarea
                            placeholder="Review"
                            style={{ width: '300px' }}
                            className="form-control"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button className="btn btn-primary mt-2">Submit Review</button>
                    </form>
                </div>
                <div className="row">
                    {ratingInfo &&ratingInfo.map((info)=>info.productId===id?(
                        <div key={info._id}>
                            <p>{info.fname} {info.lname}: {info.comment}</p>
                        </div>
                    ):null)}
                </div>
            </div>
            {error && <div>{error}</div>}
        </div>
    );
};


export default ProductData;