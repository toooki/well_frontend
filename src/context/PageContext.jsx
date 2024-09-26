import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

export const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const { isLogin } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState('login');
  const [previousPage, setPreviousPage] = useState(null);

  useEffect(() => {
    if (isLogin) {
      setCurrentPage('dashboard');
    }
  }, [isLogin]);

  useEffect(() => {
    console.log('currentPage:', currentPage);
  }, [currentPage]);

  const changePage = (newPage) => {
    setPreviousPage(currentPage);
    setCurrentPage(newPage);
  };

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage, changePage }}>
      {children}
    </PageContext.Provider>
  );
};