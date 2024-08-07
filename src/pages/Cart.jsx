import React from 'react';
import '../css/components.css'
import { useSelector, useDispatch } from 'react-redux';
import { FaMinus, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { removeFromCart } from '../Redux/cartSlice';

import CartCheckoutNav from '../components/CartCheckOutNav'
import { Link } from 'react-router-dom';

import { IoBagRemoveOutline } from "react-icons/io5";
import MainCard from '../components/MainCard';

export default function Cart() {
  // @ts-ignore
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <div className='cart'>
      <h1 className='mainTitle'>My Cart</h1>
      <div className="holder">
        {cartItems.length == 0 ?
          <div className="noCart">
            <IoBagRemoveOutline />
            <h2>Your Cart is Empty</h2>
            <p>The Games you add to the cart will occur in this Page</p>
            <Link to='/home' className='main-button'>Back To Home</Link>
          </div>
          : 
          <>
          <div className="cart-games-holder">
            {cartItems.map((game, index) => (
              <div className="card">
                <img src={game.img} alt="" />
                <div className="content">
                  <div className="info">
                    <div className="left">
                      <h6>{game.category} Game</h6>
                      <h4>{game.name}</h4>
                      <h5>From: {game.developer}</h5>
                    </div>
                    <div className="right">
                    <pre className='price'>
                      {game.sale != 0 && (
                        <>
                          <span className='sale relative'>{game.sale}% OFF</span>
                          <p className='lastPrice'>${game.price}</p>
                        </>
                      )}
                      <h4 className='finalPrice'>
                        {game.price != 0 && '$'} 
                        {game.sale != 0 ?  (game.price - (game.price * game.sale / 100)).toFixed(2) : game.price == 0 ? 'FREE-GAME' : game.price}</h4>
                    </pre>
                    <p className='limit'>Limited time discount</p>
                    </div>
                  </div>
                    <button onClick={() => dispatch(removeFromCart(game))}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <CartCheckoutNav checkout={false}/>
        </>
      }
      </div>
    </div>
  );
}
