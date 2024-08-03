import React from 'react'

// icons
import { FaPlus } from "react-icons/fa6";

export default function MainCard({data, showPrice}) {
  return (
    <div className="main-card">
      <div className="image">
        <img src={data.img} alt="" />
      </div>
      <FaPlus className='addToWishList'/>
      <div className="info">
        <h5 className='cat'>{data.category}</h5>
        <h4 className='name'>{data.name}</h4>
        {showPrice && (
          <pre className='price'>

            {data.sale != 0 && (
              <>
                <span className='sale'>{data.sale}% OFF</span>
                <p className='lastPrice'>${data.price}</p>
              </>
            )}
            <h4 className='finalPrice'>
              {data.price != 0 && '$'} 
              {data.sale != 0 ?  (data.price - (data.price * data.sale / 100)).toFixed(2) : data.price == 0 ? 'FREE-GAME' : data.price}</h4>

          </pre>
        )}
      </div>
    </div>
  )
}
