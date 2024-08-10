import React, { useState } from 'react'
import '../css/register-login.css'
import logoLight from '../Images/logo-light.png'
import logoDark from '../Images/logo-black.webp'

import { useForm } from 'react-hook-form';


import { FaRegUser } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import {  LuPhone  } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";

import { useAllContext } from "../Context";
import { PiChatText } from "react-icons/pi";




export default function Register() {
  const { mode } = useAllContext();
  const { register, handleSubmit, formState: { errors } } = useForm();;

  const onSubmit = (data) => {
    console.log(data);
  };
  
  return (
    <div className='support-page'>
      <div className="top">
        <h1 class="title">Support</h1>
      </div>
      <div className='contactUs container'>
      <div className="top">
        Fill This Form:
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
          <div className="checkBox">
            <h4>You Have Problem With:</h4>
            <div className="checkHolder">
              <div className="miniCheckHolder">
                <label>Account</label>
                <input type="checkbox" className="ui-checkbox"/>
              </div>
              <div className="miniCheckHolder">
              <label>Game</label>
                <input type="checkbox" className="ui-checkbox"/>
              </div>
              <div className="miniCheckHolder">
              <label>Other</label>
                <input type="checkbox" className="ui-checkbox"/>
              </div>
          </div>
          </div>
          <div className="textHolder">
          <PiChatText />
            <textarea rows="6" type="text" placeholder='Enter Your Problem'></textarea>
            </div>
          <div className="button">
            <button className='main-button' type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}
