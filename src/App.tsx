import '@/App.css';
import { NavButton } from '@/types';

import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';

import Home from '@/pages/Home';
import Nav from '@/Components/Layout/Nav';
import CreateTask from './pages/CreateTask';
import UserFormModal from './Components/UserFormModal';
import { useSearchParams } from 'react-router-dom';
import TaskSingle from './pages/TaskSingle';
import { motion, AnimatePresence } from 'framer-motion';

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
      sx: { fontSize: 16 },
      onClick: openUserModal,
    },
    {
      text: 'შექმენი ახალი დავალება',
      prefix: '+ ',
      sx: { color: 'white', fontSize: 16 },
      onClick: () => {
        navigate('/create-task');
      },
    },
  ];

  return (
    <>
      <Nav buttons={buttons} />
      <UserFormModal open={isUserModalOpen} onClose={handleUserModalClose} />

      <AnimatePresence>
        <Routes>
          <Route
            path='/'
            element={
              <motion.div
                key='home'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Home
                  isUserModalOpen={isUserModalOpen}
                  setIsUserModalOpen={setIsUserModalOpen}
                />
              </motion.div>
            }
          />
          <Route
            path='create-task'
            element={
              <motion.div
                key='create-task'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CreateTask openUserModal={openUserModal} />
              </motion.div>
            }
          />
          <Route
            path='task/:taskId'
            element={
              <motion.div
                key='task-single'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TaskSingle />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
