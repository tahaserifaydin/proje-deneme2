import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan kullanıcı bilgilerini ve favorileri al
    const savedUser = localStorage.getItem('user');
    const savedFavorites = localStorage.getItem('favorites');
    
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    // Kullanıcı bilgilerini localStorage'a kaydet
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    // Kullanıcı bilgilerini localStorage'dan sil
    localStorage.removeItem('user');
  };

  const toggleFavorite = (hotel) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.id === hotel.id);
      const newFavorites = isFavorite
        ? prevFavorites.filter(fav => fav.id !== hotel.id)
        : [...prevFavorites, hotel];
      
      // Favorileri localStorage'a kaydet
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isHotelFavorite = (hotelId) => {
    return favorites.some(fav => fav.id === hotelId);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout,
      favorites,
      toggleFavorite,
      isHotelFavorite
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 