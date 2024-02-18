'use client';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = localStorage.getItem('auth');
      if (data) {
        const parsedData = JSON.parse(data);
        
        try {
          const res = await axios.get("/api/auth/token");
          if (res.data.success) {
            setAuth({
              user: parsedData.user,
              token: parsedData.token,
            });
          } else {
            console.log('Token retrieval failed or no token value.');
          }
        } catch (error) {
          console.error('Error fetching token:', error);
        }
      }
    };

    fetchData();
  }, []);


  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
