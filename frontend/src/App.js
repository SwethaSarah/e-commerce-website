import React from 'react';
import './App.css';
import {useDispatch, useSelector} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import { signOut } from './actions/userActions';
import ProductScreen from './Screens/ProductScreen';
import HomeScreen from './Screens/HomeScreen';
import CartScreen from './Screens/CartScreen';
import SignInScreen from './Screens/SignInScreen';
import RegisterScreen from './Screens/RegisterScreen';
import AddProductScreen from './Screens/AddProductScreen';
import ProfileScreen  from './Screens/ProfileScreen';
import OrdersScreen  from './Screens/ManageOrdersScreen';
import OrderScreen  from './Screens/OrderScreen';

function App() {

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const dispatch = useDispatch();

    const signoutHandler = () => {
      dispatch(signOut());
    };
    return (
      <BrowserRouter>
      <div className="grid-container">
      <header className="header">
          <div className="brand">
          <Link to="/">Shopline</Link>
          </div>
          <div className="nav-links">
          <div>{userInfo&&<Link to="/cart">Cart</Link>}</div>
              <div className="dropdown">
              {
                userInfo ? 
                <div><a>{userInfo.name}</a>
                <div className="dropdown-content">
                <Link to={"/profile"}><p>Profile</p></Link>
                {userInfo.isAdmin&&<Link to={"/ManageProducts"}><p>Dashboard</p></Link>}
                {userInfo.isAdmin&&<Link to={"/ManageOrders"}><p>Orders</p></Link>}
                <Link to={"/orders"}><p>Your Orders</p></Link>
                <Link to={"/"}onClick={signoutHandler}><p>Sign Out</p></Link>
                </div>
                </div>
                :
                <Link to="/signin">Sign In</Link>
              }        
              </div>
          </div>
      </header>
      <main className="main">
          <div className="content">
            <Route path="/profile" component={ProfileScreen}></Route>
            <Route path="/signin" component={SignInScreen}></Route>
            {userInfo!=null&& userInfo.isAdmin&&<Route path="/ManageProducts" component={AddProductScreen}></Route>}
            {userInfo!=null&& userInfo.isAdmin&&<Route path="/ManageOrders" component={OrdersScreen}></Route>}
            <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/" exact={true} component={HomeScreen}></Route>
        <Route path="/products/:id" component={ProductScreen}></Route>
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/orders" component={OrderScreen}></Route>
          </div>
      </main>
      <footer className="footer">
          All rights reserved.
      </footer>
      </div>
      </BrowserRouter>
    );
}

export default App;
