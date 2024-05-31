import React, { useEffect, useState, useContext,useRef } from 'react';
import AuthContext from '../../context/AuthContext';
import ReactToPrint from 'react-to-print';

const SuccessPage = () => {
  const { userId, setAuthenticated,fname,lname } = useContext(AuthContext);
  const [paymentIds, setPaymentIds] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [bill, setBill] = useState([]);
  
  const componentRef = useRef(null);
 
  useEffect(() => {
    const url = `http://localhost:4000/api/hawa/displayPayment`;
    const displayPayment = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          setAuthenticated(true);
          const data = await response.json();
         
          const userPayments = data.filter(item => item.userId === userId && item.status==="pending");
          if(userPayments){
            setBill(userPayments);
          }
          const ids = userPayments.map(payment => payment._id);
          setPaymentIds(ids);
          const quantitiesP = userPayments.map((payment) => ({
            productId: payment.productId,
            quantity: payment.quantity,
          }));
          setQuantities(quantitiesP);
          
        } else {
          // Handle error if response is not OK
          console.error('Error fetching payment data');
        }
      } catch (error) {
        console.error('Error fetching payment data:', error);
      }
    };
    displayPayment();
  }, [setAuthenticated, userId]);

  useEffect(() => {
    if (paymentIds.length > 0) {
      const status = 'success';
      const updatePayments = async () => {
        try {
          const updatePromises = paymentIds.map(id => {
            const url = `http://localhost:4000/api/hawa/updatePayment/${id}`;
            return fetch(url, {
              method: 'PATCH',
              body: JSON.stringify({ status }),
              headers: {
                'Content-Type': 'application/json',
              },
            });
          });

          const responses = await Promise.all(updatePromises);
          const results = await Promise.all(responses.map(response => response.json()));

          results.forEach((result, index) => {
            if (responses[index].ok) {
              console.log(`Payment ${paymentIds[index]} status updated to success`, result);
            } else {
              console.error(`Error updating payment ${paymentIds[index]} status`);
            }
          });
        } catch (error) {
          console.error('Error updating payment status:', error);
        }
      };
      updatePayments();
      const updateQuantity = async () => {
        const updatePromises = quantities.map((quantityItem) => {
          const { productId, quantity } = quantityItem;
          const id=productId
          const url = `http://localhost:4000/api/hawa/updateFoodQuantity/${id}`;
          return fetch(url, {
            method: 'PATCH',
            body: JSON.stringify({ quantity }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
        });
      
        const responses = await Promise.all(updatePromises);
        const results = await Promise.all(responses.map(response => response.json()));
      
        results.forEach((result, index) => {
          if (responses[index].ok) {
            console.log(`Product ${quantities[index].productId} quantity updated to ${quantities[index].quantity}`, result);
          } else {
            console.error(`Error updating product ${quantities[index].productId} quantity`);
          }
        });
      };
      
      // Call the updateQuantity function
      updateQuantity();
      const deleteCart = async () => {
        const updatePromises = quantities.map((quantityItem) => {
          const { productId } = quantityItem;
          const id=productId
          const url = `http://localhost:4000/api/hawa/deleteCartItem/${id}`;
          return fetch(url, {
            method: 'DELETE',
          });
        });
      
        const responses = await Promise.all(updatePromises);
        const results = await Promise.all(responses.map(response => response.json()));
      
        results.forEach((result, index) => {
          if (responses[index].ok) {
            console.log(`Product ${quantities[index].productId} quantity updated to ${quantities[index].quantity}`, result);
          } else {
            console.error(`Error updating product ${quantities[index].productId} quantity`);
          }
        });
      };
      
      // Call the updateQuantity function
      deleteCart();
      
    }
  }, [paymentIds,quantities]);

 
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <>
   <ReactToPrint
  trigger={() => {
    return <button>Print Bill</button>;
  }}
  content={() => componentRef.current}
  documentTitle="new document"
  pageStyle="print"
/>

     <div className="row text-center"><h1>Payment successful</h1></div>
       <div className="container" ref={componentRef}>
        {bill && bill.map((info)=>(
          <div className="row">
          <div className="card" style={{border:'2px solid black'}}>
          <div className="border-top-2"></div>
            <div className="row">
              <div className="col mx-2"><b>Bill no: {info._id}</b></div>
              <div className="col" style={{ textAlign: 'right', marginRight:'100px' }}>
              <b>Date: {currentDate}</b>
              </div>
            </div>
            <div className="row">
              <div className="col  text-center">
              <b>Dairy management system</b><br />
              <b>Dadhikot, Bhaktapur</b>
              </div>
            </div>
            <div className="row"  style={{borderBottom:'2px solid black'}}>
              <div className="col mx-2">
                <b>Name :{fname} {lname}</b><br />
                <b>Product: {info.productName}</b><br />
              </div>
            </div>
            <div className="row" >
            <div className="col text-center" style={{borderRight:'2px solid black'}}>
              <b>SN</b><br />
              <b>1</b>
            </div>
            <div className="col text-center" style={{borderRight:'2px solid black'}}>
              <b>Particulars(Product Name)</b><br />
              <b>{info.productName}</b>
            </div>
            <div className="col text-center">
              <b>Amount(Rs)</b><br />
              <b>{info.productPrice}</b>
            </div>
          </div>
         <div>
         <div className="row" style={{borderTop:'2px solid black'}}>
            <div className="col" style={{ textAlign: 'right', marginRight:'165px' }} >
              <b>Grand Total:Rs {info.productPrice} </b>
            </div>
          </div>
         </div>
        </div>
        </div> 
        ))}
       </div>
    </>
  );
};


export default SuccessPage;