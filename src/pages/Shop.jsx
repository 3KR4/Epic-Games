import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../css/shop.css';
import GamesSwiper from '../components/GamesSwiper';
import { FaAngleDown } from "react-icons/fa6";
import MainCard from '../components/MainCard';
import { useAllContext } from "../Context";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";

export default function Shop() {
  const [openSelect, setOpenSelect] = useState(false);
  const [games, setGames] = useState([]);
  const [allCat, setAllCat] = useState([]);
  const [sortOption, setSortOption] = useState('All'); // Default sort option
  const [pageCount, setPageCount] = useState(0); // For pagination
  const [currentPage, setCurrentPage] = useState(0); // Current page number

  const { selectedCat } = useAllContext();
  const pageSize = 18; // Number of items per page

  const handleSortChange = (sort) => {
    setSortOption(sort);
    setOpenSelect(false); // Close the dropdown after selecting
  };

  const fetchGames = (page) => {
    let url = `https://game-ecommrece-backend.onrender.com/api/products?populate=*&pagination[page]=${page + 1}&pagination[pageSize]=${pageSize}`;

    if (selectedCat && selectedCat !== 'All') {
      url += `&filters[categories][name][$containsi]=${selectedCat}`;
    }

    if (sortOption === 'price:High to Low') {
      url += `&sort=price:desc`;
    } else if (sortOption === 'price:Low to High') {
      url += `&sort=price:asc`;
    }

    axios.get(url)
      .then(response => {
        setGames(response.data.data);
        setPageCount(response.data.meta.pagination.pageCount); // Assuming the API returns total pages info
      })
      .catch(error => {
        console.error('Error fetching games:', error);
      });
  };

  useEffect(() => {
    fetchGames(currentPage); // Fetch games for the current page
  }, [selectedCat, sortOption, currentPage]);

  useEffect(() => {
    axios.get(`https://game-ecommrece-backend.onrender.com/api/categories`)
      .then(response => {
        setAllCat(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  
  return (
    <>
      <div className='Browse'>
        <GamesSwiper loop='Category' data={allCat} title="All Category"/>
        <div className='BrowseSection'>
          <div className='filter'>
            <div className="holder-Browse" onClick={() => setOpenSelect(!openSelect)}>
              <h4>Sort by :</h4>
              <div className="value-holder">
                <h4>{sortOption}  <FaAngleDown /></h4> 
              </div>
            </div>
            <ul className={`categorie-Browse ${openSelect ? 'active' : ''}`}>
              <li onClick={() => handleSortChange('All')} data-sort="All">All</li>
              <li onClick={() => handleSortChange('price:High to Low')} data-sort="price:High to Low">Price: High to Low</li>
              <li onClick={() => handleSortChange('price:Low to High')} data-sort="price:Low to High">Price: Low to High</li>
            </ul>
          </div>
          <div className='containerGames'>
            {games.length > 0 ? (
              games.map((game) => (
                <MainCard key={game.id} data={game} showPrice={true}/>
              ))
            ) : (
              <p>No games found.</p>
            )}
          </div>

          {/* Pagination */}
          <ReactPaginate
            previousLabel={<FaAngleDoubleLeft/>}
            nextLabel={<FaAngleDoubleRight/>}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            previousLinkClassName={"previous_page"}
            nextLinkClassName={"next_page"}
            disabledClassName={"disabled"}
            breakClassName={"break-me"}
          />
        </div>
      </div>
    </>
  );
}
