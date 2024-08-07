import React from 'react'
import { games } from '../data';
import MainCard from './MainCard';
import { SlArrowRight } from "react-icons/sl";

export default function CollectionSection({category}) {
  let filterdgames = games.filter((x) => x.category === category[0]);
  return (
    <div className="collectionSection">
      <div className="title">
        <h3>{category[1]}</h3>
        <SlArrowRight />
      </div>
      <div className='holder'>
        {filterdgames.slice(0, 5).map((Game) => (
          <MainCard data={Game} showPrice={true} sale='relative'/>
        ))}
      </div>
    </div>
  );
}