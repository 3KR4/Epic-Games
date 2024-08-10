import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainCard from './MainCard';
import { SlArrowRight } from "react-icons/sl";

export default function CollectionSection({category}) {

  const [filterdGames , setFilterdGames] = useState([])

  useEffect(() => {
    axios.get(`https://game-ecommrece-backend.onrender.com/api/products?populate=*&pagination[page]=1&pagination[pageSize]=25&filters[categories][name][$containsi]=${category[0]}`)
    
      .then(response => {
        setFilterdGames(response.data.data);
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="collectionSection">
      <div className="title">
        <h3>{category[1]}</h3>
        <SlArrowRight />
      </div>
      <div className='holder'>
        {filterdGames.slice(0, 5).map((Game) => (
          <MainCard data={Game} showPrice={true} sale='relative'/>
        ))}
      </div>
    </div>
  );
}