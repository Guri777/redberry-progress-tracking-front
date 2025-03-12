import '@/App.css';
import { NavButton } from '@/types';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from '@/pages/Home';
import Nav from '@/Components/Layout/Nav';

function App() {
  const buttons: NavButton[] = [
    { text: 'თანამშრომლის შექმნა', variant: 'outlined' },
    { text: 'შექმენი ახალი დავალება', prefix: '+ ', sx: { color: 'white' } },
  ];
  return (
    <Router>
      <Nav buttons={buttons} />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
