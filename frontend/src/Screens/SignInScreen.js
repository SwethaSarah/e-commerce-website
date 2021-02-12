import React, {useEffect, useState} from'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn } from '../actions/userActions';

function SignInScreen(props){

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const {loading, userInfo, error} = userSignin;
    const dispatch = useDispatch();

    const submitHandler = (e) =>{
      e.preventDefault();
      dispatch(signIn(email,password));
    }

    useEffect(() =>{
      if(userInfo){
        props.history.push("/");
      }
      return () =>{
        console.log("u",userInfo);
      };
    },[userInfo]);

    return <div className="form">
        <h1>Sign In</h1>
        <form className="signinForm" onSubmit = {submitHandler}>
          {loading?<div>Loading</div>:<div></div>}
          {error?<div>{error}</div>:<div></div>}
          <input type="email" name="email" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
          <input type="password" name="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
          <div>
          <button className="primaryBtn" name="signIn">Sign In</button>
          </div>
          <label>New user?</label>
          <Link to="/register">
          <button type="submit" className="secondaryBtn" name="newUser">Create Account</button></Link>
        </form>
        </div>
}

export default SignInScreen;
