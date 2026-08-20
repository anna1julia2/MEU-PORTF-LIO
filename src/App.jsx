import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PortfolioGrid from './components/PortfolioGrid';
import PhotographerDirectory from './components/PhotographerDirectory';
import LightboxModal from './components/LightboxModal';
import AuthModal from './components/AuthModal';
import BookingModal from './components/BookingModal';
import PhotographerDashboard from './pages/PhotographerDashboard';
import ClientDashboard from './pages/ClientDashboard';
import Footer from './components/Footer';
import Toast from './components/Toast';

const MainApp = () => {
  const { user } = useAuth();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState('home');

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authRole, setAuthRole] = useState('photographer');

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedBookingPhotographer, setSelectedBookingPhotographer] = useState(null);
  const [selectedBookingPortfolio, setSelectedBookingPortfolio] = useState(null);

  const [selectedLightboxItem, setSelectedLightboxItem] = useState(null);

  const handleOpenAuth = (role = 'photographer') => {
    setAuthRole(role);
    setIsAuthOpen(true);
  };

  const handleBookItem = (item) => {
    setSelectedBookingPortfolio(item);
    setSelectedBookingPhotographer(null);
    setIsBookingOpen(true);
  };

  const handleBookPhotographer = (photographer) => {
    setSelectedBookingPhotographer(photographer);
    setSelectedBookingPortfolio(null);
    setIsBookingOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      {/* Toast Feedback */}
      <Toast />

      {/* Main Navbar */}
      <Navbar
        onOpenAuth={() => handleOpenAuth('photographer')}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Body Routing */}
      <main style={{ flex: 1 }}>
        {activeTab === 'home' && (
          <>
            <Hero
              onExplorePortfolio={() => setActiveTab('portfolio')}
              onExplorePhotographers={() => setActiveTab('photographers')}
              onOpenAuth={handleOpenAuth}
            />

            <PortfolioGrid
              onSelectItem={(item) => setSelectedLightboxItem(item)}
              onBookPhotographer={handleBookItem}
            />

            <PhotographerDirectory
              onSelectPhotographer={handleBookPhotographer}
            />
          </>
        )}

        {activeTab === 'portfolio' && (
          <PortfolioGrid
            onSelectItem={(item) => setSelectedLightboxItem(item)}
            onBookPhotographer={handleBookItem}
          />
        )}

        {activeTab === 'photographers' && (
          <PhotographerDirectory
            onSelectPhotographer={handleBookPhotographer}
          />
        )}

        {activeTab === 'dashboard' && (
          user ? (
            user.role === 'photographer' ? (
              <PhotographerDashboard />
            ) : (
              <ClientDashboard
                onExplorePortfolio={() => setActiveTab('portfolio')}
                onBookPhotographer={handleBookPhotographer}
              />
            )
          ) : (
            <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
              <div className="glass-panel" style={{ padding: '4rem 2rem', borderRadius: '24px', maxWidth: '500px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '1rem' }}>
                  Acesso Restrito ao Painel
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                  Por favor, faça login como Fotógrafo ou Cliente para acessar seu painel exclusivo.
                </p>
                <button className="btn btn-primary" onClick={() => handleOpenAuth('photographer')}>
                  Fazer Login / Cadastrar
                </button>
              </div>
            </div>
          )
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialRole={authRole}
      />

      <LightboxModal
        item={selectedLightboxItem}
        onClose={() => setSelectedLightboxItem(null)}
        onBook={handleBookItem}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        photographer={selectedBookingPhotographer}
        portfolioItem={selectedBookingPortfolio}
      />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

export default App;
