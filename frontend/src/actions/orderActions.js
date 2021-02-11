import { CANCEL_ORDER_FAIL, CANCEL_ORDER_REQUEST, CANCEL_ORDER_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS, CHANGE_STATUS_REQUEST,CHANGE_STATUS_SUCCESS,CHANGE_STATUS_FAIL,ORDERS_REQUEST, ORDERS_SUCCESS, ORDERS_FAIL } from '../constants/orderconstants';
import Axios from 'axios';

const orderList = () => async (dispatch,getState) => {
    try{
        dispatch({type: ORDER_LIST_REQUEST});
        const {userSignin: {userInfo} } = getState();
        const {data} = await Axios.get("/api/order",{
            headers:{
                'Authorization': 'Bearer '+ userInfo.token
            }
        });
        dispatch({type: ORDER_LIST_SUCCESS, payload: data});
    }
    catch (error){
        dispatch({type: ORDER_LIST_FAIL, payload: error.message});
    }
}

const userOrder = () => async (dispatch,getState) => {
    try{
        dispatch({type: ORDERS_REQUEST});
        const {userSignin: {userInfo} } = getState();
        const {data} = await Axios.get("/api/order/"+userInfo._id,{
            headers:{
                'Authorization': 'Bearer '+ userInfo.token
            }
        });
        dispatch({type: ORDERS_SUCCESS, payload: data});
    }
    catch (error){
        dispatch({type: ORDERS_FAIL, payload: error.message});
    }
}

const placeOrder = (product) => async (dispatch,getState) =>{
    try{
        dispatch({ type: PLACE_ORDER_REQUEST, payload: product});
        const {userSignin: {userInfo} } = getState();
        const {data} = await Axios.post('/api/order',{product, userInfo},{
            headers:{
                'Authorization': 'Bearer '+ userInfo.token
            }
        });
        dispatch({type: PLACE_ORDER_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: PLACE_ORDER_FAIL, payload: error.message});
    }
}
const cancelOrder = (orderId) => async (dispatch,getState) =>{
    try{
        dispatch({ type: CANCEL_ORDER_REQUEST, payload: orderId});
        const {userSignin: {userInfo} } = getState();
        const {data} = await Axios.post('/api/order/delete/'+orderId,{
            headers:{
                'Authorization': 'Bearer '+ userInfo.token
            }
        });
        dispatch({type: CANCEL_ORDER_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: CANCEL_ORDER_FAIL, payload: error.message});
    }
}
const changeStatus = (product) => async (dispatch,getState) =>{
    try{
        dispatch({ type: CHANGE_STATUS_REQUEST, payload: product});
        const {userSignin: {userInfo} } = getState();
        const {data} = await Axios.post('/api/order/changeStatus/'+product,{
            headers:{
                'Authorization': 'Bearer '+ userInfo.token
            }
        });
        dispatch({type: CHANGE_STATUS_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: CHANGE_STATUS_FAIL, payload: error.message});
    }
}


export { placeOrder, cancelOrder, orderList, changeStatus, userOrder};