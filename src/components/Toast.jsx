import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const Toast = () => {
  const { toastMessage, showToast } = useAuth();

  if (!toastMessage) return null;

  const { message, type } = toastMessage;

  return (
    <div className="toast-container" style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '0.8rem',
      padding: '0.9rem 1.4rem',
      borderRadius: '14px',
      background: 'rgba(18, 20, 29, 0.95)',
      border: '1px solid ' + (type === 'error' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(212, 175, 55, 0.4)'),
      color: '#f8fafc',
      boxShadow: '0 10px 30px rgba(0,0,0,0.6), 0 0 15px rgba(212, 175, 55, 0.2)',
      backdropFilter: 'blur(12px)',
      animation: 'fadeIn 0.3s ease-out',
      maxWidth: '420px'
    }}>
      {type === 'error' ? (
        <AlertCircle size={22} color="#ef4444" />
      ) : type === 'info' ? (
        <Info size={22} color="#00f2fe" />
      ) : (
        <CheckCircle2 size={22} color="#d4af37" />
      )}
      <span style={{ fontSize: '0.92rem', fontWeight: 500, flex: 1 }}>{message}</span>
    </div>
  );
};

export default Toast;
