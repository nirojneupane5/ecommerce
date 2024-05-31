import React,{useState,useEffect} from 'react'

export const DisplayReview = () => {
  const [ratingInfo,setRatingInfo]=useState([]);
  useEffect(() => {
    const fetchFoods = async () => {
      const url = "http://localhost:4000/api/hawa/displayReview";
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setRatingInfo(data)
      }
    }
    fetchFoods();
  }, []);

  return (
    <div>
  <table className="table">
  <thead>
    <tr>
      <th scope="col">First name</th>
      <th scope="col">Last name</th>
      <th scope="col">Rating</th>
      <th scope="col">Comment</th>
    </tr>
  </thead>
  <tbody>
    {ratingInfo && ratingInfo.map((info)=>(
      <tr key={info._id}>
        <td>{info.fname}</td>
        <td>{info.lname}</td>
        <td>{info.rating}</td>
        <td>{info.comment}</td>
      </tr>
    ))}
  </tbody>
  </table>
      </div>
  )
}
