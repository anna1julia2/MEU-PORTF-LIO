import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Camera, User, LogOut, LayoutDashboard, Heart, Calendar, PlusCircle, Sparkles } from 'lucide-react';

const Navbar = ({ onOpenAuth, activeTab, setActiveTab }) => {
  const { user, logout, favorites } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="glass-nav" style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%',
      padding: '1rem 0'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.7rem',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #d4af37, #aa8620)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)'
          }}>
            <Camera size={24} color="#000000" strokeWidth={2.2} />
          </div>
          <div>
            <div style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              fontFamily: "'Outfit', sans-serif",
              color: '#ffffff',
              lineHeight: 1.1
            }}>
              LUMINA<span style={{ color: '#d4af37' }}>FRAME</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#94a3b8', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Portfólio & Cinema Studio
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }}>
          <button 
            onClick={() => setActiveTab('home')}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === 'home' ? '#d4af37' : '#cbd5e1',
              fontWeight: activeTab === 'home' ? '700' : '500',
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'var(--transition-fast)'
            }}
          >
            Início
          </button>

          <button 
            onClick={() => setActiveTab('portfolio')}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === 'portfolio' ? '#d4af37' : '#cbd5e1',
              fontWeight: activeTab === 'portfolio' ? '700' : '500',
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'var(--transition-fast)'
            }}
          >
            Galeria & Portfólio
          </button>

          <button 
            onClick={() => setActiveTab('photographers')}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === 'photographers' ? '#d4af37' : '#cbd5e1',
              fontWeight: activeTab === 'photographers' ? '700' : '500',
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'var(--transition-fast)'
            }}
          >
            Fotógrafos & Proposta
          </button>

          {user && (
            <button 
              onClick={() => setActiveTab('dashboard')}
              style={{
                background: activeTab === 'dashboard' ? 'rgba(212, 175, 55, 0.15)' : 'none',
                border: activeTab === 'dashboard' ? '1px solid rgba(212, 175, 55, 0.4)' : 'none',
                color: activeTab === 'dashboard' ? '#f5e4a8' : '#cbd5e1',
                padding: '0.4rem 0.9rem',
                borderRadius: '10px',
                fontWeight: '600',
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'var(--transition-fast)'
              }}
            >
              <LayoutDashboard size={16} color="#d4af37" />
              {user.role === 'photographer' ? 'Painel do Fotógrafo' : 'Meu Painel Cliente'}
            </button>
          )}
        </nav>

        {/* User / Auth Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
              <div 
                onClick={() => setActiveTab('dashboard')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '30px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer'
                }}
              >
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} 
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>{user.name}</span>
                  <span className={`badge ${user.role === 'photographer' ? 'badge-gold' : 'badge-cyan'}`} style={{ fontSize: '0.62rem', padding: '0.1rem 0.4rem' }}>
                    {user.role === 'photographer' ? 'Fotógrafo Pro' : 'Cliente'}
                  </span>
                </div>
              </div>

              <button 
                onClick={logout}
                title="Sair da Conta"
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#ef4444',
                  padding: '0.55rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition-fast)'
                }}
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button 
              className="btn btn-primary"
              onClick={onOpenAuth}
            >
              <User size={18} />
              <span>Entrar / Cadastrar</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
