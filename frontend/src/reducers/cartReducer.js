import{
    CART_LIST_SUCCESS,
    CART_LIST_REQUEST,
    CART_LIST_FAIL,
    ITEM_SAVE_REQUEST,
    ITEM_SAVE_SUCCESS,
    ITEM_SAVE_FAIL,
    ITEM_DELETE_FAIL,
    ITEM_DELETE_SUCCESS,
    ITEM_DELETE_REQUEST
    } from '../constants/cartconstants';

function cartListReducer(state= {products:[]},action){
    switch (action.type){
        case CART_LIST_REQUEST:
            return {loading:true, products: []};
        case CART_LIST_SUCCESS:
            return {loading:false,products: action.payload};
        case CART_LIST_FAIL:
            return {loading:false, error: action.payload};
        default:
            return state;
    }
}

function itemSaveReducer(state = {product: {}},action){
    switch(action.type){
        case ITEM_SAVE_REQUEST:
            return {loading: true};
        case ITEM_SAVE_SUCCESS:
            return { loading: false, success: true, product: action.payload};
        case ITEM_SAVE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function itemDeleteReducer(state = {product: {}},action){
    switch(action.type){
        case ITEM_DELETE_REQUEST:
            return {loading: true};
        case ITEM_DELETE_SUCCESS:
            return { loading: false, success: true, product: action.payload};
        case ITEM_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export { cartListReducer,itemSaveReducer,itemDeleteReducer};