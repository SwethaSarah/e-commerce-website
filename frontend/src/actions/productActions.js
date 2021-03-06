import {PRODUCT_LIST_SUCCESS, PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_SUCCESS, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_REQUEST} from '../constants/productconstants';
import Axios from 'axios';

const listProducts = () => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_LIST_REQUEST});
        const {data} = await Axios.get("/api/products");
        console.log("homescreen",data);
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
}
const detailProduct = (productId) => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_DETAIL_REQUEST,payload: productId});
        const {data} = await Axios.get("/api/products/"+ productId);
        dispatch({type: PRODUCT_DETAIL_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: PRODUCT_DETAIL_FAIL, payload: error.message});
    }
}

const saveProduct = (product) => async (dispatch,getState) =>{
    try{
        dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product});
        const {userSignin: {userInfo} } = getState();
        const {data} = await Axios.post('/api/products',product,{
            headers:{
                'Authorization': 'Bearer '+ userInfo.token
            }
        });
        dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: PRODUCT_SAVE_FAIL, payload: error.message});
    }
}
const deleteProduct = (product) => async (dispatch,getState) =>{
    try{
        dispatch({ type: PRODUCT_DELETE_REQUEST, payload: product});
        const {userSignin: {userInfo} } = getState();
        const {data} = await Axios.post('/api/products/'+product,{
            headers:{
                'Authorization': 'Bearer '+ userInfo.token
            }
        });
        dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: PRODUCT_DELETE_FAIL, payload: error.message});
    }
}


export { listProducts, detailProduct, saveProduct, deleteProduct};
