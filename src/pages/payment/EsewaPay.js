import React, { useState } from 'react';
import axios from 'axios';

const EsewaPay = () => {
  const [paymentURl, setPaymentURL] = useState(null);

  const handlePayment = async () => {
    const data = {
      amt: '100',
      pdc: '0',
      psc: '0',
      txAmt: '0',
      tAmt: '100',
      pid: 'ee2c3ca1-696b-4cc5-a6be-2c40d929d453',
      scd: 'EPAYTEST',
      su: 'http://localhost:3000',
      fu: 'http://localhost:3000/failure'
    };

    try {
      const response = await axios.post(
        "https://uat.esewa.com.np/epay/main",
        data
      );
      setPaymentURL(response.data.payment_url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <button className="btn btn-primary my-2" onClick={handlePayment}>
        Pay with eSewa
      </button>
      {paymentURl && (
        <a href={paymentURl} target="_blank" rel="noopener noreferrer">
          Click here to complete payment
        </a>
      )}
    </div>
  );
};

export default EsewaPay;
