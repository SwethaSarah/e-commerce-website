import { CART_LIST_SUCCESS, CART_LIST_REQUEST, CART_LIST_FAIL, ITEM_SAVE_REQUEST, ITEM_SAVE_SUCCESS, ITEM_SAVE_FAIL, ITEM_DELETE_REQUEST, ITEM_DELETE_SUCCESS, ITEM_DELETE_FAIL} from '../constants/cartconstants';
import Axios from 'axios';

const cartItems = () => async (dispatch,getState) => {
    try{
        dispatch({type: CART_LIST_REQUEST});
        const {userSignin: {userInfo} } = getState();
        const {data} = await Axios.get("/api/cart/"+userInfo._id,{
            headers:{
                'Authorization': 'Bearer '+ userInfo.token
            }
        });
        dispatch({type: CART_LIST_SUCCESS, payload: data});
    }
    catch (error){
        dispatch({type: CART_LIST_FAIL, payload: error.message});
    }
}

const addItem = (ItemInfo) => async (dispatch,getState) =>{
    try{
        dispatch({ type: ITEM_SAVE_REQUEST, payload: ItemInfo},);
        const {userSignin: {userInfo} } = getState();
        const {data} = await Axios.post('/api/cart/'+userInfo._id,ItemInfo,{
            headers:{
                'Authorization': 'Bearer '+ userInfo.token
            }
        });
        dispatch({type: ITEM_SAVE_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: ITEM_SAVE_FAIL, payload: error.message});
    }
}
const deleteItem = (itemId) => async (dispatch,getState) =>{
    try{
        dispatch({ type: ITEM_DELETE_REQUEST});
        const {userSignin: {userInfo} } = getState();
        const {data} = await Axios.post('/api/cart/'+userInfo._id+"/"+itemId,{
            headers:{
                'Authorization': 'Bearer '+ userInfo.token
            }
        });
        dispatch({type: ITEM_DELETE_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: ITEM_DELETE_FAIL, payload: error.message});
    }
}


export { cartItems, addItem, deleteItem};