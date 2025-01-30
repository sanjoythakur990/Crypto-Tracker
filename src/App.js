import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CoinPage from './pages/Coin';
import Compare from './pages/Compare';
import WatchList from './pages/WatchList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/coin/:id" element={<CoinPage />} />
            <Route path="/compare" element={<Compare />} />
            <Route path='/watchlist' element={<WatchList />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App
