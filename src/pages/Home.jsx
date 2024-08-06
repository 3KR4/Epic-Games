import React, { useState, useEffect, useRef } from 'react'

// Component
import { games, discover, deals } from '../data'
import GamesSwiper from '../components/GamesSwiper';
import CollectionsGames from '../components/CollectionsGames';
import MainCard from '../components/MainCard';

// img 
import  rewardImg  from '../Images/Rewardwithout.png';
import  moreImg  from '../Images/deals/save.png';

// icons 
import { FiPlusCircle } from "react-icons/fi";
import { SlArrowRight } from "react-icons/sl";
import { BsGift } from "react-icons/bs";


export default function Home() {
  const [landingIndex, setLandingIndex] = useState(null);
  const intervalRef = useRef(null);

  
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
      <GamesSwiper categorie='newest' title="Top New Releases" isCategory={false}/>
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
      <GamesSwiper categorie='top' title="Most Played Games" isCategory={false}/>
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
            <div className="price">
            <pre className='discountPrice'  >
            {deal.sale != 0 && (
              <>
                <span className='sale'>-{deal.sale}%</span>
                <p className='lastPrice'>${deal.price}</p>
              </>
            )}
            <h4 className='finalPrice'>
              {deal.price != 0 && '$'} 
              {deal.sale != 0 ?  (deal.price - (deal.price * deal.sale / 100)).toFixed(2) : deal.price == 0 ? 'FREE-GAME' : deal.price}</h4>
          </pre>
          </div>
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
      <div className="freeSection">
        <div className="head">
          <div className="title">
            <BsGift />
            <h3>Free Games</h3>
          </div>
          <a href="#">View More</a>
        </div>
        <div className="cards">
          {games.filter(x => x.price == 0).slice(0, 5).map((freeGame) => (
            <MainCard data={freeGame} showPrice={true}/>
          ))}
        </div>
      </div>
      <CollectionsGames
        first={['newest', 'New Releases']}
        second={['popular', 'top Popular']}
        third={['action', 'top action']}
      />
      <CollectionsGames
        first={['popular', 'top Popular']}
        second={['action', 'top action']}
        third={['newest', 'New Releases']}
      />
    </div>
  );
}
