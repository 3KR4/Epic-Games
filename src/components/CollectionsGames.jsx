import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules'; // Import Pagination

import CollectionSection from './CollectionSection';

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function CollectionGames({ first, second, third }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="collections">
      <Swiper
        modules={[Navigation, Pagination]} // Include Pagination module
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{ clickable: true }} // Enable pagination and make it clickable
        spaceBetween={15}
        slidesPerView={3}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
          1600: { slidesPerView: 3 },
        }}
      >
        <SwiperSlide key={1}>
          <CollectionSection category={first} />
        </SwiperSlide>
        <SwiperSlide key={2}>
          <CollectionSection category={second} />
        </SwiperSlide>
        <SwiperSlide key={3}>
          <CollectionSection category={third} />
        </SwiperSlide>
      </Swiper>
      <div className="navigateIcons">
            <button ref={prevRef} className="swiper-button-prev"><IoIosArrowBack /></button>
            <button ref={nextRef} className="swiper-button-next"><IoIosArrowForward /></button>
          </div>
    </div>
  );
}
