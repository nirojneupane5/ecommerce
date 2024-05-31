import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
const DisplayAllUser = () => {
    const navigate=useNavigate();
    const [user,setUser]=useState([]);

    useEffect(()=>{
        const fetchUser=async()=>{
            const url="http://localhost:4000/api/hawa/displayAllUser";
            const response=await fetch(url);
            const json=await response.json();
            if(response.ok){
                setUser(json);
            }
        }
        fetchUser();
    })

    const handleDelete=async(id)=>{
        const url=`http://localhost:4000/api/hawa/deleteUser/${id}`;
        const response=await fetch(url,{
            method:'DELETE'
        })
        if(response.ok){
            setUser(prevUser=>prevUser.filter(user=>user._id!==id));
        }
    }
    const handleUpdate=async(id)=>{
           navigate(`/updateUser/${id}`);
    }
  return (
    <div className="container">
        <table className="table">
            <thead>
                <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Gender</th>
                <th scope="col">Contact</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {user && user.map((info)=> info.role==='customer'?(
                    <tr key={info._id}>
                        <td>{info.fname}</td>
                        <td>{info.lname}</td>
                        <td>{info.email}</td>
                        <td>{info.gender}</td>
                        <td>{info.contact}</td>
                        <td><button className="btn btn-danger mx-3" onClick={()=>{handleDelete(info._id)}}>Delete</button>
                        <button className="btn btn-primary" onClick={()=>{handleUpdate(info._id)}}>Update</button>
                        </td>
                    </tr>
                ):null)}
            </tbody>
        </table>
    </div>
  )
}
export default DisplayAllUser;