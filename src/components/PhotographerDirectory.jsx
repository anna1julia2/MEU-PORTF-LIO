import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Star, MapPin, Phone, CheckCircle2, UserCheck, Camera, Film, ArrowRight, Share2 } from 'lucide-react';

const PhotographerDirectory = ({ onSelectPhotographer }) => {
  const { photographers } = useAuth();
  const [filterSpecialty, setFilterSpecialty] = useState('all');

  const filteredPhotographers = photographers.filter(p => {
    if (filterSpecialty === 'all') return true;
    return p.specialty.toLowerCase().includes(filterSpecialty.toLowerCase());
  });

  return (
    <section className="section-padding" style={{ position: 'relative', background: 'rgba(12, 14, 21, 0.6)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <span className="badge badge-cyan" style={{ marginBottom: '0.8rem' }}>
            <UserCheck size={14} /> Profissionais Credenciados
          </span>
          <h2 className="section-title">
            Encontre o <span className="text-cyan">Fotógrafo ou Videomaker Ideal</span>
          </h2>
          <p className="section-subtitle">
            Conheça os profissionais por trás das lentes, analise especialidades e solicite orçamentos para o seu ensaio ou evento.
          </p>
        </div>

        {/* Directory Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {filteredPhotographers.map(pro => (
            <div
              key={pro.id}
              className="glass-panel"
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease'
              }}
            >
              {/* Cover Banner Header */}
              <div>
                <div style={{ position: 'relative', height: '140px', overflow: 'hidden' }}>
                  <img
                    src={pro.coverImage}
                    alt={pro.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '0.8rem',
                    right: '0.8rem',
                    background: 'rgba(9, 10, 15, 0.85)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.3rem 0.7rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#00f2fe',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}>
                    <Star size={14} fill="#00f2fe" color="#00f2fe" />
                    {pro.rating} ({pro.reviewsCount} avaliações)
                  </div>
                </div>

                {/* Avatar & Title Info */}
                <div style={{ padding: '0 1.5rem', marginTop: '-40px', position: 'relative', zIndex: 2 }}>
                  <img
                    src={pro.avatar}
                    alt={pro.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid var(--accent-gold)',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.6)'
                    }}
                  />

                  <div style={{ marginTop: '0.8rem' }}>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {pro.name} <CheckCircle2 size={18} color="#d4af37" />
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--accent-gold-light)', fontWeight: 600, marginBottom: '0.4rem' }}>
                      {pro.title}
                    </p>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
                      <MapPin size={14} color="#00f2fe" /> {pro.location}
                    </div>
                  </div>
                </div>

                {/* Bio & Details */}
                <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.2rem', lineHeight: 1.5 }}>
                    {pro.bio}
                  </p>

                  <div style={{
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    marginBottom: '1.2rem'
                  }}>
                    <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.2rem' }}>Equipamentos / Rig:</strong>
                    {pro.equipment}
                  </div>
                </div>
              </div>

              {/* Card Footer: Price & Hire CTA */}
              <div style={{
                padding: '1.2rem 1.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(9, 10, 15, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Ensaios a partir de</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-gold-light)' }}>
                    R$ {pro.startingPrice.toLocaleString('pt-BR')}
                  </span>
                </div>

                <button
                  className="btn btn-cyan btn-sm"
                  onClick={() => onSelectPhotographer(pro)}
                >
                  <UserCheck size={16} />
                  <span>Orçamento</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotographerDirectory;
