import './css/master.css';

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Nav from './components/Nav'
import Header from './components/Header'
import Home from './pages/Home';
import Library from './pages/Library';
import Store from './pages/Store';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import WishList from './pages/WishList';
import SingleGamePage from './pages/SingleGamePage';         

import { Route, Routes } from 'react-router-dom';
import { useAllContext } from "./Context";
import { Provider } from 'react-redux';
import store from './Redux/store';

function App() {
  const { userLog } = useAllContext();

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Provider store={store}>
      <div className="App">
        {userLog && (<Nav/>)}
        <div className={`main ${!userLog ? 'container' : 'side'}`}>
          <Header/>
          <Routes>
            <Route index element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/store" element={<Store/>} />
            <Route path="/library" element={<Library/>} />
            <Route path="/singleGamePage/:gameId" element={<SingleGamePage/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/wishlist" element={<WishList/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
          </Routes> 
        </div>
      </div>
    </Provider>
  );
}

export default App;
