'use client';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState({
    user: null,
    token: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = localStorage.getItem('userAuth');
      if (data) {
        const parsedData = JSON.parse(data);
        
        try {
         
            setUserAuth({
              user: parsedData.user,
            });
         
        } catch (error) {
          console.error('Error fetching token:', error);
        }
      }
    };

    fetchData();
  }, []);


  return (
    <AuthContext.Provider value={[userAuth, setUserAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
