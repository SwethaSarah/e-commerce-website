import React, {useEffect, useState} from'react';
import {detailProduct} from '../actions/productActions';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../actions/cartActions';

function ProductScreen(props){
  
    const productDetail = useSelector(state => state.productDetail);
    const [qty,setQty] = useState(1);
    const [productId,setPId] = useState(props.match.params.id);
    const { product,loading,error}=productDetail;
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const dispatch = useDispatch();

    useEffect(() =>{
      dispatch(detailProduct(props.match.params.id));
      return () =>{
        //
      };
    },[]);

    const addToCartHandler = () => {
      dispatch(addItem({productId,qty}));
    }

    return( loading? <div>Loading...</div>:
        error? <div>{error}</div>:
        (
        <div className="detail-product">
          <div className="detail-img">
          <img src={product.img!=undefined&&"data:"+product.img.contentType+";base64,"+ 
                    (new Buffer(product.img.data).toString('base64'))} alt="product"></img>
          <div className="product-name">{product.name}</div>
          <div className="product-brand">Brand: {product.brand}</div>
          <div className="product-price">Price: ₹{product.price}</div>
          <br></br>
        </div>
        <div className="info">
        <div className="product-desc">
        <h3>Description: </h3>
        <br></br>
        <p>{product. description}</p>
        </div>
        <br></br>
        {
            product.countAvailable>0?<div><h4>Status : <span className ="instock">In Stock</span></h4>
            </div>: <div><h4>Status : <span className ="outofstock">Out of Stock</span></h4></div>
        }
        <br></br>
        </div>
        <div className="addtocart">
          <ul>
          {
            product.countAvailable>0?<div>
            <li>Quantity : <select value= {qty} onChange={(e)=>{setQty(e.target.value)}}>
          {[...Array(product.countAvailable).keys()].map(x=>
            <option key={x+1} value={x+1}>{x+1}</option>
          )}
            </select>
            </li>
            <br></br>
            <li>{userInfo?
            <button className="primaryBtn" onClick = {addToCartHandler} >Add to cart</button>:<p>Sign in to access cart</p>}</li>
            </div>: <li></li>
            }
            </ul>
        </div>
         </div>
        )
    )}
export default ProductScreen;