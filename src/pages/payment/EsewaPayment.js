import React from 'react';

 const EsewaPayment = () => {
    const data={
        amt:'100',
        pdc:'0',
        psc:'0',
        txAmt: '0',
        tAmt:'100',
        pid:'ee2c3ca1-696b-4cc5-a6be-2c40d929d453',
        scd:'EPAYTEST',
        su:'http://localhost:3000',
        fu:'http://localhost:3000/faliure'
    }
    const handlePayment=async()=>{
        const paymentUrl = 'https://uat.esewa.com.np/epay/main';
        const queryString = Object.keys(data)
      .map((key) => `${key}=${encodeURIComponent(data[key])}`)
      .join('&');
    window.open(`${paymentUrl}?${queryString}`, '_blank');
    }
  return (
    <div className="container">
        <button className="btn btn-primary" onClick={handlePayment}>
         Pay
        </button>
    </div>
    
  )
}
export default EsewaPayment;