import React from 'react';
import { X, Heart, Calendar, Camera, Film, CheckCircle2, UserCheck, DollarSign, Tag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LightboxModal = ({ item, onClose, onBook }) => {
  const { favorites, toggleFavorite } = useAuth();
  if (!item) return null;

  const isFav = favorites.includes(item.id);
  const isVideo = item.mediaType === 'video';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '94%',
          maxWidth: '1080px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '24px',
          padding: '0',
          position: 'relative',
          background: '#0e1017',
          border: '1px solid var(--border-glow)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.2rem',
            right: '1.2rem',
            zIndex: 10,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(9, 10, 15, 0.8)',
            border: '1px solid var(--border-color)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)'
          }}
        >
          <X size={20} />
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'stretch'
        }}>
          {/* Left Media Column */}
          <div style={{
            background: '#05060a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            position: 'relative',
            minHeight: '400px'
          }}>
            {isVideo && item.videoEmbed ? (
              <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '14px', overflow: 'hidden' }}>
                <iframe
                  src={item.videoEmbed}
                  title={item.title}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <img
                src={item.mediaUrl}
                alt={item.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  borderRadius: '14px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.8)'
                }}
              />
            )}
          </div>

          {/* Right Details Column */}
          <div style={{ padding: '2.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Category & Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
                <span className={`badge ${isVideo ? 'badge-cyan' : 'badge-gold'}`}>
                  {isVideo ? <Film size={12} /> : <Camera size={12} />}
                  {item.category}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {item.date}
                </span>
              </div>

              {/* Title */}
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', lineHeight: 1.2 }}>
                {item.title}
              </h2>

              {/* Photographer Info Box */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.9rem',
                padding: '0.9rem 1.1rem',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-color)',
                marginBottom: '1.5rem'
              }}>
                <img
                  src={item.photographerAvatar}
                  alt={item.photographerName}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-gold)' }}
                />
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    {item.photographerName} <CheckCircle2 size={16} color="#d4af37" />
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Fotógrafo Credenciado LuminaFrame
                  </div>
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                {item.description}
              </p>

              {/* Technical EXIF Details */}
              {item.exif && (
                <div style={{
                  padding: '0.8rem 1rem',
                  borderRadius: '10px',
                  background: 'rgba(0, 242, 254, 0.05)',
                  border: '1px solid rgba(0, 242, 254, 0.15)',
                  marginBottom: '1.5rem',
                  fontSize: '0.82rem',
                  color: 'var(--accent-cyan)'
                }}>
                  <strong>Parâmetros Técnicos / EXIF:</strong> {item.exif}
                </div>
              )}

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '2rem' }}>
                {item.tags.map((tag, idx) => (
                  <span key={idx} style={{
                    fontSize: '0.78rem',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    color: '#cbd5e1'
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '1.4rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Valor Médio Ensaio</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-gold-light)' }}>
                  R$ {item.priceEstimate.toLocaleString('pt-BR')}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="btn btn-outline"
                  style={{ padding: '0.8rem' }}
                >
                  <Heart size={20} fill={isFav ? '#ef4444' : 'none'} color={isFav ? '#ef4444' : '#ffffff'} />
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    onClose();
                    onBook(item);
                  }}
                >
                  <UserCheck size={18} />
                  <span>Contratar Ensaio</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightboxModal;
