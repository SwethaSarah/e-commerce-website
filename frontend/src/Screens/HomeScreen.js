import React, { useState, useEffect } from'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {listProducts} from '../actions/productActions';
import { useSelector, useDispatch } from 'react-redux';

function HomeScreen(props){
  
  const productList = useSelector(state => state.productList);
  const {products,loading,error}=productList
  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(listProducts());
    return () =>{
      //
    };
  },[]);

  return (loading? <div>Loading...</div>:
  error? <div>{error}</div>:
  <div>
  <ul className="products">
  { products.map(product =>
    <li>
    <div className="product" key={product._id}>
      <Link to={"/products/" + product._id}>
      <img src={"data:"+product.img.contentType+";base64,"+ 
                      (new Buffer(product.img.data).toString('base64'))} alt="product"></img></Link>
      <div className="product-description">
      <div className="product-name">
          <Link className="product-name" to={"/products/" + product._id}><p>{product.name}</p></Link>
      </div>
      <div className="product-brand">{product.brand}</div>
      <div className="product-price">₹{product.price}</div>
    </div>
    </div>
    </li>)
  }
  </ul>
  </div>)
}

export default HomeScreen;