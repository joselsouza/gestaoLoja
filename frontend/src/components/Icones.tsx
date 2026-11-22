// Ícones em traço fino (24×24, stroke = currentColor, pontas retas) — mesmo estilo do angraFight.
const base = {
  fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'square' as const,
  strokeLinejoin: 'miter' as const, viewBox: '0 0 24 24', 'aria-hidden': true,
};

export const IconeInicio = () => (
  <svg {...base}><path d="M3.5 3.5h7v7h-7zM13.5 3.5h7v7h-7zM3.5 13.5h7v7h-7zM13.5 13.5h7v7h-7z" /></svg>
);
export const IconeCaixa = () => (
  <svg {...base}><path d="M3.5 10.5h17v10h-17zM7 10.5v-6h10v6M7 14.5h1M11.5 14.5h1M16 14.5h1M7 17.5h10" /></svg>
);
export const IconeProdutos = () => (
  <svg {...base}><path d="M20.5 7.5 12 3 3.5 7.5v9L12 21l8.5-4.5zM3.5 7.5 12 12l8.5-4.5M12 12v9" /></svg>
);
export const IconeEstoque = () => (
  <svg {...base}><path d="M3.5 20.5V9L12 3.5 20.5 9v11.5M7 20.5v-8h10v8M7 16.5h10" /></svg>
);
export const IconeOrcamento = () => (
  <svg {...base}><path d="M6 3.5h8.5l4 4v13H6zM14 3.5v4.5h4.5M9 12.5h6.5M9 16.5h4.5" /></svg>
);
export const IconeSair = () => (
  <svg {...base}><path d="M10 4H5v16h5M14.5 8l4 4-4 4M18.5 12H9.5" /></svg>
);
export const IconeFixar = () => (
  <svg {...base}><path d="M12 16.5V21M8.5 3.5h7M9.5 3.5V10L6 14.5h12L14.5 10V3.5" /></svg>
);
export const IconeFechar = () => (
  <svg {...base}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const IconeSeta = ({ className }: { className?: string }) => (
  <svg {...base} className={className}><path d="M7 17 17 7M9 7h8v8" /></svg>
);
