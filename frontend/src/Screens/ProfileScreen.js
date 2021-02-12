import { updateProfile } from "../actions/userActions";
import {useDispatch, useSelector} from 'react-redux';
import React , { useState, useEffect } from "react";
import {detailUser} from '../actions/userActions';

function ProfileScreen(props){
  
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const userDetail = useSelector(state => state.userDetail);
    const {loading,error,payload}=userDetail;
    const dispatch=useDispatch();
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [phno,setPhno]=useState("");
    const [password,setPassword]=useState("");
    const [address,setAddress]=useState("");
    const [hidden,setHidden] = useState(false);
    const [edit,setEdit]= useState(true);

    const disableReadonly = (e) =>{
      if(edit){
        setEdit(false);
        setName(payload.name);
        setPhno(payload.phoneno);
        setEmail(payload.email);
        setAddress(payload.address);
        document.getElementById("name").setAttribute("PlaceHolder","");
        document.getElementById("address").setAttribute("PlaceHolder","");
      }
      else{
        setEdit(true);
      }
    }

    const submitHandler = async (e) =>{
        e.preventDefault();
        if(edit){
          await dispatch(updateProfile({name,email,address,phno}));
          await dispatch(detailUser(userInfo._id));
        }
    }

    useEffect(() =>{
        dispatch(detailUser(userInfo._id));
        return () =>{
        };
      },[]);

    return (loading? <div>Loading...</div>:
      error? <div>{error}</div>:(
    <div>
            <h1>Profile</h1>
        <form className="ProfileForm" onSubmit={submitHandler}>
          {payload &&
          <div>
            <table className="center">
              <tbody>
              <tr>
                <td>Name</td>
                <td><input className="placeHolder" type="text" name="name" id="name" readOnly={edit} value={name} placeholder={payload.name} onChange={(e) => setName(e.target.value)}></input></td>
              </tr>
              <tr>
                <td>Email</td>
                <td><input className="placeHolder" type="email" name="email" id="email" readOnly={edit} value={email} placeholder={payload.email} onChange={(e) => setEmail(e.target.value)}></input></td>
              </tr>
              <tr>
                <td>Phone.No</td>
                <td><input className="placeHolder" type="number" pattern="\d{3}[\-]\d{3}[\-]\d{4}" name="phno" id="phno" readOnly={edit} value={phno} placeholder={payload.phoneno!=undefined?payload.phoneno:"-"} onChange={(e) => setPhno(e.target.value)}></input></td>
              </tr>
              <tr>
                <td>Address</td>
                <td><textarea className="placeHolder" name="address" id="address" readOnly={edit} placeholder={payload.address} value={address} onChange={(e) => setAddress(e.target.value)}></textarea></td>
              </tr>
              </tbody>
        </table>
       <button className="primaryBtn" onClick={()=>disableReadonly()}>{edit?"Edit":"Update"}</button>
        </div>
        }
        </form>
    </div>))

}

export default ProfileScreen;
