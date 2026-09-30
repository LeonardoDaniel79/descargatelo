import React from 'react';
import { CheckCircle2, Info, AlertTriangle, Download, X } from 'lucide-react';
import type { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-portal">
      {toasts.map((toast) => {
        const getIcon = () => {
          switch (toast.type) {
            case 'success': return <CheckCircle2 className="toast-icon text-emerald" size={20} />;
            case 'download': return <Download className="toast-icon text-cyan" size={20} />;
            case 'warning': return <AlertTriangle className="toast-icon text-amber" size={20} />;
            default: return <Info className="toast-icon text-cyan" size={20} />;
          }
        };

        return (
          <div key={toast.id} className={`toast-card toast-${toast.type} animate-slide-up`}>
            {getIcon()}
            <div className="toast-content">
              <span className="toast-title">{toast.title}</span>
              <span className="toast-msg">{toast.message}</span>
            </div>
            <button 
              className="toast-close-btn" 
              onClick={() => onDismiss(toast.id)}
              aria-label="Cerrar notificación"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}

      <style>{`
        .toast-portal {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 10000;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          pointer-events: none;
        }

        .toast-card {
          pointer-events: auto;
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.95rem 1.25rem;
          background: rgba(10, 14, 24, 0.96);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 242, 254, 0.15);
          backdrop-filter: blur(16px);
          min-width: 300px;
          max-width: 420px;
        }

        .toast-success {
          border-color: var(--emerald-500);
        }
        .toast-download {
          border-color: var(--cyan-400);
        }

        .toast-content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .toast-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.9rem;
          color: #fff;
        }

        .toast-msg {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .toast-close-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0.2rem;
          border-radius: 4px;
        }

        .toast-close-btn:hover {
          color: #fff;
        }

        @media (max-width: 480px) {
          .toast-portal {
            left: 16px;
            right: 16px;
            bottom: 16px;
          }
          .toast-card {
            min-width: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};
