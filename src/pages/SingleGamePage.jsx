import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Rating } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// Component Imports
import MainCard from '../components/MainCard';
import GamesSwiper from '../components/GamesSwiper';
import { addToCart } from '../Redux/cartSlice';
import { selectCartItemById } from '../Redux/cartSelectors';

// Icon Imports
import { IoGameController } from "react-icons/io5";
import { FaWindows } from "react-icons/fa6";
import { IoShareSocial } from "react-icons/io5";
import { MdOutlineReport } from "react-icons/md";

export default function SingleGamePage() {
  const { gameId } = useParams();
  const [singleGame, setSingleGame] = useState(null);
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(Number(gameId)));
  const isInCart = !!cartItem;

  useEffect(() => {
    axios.get(`https://game-ecommrece-backend.onrender.com/api/products/${gameId}?populate=*`)
      .then(response => {
        setSingleGame(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching game data:', error);
      });
  }, [gameId]);

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addToCart(singleGame));
    }
  };

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString('en-CA');
  };

  if (!singleGame) {
    return <p>Loading game details...</p>;
  }

  const { attributes } = singleGame;
  const { name, review, state, mainImg, details, img, categories, sale, price, developer, releaseDate, systemRequirements } = attributes;
  const finalPrice = sale ? (price - (price * sale / 100)).toFixed(2) : price === 0 ? 'FREE-GAME' : price;

  return (
    <div className="singleGame">
      <h2>{name || "Game Name Not Available"}</h2>
      <div className="overview">
        <div className="stars">
          <Rating name="half-rating-read" defaultValue={review || 0} precision={0.5} readOnly />
        </div>
        <h5>{review ? review.toFixed(1) : "No reviews"}</h5>
        <div className="state">
          <IoGameController />
          <h5>
            {state === 'most_popular' ? 'Most Popular' : 
            state === 'top_seller' ? 'Top Seller' : 
            state === 'most_played' ? 'Most Played' : 
            'Newest'}
          </h5>
        </div>
      </div>
      <div className="mainHolder">
        <div className="firstImage">
          <img src={mainImg?.data?.attributes?.url} alt={name || "Game Image"} />
          <p>{details || "No details available."}</p>
        </div>

        <div className="sideSection">
          <div className="image">
            <img src={img?.data?.attributes?.url} alt={name || "Game Image"} />
          </div>
          <h5>{categories?.data[0]?.attributes?.name || "Category not available"}</h5>
          <pre className='price'>
            {sale !== 0 && (
              <>
                <span className={`sale relative`}>{sale}% OFF</span>
                <p className='lastPrice'>${price}</p>
              </>
            )}
            <h4 className='finalPrice'>{price !== 0 && '$'} {finalPrice}</h4>
          </pre>
          <button className="main-button buy">Buy Now</button>
          <button className="main-button" onClick={handleAddToCart}>{!isInCart ? 'Add To Cart' : 'Already in Cart'}</button>
          <button className="main-button">Add to Wishlist</button>
          <div className="detailsHolder">
            <p>Developer <span>{developer || "Developer not available"}</span></p>
            <p>Publisher <span>{developer || "Publisher not available"}</span></p>
            <p>Release Date <span>{formatDate(releaseDate) || "Release date not available"}</span></p>
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
        <h2>{name} System Requirements</h2>
        <div className="holder">
          <div className="systemHolder">
            <h3>Minimum</h3>
            <p>OS <span>{systemRequirements?.os || "Not specified"}</span></p>
            <p>PROCESSOR <span>{systemRequirements?.processor || "Not specified"}</span></p>
            <p>MEMORY <span>{systemRequirements?.memory || "Not specified"}</span></p>
            <p>GRAPHICS <span>{systemRequirements?.graphics || "Not specified"}</span></p>
            <p>STORAGE <span>{systemRequirements?.storage || "Not specified"}</span></p>
          </div>
          <div className="rateHolder">
            <h2>Rate this Game</h2>
            <Rating name="half-rating" defaultValue={4.5} precision={0.5} />
          </div>
        </div>
      </div> 

      <GamesSwiper data={categories?.data[0]?.attributes?.name} title="Suggested Games"/> 
    </div>
  );
}
