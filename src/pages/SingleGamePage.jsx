import React from 'react';
import { useParams } from 'react-router-dom';
import { Rating } from '@mui/material';

// Component
import { games } from "../data";
import MainCard from '../components/MainCard';
import GamesSwiper from '../components/GamesSwiper';

import { useAllContext } from "../Context";
import { addToCart } from '../Redux/cartSlice';
import { selectCartItemById } from '../Redux/cartSelectors'

// icon
import { IoGrid } from "react-icons/io5";
import { FaWindows } from "react-icons/fa6";
import { IoShareSocial } from "react-icons/io5";
import { MdOutlineReport } from "react-icons/md";
import { IoGameController } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';

export default function SingleGamePage() {
  const { gameId } = useParams(); 
let currentGame = games.find(x => x.id == gameId )

const dispatch = useDispatch();
const cartItem = useSelector(selectCartItemById(Number(gameId)));
const isInCart = !!cartItem;

const handleAddToCart = () => {
  if (!isInCart) {
    dispatch(addToCart(currentGame)); 
  }
};

console.log(gameId);

  return (
    <div className="singleGame">
      <h2>{currentGame.name}</h2>
      <div className="overview">
        <div className="stars">
        <Rating name="half-rating-read" defaultValue={currentGame.review} precision={0.5} readOnly />
        </div>
        <h5>{currentGame.review.toFixed(1)}</h5>
        <div className="state">
          <IoGameController />
          <h5>{currentGame.state == 'most_popular' ? 'Most Popular' : currentGame.state == 'top_seller' ? 'Top Seller' : currentGame.state == 'most_played' ? 'Most Played' :  'Newest'}</h5>
        </div>
      </div>
      <div className="mainHolder">
      <div className="firstImage">
        <img src={currentGame.mainImg} alt="" />
          <p>{currentGame.details}</p>
      </div>
      <div className="sideSection">
        <div className="image">
          <img src={currentGame.img} alt="" />
        </div>
        <h5>{currentGame.category}</h5>
        <pre className='price'>
          {currentGame.sale != 0 && (
            <>
              <span className={`sale relative`}>{currentGame.sale}% OFF</span>
              <p className='lastPrice'>${currentGame.price}</p>
            </>
          )}
          <h4 className='finalPrice'>
            {currentGame.price != 0 && '$'} 
            {currentGame.sale != 0 ?  (currentGame.price - (currentGame.price * currentGame.sale / 100)).toFixed(2) : currentGame.price == 0 ? 'FREE-GAME' : currentGame.price}</h4>

          </pre>
        <button className="main-button buy">Buy Now</button>
        <button className="main-button" onClick={handleAddToCart}>{!isInCart ? 'Add To Cart' : 'Already in Cart'}</button>
        <button className="main-button">Add to Whishlist</button>
        {/* <button className="main-button">
        <IoGrid />
        In Library
        </button> */}
        <div className="detailsHolder">
          <p>Developer <span>{currentGame.developer}</span></p>
          <p>Publisher <span>{currentGame.developer}</span></p>
          <p>Release Date <span>{currentGame.releaseDate}</span></p>
          <p>Platform <FaWindows/></p>
        </div>
        <div className="buttons">
          <button className="main-button">
          <IoShareSocial />
          Share
          </button>
          <button className="main-button">
          <MdOutlineReport />
          Report
          </button>
        </div>
      </div>
      </div>
        <div className="systemReq">
        <h2>{currentGame.name} System Requirements</h2>
        <div className="holder">
        <div className="systemHolder">
          <h3>Minimum</h3>
          <p>OS <span>{currentGame.systemRequirements.os}</span></p>
          <p>PROCESSOR <span>{currentGame.systemRequirements.processor}</span></p>
          <p>MEMORY <span>{currentGame.systemRequirements.memory}</span></p>
          <p>GRAPHICS <span>{currentGame.systemRequirements.graphics}</span></p>
          <p>STORAGE <span>{currentGame.systemRequirements.storage}</span></p>
        </div>
        <div className="rateHolder">
          <h2>Rate this Game</h2>
          <Rating name="half-rating" defaultValue={4.5} precision={0.5} />
        </div>
        </div>
        </div>
        <GamesSwiper loop='category' data={currentGame.category} title="Suggested Games"/>
        <GamesSwiper loop='developer' data={currentGame.developer} title={`More From ${currentGame.developer}`}/>
    </div>
  );
}
