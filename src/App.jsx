import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
// import TopBar from './components/TopBar';
import Home from './views/Home';
import NewItem from './views/NewItem';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          {/* <TopBar /> */}
          <main >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new-item" element={<NewItem />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
