import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

// Library
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'; // Correct import
import { useAllContext } from "../Context";

// Other imports
import { games, allCategory } from '../data';
import MainCard from './MainCard';

// Icons
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SlArrowRight } from "react-icons/sl";

export default function GamesSwiper({ loop, data, title }) {
  const { setSelectedCat } = useAllContext();
  const nextRef = useRef(null);
  const prevRef = useRef(null);


  const [games, setGames] = useState([]);
  
  useEffect(() => {
    let apiUrl = `https://game-ecommrece-backend.onrender.com/api/products?populate=*&pagination[page]=1&pagination[pageSize]=25`;


    if (data === 'free') {
      apiUrl += `&filters[price][$eq]=0`; // Filter for free games
    } else if (title === 'Suggested Games') {
      apiUrl += `&filters[categories][name][$containsi]=${data}`;
    } else {
      apiUrl += `&filters[states][name][$containsi]=${data}`; // Filter by state
    }

    axios.get(apiUrl)
      .then(response => {
        setGames(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [data]); // Re-run the effect if data changes


  return (
    <>
      <div className="swiperSection">
        <div className="firstHolder">
          <div className="title">
            <h3>{title}</h3>
            <SlArrowRight />
          </div>
          <div className="navigateIcons">
            <button ref={prevRef} className="swiper-button-prev"><IoIosArrowBack /></button>
            <button ref={nextRef} className="swiper-button-next"><IoIosArrowForward /></button>
          </div>
        </div>
        <div className="swiper-container">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            spaceBetween={15}
            slidesPerView={6}
            breakpoints={{
              320: {
                slidesPerView: 2,
              },
              480: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1280: {
                slidesPerView: 5,
              },
              1600: {
                slidesPerView: 6,
              },
            }}
          >
          {loop !== 'Category' ? (
            games.map((game, index) => (
              <SwiperSlide key={index}>
                <MainCard data={game} showPrice={true}/> 
              </SwiperSlide>
            ))
          ) : (
            data.map((cat, index) => (
              <SwiperSlide key={index} className='categoryCard' onClick={() => {
                setSelectedCat(cat.attributes.name)
              }}>
                <div className='categoryCard' >
                  <h4>{cat.attributes.name}</h4>
                </div>
              </SwiperSlide>
            ))
          )}
          </Swiper>
        </div>
      </div>
    </>
  );
}
