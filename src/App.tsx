import '@/App.css';
import { NavButton } from '@/types';

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from '@/pages/Home';
import Nav from '@/Components/Layout/Nav';

function App() {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const openUserModal = () => {
    const params = new URLSearchParams(window.location.search);
    params.set('user-modal-open', 'true');
    window.history.pushState({}, '', `?${params.toString()}`);
    setIsUserModalOpen(true);
  };
  
  const buttons: NavButton[] = [
    {
      text: 'თანამშრომლის შექმნა',
      variant: 'outlined',
      onClick: openUserModal,
    },
    { text: 'შექმენი ახალი დავალება', prefix: '+ ', sx: { color: 'white' } },
  ];
  return (
    <Router>
        <Nav buttons={buttons} />
        <Routes>
          <Route path='/' element={<Home isUserModalOpen={isUserModalOpen} setIsUserModalOpen={setIsUserModalOpen} />} />
        </Routes>
    </Router>
  );
}

export default App;
