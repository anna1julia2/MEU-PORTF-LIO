import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Calendar, MapPin, DollarSign, UserCheck, CheckCircle2, MessageSquare, Send } from 'lucide-react';

const BookingModal = ({ photographer, portfolioItem, isOpen, onClose }) => {
  const { user, createBookingRequest } = useAuth();

  const photographerName = photographer ? photographer.name : (portfolioItem ? portfolioItem.photographerName : 'Elena Rostova');
  const photographerId = photographer ? photographer.id : (portfolioItem ? portfolioItem.photographerId : 'photo_1');

  const [formData, setFormData] = useState({
    clientName: user ? user.name : '',
    clientEmail: user ? user.email : '',
    serviceType: portfolioItem ? portfolioItem.title : 'Ensaio Fotográfico / Filmagem',
    date: '2026-09-20',
    location: 'São Paulo, SP - Estúdio ou Externa',
    budgetEstimate: portfolioItem ? `R$ ${portfolioItem.priceEstimate.toLocaleString('pt-BR')}` : 'R$ 1.500,00',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    createBookingRequest({
      photographerId,
      photographerName,
      clientName: formData.clientName || (user ? user.name : 'Cliente Visitante'),
      clientEmail: formData.clientEmail || (user ? user.email : 'cliente@exemplo.com'),
      serviceType: formData.serviceType,
      date: formData.date,
      location: formData.location,
      budgetEstimate: formData.budgetEstimate,
      notes: formData.notes
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '92%',
          maxWidth: '560px',
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
        <div style={{ marginBottom: '1.8rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.6rem' }}>
            <UserCheck size={14} /> Solicitação de Orçamento
          </span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
            Contratar Ensaio com <span className="text-gold">{photographerName}</span>
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Preencha os detalhes do seu projeto ou ensaio para receber a proposta direta do profissional.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Seu Nome Completo</label>
            <input
              type="text"
              required
              placeholder="Ex: Mariana Souza"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Seu E-mail de Contato</label>
            <input
              type="email"
              required
              placeholder="mariana@exemplo.com"
              value={formData.clientEmail}
              onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Tipo de Ensaio / Produção</label>
            <input
              type="text"
              required
              placeholder="Ex: Ensaio Feminino Golden Hour, Cobertura Casamento, etc."
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              className="form-control"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Data Pretendida</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Estimativa de Valor</label>
              <input
                type="text"
                placeholder="R$ 1.500,00"
                value={formData.budgetEstimate}
                onChange={(e) => setFormData({ ...formData, budgetEstimate: e.target.value })}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Localização Desejada</label>
            <input
              type="text"
              placeholder="Ex: Estúdio em SP, Praia de Ipanema RJ, etc."
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Mensagem ou Detalhes Adicionais</label>
            <textarea
              rows="3"
              placeholder="Descreva a sua ideia de ensaio, referências visuais ou dúvidas..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="form-control"
              style={{ resize: 'vertical' }}
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: '0.8rem' }}
          >
            <Send size={18} />
            <span>Enviar Solicitação de Orçamento</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
