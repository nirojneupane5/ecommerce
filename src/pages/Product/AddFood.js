import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './AddProduct.css'
const AddFood = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
       if(price>10000){
        setError("Price of the product must be less than 10000");
       }else{
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);
        formData.append('quantity', quantity);
        formData.append('category', category);

        const response = await fetch('http://localhost:4000/api/hawa/AddFood', {
            method: 'POST',
            body: formData
        });

        const json = await response.json();
        if (!response.ok) {
            const { errors } = json;
            setError(errors.join(', '));
        }
        else {
            setName('');
            setDescription('');
            setPrice('');
            setQuantity('');
            window.alert("Product added successfully");
            navigate('/');
        }

       }
    }
    return (
        <>
            <div className='container'>
                <div className="card">
                    <div className="d-flex justify-content-center">
                        <h1>Add Product</h1>
                    </div>
                    <div className="d-flex justify-content-center">
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex">
                                <input type="text" className='form-control mx-3' placeholder='Name' onChange={(e) => { setName(e.target.value) }} value={name} />
                                <input type="text" className='form-control' placeholder='Price' onChange={(e) => { setPrice(e.target.value) }} value={price} />
                            </div>
                            <br />
                            <label>Description</label><br />
                            <textarea className='form-control' style={{width:'600px',height:'200px'}}  onChange={(e) => { setDescription(e.target.value);  }} value={description}  ></textarea>
                            <br />
                            <div className="d-flex">
                            <input type="text" className='form-control mx-3' placeholder='Quantity' onChange={(e) => { setQuantity(e.target.value) }} value={quantity} />
                            <select value={category} onChange={(e) => { setCategory(e.target.value); }} style={{ width: '300px' }}>
                                    <option value="" disabled>Select Category</option>
                                    <option value="dairy">Dairy product</option>
                                </select><br />
                            </div>
                            <label><h6>Add Image</h6></label>
                            <input type="file" style={{ width: '300px' }} className='form-control' onChange={(e) => { setImage(e.target.files[0]) }} /><br />
                            <button class="custom-btn btn-1">Add Product</button>
                        </form>
                    </div>
                   <div className="d-flex justify-content-center">
                   {error && <div className='text-danger'>{error}</div>}
                   </div>
                </div>
            </div>
        </>
    )
}

export default AddFood