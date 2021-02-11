import React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { cancelOrder, userOrder } from '../actions/orderActions';

function OrderScreen(props){
    const  userOrderList = useSelector(state => state.userOrder);
    const {loading,error,orders} = userOrderList;
    const [Id,setID] = useState('');
    const dispatch = useDispatch();
    
    const deleteHandler = async(e) =>{
        e.preventDefault();
        await dispatch(cancelOrder(Id));
        await dispatch(userOrder());
      }

    useEffect(() =>{
        dispatch(userOrder());
    },[])

    return loading? <div>Loading...</div>:
    error? <div>{"Sign in to order"}</div>: <div >
            <h1>Your Orders</h1>
            <div className="Order-table">
            { orders&&
            orders.length ===0 ?
            <div>Empty</div>
            :
            <table>
            <tbody>
            <tr>
              <th>Order Id</th>
              <th>Product Id</th>
              <th>Product Name</th>
              <th>Qty</th>
              <th>Status</th>
              <th colSpan="2">Actions</th>
            </tr>
              {
              orders.map(order =>(
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.productsOrdered.map(item =>(
                      <div key={item.productId}>{item.productId}</div>
                  ))}</td>
                  <td>{order.productsOrdered.map(item =>(
                      <div key={item.productId}>{item.productName}</div>
                  ))}</td>
                  <td>{order.productsOrdered.map(item =>(
                      <div key={item.productId}>{item.qty}</div>
                  ))}</td>
                  <td>{order.productsOrdered.map(item =>(
                      <div key={item.productId}>{item.deliveryStatus}</div>
                  ))}</td>
                  <td><form className="deleteForm" onSubmit={deleteHandler}>
                    <button className= "actionBtn" type="submit" onClick={()=>setID(order._id)}>Cancel</button>
                    </form></td>
                </tr>
              ))}
              </tbody>
            </table>
            }
            </div>
        </div>
}
export default OrderScreen;