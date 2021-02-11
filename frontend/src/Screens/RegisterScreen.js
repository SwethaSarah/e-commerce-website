import React, {useEffect, useState} from'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';

function RegisterScreen(props){

    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [address,setAddress] = useState('');
    const [password,setPassword] = useState('');
    const [repassword,setRePassword] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const {loading, userInfo, error} = userRegister;
    const dispatch = useDispatch();


    const submitHandler = (e) =>{
      e.preventDefault();
      if(password===repassword){
      dispatch(register(name,email,address,password));
      }
      else{
        window.alert("Password do not match");
      }
    }

    useEffect(() =>{
      if(userInfo){
        props.history.push("/");
      }
      return () =>{
        //
      };
    },[userInfo]);

    return <div className="form">
        <form onSubmit = {submitHandler}>
          <input type="text" name="name" id="name" placeholder="Name" onChange={(e) => setName(e.target.value)}></input>
          <input type="email" name="email" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
          <textarea type="text" name="address" id="addresss" placeholder="Address" cols="45" rows="5" onChange={(e) => setAddress(e.target.value)}></textarea>
          <input type="password" name="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
          <input type="password" name="repassword" id="repassword" placeholder="Re-enter Password" onChange={(e) => setRePassword(e.target.value)}></input>
          <button type="submit" className="primaryBtn" name="signIn">Register</button>
          <label>Already have an account?</label>
          <Link to="/signin">
          <button className="secondaryBtn">Sign In</button></Link>
        </form>
        </div>
}

export default RegisterScreen;