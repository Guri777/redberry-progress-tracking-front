import '@/App.css';
import { NavButton } from '@/types';

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import Home from '@/pages/Home';
import Nav from '@/Components/Layout/Nav';
import CreateTask from './pages/CreateTask';
import UserFormModal from './Components/UserFormModal';
import { useSearchParams } from 'react-router-dom';

function App() {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const openUserModal = () => {
    const params = new URLSearchParams(window.location.search);
    params.set('user-modal-open', 'true');
    window.history.pushState({}, '', `?${params.toString()}`);
    setIsUserModalOpen(true);
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleUserModalClose = () => {
    searchParams.delete('user-modal-open');
    setSearchParams(searchParams);
    setIsUserModalOpen(false);
  };

  useEffect(() => {
    if (searchParams.get('user-modal-open') === 'true') {
      setIsUserModalOpen(true);
    }
  }, [searchParams]);
  const buttons: NavButton[] = [
    {
      text: 'თანამშრომლის შექმნა',
      variant: 'outlined',
      onClick: openUserModal,
    },
    {
      text: 'შექმენი ახალი დავალება',
      prefix: '+ ',
      sx: { color: 'white' },
      onClick: () => {navigate('/create-task')}
    },
  ];
  return (
    <>
      <Nav buttons={buttons} />
      <UserFormModal open={isUserModalOpen} onClose={handleUserModalClose} />

      <Routes>
        <Route
          path='/'
          element={
            <Home
              isUserModalOpen={isUserModalOpen}
              setIsUserModalOpen={setIsUserModalOpen}
            />
          }
        />
        <Route
          path='create-task'
          element={<CreateTask openUserModal={openUserModal} />}
        />
      </Routes>
    </>
  );
}

export default App;
