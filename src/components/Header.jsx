import { useState, useEffect } from "react";

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


const searchGames = (searchGame) => {
  if (searchGame.length === 0) {
    return [];
  }
  return games.filter(game => game.name.toLowerCase().includes(searchGame.toLowerCase()));
};

export default function Header() {
  const { mode, setMode, setOpenNav, userLog } = useAllContext();
  const [searchModel, setSearchModel] = useState(false);
  const [searchGame, setSearchGame] = useState('');

  const filteredProducts = searchGames(searchGame);

  const handleSearch = (e) => {
    setSearchGame(e.target.value);
    setSearchModel(e.target.value.length > 1);
  };

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
          <ul className="allResult" style={{display: filteredProducts.length > 0 || searchGame.length != 0 ? 'block' : 'none'}}>
            {filteredProducts.slice(0, 4).map((game, index) => (
              <Link className="smallContentHolder" to='' key={game.id}>
                <img src={game.img} alt="" />
                <h5>{game.name}</h5>
              </Link>
            ))}
            {filteredProducts.length > 4 && (<NavLink className="view" to=''>View More</NavLink>)}
            {filteredProducts.length == 0 && searchGame.length != 0 && (<h5>There is no result like this: {searchGame}</h5>)}
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
