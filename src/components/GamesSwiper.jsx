import React, { useRef, useEffect } from 'react';


// Library
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'; // Correct import
import { Link } from 'react-router-dom';



// Other imports
import { games } from '../data';
import MainCard from './MainCard';


// Icons
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SlArrowRight } from "react-icons/sl";

export default function GamesSwiper({ loop, data, title , isCategory = false}) {


  const filterCategory = games.filter((x) => x.category === data && x.price != 0);
  const filterState = games.filter((x) => x.state === data && x.price != 0);
  const filterFree = games.filter((x) => x.price == 0);

  let dataToRender = loop == 'state' ? filterState :loop == 'free' ? filterFree : filterCategory

  const prevRef = useRef(null);
  const nextRef = useRef(null);

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
              // when window width is >= 320px
              320: {
                slidesPerView: 2,
              },
              // when window width is >= 480px
              480: {
                slidesPerView: 2,
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 3,
              },
              // when window width is >= 1024px
              1024: {
                slidesPerView: 4,
              },
              // when window width is >= 1280px
              1280: {
                slidesPerView: 5,
              },
              // when window width is >= 1600px
              1600: {
                slidesPerView: 6, // Default value for large screens
              },
            }}
          >
          {!isCategory ? (
            dataToRender.map((game, index) => (
              <SwiperSlide key={index}>
                <MainCard data={game} showPrice={true}/> 
              </SwiperSlide>
            ))
          ) : (
            <div></div>
          )}
          </Swiper>
        </div>
      </div>
    </>
  );
}
