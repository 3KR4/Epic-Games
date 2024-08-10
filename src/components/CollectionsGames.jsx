
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules'; // Import Pagination

import CollectionSection from './CollectionSection';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SlArrowRight } from "react-icons/sl";

import { games } from '../data';
import MainCard from './MainCard';

export default function CollectionGames({onlyOne, first, second, third }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [filterdGames , setFilterdGames] = useState([])

  useEffect(() => {
    axios.get(`https://game-ecommrece-backend.onrender.com/api/products?populate=*&pagination[page]=1&pagination[pageSize]=25&filters[categories][name][$containsi]=${onlyOne}`)
      .then(response => {
        setFilterdGames(response.data.data);
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


function chunkArray(array, chunkSize) {
  let result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

let chunkedArrays = chunkArray(filterdGames, 5);

let firstArray = chunkedArrays[0] || [];
let secondArray = chunkedArrays[1] || [];
let thirdArray = chunkedArrays[2] || [];

  
  return (
    <div className="collections">
      {onlyOne &&
        <div className="title onlyOneColection">
          <h3>{onlyOne}</h3>
          <SlArrowRight />
        </div>
      }
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
        {onlyOne ? (
          <>
            <SwiperSlide className='collectionSection' key={1}>
              {firstArray.map((Game) => (
                <MainCard data={Game} showPrice={true} sale='relative'/>
              ))}
            </SwiperSlide>

            <SwiperSlide className='collectionSection' key={2}>
              {secondArray.map((Game) => (
                <MainCard data={Game} showPrice={true} sale='relative'/>
              ))}
            </SwiperSlide>

            <SwiperSlide className='collectionSection' key={3}>
              {thirdArray.map((Game) => (
                <MainCard data={Game} showPrice={true} sale='relative'/>
              ))}
            </SwiperSlide>
          </>
        ) : (
          <>
            <SwiperSlide key={1}>
              <CollectionSection category={first} />
            </SwiperSlide>
            <SwiperSlide key={2}>
              <CollectionSection category={second} />
            </SwiperSlide>
            <SwiperSlide key={3}>
              <CollectionSection category={third} />
            </SwiperSlide>
          </>
        )}

      </Swiper>
      <div className="navigateIcons">
            <button ref={prevRef} className="swiper-button-prev"><IoIosArrowBack /></button>
            <button ref={nextRef} className="swiper-button-next"><IoIosArrowForward /></button>
          </div>
    </div>
  );
}
