import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
  const { img, name, seller, price, stock, key } = props.product;
  return (
    <div className="product">
      <div>
        <img src={img} alt="" />
      </div>
      <div className="product-details">
        <h4 className="product-name">
          <Link to={'/product/' + key}>{name}</Link>
        </h4>
        <br />
        <p>
          <small>
            By: <span>{seller}</span>
          </small>
        </p>
        <p>${price}</p>
        <p>
          <small>Only {stock} left in stock - Order soon</small>
        </p>
        {props.showAddToCart && (
          <button
            className="main-btn"
            onClick={() => props.handleAddProduct(props.product)}
          >
            <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon> Add to
            cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
