import React,{useEffect,useState} from 'react'

 const ViewProductPurchase = () => {
    const [product,setProduct]=useState([]);
    useEffect(()=>{
        const fetchUser=async()=>{
            const url="http://localhost:4000/api/hawa/displayPayment";
            const response=await fetch(url);
            const json=await response.json();
            if(response.ok){
                const userProduct=json.filter((item)=>item.status==="success");
                if(userProduct){
                    setProduct(userProduct);
                }
            }
        }
        fetchUser();
    })
  return (
    <div className="container">
        <table className="table">
            <thead>
                <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Product Id</th>
                <th scope="col">Product Name</th>
                <th scope="col">Price </th>
                <th scope="col">Quanity</th>
                </tr>
            </thead>
            <tbody>
                {product && product.map((info)=> (
                    <tr key={info._id}>
                        <td>{info.fname}</td>
                        <td>{info.lname}</td>
                        <td>{info.productId}</td>
                        <td>{info.productName}</td>
                        <td>{info.productPrice}</td>
                        <td>{info.quantity}</td>
                        
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
export default ViewProductPurchase;