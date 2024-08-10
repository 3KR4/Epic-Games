import React from 'react';
import '../css/components.css';
import { useSelector, useDispatch } from 'react-redux';
import { FaMinus, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { removeFromCart } from '../Redux/cartSlice';

import CartCheckoutNav from '../components/CartCheckOutNav';
import { Link } from 'react-router-dom';

import { IoBagRemoveOutline } from "react-icons/io5";

export default function Cart() {
  // @ts-ignore
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <div className='cart-wishlist cart'>
      <h1 className='mainTitle'>My Cart</h1>
      <div className="holder">
        {cartItems.length === 0 ? (
          <div className="noCart">
            <IoBagRemoveOutline />
            <h2>Your Cart is Empty</h2>
            <p>The Games you add to the cart will appear on this page</p>
            <Link to='/home' className='main-button'>Back To Home</Link>
          </div>
        ) : (
          <>
            <div className="cart-games-holder">
              {cartItems.map((game, index) => {
                // Destructure properties directly from the game object
                const {
                  attributes: {
                    name,
                    price,
                    sale,
                    developer,
                    img: {
                      data: {
                        attributes: { url: imgUrl } // Use imgUrl instead of img
                      }
                    },
                    categories: {
                      data: [{ attributes: { name: category } }]
                    }
                  }
                } = game;

                // Calculate final price after discount if applicable
                const finalPrice = sale !== 0 
                  ? (price - (price * sale / 100)).toFixed(2) 
                  : price === 0 
                  ? 'FREE-GAME' 
                  : price;

                return (
                  <div className="card" key={index}>
                    <img src={imgUrl} alt={`${name} cover`} /> {/* Correct img to imgUrl */}
                    <div className="content">
                      <div className="info">
                        <div className="left">
                          <h6>{category} Game</h6>
                          <h4>{name}</h4>
                          <h5>From: {developer}</h5>
                        </div>
                        <div className="right">
                          <pre className='price'>
                            {sale !== 0 && (
                              <>
                                <span className='sale relative'>{sale}% OFF</span>
                                <p className='lastPrice'>${price}</p>
                              </>
                            )}
                            <h4 className='finalPrice'>
                              {price !== 0 && '$'} 
                              {finalPrice}
                            </h4>
                          </pre>
                          <p className='limit'>Limited time discount</p>
                        </div>
                      </div>
                      <button onClick={() => dispatch(removeFromCart(game))}>Remove</button>
                    </div>
                  </div>
                );
              })}
            </div>
            <CartCheckoutNav checkout={false} />
          </>
        )}
      </div>
    </div>
  );
}
