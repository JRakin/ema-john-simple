import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  getDatabaseCart,
  removeFromDatabaseCart,
  processOrder,
} from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const Review = () => {
  const [cart, setCart] = useState([]);
  const history = useHistory();

  const handleRemoveProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  const handlePlaceOrder = () => {
    history.push('/shipment');
  };

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    // console.log(productKeys);
    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);

  return (
    <div
      className="twin-container"
      style={{ margin: '10px auto', width: '70%' }}
    >
      <div className="product-container">
        {cart.map((pd) => (
          <ReviewItem
            product={pd}
            key={pd.key}
            handleRemoveProduct={handleRemoveProduct}
          ></ReviewItem>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button className="main-btn" onClick={handlePlaceOrder}>
            <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon> Proceed
            Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
