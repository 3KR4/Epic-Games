// Imgs
import logoLight from '../Images/logo-light.png'
import logoDark from '../Images/logo-black.webp'

// Icons
import { FaTags } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { AiFillAppstore } from "react-icons/ai";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { IoMdSettings } from "react-icons/io";
import { LuDownload } from "react-icons/lu";
import { FaUser } from "react-icons/fa6";
import { MdClose } from "react-icons/md";


// Library
import { NavLink } from 'react-router-dom';

// Component
import { games } from '../data'
import { useAllContext } from "../Context";

export default function Nav() {
  const { mode, openNav, setOpenNav } = useAllContext();

  return (
    <div className={`nav ${openNav && 'active'}`}>
      <div className="top">
        <div className="logo-holder">
          <div className="logo">
              {mode === 'light' ? (<img src={logoDark} alt="" />) : (<img src={logoLight} alt="" />)}
              <h4>Epic Games</h4>
            </div>
            <MdClose onClick={() => {
              setOpenNav(false)
            }}/>
        </div>
        <ul className='navLinks'>
          <li>
            <NavLink className='smallContentHolder' to="/home"><FaHome/>Home</NavLink>
          </li>
          <li>
            <NavLink className='smallContentHolder' to="/store"><FaTags/>Store</NavLink>
          </li>
          <li>
            <NavLink className='smallContentHolder' to="/library"><AiFillAppstore/>Library</NavLink>
          </li>
          <li>
            <NavLink className='smallContentHolder' to="/support"><TfiHeadphoneAlt/>Support</NavLink>
          </li>
        </ul>
        <div className="quickLunch">
          <h2 className="sideTitle">QUICK LAUNCH</h2>
          <ul>
            {games.slice(0, 4).map((game, index) => (
              <li className='smallContentHolder' key={game.id}>
                <img src={game.img} alt="" />
                <h5>{game.name}</h5>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ul className="bottom">
          <li className='smallContentHolder'><LuDownload/>Download</li>
          <li className='smallContentHolder'><IoMdSettings/>Setting</li>
          <li className='smallContentHolder'><a href="/user"><FaUser/>{localStorage.username}</a></li>
      </ul>
    </div>
  )
}