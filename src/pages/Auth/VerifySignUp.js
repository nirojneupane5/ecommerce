import React,{useState,useEffect} from 'react';
import { useNavigate,useParams } from 'react-router-dom';

 const VerifySignUp = () => {
    const {id}=useParams();
    const navigate=useNavigate();
    const[otp,setOTP]=useState('');
    const[email,setEmail]=useState('');
    const[hashPassword,setHashPassword]=useState('');
    const[fname,setFName]=useState('');
    const[lname,setLName]=useState('');
    const[address,setAddress]=useState('');
    const[contact,setContact]=useState('');
    const[gender,setGender]=useState('');
    const[error,setError]=useState('');
    const[optInfo,setOTPInfo]=useState('');

    useEffect(()=>{
        const fetchUser=async()=>{
            const url=`http://localhost:4000/api/hawa/displayPendingUser/${id}`;
            const response=await fetch(url);
            const data=await response.json();
            if(response.ok){
                setEmail(data.email);
                setFName(data.fname);
                setHashPassword(data.hashPassword);
                setLName(data.lname);
                setAddress(data.address);
                setContact(data.contact);
                setGender(data.gender);
                const optInfoString = String(data.otp);
                setOTPInfo(optInfoString);
            }
        }
        fetchUser();
    },[id])
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(otp);
        console.log(optInfo);
        try{
            if(otp===optInfo){
                const userData={fname,lname,email,hashPassword,address,contact,gender};
                const url='http://localhost:4000/api/hawa//signUp';
                const response=await fetch(url,{
                  method:'POST',
                  body:JSON.stringify(userData),
                  headers:{
                    'Content-Type':'application/json'
                  }
                });
                const json=await response.json();
                if(!response.ok){
                  setError(json.error);
                }
                
                }else{
                    setError("Invalid OTP");
                }
        }catch(error){
            console.log(error);
        }
        if(otp===optInfo){
                const url=`http://localhost:4000/api/hawa/deletePendingUser/${id}`;
                const response=await fetch(url,{
                    method:'DELETE'
                })
                const json=await response.json();
                if(response.ok){
                    console.log(json,'SignUp successfull');
                    setOTP('');
                    navigate('/logIn')
                }
        }
      }
  return (
    <div className="container">
    <form onSubmit={handleSubmit} >
    <label>OTP</label><br/>
    <input type="text" onChange={(e)=>{setOTP(e.target.value)}} value={otp}/><br/>
    <button className="btn btn-primary">Submit</button>
    </form>
   {error && <div className='text-danger'>{error}</div>}
    </div>
    
    
  )
}
export default VerifySignUp;