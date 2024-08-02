import './css/master.css';
import Nav from './components/Nav'
import Header from './components/Header'
import Store from './pages/Store';
import Library from './pages/Library';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <Nav/>
      <div className='main'>
        <Header/>
        <Routes>
          <Route index element={<Store/>} />
          <Route path="/store" element={<Store/>} />
          <Route path="/library" element={<Library/>} />
        </Routes> 
      </div>

    </div>
  );
}

export default App;
