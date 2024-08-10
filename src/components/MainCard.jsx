import React from 'react'

// Components
import { useAllContext } from "../Context";
import { addToCart } from '../Redux/cartSlice';
import { selectCartItemById } from '../Redux/cartSelectors'
;
import { useDispatch, useSelector } from 'react-redux';

// icons
import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function MainCard({data, showPrice, sale}) {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(data.id));
  const isInCart = !!cartItem;

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addToCart(data)); 
    }
  };

  const { userLog } = useAllContext();
  return (
    <div className="main-card">
      <Link to={`/singleGamePage/${data.id}`} className="image">
        <img src={data.attributes.img.data.attributes.url} alt="" />
      </Link>
      <div className='addToWishList' onClick={handleAddToCart}>
        {userLog && (isInCart ? <FaCheck /> : <FaPlus/>)}
      </div>

      <div className="info">
        <h5 className='cat'>{data.attributes.categories.data[0].attributes.name}</h5>
        <h4 className='name'>{data.attributes.name}</h4>
        {showPrice && (
          <pre className='price'>

            {data.attributes.sale != 0 && (
              <>
                <span className={`sale ${sale}`}>{data.attributes.sale < 10 && 0}{data.attributes.sale}% OFF</span>
                <p className='lastPrice'>${data.attributes.price}</p>
              </>
            )}
            <h4 className='finalPrice'>
              {data.attributes.price != 0 && '$'} 
              {data.attributes.sale != 0 ?  (data.attributes.price - (data.attributes.price * data.attributes.sale / 100)).toFixed(2) : data.attributes.price == 0 ? 'FREE-GAME' : data.attributes.price}</h4>

          </pre>
        )}
      </div>
    </div>
  )
}
