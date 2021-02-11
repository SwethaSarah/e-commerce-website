import {
    ORDER_LIST_SUCCESS,
    ORDER_LIST_REQUEST,
    ORDER_LIST_FAIL,
    PLACE_ORDER_REQUEST,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_FAIL,
    CANCEL_ORDER_REQUEST,
    CANCEL_ORDER_SUCCESS,
    CANCEL_ORDER_FAIL,
    CHANGE_STATUS_FAIL,
    CHANGE_STATUS_REQUEST,
    CHANGE_STATUS_SUCCESS,
    ORDERS_REQUEST,
    ORDERS_SUCCESS,
    ORDERS_FAIL
    } from '../constants/orderconstants';

function orderListReducer(state= {orders:[]},action){
    switch (action.type){
        case ORDER_LIST_REQUEST:
            return {loading:true, orders: []};
        case ORDER_LIST_SUCCESS:
            return {loading:false,orders: action.payload};
        case ORDER_LIST_FAIL:
            return {loading:false, error: action.payload};
        default:
            return state;
    }
}

function userOrdersReducer(state= {orders:[]},action){
    switch (action.type){
        case ORDERS_REQUEST:
            return {loading:true, orders: []};
        case ORDERS_SUCCESS:
            return {loading:false,orders: action.payload};
        case ORDERS_FAIL:
            return {loading:false, error: action.payload};
        default:
            return state;
    }
}

function placeOrderReducer(state = {order: []},action){
    switch(action.type){
        case PLACE_ORDER_REQUEST:
            return {loading: true};
        case PLACE_ORDER_SUCCESS:
            return { loading: false, success: true, order: action.payload};
        case PLACE_ORDER_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function cancelOrderReducer(state = {order: []},action){
    switch(action.type){
        case CANCEL_ORDER_REQUEST:
            return {loading: true};
        case CANCEL_ORDER_SUCCESS:
            return { loading: false, success: true, order: action.payload};
        case CANCEL_ORDER_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function changeStatusReducer(state = {order: {}},action){
    switch(action.type){
        case CHANGE_STATUS_REQUEST:
            return {loading: true};
        case CHANGE_STATUS_SUCCESS:
            return { loading: false, success: true, order: action.payload};
        case CHANGE_STATUS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export { orderListReducer, placeOrderReducer,cancelOrderReducer, changeStatusReducer, userOrdersReducer};