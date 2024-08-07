import React, { useState } from 'react'
import '../css/register-login.css'
import { useForm } from 'react-hook-form';

import { FaFacebookF } from "react-icons/fa6";
import { FaRegUser, FaGoogle } from "react-icons/fa";
import { TfiLock } from "react-icons/tfi";
import { LuEye, LuEyeOff, LuPhone  } from "react-icons/lu";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';

export default function Login() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [passEye, setPassEye] = useState({ password: false, confirm: false });

  function iconChanging(input) {
    setPassEye(prevState => ({ ...prevState, [input]: !prevState[input] }));
  }

  const onSubmit = (data) => {
    console.log(data);
  };
  
  return (
    <div className='register-page container'>
        <div className="top">
          <h1>Login</h1> 
          <div className="follow">
            <h5>With</h5> | 
            <div className="social">
              <FaGoogle />
              <FaFacebookF />
            </div>
          </div>
        </div>
      <form onSubmit={handleSubmit(onSubmit)}>
{/* Email / Name */}
        <div className='inputHolder'>
          <div className="holder">
            <FaRegUser />
            <input
              type="text"
              {...register("fullName", {
                required: "Please enter your full name",
                minLength: {
                  value: 5,
                  message: "Full name must be at least 5 characters long"
                }
              })}
              placeholder="Enter Username or Email"
              style={{ borderColor: errors.fullName ? 'red' : 'black' }}
            />
          </div>
          {errors.fullName && (
            <span>
              <AiOutlineExclamationCircle />
              {errors.fullName.message}
            </span>
          )}
        </div>
{/* Password */}
        <div className='inputHolder password'>
          <div className="holder">
            <TfiLock />
            {passEye.password === true ? (
              <LuEye className='eye' onClick={() => iconChanging("password")} />
            ) : (
              <LuEyeOff className='eye' onClick={() => iconChanging("password")} />
            )}
            <input
              type={passEye.password === true ? "text" : "password"}
              {...register("password", {
                required: "Please enter a password",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long"
                }
              })}
              placeholder="Enter password"
              style={{ borderColor: errors.password ? 'red' : 'black' }}
            />
          </div>
          {errors.password && (
            <span>
              <AiOutlineExclamationCircle />
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="btns">
          <button className='main-button' type="submit">Login</button>
          <Link to='/register' className='main-button'>Register</Link>
        </div>
        <Link to='/forget' className='forget'>Forget Your Password?</Link>
      </form>
    </div>
  )
}
