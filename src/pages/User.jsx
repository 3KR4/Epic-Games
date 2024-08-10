import React from 'react';
import '../css/components.css'
import { BsCurrencyDollar } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { LuPenSquare } from "react-icons/lu";
import { FaBell } from "react-icons/fa";
import { GoClockFill } from "react-icons/go";
import { IoMdStarOutline } from "react-icons/io";
import { IoTicketOutline } from "react-icons/io5";
import { AiFillLock } from "react-icons/ai";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaAppStore } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { FaShop } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa";

export default function User() {
    return (
        <div className="AccountSection userPage">
            <div className="Account Settings">
                <aside className="sidebar">
                    <ul>
                        <li><BsFillPersonFill />Account Settings</li>
                        <li> < FaBell/>Email Preferences</li>
                        <li><BsCurrencyDollar />Payment Management</li>
                        <li><GoClockFill />Transactions</li>
                        <li><IoMdStarOutline />Epic Rewards</li>
                        <li><IoTicketOutline /> Subscriptions</li>
                        <li><AiFillLock />Password & Security</li>
                        <li><FaGamepad /> In-Game Currency</li>
                        <li> <IoShieldCheckmarkOutline />Parental Controls</li>
                        <li><IoDocumentTextOutline />EULA History</li>
                        <li> <FaAppStore />Apps and Accounts</li>
                        <li> <FaUserGroup />Creator Programs</li>
                        <li><FaShop /> Marketplace Seller</li>
                        <li><FaRegStar /> Redeem Code</li>
                    </ul>
                </aside>
                <main className="content">
                    <h2>Account Settings</h2>
                    <p>Manage your account's details.</p>

                    <div className="account-info">
                        <h3>Account Information</h3>
                            <label>ID:</label>
                        <div className="labelTitle">

                        </div>
                        <div className="holder-input">

                            <div className="input-group">
                            <label>Display Name:</label>
                                <input type="text" placeholder="Name" />
                                <button className="edit-button"><LuPenSquare /></button>
                            </div>
                            <div className="input-group">
                            <label>Email Address:</label>
                                <input type="email" placeholder="Email" />
                                <button className="edit-button"><LuPenSquare /></button>
                            </div>
                        </div>
                        <div className="holder-select">
                            <label>Preferred Communication Language:</label>
                            <select>
                                <option>English</option>
                                <option>Arabic</option>
                                <option>French</option>
                            </select>
                        </div>
                        <small>Choose your preferred language for emails from Epic Games.</small>
                    </div>

                    <div className="personal-details">
                        <h3>Personal Details</h3>
                        <p className='psmall'>Manage your name and contact info. These personal details are private and will not be displayed to other users.</p>

                        <div className="name-fields">
                            <div className="input-box">
                                <label>First Name:</label>
                                <input type="text" />
                            </div>
                            <div className="input-box">
                                <label>Last Name:</label>
                                <input type="text" />
                            </div>
                        </div>
                    </div>

                    <div className="address-details">
                        <h3 className='h3last'>Address</h3>
                        <div className="address-fields">
                            <div className="input-box">
                                <label>Address Line 1:</label>
                                <input type="text" />
                            </div>
                            <div className="input-box">
                                <label>Address Line 2:</label>
                                <input type="text" />
                            </div>
                            <div className="input-box">
                                <label>City:</label>
                                <input type="text" />
                            </div>
                            <div className="input-box">
                                <label>Region:</label>
                                <input type="text" />
                            </div>
                            <div className="input-box">
                                <label>Postal Code:</label>
                                <input type="text" />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
