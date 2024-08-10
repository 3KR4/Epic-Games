import React, { useState } from 'react'
import '../css/register-login.css'
import axios from 'axios';
import { useForm } from 'react-hook-form';

import { FaFacebookF } from "react-icons/fa6";
import { FaRegUser, FaGoogle } from "react-icons/fa";
import { TfiLock } from "react-icons/tfi";
import { LuEye, LuEyeOff, LuPhone  } from "react-icons/lu";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { MdOutlineEmail } from "react-icons/md";

export default function Login() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [passEye, setPassEye] = useState({ password: false, confirm: false });

  function iconChanging(input) {
    setPassEye(prevState => ({ ...prevState, [input]: !prevState[input] }));
  }

  const onSubmit = (data) => {
    const userData = {
      identifier: data.email,
      password: data.password
    }
    
  
    axios.post('https://game-ecommrece-backend.onrender.com/api/users', userData, {
      headers: {
        Authorization: 'Bearer 38131a58665509f5b3bd487c8493a70529d7821830d17f12016633eaf7021c8427fc373ab642d3420378c780aa0169b27731ddb61628c5c2d9a563694a610e92b7288c25a1b5059981682388060fb0fd50c8fc87972c86d80a5e6f5d58cefbcc60934535e49971ff5c34db9589e2ed99e2a3eb5fd6b1bb6647be8684760c9aeb'
      }
    })
    .then(response => {
      console.log(response.data);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('token', '38131a58665509f5b3bd487c8493a70529d7821830d17f12016633eaf7021c8427fc373ab642d3420378c780aa0169b27731ddb61628c5c2d9a563694a610e92b7288c25a1b5059981682388060fb0fd50c8fc87972c86d80a5e6f5d58cefbcc60934535e49971ff5c34db9589e2ed99e2a3eb5fd6b1bb6647be8684760c9aeb');
      window.location.href = '/home';
    })
    .catch(error => {
      console.log(error);
    });
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
          <MdOutlineEmail />
          <input
            type="email"
            {...register("email", {
              required: "enter your email address",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address"
              }
            })}
            placeholder="Enter Your Email Address"
            style={{ borderColor: errors.email ? 'red' : 'black' }}
          />
          </div>
          {errors.email && (
            <span>
              <AiOutlineExclamationCircle />
              {errors.email.message}
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
