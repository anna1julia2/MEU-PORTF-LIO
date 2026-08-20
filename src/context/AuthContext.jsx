import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PHOTOGRAPHERS, INITIAL_PORTFOLIO, INITIAL_BOOKINGS } from '../data/initialData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load saved state from localStorage if available
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('lumina_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [portfolioItems, setPortfolioItems] = useState(() => {
    const saved = localStorage.getItem('lumina_portfolio');
    return saved ? JSON.parse(saved) : INITIAL_PORTFOLIO;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('lumina_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('lumina_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [photographers, setPhotographers] = useState(INITIAL_PHOTOGRAPHERS);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('lumina_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('lumina_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('lumina_portfolio', JSON.stringify(portfolioItems));
  }, [portfolioItems]);

  useEffect(() => {
    localStorage.setItem('lumina_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('lumina_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const login = (email, password, role) => {
    let mockUser;
    if (role === 'photographer') {
      const matchPhotographer = photographers.find(p => p.phone.includes('98765') || email.includes('foto')) || photographers[0];
      mockUser = {
        id: matchPhotographer.id,
        name: matchPhotographer.name,
        email: email || 'elena.fotografia@luminaframe.com',
        role: 'photographer',
        avatar: matchPhotographer.avatar,
        title: matchPhotographer.title,
        specialty: matchPhotographer.specialty,
        bio: matchPhotographer.bio,
        location: matchPhotographer.location
      };
    } else {
      mockUser = {
        id: 'client_' + Date.now(),
        name: email.split('@')[0] || 'Cliente Premium',
        email: email || 'cliente@exemplo.com',
        role: 'client',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
      };
    }
    setUser(mockUser);
    showToast(`Bem-vindo(a) de volta, ${mockUser.name}! (Modo ${role === 'photographer' ? 'Fotógrafo Pro' : 'Cliente'})`);
    return mockUser;
  };

  const register = (userData) => {
    const newUser = {
      id: userData.role === 'photographer' ? 'photo_' + Date.now() : 'client_' + Date.now(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      avatar: userData.avatar || (userData.role === 'photographer' 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' 
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'),
      title: userData.title || (userData.role === 'photographer' ? 'Fotógrafo Professional' : ''),
      specialty: userData.specialty || (userData.role === 'photographer' ? 'Fotografia & Ensaios' : ''),
      bio: userData.bio || '',
      location: userData.location || 'São Paulo, SP'
    };

    if (userData.role === 'photographer') {
      const newPhotographer = {
        id: newUser.id,
        name: newUser.name,
        title: newUser.title,
        specialty: newUser.specialty,
        avatar: newUser.avatar,
        coverImage: '/hero_photography.png',
        rating: 5.0,
        reviewsCount: 1,
        location: newUser.location,
        bio: newUser.bio || 'Fotógrafo cadastrado na plataforma LuminaFrame.',
        equipment: 'Equipamento Câmera Mirrorless & Lentes Prime',
        instagram: '@' + newUser.name.toLowerCase().replace(/\s+/g, ''),
        phone: '(11) 90000-0000',
        startingPrice: 1000
      };
      setPhotographers(prev => [newPhotographer, ...prev]);
    }

    setUser(newUser);
    showToast(`Conta criada com sucesso como ${userData.role === 'photographer' ? 'Fotógrafo' : 'Cliente'}!`);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    showToast('Você saiu da sua conta.');
  };

  const addPortfolioItem = (newItem) => {
    const itemToAdd = {
      id: 'item_' + Date.now(),
      photographerId: user ? user.id : 'photo_1',
      photographerName: user ? user.name : 'Elena Rostova',
      photographerAvatar: user ? user.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      likes: 0,
      views: 1,
      date: new Date().toISOString().split('T')[0],
      ...newItem
    };

    setPortfolioItems(prev => [itemToAdd, ...prev]);
    showToast('Novo trabalho publicado no seu portfólio!');
    return itemToAdd;
  };

  const createBookingRequest = (bookingData) => {
    const newBooking = {
      id: 'book_' + Date.now(),
      clientName: user ? user.name : bookingData.clientName || 'Cliente Visitante',
      clientEmail: user ? user.email : bookingData.clientEmail || 'cliente@email.com',
      status: 'Pendente',
      createdAt: new Date().toISOString().split('T')[0],
      ...bookingData
    };

    setBookings(prev => [newBooking, ...prev]);
    showToast('Solicitação de orçamento enviada ao fotógrafo!');
    return newBooking;
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    showToast(`Status da solicitação atualizado para: ${newStatus}`);
  };

  const toggleFavorite = (itemId) => {
    setFavorites(prev => {
      const isFav = prev.includes(itemId);
      if (isFav) {
        showToast('Item removido dos seus favoritos');
        return prev.filter(id => id !== itemId);
      } else {
        showToast('Item salvo nos seus favoritos!');
        return [...prev, itemId];
      }
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      portfolioItems,
      bookings,
      favorites,
      photographers,
      toastMessage,
      login,
      register,
      logout,
      addPortfolioItem,
      createBookingRequest,
      updateBookingStatus,
      toggleFavorite,
      showToast
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
