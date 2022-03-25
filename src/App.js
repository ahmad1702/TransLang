import React, { useState, useRef, useEffect } from 'react'
// import logo from './logo.svg';
import './App.scss';
import { Link, Routes, Route } from 'react-router-dom'

//Components
import Translation from './components/Translation/Translation';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Translation />}/>
        <Route path="*" element={<Translation />} />
      </Routes>
      {/* <div className="cred">
          <p>By Ahmad Sandid - </p>
          <a href="https://www.ahmadsandid.com" target='_blank'>Check out my portfolio</a>
      </div> */}
    </div>
  );
}

export default App;
