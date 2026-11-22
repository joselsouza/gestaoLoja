import { ReactNode, useEffect } from 'react';
import { IconeFechar } from './Icones';

export default function Modal({ titulo, onClose, children }: { titulo: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onClose]);

  return (
    <div className="modal-fundo" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={titulo}>
        <header>
          <h2>{titulo}</h2>
          <button className="btn-icone" onClick={onClose} aria-label="Fechar"><IconeFechar /></button>
        </header>
        <div className="corpo">{children}</div>
      </div>
    </div>
  );
}
