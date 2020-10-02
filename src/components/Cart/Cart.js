import React from 'react';
import './Cart.css';

const Cart = (props) => {
  const cart = props.cart;
  const totalPrice = cart.reduce(
    (total, prd) => (total + prd.price) * prd.quantity || 1,
    0
  );

  let shipping = 0;

  if (totalPrice > 40) {
    shipping = 0;
  } else if (totalPrice > 15) {
    shipping = 7.99;
  } else if (totalPrice > 0 && totalPrice < 15) {
    shipping = 12.99;
  }

  const tax = (totalPrice / 10).toFixed(2);
  const grandTotal = (totalPrice + shipping + Number(tax)).toFixed(2);
  return (
    <div>
      <h3>Order Summary</h3>
      <p>Items Ordered {cart.length}</p>
      <p>Product Price {totalPrice.toFixed(2)}</p>
      <p>Shipping cost {shipping}</p>
      <p>Tax + VAT {tax}</p>
      <p>Total Price {grandTotal}</p>
      {props.children}
    </div>
  );
};

export default Cart;
