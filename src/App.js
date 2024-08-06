import './css/master.css';
import Nav from './components/Nav'
import Header from './components/Header'
import Home from './pages/Home';
import Library from './pages/Library';
import Store from './pages/Store';
import Register from './pages/Register';
import Login from './pages/Login';

import { Route, Routes } from 'react-router-dom';
import { useAllContext } from "./Context";

function App() {
  const { userLog } = useAllContext();
  return (
    <div className="App">

      {userLog && (<Nav/>)}
      <div className={`main ${!userLog ? 'container' : 'side'}`}>
        <Header/>
        <Routes>
          <Route index element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/store" element={<Store/>} />
          <Route path="/library" element={<Library/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
        </Routes> 
      </div>

    </div>
  );
}

export default App;
