import '../css/Library.css'
import React, { useState } from 'react'
import { FaAngleDown } from "react-icons/fa6";
import { AiOutlineAppstore } from "react-icons/ai";
import { AiOutlineBars } from "react-icons/ai";
import { games, discover } from '../data'
import MainCard from '../components/MainCard';

export default function Library() {

  const [openSelect,setOpenSelect] = useState(false)
  const[openflex,setOpenflex] =useState(false)

  return (
    <div className='LibrarySection'>
      <h1 className='title'>Library</h1>
      <ul className='LibraryGames'>
        <li >All</li>
        <li>Favorites</li>
      </ul>

    <div className='LibraryMain'>
      <div className='Libraryholder'>
        <div className='select'>
          <div className='filter'>
            <div className="holder" onClick={()=> {
              setOpenSelect(!openSelect)
            }}
            >
              <h4>Sortby :</h4>
              <div class="value-holder">
                <h4>Recently purchased  <FaAngleDown /></h4> 
              </div>
            </div>
            <ul className={`categorie ${ openSelect ? 'active' :''}`}>
              <li data-sort="Recently purchased">Recently purchased</li>
              <li data-sort="Alphabetical A-Z">Alphabetical A-Z</li>
              <li data-sort="Alphabetical Z-A">Alphabetical Z-A</li>
            </ul>
          </div>
          <div className='icons'>
          <AiOutlineAppstore onClick={()=> {
              setOpenflex(false)
            }}/>
          <AiOutlineBars onClick={()=> {
              setOpenflex(true)
            }}/>
          </div>
        </div>
          <div className={`containerGames ${ openflex? 'active' :''}`}>
            {games.map((games)=>(
              <MainCard data={games} showPrice={false}/>
            ))}
            
          </div>
        </div>
        <div className='filtration'>
          <h5 className='title'>Filters</h5>
        </div>
      </div>
    </div>
  )
}
