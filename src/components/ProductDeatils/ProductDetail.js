import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import './ProductDetail.css';

const ProductDetail = () => {
  const { productKey } = useParams();
  const [product, setProduct] = useState({});
  // const product = fakeData.find((pd) => pd.key === productKey);
  // console.log(product);

  useEffect(() => {
    fetch(`http://localhost:4000/product/${productKey}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data[0]);
      });
  }, [productKey]);

  return (
    <div className="product-detail">
      <h1>Your product detail</h1>
      <Product showAddToCart={false} product={product}></Product>
    </div>
  );
};

export default ProductDetail;
