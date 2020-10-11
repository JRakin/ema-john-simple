import React, { useState, useEffect } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {
  addToDatabaseCart,
  getDatabaseCart,
} from '../../utilities/databaseManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Shop = () => {
  // const first10 = fakeData.slice(0, 10);
  const [products, setProduct] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:4000/products')
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
        });
    };
    fetchData();
  }, []);

  console.log(products);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    const fetchData = () => {
      fetch('http://localhost:4000/productsByKeys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productKeys),
      })
        .then((res) => res.json())
        .then((data) => setCart(data));
    };
    fetchData();
  }, []);

  const handleAddProduct = (product) => {
    const toBeAddedKey = product.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };

  return (
    <div className="twin-container">
      <div className="product-container">
        {products.map((pd, index) => (
          <Product
            showAddToCart={true}
            handleAddProduct={handleAddProduct}
            product={pd}
            key={pd.key + '' + index}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="main-btn">
              <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon> Review
              Order
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
