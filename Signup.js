import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import { handleSuccess,handleError } from "../utils";


function Signup(){
    const [userInfo,setUserInfo]=useState({
    name:'',
    email:'',
    password:''
})


const handleChange=(e)=>{
    const {name,value}=e.target;
    console.log(name,value);
    const copySignupInfo={...userInfo};
    copySignupInfo[name]=value;
    setUserInfo(copySignupInfo);
}

console.log('LoginInfo ->',userInfo);

const navigate=useNavigate();

const handleSignup=async(e)=>{
    e.preventDefault();
    const {name,email,password}=userInfo;
    if(!name||!email||!password){
        return handleError('name,email and password required');
    }
    try{
        const url="http://localhost:8080/auth/signup";
        const response=await fetch(url,{
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        const result=await response.json();
        const{message,success}=result;
        if(success){
            handleSuccess(message);
            setTimeout(()=>{
                navigate('/login')
            },2000)
        }
        else{
            handleError(message);
        }
        console.log(result);
    }catch(error){
        handleError(error);
    }
}

    return(
        <div className="Log_box">
            <section className="sign_head" id="sign_head">
                <span className="write">Signup</span>
            </section>
            <form onSubmit={handleSignup}>
                <div className="det_box" id="deet_box">
                    <span className="write_1">Name</span>
                    <input onChange={handleChange} className="name" id="name" name="name" autoFocus placeholder="Enter the name"/>
                    <span className="write_1" id="write">Email</span>
                    <input onChange={handleChange} type="email" className="Email" id="Email" name="email" placeholder="Enter your email-id"/>
                    <span className="write_1" id="write">Password</span>
                    <input onChange={handleChange} type="password" className="password" id="password" name="password" placeholder="Enter Your Password"/>
                    <button type="submit" className="sub_but"><span className="but_wr">Signup</span></button>
                    <div className="log">
                        <span className="write_2">Already have an account? </span>
                        <Link to="/Login">Login</Link>
                    </div>
                </div>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default Signup;