import React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { deleteItem, cartItems } from '../actions/cartActions';
import { placeOrder } from '../actions/orderActions';

function CartScreen(props){
    
    const  cartList= useSelector(state => state.cartList);
    const {loading,error,products} = cartList;

    const removeItemHandler = async (itemId) =>{
        await dispatch(deleteItem(itemId));
        await dispatch(cartItems());
    }

    function checkoutHandler(e){
        var item = [];
        var i;
        for (i=0; i<products.length; i++){
            item.push({"productId": "","productName": "","qty": 0, "deliveryStatus": "Not delivered"});
        }
        for ( i = 0; i < products.length; i++) {
            item[i].productId = products[i]._id;
            item[i].productName = products[i].productName;
            item[i].qty = products[i].qty;
            item[i].deliveryStatus = "Not delivered";
        }
        e.preventDefault();
        dispatch(placeOrder(item));
    }

    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(cartItems());
    },[])

    return loading? <div>Loading...</div>:
    error? <div>{error}</div>: 
    <div>
    <h1>Shopping cart</h1>
    <div className="Products-container">
            <ul className = "cart-list-container">
            <div className="cart-list">
            { products&&
            products.length ===0 ?
            <div>Empty</div>
            :
            products.map( item =>
                <div className="cartItems" key= {item._id}>
                    <img src={item.productImage!=undefined&&"data:"+item.productImage.contentType+";base64,"+ 
                    (new Buffer(item.productImage.data).toString('base64'))} width="200" height="200" alt="img"></img>
                    <div className="desc">
                    <div className="ItemDes">
                    <label>{item.productName}</label>
                    <label>Qty: {item.qty}</label>
                    <li>₹{item.productPrice} per product</li>
                    </div>
                    <div class="actions">
                        <button className="actionBtn" onClick= {() => removeItemHandler(item._id)}>Delete</button>
                    </div>
                    </div>
                </div>
            )
            }
            </div>
            </ul>
        <div className="cart-action">
            <h3>Subtotal ({products.reduce((a, c)=> a+c.qty,0)} items)
            :
        Rs.{products.reduce((a, c) => a+c.productPrice*c.qty,0)}</h3>
        <button type='submit' className="primaryBtn" onClick={checkoutHandler}>Place Order</button>
        </div>
        </div>
    </div>
}
export default CartScreen;