import AuthContext from "./AuthContext";
import { useState, useEffect } from "react";

const AuthContextProvider=({children})=>{
    const[authenticated,setAuthenticated]=useState('');
    const[role,setRole]=useState('');
    const[userId,setUserId]=useState('');
    const[fname,setFname]=useState('');
    const[lname,setLname]=useState('');
    const[contact,setContact]=useState('');
    const[address,setAddress]=useState('');
    const[email,setEmail]=useState('');
    const[error,setError]=useState('');
    
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const token=localStorage.getItem('token');
                const url=`http://localhost:4000/api/hawa/checkLogin`;
                const response=await fetch(url,{
                    headers:{
                        'Content-type':'application/json',
                        Authorization:token
                    }
                })
                const data=await response.json();
                if(response.ok){
                    setAuthenticated(true);
                    setRole(data.userRole)
                    setUserId(data.userId);
                    setFname(data.fname);
                    setLname(data.lname);
                    setAddress(data.address);
                    setContact(data.contact);
                    setEmail(data.email);
                }else{
                    setAuthenticated(false);
                }

            }catch(error){
                setError(error.message);
            }
        }
        fetchData();
    },[authenticated]);

    return(
        <AuthContext.Provider value={{role,authenticated,error,setAuthenticated,userId,fname,contact,address,email,lname}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;