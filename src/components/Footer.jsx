import React from 'react';
import { Camera, Heart, Sparkles, Share2, Video, Globe } from 'lucide-react';

const Footer = ({ onNavigate }) => {
  return (
    <footer style={{
      background: '#06070a',
      borderTop: '1px solid var(--border-color)',
      padding: '4rem 0 2rem 0',
      color: 'var(--text-muted)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #d4af37, #aa8620)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Camera size={20} color="#000000" />
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', fontFamily: "'Outfit', sans-serif" }}>
                LUMINA<span style={{ color: '#d4af37' }}>FRAME</span>
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              A plataforma definitiva para divulgação de portfólio profissional de fotografia, vídeos cinematográficos em 4K e contratação de ensaios.
            </p>

            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                <Globe size={18} />
              </div>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                <Video size={18} />
              </div>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                <Share2 size={18} />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Navegação</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <li>
                <button onClick={() => onNavigate('home')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>Início</button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>Galeria & Portfólios</button>
              </li>
              <li>
                <button onClick={() => onNavigate('photographers')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>Fotógrafos Credenciados</button>
              </li>
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Especialidades</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <li>Ensaios Femininos Fine Art</li>
              <li>Filmagens Cinematográficas 4K</li>
              <li>Fotografia de Casamentos</li>
              <li>Ensaios de Moda & Urban</li>
              <li>Corporativo & Perfil Executivo</li>
            </ul>
          </div>

          {/* Info Box */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Para Criadores & Clientes</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.8rem' }}>
              Fotógrafos e videomakers podem criar suas contas gratuitamente para expor trabalhos e receber contatos diretos de clientes.
            </p>
            <span className="badge badge-gold">
              <Sparkles size={12} /> Plataforma Portfólio Profissional
            </span>
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '1.8rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.82rem'
        }}>
          <div>
            © 2026 LuminaFrame Studio. Todos os direitos reservados.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Desenvolvido com <Heart size={14} color="#ef4444" fill="#ef4444" /> para Portfólio Profissional de Fotografia & Cinema
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
