import {
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_DETAIL_REQUEST,
    USER_DETAIL_FAIL,
    USER_DETAIL_SUCCESS,
    USER_SIGNOUT
    } from '../constants/userconstants';

function userSignInReducer(state={user:{}},action){
    switch (action.type){
        case USER_SIGNIN_REQUEST:
            return {loading:true};
        case USER_SIGNIN_SUCCESS:
            return {loading:false, userInfo: action.payload};
        case USER_SIGNIN_FAIL:
            return {loading:false, error: action.payload};
        case USER_SIGNOUT:
            return {};
        default:
            return state;
    }
}
function userRegisterReducer(state= {user:[]},action){
    switch (action.type){
        case USER_REGISTER_REQUEST:
            return {loading:true};
        case USER_REGISTER_SUCCESS:
            return {loading:false, userInfo: action.payload};
        case USER_REGISTER_FAIL:
            return {loading:false, error: action.payload};
        default:
            return state;
    }
}
function userUpdateReducer(state= {user:{}},action){
    switch (action.type){
        case USER_UPDATE_REQUEST:
            return {loading:true};
        case USER_UPDATE_SUCCESS:
            return {loading:false, payload: action.payload};
        case USER_UPDATE_FAIL:
            return {loading:false, error: action.payload};
        default:
            return state;
    }
}
function userDetailReducer(state= {user:{}},action){
    switch (action.type){
        case USER_DETAIL_REQUEST:
            return {loading:true};
        case USER_DETAIL_SUCCESS:
            return {loading:false, payload: action.payload};
        case USER_DETAIL_FAIL:
            return {loading:false, error: action.payload};
        default:
            return state;
    }
}
export { userSignInReducer , userRegisterReducer,userUpdateReducer,userDetailReducer};