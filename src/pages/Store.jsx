import React, { useState, useEffect } from 'react'

// Component
import { games, discover } from '../data'

// icons 
import { FiPlusCircle } from "react-icons/fi";

export default function Store() {

  const [landingIndex, setLandingIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLandingIndex((prev) => (prev + 1) % discover.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='store'>
      <div className="landing">
        <div className="mainSection">
          <img src={discover[landingIndex].mainImg} alt="" />
          <div className="holder">
          <div className="text">
            <h4>Purchase Now</h4>
            <p>{discover[landingIndex].details}</p>
          </div>
          <div className="buttons">
            <a href="">Read More</a>
            <button><FiPlusCircle/> Add to Wishlist</button>
          </div>
          </div>
        </div>
        
          <ul className='megaSection'>
            {discover.map((game, index) => (
              <li className={`smallContentHolder ${landingIndex == index ? 'backAnimation' : ''}`} key={game.id} onClick={() => {
                setLandingIndex(index)
              }}>
                <img src={game.img} alt="" />
                <h5>{game.name}</h5>
              </li>
            ))}
          </ul>
      </div>
    </div>
  )
}