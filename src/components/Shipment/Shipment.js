import React, { useState } from 'react';
import './Shipment.css';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import Swal from 'sweetalert2';
import ProcessPayment from '../ProcessPayment/ProcessPayment';

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const { register, handleSubmit, errors } = useForm();
  const [shippingData, setShippingData] = useState(null);

  const onSubmit = (data) => {
    setShippingData(data);
  };

  const handlePaymentSuccess = (paymentId) => {
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
      paymentId: paymentId,
      shipment: shippingData,
      productsOrdered: savedCart,
      placed: new Date(),
    };

    fetch('http://localhost:4000/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          processOrder();
          Swal.fire('Congrats', 'Your order placed successfully', 'success');
        }
      });
  };

  // console.log(watch('example')); // watch input value by passing the name of it
  return (
    <div className="row">
      <div
        style={{ display: shippingData ? 'none' : 'block' }}
        className="col-md-6"
      >
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            name="name"
            defaultValue={loggedInUser.name}
            ref={register({ required: true })}
            placeholder="Your Name"
          />
          {errors.name && <span className="error">Name is required</span>}
          <input
            name="email"
            defaultValue={loggedInUser.email}
            ref={register({ required: true })}
            placeholder="Your Email"
          />
          {errors.email && <span className="error">Email is required</span>}
          <input
            name="address"
            ref={register({ required: true })}
            placeholder="Address"
          />
          {errors.address && <span className="error">Address is required</span>}
          <input
            name="phone"
            ref={register({ required: true })}
            placeholder="Your Phone Number"
          />
          {errors.phone && <span className="error">Phone is required</span>}
          <input style={{ cursor: 'pointer' }} type="submit" />
        </form>
      </div>
      <div
        style={{ display: shippingData ? 'block' : 'none' }}
        className="col-md-6"
      >
        <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
      </div>
    </div>
  );
};

export default Shipment;
