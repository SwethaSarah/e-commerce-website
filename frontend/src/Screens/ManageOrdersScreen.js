import React, {useEffect, useState} from'react';
import { useSelector, useDispatch } from 'react-redux';
import { orderList, changeStatus } from '../actions/orderActions';


function OrdersScreen(props){
  
    const  listOrder= useSelector(state => state.orderList);
    const {loading, orders, error} = listOrder;
    const dispatch = useDispatch();
    const [Id,setID] = useState('');

    const statusHandler = async(e) =>{
      e.preventDefault();
      await dispatch(changeStatus(Id));
      await dispatch(orderList());
    }


    useEffect(() =>{
      dispatch(orderList());
      return () =>{
        //
      };
    },[]);

    return <div>
    <div className="Order-table">
    <h1>Orders Dashboard</h1>
      {loading?<div>Loading</div>:
      error?<div>{error}</div>:orders?
        <table>
          <tbody>
            <tr>
              <th>Order ID</th>
              <th>Cust Name</th>
              <th>Cust Address</th>
              <th>Products</th>
              <th>Qty</th>
              <th>Status</th>
              <th colSpan="2">Actions</th>
            </tr>
              {
              orders.map(order =>(
                <tr key={order._id}>
                  <td><p>{order._id}</p></td>
                  <td>{order.user.userName}</td>
                  <td>{order.user.userAddress}</td>
                  <td>{order.productsOrdered.map(item =>(
                      <div>{item.productId}</div>
                  ))}</td>
                  <td>{order.productsOrdered.map(item =>(
                      <div>{item.qty}</div>
                  ))}</td>
                  <td>{order.productsOrdered.map(item =>(
                      <div>{item.deliveryStatus}</div>
                  ))}</td>
                    <td><form className="deleteForm" onSubmit={statusHandler}>
                    <button className= "actionBtn" type="submit" onClick={()=>setID(order._id)}>Mark as deliverd</button>
                    </form></td>
                </tr>
              ))}
              </tbody>
          </table>:<div></div>
        }
    </div>
    </div>
}

export default OrdersScreen;