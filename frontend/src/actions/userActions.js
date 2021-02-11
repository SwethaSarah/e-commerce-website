import {USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,USER_DETAIL_REQUEST,USER_DETAIL_SUCCESS,USER_DETAIL_FAIL, USER_SIGNOUT} from '../constants/userconstants';
import Axios from 'axios';

const signIn = (email,password) => async (dispatch) =>{
    try{
        dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}});
        const {data} = await Axios.post("/api/users/signin",{email, password});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    catch(error){
        dispatch({type: USER_SIGNIN_FAIL, payload: console.error.message });
    }
}

const register = (name,email,address,password) => async (dispatch) =>{
    try{
        dispatch({type: USER_REGISTER_REQUEST, payload: {name, email,address, password}});
        const {data} = await Axios.post("/api/users/register",{name,email,address, password});
        dispatch({type: USER_REGISTER_SUCCESS, payload: {name, email,address, password}});
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    catch(error){
        dispatch({type: USER_REGISTER_FAIL, payload: error.message });
    }
}

const signOut = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_SIGNOUT });
};

const detailUser = (userId) => async (dispatch,getState) => {
    try{
        dispatch({type: USER_DETAIL_REQUEST,payload: userId});
        const {userSignin: {userInfo} } = getState();
        const {data} = await Axios.get("api/users/profile/"+userId,{
            headers:{
                'Authorization': 'Bearer '+ userInfo.token
            }
        });
        dispatch({type: USER_DETAIL_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: USER_DETAIL_FAIL, payload: error.message});
    }
}
const updateProfile = (name,email,address) => async (dispatch,getState) =>{
    try{
        dispatch({ type: USER_UPDATE_REQUEST, payload: {name,email,address}});
        const {userSignin: {userInfo} } = getState();
        const {data} = await Axios.post('/api/users/profile',{name,email,address},{
            headers:{
                'Authorization': 'Bearer '+ userInfo.token
            }
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
        dispatch({type: USER_UPDATE_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: USER_UPDATE_FAIL, payload: error.message});
    }
}


export {signIn, register, updateProfile, detailUser, signOut};
