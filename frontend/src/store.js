import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {productListReducer, productDetailReducer, productSaveReducer, productDeleteReducer} from './reducers/productReducer';
import { userSignInReducer, userRegisterReducer, userUpdateReducer, userDetailReducer } from './reducers/userReducers';
import { cartListReducer, itemSaveReducer, itemDeleteReducer } from './reducers/cartReducer';
import { cancelOrderReducer, changeStatusReducer, orderListReducer, placeOrderReducer, userOrdersReducer } from './reducers/orderReducer';
import thunk from 'redux-thunk';

const initialState = {
    userSignin: {
      userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
}}
const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cartList: cartListReducer,
    addItem: itemSaveReducer,
    deleteItem: itemDeleteReducer,
    userSignin: userSignInReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    userDetail: userDetailReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    orderList: orderListReducer,
    placeOrder: placeOrderReducer,
    cancelOrder: cancelOrderReducer,
    changeStatus: changeStatusReducer,
    userOrder: userOrdersReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;