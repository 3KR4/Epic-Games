import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/components.css';

export default function CartCheckoutNav({ checkout }) {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [gameData, setGameData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = cartItems.map(item => 
          axios.get(`https://game-ecommrece-backend.onrender.com/api/products/${item.id}`)
        );
        const responses = await Promise.all(requests);
        const data = responses.map(response => response.data.data);
        console.log(responses);
        setGameData(data);
      } catch (err) {
        setError('Failed to load game data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cartItems]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const totalOriginalPrice = gameData.reduce((acc, game) => {
    const gameInCart = cartItems.find(item => item.id === game.id);
    return gameInCart ? acc + game.attributes.price : acc;
  }, 0);

  const totalFinalPrice = gameData.reduce((acc, game) => {
    const gameInCart = cartItems.find(item => item.id === game.id);
    if (gameInCart) {
      const discountedPrice = gameInCart.attributes.price - (gameInCart.attributes.price * gameInCart.attributes.sale / 100);
      return acc + discountedPrice;
    }
    return acc;
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
