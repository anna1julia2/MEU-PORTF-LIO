import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, Heart, Eye, Film, Camera, Sparkles, Filter, Tag, ArrowUpRight } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'Todos os Trabalhos' },
  { id: 'Ensaios', label: 'Ensaios Femininos & Portfólio' },
  { id: 'Filmagens', label: 'Filmagens & Cinema 4K' },
  { id: 'Casamentos', label: 'Casamentos & Casais' },
  { id: 'Moda', label: 'Moda & Urban' },
  { id: 'Corporativo', label: 'Corporativo & Perfil Pro' }
];

const PortfolioGrid = ({ onSelectItem, onBookPhotographer }) => {
  const { portfolioItems, favorites, toggleFavorite } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return portfolioItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory.toLowerCase();
      const query = searchQuery.toLowerCase();
      const matchesSearch = !query || 
        item.title.toLowerCase().includes(query) ||
        item.photographerName.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.tags.some(t => t.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [portfolioItems, selectedCategory, searchQuery]);

  return (
    <section className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.8rem' }}>
            <Camera size={14} /> Galeria de Ensaios & Cinema
          </span>
          <h2 className="section-title">
            Explore o <span className="text-gold">Portfólio Profissional</span>
          </h2>
          <p className="section-subtitle">
            Navegue pelos últimos ensaios fotográficos e vídeos cinematográficos produzidos pelos talentos da plataforma.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2.5rem',
          padding: '1.2rem',
          borderRadius: '16px',
          background: 'rgba(18, 20, 29, 0.6)',
          border: '1px solid var(--border-color)'
        }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '0.55rem 1.1rem',
                  borderRadius: '10px',
                  border: selectedCategory === cat.id ? '1px solid var(--accent-gold)' : '1px solid transparent',
                  background: selectedCategory === cat.id ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  color: selectedCategory === cat.id ? 'var(--accent-gold-light)' : 'var(--text-secondary)',
                  fontWeight: selectedCategory === cat.id ? '700' : '500',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Buscar ensaio, fotógrafo ou tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{
                paddingLeft: '2.8rem',
                fontSize: '0.88rem',
                borderRadius: '10px',
                height: '42px'
              }}
            />
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <Camera size={48} color="var(--text-muted)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '0.5rem' }}>
              Nenhum ensaio encontrado
            </h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Tente mudar o filtro de categoria ou os termos da sua busca.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {filteredItems.map(item => {
              const isFav = favorites.includes(item.id);
              const isVideo = item.mediaType === 'video';

              return (
                <div
                  key={item.id}
                  className="glass-panel"
                  style={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.6), 0 0 20px rgba(212, 175, 55, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-subtle)';
                  }}
                >
                  {/* Media Thumbnail Container */}
                  <div 
                    onClick={() => onSelectItem(item)}
                    style={{
                      position: 'relative',
                      height: '260px',
                      overflow: 'hidden',
                      background: '#090a0f'
                    }}
                  >
                    <img
                      src={item.mediaUrl}
                      alt={item.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                    />

                    {/* Media Type Badge Overlay */}
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      display: 'flex',
                      gap: '0.4rem'
                    }}>
                      <span className={`badge ${isVideo ? 'badge-cyan' : 'badge-gold'}`} style={{ backdropFilter: 'blur(8px)', background: 'rgba(9, 10, 15, 0.75)' }}>
                        {isVideo ? <Film size={12} /> : <Camera size={12} />}
                        {isVideo ? 'Filme 4K' : item.category}
                      </span>
                    </div>

                    {/* Heart / Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.id);
                      }}
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: 'rgba(9, 10, 15, 0.75)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'var(--transition-fast)'
                      }}
                    >
                      <Heart size={18} fill={isFav ? '#ef4444' : 'none'} color={isFav ? '#ef4444' : '#ffffff'} />
                    </button>

                    {/* Hover Expand Quick Action */}
                    <div style={{
                      position: 'absolute',
                      bottom: '1rem',
                      right: '1rem',
                      background: 'rgba(212, 175, 55, 0.9)',
                      color: '#000000',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '20px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
                    }}>
                      <span>Ver Ensaio</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div style={{ padding: '1.4rem' }}>
                    {/* Photographer Info */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.7rem',
                      marginBottom: '0.9rem'
                    }}>
                      <img
                        src={item.photographerAvatar}
                        alt={item.photographerName}
                        style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--accent-gold)' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>
                          {item.photographerName}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {item.exif || 'Fotógrafo Credenciado'}
                        </div>
                      </div>
                    </div>

                    <h3 
                      onClick={() => onSelectItem(item)}
                      style={{
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        marginBottom: '0.6rem',
                        lineHeight: 1.3
                      }}
                    >
                      {item.title}
                    </h3>

                    <p style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-muted)',
                      marginBottom: '1.2rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      height: '2.6em'
                    }}>
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.2rem' }}>
                      {item.tags.map((tag, idx) => (
                        <span key={idx} style={{
                          fontSize: '0.72rem',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: '#cbd5e1',
                          border: '1px solid rgba(255, 255, 255, 0.08)'
                        }}>
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Card Footer: Price & Hire CTA */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Estimativa</span>
                        <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-gold-light)' }}>
                          R$ {item.priceEstimate.toLocaleString('pt-BR')}
                        </span>
                      </div>

                      <button
                        className="btn btn-outline btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onBookPhotographer(item);
                        }}
                      >
                        <span>Contratar</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioGrid;
