import React from 'react';
import { Camera, Film, Sparkles, UserCheck, ArrowRight, ShieldCheck, Star, Play } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Hero = ({ onExplorePortfolio, onExplorePhotographers, onOpenAuth }) => {
  const { user } = useAuth();

  return (
    <section style={{
      position: 'relative',
      padding: '4.5rem 0 5rem 0',
      overflow: 'hidden',
      borderBottom: '1px solid var(--border-color)'
    }}>
      {/* Background glowing spheres */}
      <div className="glow-ambient" style={{
        top: '-10%',
        left: '15%',
        width: '450px',
        height: '450px',
        background: 'rgba(212, 175, 55, 0.15)'
      }}></div>
      <div className="glow-ambient" style={{
        bottom: '5%',
        right: '10%',
        width: '500px',
        height: '500px',
        background: 'rgba(0, 242, 254, 0.12)'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center'
        }}>
          {/* Left Column: Text Content */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem' }}>
              <span className="badge badge-gold">
                <Sparkles size={14} /> Estúdio Autoral & Marketplace
              </span>
              <span className="badge badge-cyan">
                <Film size={14} /> Cinema 4K
              </span>
            </div>

            <h1 style={{
              fontSize: '3.2rem',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              letterSpacing: '-0.03em'
            }}>
              Portfólio Profissional para <span className="text-gold">Fotografia</span>, <span className="text-cyan">Filmagens</span> & Ensaios.
            </h1>

            <p style={{
              fontSize: '1.15rem',
              color: 'var(--text-muted)',
              marginBottom: '2.2rem',
              maxWidth: '560px'
            }}>
              Exiba seu portfólio criativo em uma plataforma de alto padrão visual ou encontre e contrate os melhores fotógrafos e videomakers para o seu ensaio perfeito.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.8rem' }}>
              <button 
                className="btn btn-primary btn-lg"
                onClick={onExplorePortfolio}
              >
                <span>Explorar Portfólio</span>
                <ArrowRight size={18} />
              </button>

              <button 
                className="btn btn-outline btn-lg"
                onClick={onExplorePhotographers}
              >
                <UserCheck size={18} color="#00f2fe" />
                <span>Contratar Fotógrafo</span>
              </button>

              {!user && (
                <button 
                  className="btn btn-cyan btn-lg"
                  onClick={() => onOpenAuth('photographer')}
                  style={{ width: '100%', marginTop: '0.4rem' }}
                >
                  <Camera size={18} />
                  <span>Cadastrar Meu Portfólio Pro</span>
                </button>
              )}
            </div>

            {/* Quick Metrics */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
              paddingTop: '1.8rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>250+</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ensaios Publicados</div>
              </div>
              <div style={{ width: '1px', height: '35px', background: 'var(--border-color)' }}></div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-gold)' }}>4K HDR</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Filmagens em Alta Res.</div>
              </div>
              <div style={{ width: '1px', height: '35px', background: 'var(--border-color)' }}></div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  4.9 <Star size={18} fill="#00f2fe" color="#00f2fe" />
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Avaliação dos Clientes</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div style={{ position: 'relative' }}>
            <div className="glass-panel" style={{
              position: 'relative',
              padding: '0.8rem',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(212, 175, 55, 0.2)'
            }}>
              <div style={{ position: 'relative', height: '420px', borderRadius: '18px', overflow: 'hidden' }}>
                <img 
                  src="/hero_photography.png" 
                  alt="Fotografia em Destaque" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                />
                
                {/* Overlay Badge */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'rgba(9, 10, 15, 0.85)',
                  backdropFilter: 'blur(10px)',
                  padding: '0.5rem 1rem',
                  borderRadius: '30px',
                  border: '1px solid var(--border-glow)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Sparkles size={16} color="#d4af37" />
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f5e4a8' }}>
                    Ensaio da Semana
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.5rem',
                  background: 'linear-gradient(to top, rgba(9, 10, 15, 0.95), transparent)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end'
                }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                      Golden Hour Fine Art
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                      Por Elena Rostova (Fotógrafa Pro)
                    </p>
                  </div>
                  <button 
                    onClick={onExplorePortfolio}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'var(--accent-gold)',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 0 15px rgba(212, 175, 55, 0.5)'
                    }}
                  >
                    <Play size={18} color="#000000" fill="#000000" style={{ marginLeft: '2px' }} />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
