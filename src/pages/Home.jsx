import React, { useState, useEffect, useRef } from 'react'

// Component
import { games, discover, deals } from '../data'
import GamesSwiper from '../components/GamesSwiper';
import CollectionsGames from '../components/CollectionsGames';
import { useAllContext } from "../Context";

// img 
import  rewardImg  from '../Images/Rewardwithout.png';
import  moreImg  from '../Images/deals/save.png';
import  rtx  from '../Images/rtx.png';
import  msi  from '../Images/msi.png';

// icons 
import { FiPlusCircle } from "react-icons/fi";
import { SlArrowRight } from "react-icons/sl";
import { BsGift } from "react-icons/bs";


export default function Home() {
  const [landingIndex, setLandingIndex] = useState(null);
  const intervalRef = useRef(null);
  const { userLog } = useAllContext();

  
  useEffect(() => {
    setLandingIndex(0)
  }, []);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setLandingIndex((prev) => (prev + 1) % discover.length);
    }, 7000);
    return () => clearInterval(intervalRef.current);
  }, [landingIndex]);

  return (
    <div className='home'>
      <div className="landing">
        <div className="mainSection">
          <img src={discover[landingIndex || 0].mainImg} alt="" />
          <div className="holder">
            <div className="text">
              <h4>Purchase Now</h4>
              <p>{discover[landingIndex || 0].details}</p>
            </div>
            <div className="buttons">
              <a href="">Read More</a>
              <button><FiPlusCircle/> Add to Wishlist</button>
            </div>
          </div>
        </div>
        <ul className='megaSection'>
          {discover.map((game, index) => (
            <li
              className={`smallContentHolder ${landingIndex === index ? 'backAnimation' : ''}`}
              key={game.id}
              onClick={() => setLandingIndex(index)}
            >
              <img src={game.img} alt="" />
              <h5>{game.name}</h5>
            </li>
          ))}
        </ul>
      </div>
      <GamesSwiper loop='state' data='new' title="New Releases"/>

      <GamesSwiper loop='state' data='most_popular' title="Most Popular"/>

      {userLog && 
        <div className="rewardSection">
          <div className="firstHolder">
            <img src={rewardImg} alt="" />
            <div className="textHolder">
              <h3>You've got Rewards!</h3>
              <p>Use Epic Rewards at checkout to get an even better price on games, add-ons, and more.</p>
            </div>
            </div>
            <div className="prices">
              <h5>your current balance Is:</h5>
              <span>$10.00 - Free</span>
            </div>
        </div>
      }

      <CollectionsGames
        first={['racing', 'Racing']}
        second={['RPG', 'RPG']}
        third={['horror', 'horror']}
      />

      <div className="freeSection">
        <GamesSwiper loop='free' title="Free Games"/>
      </div>

      <div className="dealSection">
        <div className="title"> 
          <h3>Deals of the Week</h3>
          <SlArrowRight />
        </div>
        <div className="deals">{
          deals.map((deal,index) => 
          <div className='card' key={index}>
            <div className="image">
            <img src={deal.img}/>
            </div>
            <p className='name'>{deal.name}</p>
            <pre className='price'>

              {deal.sale != 0 && (
                <>
                  <span className='sale relative'>{deal.sale}% OFF</span>
                  <p className='lastPrice'>${deal.price}</p>
                </>
              )}
              <h4 className='finalPrice'>
                {deal.price != 0 && '$'} 
                {deal.sale != 0 ?  (deal.price - (deal.price * deal.sale / 100)).toFixed(2) : deal.price == 0 ? 'FREE-GAME' : deal.price}</h4>

            </pre>
          </div>
          )}
          <div className="collection">
            <div className="image">
              <img src={moreImg}/>
            </div>
            <p>Check out all the deals for this week.</p>
            <a href="#">Browse</a>
          </div>
        </div>
      </div>

      <CollectionsGames
        onlyOne='action'
      />

      <GamesSwiper loop='state' data='top_seller' title="Top Seller"/>

      <div className="partners">
        <div className="head">
          <div className="title">
            <h3>Our Partners</h3>
            <SlArrowRight />
          </div>
          <a href="#">View More</a>
        </div>
        <div className="mainHolder">
        <div className="firstHolder">
          <div className="image">
            <img src={rtx} alt="" />
          </div>
          <h3>GeForce RTX Drivers</h3>
          <p>NVIDIA RTX™ and NVIDIA Omniverse™ deliver the performance to help professionals, creators, developers, and students worldwide enhance creative workflows</p>
          <span>Starting at $200.</span>
          </div>
          <div className="secondHolder">
          <div className="image">
            <img src={msi} alt="" />
          </div>
          <h3>MSI Claw A1M</h3>
          <p>MSI Claw A1M, a groundbreaking handheld gaming device that marks a new era in portable gaming experiences. Powered by Intel® Core™ Ultra processors</p>
          <span>Starting at $699.</span>
          </div>
          </div>
      </div>


      <GamesSwiper loop='state' data='most_played' title="Most Played"/>

      <CollectionsGames
        onlyOne='adventure'
      />
    </div>
  );
}
