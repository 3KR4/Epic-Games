import React, { useState, useEffect } from 'react';
import axios from 'axios';

// img 
import logoLight from '../Images/logo-light.png'
import logoDark from '../Images/logo-black.webp'

// Icons
import { FaRegMoon } from "react-icons/fa";
import { LuSun } from "react-icons/lu";
import { IoMdSearch } from "react-icons/io";
import { HiOutlineBars3 } from "react-icons/hi2";

// Library
import { Link, NavLink } from "react-router-dom";

// Component
import { games } from '../data'
import { useAllContext } from "../Context";



export default function Header() {
  const { mode, setMode, setOpenNav, userLog } = useAllContext();
  const [searchModel, setSearchModel] = useState(false);
  const [searchGame, setSearchGame] = useState('');
  const [searchGameArr, setsearchGameArr] = useState([]);
  

  const handleSearch = (e) => {
    setSearchGame(e.target.value);
    setSearchModel(e.target.value.length > 1);
  };

  useEffect(() => {
    if (searchGame.trim() === '') {
      setsearchGameArr([]); // Clear results if search is empty
      return; // Exit early if the search is empty
    }

    axios.get(`https://game-ecommrece-backend.onrender.com/api/products?populate=*&pagination[page]=1&pagination[pageSize]=5&filters[name][$containsi]=${searchGame}`)
      .then(response => {
        setsearchGameArr(response.data.data);
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  }, [searchGame]);

  return (
    <div className='header'>
      <div className="first">
          <a href="/home" className="logo-holder">
            <div className="logo">
              {mode === 'light' ? (<img src={logoDark} alt="" />) : (<img src={logoLight} alt="" />)}
                <h4>Epic Games</h4>
            </div>
          </a>
        <div className="searchHolder">
          <div className="inputHolder">
            <IoMdSearch/>
            <input type="text" placeholder="Search Store" value={searchGame} onChange={handleSearch}/>
          </div>
          <ul className="allResult" style={{display: searchGameArr.length > 0 || searchGame.length != 0 ? 'block' : 'none'}}>
            {searchGameArr.slice(0, 4).map((game, index) => (
              <Link className="smallContentHolder" to={`/singleGamePage/${game.id}`} key={game.id} onClick={() => {
                setSearchGame('')
              }}>
                <img src={game.attributes.img.data.attributes.url} alt="" />
                <h5>{game.attributes.name}</h5>
              </Link>
            ))}
            {searchGameArr.length > 4 && (<NavLink className="view" to=''>View More</NavLink>)}
            {searchGameArr.length == 0 && searchGame.length != 0 && (<h5>There is no result like this: {searchGame}</h5>)}
          </ul>
        </div>

        <ul className="links">
          {!userLog && 
            <>
              <a className="storeTitle" href="/store">Store</a>
              <hr />
            </>
          }

          <a href="#">Discover</a>
          <a href="#">News</a>
          <a href="#">Free Games</a>
        </ul>
      </div>

      <ul className="last links">
        {userLog ? 
          <>
            <NavLink to="wishlist">Wishlist</NavLink>
            <NavLink to="cart">Cart</NavLink>
          </>
          :
          <div className="loginBtns">
            <a href="/register">Register</a>
          </div>
        }
        <hr />
        <div className="darkLight">
        {mode === "light" ? (
          <FaRegMoon onClick={() => {setMode("dark");}}/>
        ) : (
          <LuSun onClick={() => {setMode("light"); }}/>
        )}
      </div>
      {userLog && 
        <HiOutlineBars3 className="bars" onClick={() => {
          setOpenNav(prev => !prev)
        }}/>
      }
      </ul>
    </div>
  )
}
