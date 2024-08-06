import React, { useState } from 'react'
import '../css/register-login.css'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { FaRegUser, FaGoogle } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { LuEye, LuEyeOff, LuPhone  } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa6";
import { TfiLock } from "react-icons/tfi";

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password", "");

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
          <h1>Register</h1> 
          <div className="follow">
            <h5>With</h5> | 
            <div className="social">
              <FaGoogle />
              <FaFacebookF />
            </div>
          </div>
        </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='rowHolder'>
{/* Name */}
          <div className='inputHolder'>
            <div className="holder">
              <FaRegUser />
              <input
                type="text"
                {...register("userName", {
                  required: "Please enter your username",
                  minLength: {
                    value: 3,
                    message: "user name must be at least 3 characters"
                  }
                })}
                placeholder="Your User Name"
                style={{ borderColor: errors.userName ? 'red' : 'black' }}
              />
            </div>
            {errors.userName && (
              <span>
                <AiOutlineExclamationCircle />
                {errors.userName.message}
              </span>
            )}
          </div>
{/* Phone */}
          <div className='inputHolder'>
            <div className="holder">
              <LuPhone />
              <input
                type="tel"
                {...register("phoneNumber", {
                  required: "Please enter a phone number",
                  pattern: {
                    value: /^\d+$/,
                    message: "Phone number must contain only digits"
                  },
                  minLength: {
                    value: 10,
                    message: "Phone number must be at least 10 digits long"
                  },
                  maxLength: {
                    value: 15,
                    message: "Phone number must be at most 15 digits long"
                  }
                })}
                placeholder="Your Phone Number"
                style={{ borderColor: errors.phoneNumber ? 'red' : 'black' }}
              />
            </div>
            {errors.phoneNumber && (
              <span>
                <AiOutlineExclamationCircle />
                {errors.phoneNumber.message}
              </span>
            )}
          </div>
        </div>
{/* Email */}
        <div className='inputHolder'>
          <div className="holder">
          <MdOutlineEmail />
          <input
            type="email"
            {...register("email", {
              required: "Please enter your email address",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address"
              }
            })}
            placeholder="Your Email"
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
{/* Confirm Password */}
        <div className='inputHolder password'>
          <div className="holder">
            <TfiLock />
            {passEye.confirm === true ? (
              <LuEye className='eye' onClick={() => iconChanging("confirm")}/>
            ) : (
              <LuEyeOff className='eye' onClick={() => iconChanging("confirm")} />
            )}
            <input
              type={passEye.confirm === true ? "text" : "password"}
              {...register("passwordConfirmation", {
                required: "Please confirm your password",
                validate: value => value === password || "Passwords don't match"
              })}
              placeholder="Confirm password"
              style={{ borderColor: errors.passwordConfirmation ? 'red' : 'black' }}
            />
          </div>
          {errors.passwordConfirmation && (
            <span>
              <AiOutlineExclamationCircle />
              {errors.passwordConfirmation.message}
            </span>
          )}
        </div>




        <div className="btns">
          <button className='main-buttom' type="submit">Register</button>
          <Link to='/login' className='main-buttom'>Login</Link>
        </div>
      </form>
    </div>
  )
}
