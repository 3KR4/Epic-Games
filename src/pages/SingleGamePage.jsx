import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [singleGame, setSingleGame] = useState()
  console.log(singleGame);


  useEffect(() => {
    axios.get(`https://game-ecommrece-backend.onrender.com/api/products/${gameId}`)
      .then(response => {
        setSingleGame(response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

const dispatch = useDispatch();
const cartItem = useSelector(selectCartItemById(Number(gameId)));
const isInCart = !!cartItem;

const handleAddToCart = () => {
  if (!isInCart) {
    dispatch(addToCart(singleGame)); 
  }
};

function formatDate(isoDateString) {
  const date = new Date(isoDateString);
  return date.toLocaleDateString('en-CA'); // This will format the date as YYYY/MM/DD
}

  return (
    <>
    {singleGame ? (
      <div className="singleGame">
            <h2>{singleGame.attributes.name || "Game Name Not Available"}</h2>
            <div className="overview">
              <div className="stars">
                <Rating name="half-rating-read" defaultValue={singleGame.attributes.review || 0} precision={0.5} readOnly />
              </div>
              <h5>{singleGame.attributes.review ? singleGame.attributes.review.toFixed(1) : "No reviews"}</h5>
              <div className="state">
                <IoGameController />
                <h5>
                  {singleGame.attributes.state === 'most_popular' ? 'Most Popular' : 
                  singleGame.attributes.state === 'top_seller' ? 'Top Seller' : 
                  singleGame.attributes.state === 'most_played' ? 'Most Played' : 'Newest'}
                </h5>
              </div>
            </div>
            <div className="mainHolder">
              <div className="firstImage">
                <img src={singleGame.attributes.mainImg || "/default-image.png"} alt={singleGame.attributes.name || "Game Image"} />
                <p>{singleGame.attributes.details || "No details available."}</p>
              </div>
              <div className="sideSection">
                <div className="image">
                  <img src={singleGame.attributes.url || "/default-image.png"} alt={singleGame.attributes.name || "Game Image"} />
                </div>
                <h5>{singleGame.attributes.category || "Category not available"}</h5>
                <pre className='price'>
                  {singleGame.attributes.sale !== 0 && (
                    <>
                      <span className={`sale relative`}>{singleGame.attributes.sale}% OFF</span>
                      <p className='lastPrice'>${singleGame.attributes.price}</p>
                    </>
                  )}
                  <h4 className='finalPrice'>
                    {singleGame.attributes.price !== 0 && '$'} 
                    {singleGame.attributes.sale !== 0 ?  (singleGame.attributes.price - (singleGame.attributes.price * singleGame.attributes.sale / 100)).toFixed(2) : singleGame.attributes.price === 0 ? 'FREE-GAME' : singleGame.attributes.price}
                  </h4>
                </pre>
                <button className="main-button buy">Buy Now</button>
                <button className="main-button" onClick={handleAddToCart}>{!isInCart ? 'Add To Cart' : 'Already in Cart'}</button>
                <button className="main-button">Add to Whishlist</button>
                <div className="detailsHolder">
                  <p>Developer <span>{singleGame.attributes.developer || "Developer not available"}</span></p>
                  <p>Publisher <span>{singleGame.attributes.developer || "Publisher not available"}</span></p>
                  <p>Release Date <span>{formatDate(singleGame.attributes.releaseDate) || "Release date not available"}</span></p>
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
                <h2>{singleGame.attributes.name} System Requirements</h2>
                <div className="holder">
                  <div className="systemHolder">
                    <h3>Minimum</h3>
                    <p>OS <span>{singleGame.attributes.systemRequirements.os || "Not specified"}</span></p>
                    <p>PROCESSOR <span>{singleGame.attributes.systemRequirements.processor || "Not specified"}</span></p>
                    <p>MEMORY <span>{singleGame.attributes.systemRequirements.memory || "Not specified"}</span></p>
                    <p>GRAPHICS <span>{singleGame.attributes.systemRequirements.graphics || "Not specified"}</span></p>
                    <p>STORAGE <span>{singleGame.attributes.systemRequirements.storage || "Not specified"}</span></p>
                  </div>
                  <div className="rateHolder">
                    <h2>Rate this Game</h2>
                    <Rating name="half-rating" defaultValue={4.5} precision={0.5} />
                  </div>
                </div>
              </div> 

              <GamesSwiper data='most played' title="Suggested Games"/> 
      </div>
    ) : (
      <p>Loading game details...</p>
    )}
  </>
);
}
