import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules'; // Correct import

// Other imports
import { games } from '../data';
import MainCard from './MainCard';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SlArrowRight } from "react-icons/sl";

export default function GamesSwiper({ categorie, title }) {
  const filterGames = games.filter((x) => x.category === categorie);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null); // Ref for Swiper instance

  useEffect(() => {
    // Update Swiper's navigation elements after the component mounts
    if (swiperRef.current && swiperRef.current.swiper && prevRef.current && nextRef.current) {
      swiperRef.current.swiper.params.navigation.prevEl = prevRef.current;
      swiperRef.current.swiper.params.navigation.nextEl = nextRef.current;
      swiperRef.current.swiper.navigation.update();
    }
  }, [filterGames.length]); // Dependencies include filterGames to ensure proper re-render

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
            onSwiper={(swiper) => {
              swiperRef.current = swiper; // Store swiper instance in ref
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.update();
            }}
            spaceBetween={15}
            slidesPerView={6}
          >
            {filterGames.map((game, index) => (
              <SwiperSlide key={index}>
                <MainCard data={game} showPrice={true}/>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
