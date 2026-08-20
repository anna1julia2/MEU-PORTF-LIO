import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Camera, User, Lock, Mail, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, initialRole = 'photographer' }) => {
  const { login, register } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  const [role, setRole] = useState(initialRole);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    title: '',
    specialty: 'Ensaios & Fotografia',
    location: 'São Paulo, SP',
    bio: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginView) {
      login(formData.email || 'fotografo@luminaframe.com', formData.password || '123456', role);
    } else {
      register({
        name: formData.name || (role === 'photographer' ? 'Novo Fotógrafo Pro' : 'Novo Cliente'),
        email: formData.email || 'usuario@luminaframe.com',
        password: formData.password,
        role: role,
        title: formData.title || (role === 'photographer' ? 'Fotógrafo Fine Art & Cinema' : ''),
        specialty: formData.specialty,
        location: formData.location,
        bio: formData.bio
      });
    }
    onClose();
  };

  const handleQuickLogin = (demoRole) => {
    login(
      demoRole === 'photographer' ? 'elena.fotografia@luminaframe.com' : 'mariana.cliente@exemplo.com',
      'demo123',
      demoRole
    );
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '92%',
          maxWidth: '520px',
          borderRadius: '24px',
          padding: '2.5rem',
          position: 'relative',
          background: '#0d0e15',
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
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-color)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #d4af37, #aa8620)',
            margin: '0 auto 1rem auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)'
          }}>
            <Camera size={28} color="#000000" />
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
            {isLoginView ? 'Acessar Plataforma' : 'Criar Sua Conta'}
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            {isLoginView 
              ? 'Selecione a sua modalidade de login abaixo:' 
              : 'Cadastre-se para divulgar seu portfólio ou contratar ensaios:'}
          </p>
        </div>

        {/* Role Selector Tabs (Fotógrafo vs Cliente) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.6rem',
          padding: '0.3rem',
          borderRadius: '14px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid var(--border-color)',
          marginBottom: '1.8rem'
        }}>
          <button
            type="button"
            onClick={() => setRole('photographer')}
            style={{
              padding: '0.75rem',
              borderRadius: '10px',
              border: role === 'photographer' ? '1px solid var(--accent-gold)' : '1px solid transparent',
              background: role === 'photographer' ? 'rgba(212, 175, 55, 0.2)' : 'transparent',
              color: role === 'photographer' ? 'var(--accent-gold-light)' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'var(--transition-fast)'
            }}
          >
            <Camera size={16} />
            <span>Sou Fotógrafo</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('client')}
            style={{
              padding: '0.75rem',
              borderRadius: '10px',
              border: role === 'client' ? '1px solid var(--accent-cyan)' : '1px solid transparent',
              background: role === 'client' ? 'rgba(0, 242, 254, 0.2)' : 'transparent',
              color: role === 'client' ? 'var(--accent-cyan)' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'var(--transition-fast)'
            }}
          >
            <User size={16} />
            <span>Sou Cliente</span>
          </button>
        </div>

        {/* Quick Demo Login Shortcut */}
        <div style={{
          marginBottom: '1.5rem',
          padding: '0.9rem',
          borderRadius: '12px',
          background: 'rgba(212, 175, 55, 0.08)',
          border: '1px dashed rgba(212, 175, 55, 0.3)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.78rem', color: '#f5e4a8', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
            <Sparkles size={14} color="#d4af37" /> Teste Rápido sem Cadastro:
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => handleQuickLogin('photographer')}
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.4rem 0.8rem',
                borderRadius: '8px',
                background: 'var(--accent-gold)',
                color: '#000000',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Fotógrafo Pro
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('client')}
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.4rem 0.8rem',
                borderRadius: '8px',
                background: '#00f2fe',
                color: '#000000',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Cliente
            </button>
          </div>
        </div>

        {/* Main Auth Form */}
        <form onSubmit={handleSubmit}>
          {!isLoginView && (
            <div className="form-group">
              <label>Nome Completo / Nome do Estúdio</label>
              <input
                type="text"
                placeholder="Ex: Elena Rostova / Lumina Studio"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-control"
              />
            </div>
          )}

          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="seuemail@exemplo.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="form-control"
            />
          </div>

          {!isLoginView && role === 'photographer' && (
            <>
              <div className="form-group">
                <label>Título Profissional</label>
                <input
                  type="text"
                  placeholder="Ex: Fine Art & Editorial Portrait Master"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Especialidades Principais</label>
                <select
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  className="form-control"
                >
                  <option value="Ensaios Femininos & Portfólio">Ensaios Femininos & Portfólio</option>
                  <option value="Filmagens & Cinema 4K">Filmagens & Cinema 4K</option>
                  <option value="Casamentos & Pré-Wedding">Casamentos & Pré-Wedding</option>
                  <option value="Moda & Editorial Urban">Moda & Editorial Urban</option>
                  <option value="Corporativo & Retratos Executive">Corporativo & Retratos Executive</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            className={`btn ${role === 'photographer' ? 'btn-primary' : 'btn-cyan'} btn-lg`}
            style={{ width: '100%', marginTop: '1rem' }}
          >
            <span>{isLoginView ? `Entrar como ${role === 'photographer' ? 'Fotógrafo' : 'Cliente'}` : 'Finalizar Cadastro'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          {isLoginView ? 'Ainda não possui conta?' : 'Já possui uma conta criada?'} {' '}
          <button
            onClick={() => setIsLoginView(!isLoginView)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-gold-light)',
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            {isLoginView ? 'Cadastre-se aqui' : 'Faça login agora'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
