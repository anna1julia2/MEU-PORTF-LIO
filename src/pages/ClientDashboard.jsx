import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserCheck, Heart, Calendar, CheckCircle2, Clock, MapPin, Camera, ArrowRight, MessageSquare } from 'lucide-react';

const ClientDashboard = ({ onExplorePortfolio, onBookPhotographer }) => {
  const { user, bookings, portfolioItems, favorites, toggleFavorite } = useAuth();
  const [activeTab, setActiveTab] = useState('my_bookings');

  // Filter client's own bookings and favorited items
  const myBookings = bookings.filter(b => b.clientEmail === user?.email || b.clientName === user?.name);
  const myFavorites = portfolioItems.filter(item => favorites.includes(item.id));

  return (
    <div style={{ padding: '3rem 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Client Top Header */}
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              <img
                src={user?.avatar}
                alt={user?.name}
                style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent-cyan)' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>
                    {user?.name}
                  </h1>
                  <span className="badge badge-cyan">Cliente VIP</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ padding: '0.8rem 1.4rem', background: 'rgba(255,255,255,0.04)', borderRadius: '14px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{myBookings.length}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Ensaios Solicitados</div>
              </div>
              <div style={{ padding: '0.8rem 1.4rem', background: 'rgba(255,255,255,0.04)', borderRadius: '14px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ef4444' }}>{myFavorites.length}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Favoritos</div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Subtabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <button
            onClick={() => setActiveTab('my_bookings')}
            style={{
              padding: '0.7rem 1.3rem',
              borderRadius: '12px',
              border: activeTab === 'my_bookings' ? '1px solid var(--accent-cyan)' : '1px solid transparent',
              background: activeTab === 'my_bookings' ? 'rgba(0, 242, 254, 0.15)' : 'transparent',
              color: activeTab === 'my_bookings' ? 'var(--accent-cyan)' : 'var(--text-muted)',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Calendar size={18} />
            <span>Minhas Solicitações de Ensaio ({myBookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            style={{
              padding: '0.7rem 1.3rem',
              borderRadius: '12px',
              border: activeTab === 'favorites' ? '1px solid #ef4444' : '1px solid transparent',
              background: activeTab === 'favorites' ? 'rgba(239, 68, 68, 0.15)' : 'transparent',
              color: activeTab === 'favorites' ? '#fca5a5' : 'var(--text-muted)',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Heart size={18} />
            <span>Portfólios Salvos ({myFavorites.length})</span>
          </button>
        </div>

        {/* TAB 1: My Booking Requests */}
        {activeTab === 'my_bookings' && (
          <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
              Histórico de Orçamentos & Agendamentos
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '2rem' }}>
              Acompanhe a resposta dos fotógrafos e o status de aprovação dos seus ensaios.
            </p>

            {myBookings.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <Camera size={48} color="var(--text-muted)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '0.4rem' }}>Você ainda não possui orçamentos solicitados</h3>
                <p style={{ marginBottom: '1.5rem' }}>Navegue pela galeria de ensaios ou lista de fotógrafos e peça seu primeiro orçamento!</p>
                <button className="btn btn-primary" onClick={onExplorePortfolio}>
                  Explorar Portfólio
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {myBookings.map(b => (
                  <div
                    key={b.id}
                    style={{
                      padding: '1.5rem',
                      borderRadius: '16px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
                          Fotógrafo: {b.photographerName}
                        </span>
                        <span className={`badge ${b.status === 'Aprovado' ? 'badge-gold' : b.status === 'Recusado' ? 'badge-purple' : 'badge-cyan'}`}>
                          {b.status}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.9rem', color: 'var(--accent-gold-light)', fontWeight: 600, marginBottom: '0.4rem' }}>
                        Serviço: {b.serviceType}
                      </div>

                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', flexWrap: 'wrap', gap: '1.2rem' }}>
                        <span>📅 Data Prevista: <strong>{b.date}</strong></span>
                        <span>📍 Local: <strong>{b.location}</strong></span>
                        <span>💰 Estimativa: <strong>{b.budgetEstimate}</strong></span>
                      </div>
                    </div>

                    <div>
                      <button className="btn btn-outline btn-sm">
                        <MessageSquare size={16} /> Contatar Fotógrafo
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Favorite Portfolios */}
        {activeTab === 'favorites' && (
          <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.5rem' }}>
              Seus Trabalhos & Ensaios Salvos
            </h2>

            {myFavorites.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                Nenhum portfólio salvo nos favoritos ainda. Clique no ícone de coração nos ensaios para salvar!
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem'
              }}>
                {myFavorites.map(item => (
                  <div key={item.id} style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-color)',
                    position: 'relative'
                  }}>
                    <img src={item.mediaUrl} alt={item.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      style={{
                        position: 'absolute',
                        top: '0.6rem',
                        right: '0.6rem',
                        background: 'rgba(0,0,0,0.7)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Heart size={16} fill="#ef4444" color="#ef4444" />
                    </button>
                    <div style={{ padding: '1rem' }}>
                      <span className="badge badge-gold" style={{ fontSize: '0.68rem', marginBottom: '0.4rem' }}>{item.category}</span>
                      <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{item.title}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.photographerName}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default ClientDashboard;
