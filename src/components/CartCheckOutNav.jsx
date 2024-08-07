import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { games } from '../data';
import '../css/components.css';

export default function CartCheckoutNav({ checkout }) {
  // @ts-ignore
  const cartItems = useSelector((state) => state.cart.cartItems);


  const totalOriginalPrice = cartItems.reduce((acc, item) => {
    const game = games.find(game => game.id === item.id);
    return game ? acc + game.price : acc;
  }, 0);

  const totalFinalPrice = cartItems.reduce((acc, item) => {
    const discountedPrice = item.price - (item.price * item.sale / 100);
    return acc + discountedPrice;
  }, 0);

  const totalDiscount = totalOriginalPrice - totalFinalPrice;

  return (
    <div className="checkTotalNav">
      <div className="totalPrices">
        <h3>Games and Apps Summary</h3>
        <ul>
          <li>Price: <span>${totalOriginalPrice.toFixed(2)}</span></li>
          <li>Sale Discount: <span>-${totalDiscount.toFixed(2)}</span></li>
          <li>Subtotal: <span>${totalFinalPrice.toFixed(2)}</span></li>
        </ul>
        {!checkout && (
          <Link to='/checkout' className="main-button">Check Out</Link>
        )}
      </div>
    </div>
  );
}
