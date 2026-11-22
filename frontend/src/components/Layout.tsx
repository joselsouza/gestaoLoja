import { ReactNode, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { IconeCaixa, IconeEstoque, IconeFixar, IconeInicio, IconeOrcamento, IconeProdutos, IconeSair } from './Icones';

const SECOES = [
  { para: '/', rotulo: 'Início', icone: <IconeInicio /> },
  { para: '/caixa', rotulo: 'Caixa', icone: <IconeCaixa /> },
  { para: '/produtos', rotulo: 'Produtos', icone: <IconeProdutos /> },
  { para: '/estoque', rotulo: 'Estoque', icone: <IconeEstoque /> },
  { para: '/orcamentos', rotulo: 'Orçamentos', icone: <IconeOrcamento /> },
];

const CHAVE_FIXO = 'gestaoloja.menuFixo';
function lerFixo() {
  try { return localStorage.getItem(CHAVE_FIXO) === '1'; } catch { return false; }
}

const Marca = () => <span className="marca-nome">A Vitoriosa <b>de Angra</b></span>;

export default function Layout({ children }: { children: ReactNode }) {
  const [aberto, setAberto] = useState(false); // drawer no celular
  const [fixo, setFixo] = useState(lerFixo); // menu expandido fixo no desktop
  const { pathname } = useLocation();
  const { email, loginAtivo, sair } = useAuth();
  const atual = SECOES.find((s) => (s.para === '/' ? pathname === '/' : pathname.startsWith(s.para)));

  // Fecha o drawer ao navegar e volta ao topo.
  useEffect(() => { setAberto(false); window.scrollTo({ top: 0 }); }, [pathname]);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(false);
    window.addEventListener('keydown', esc);
    // Ao voltar para o desktop, o drawer do celular não deve continuar aberto.
    const mq = window.matchMedia('(min-width: 1024px)');
    const fechar = () => mq.matches && setAberto(false);
    mq.addEventListener('change', fechar);
    return () => { window.removeEventListener('keydown', esc); mq.removeEventListener('change', fechar); };
  }, []);

  function alternarFixo() {
    setFixo((v) => {
      try { localStorage.setItem(CHAVE_FIXO, v ? '0' : '1'); } catch { /* ignora */ }
      return !v;
    });
  }

  return (
    <div className={`layout ${fixo ? 'fixo' : ''}`}>
      <header className="topbar">
        <button className={`hamburguer ${aberto ? 'aberto' : ''}`} aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={aberto} onClick={() => setAberto((v) => !v)}>
          <span />
        </button>
        <Link to="/" className="marca">
          <img src="/logo.png" alt="" />
          <Marca />
        </Link>
        {atual && <span className="secao-atual">{atual.rotulo}</span>}
      </header>

      <div className={`overlay ${aberto ? 'visivel' : ''}`} onClick={() => setAberto(false)} aria-hidden="true" />

      <nav className={`nav ${aberto ? 'aberto' : ''}`} aria-label="Menu principal">
        <div className="nav-topo">
          <Link to="/" className="nav-marca" title="A Vitoriosa de Angra">
            <img src="/logo.png" alt="Logo A Vitoriosa de Angra" />
            <span className="rotulo-nav"><Marca /><small>Gestão da loja</small></span>
          </Link>
          <button type="button" className={`nav-fixar ${fixo ? 'ativo' : ''}`} onClick={alternarFixo}
            title={fixo ? 'Recolher menu' : 'Manter menu aberto'} aria-pressed={fixo}>
            <IconeFixar />
          </button>
        </div>

        <ul className="menu">
          {SECOES.map((s) => (
            <li key={s.para}>
              <NavLink to={s.para} end={s.para === '/'} className="menu-link" title={s.rotulo}>
                {s.icone} <span className="rotulo-nav">{s.rotulo}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-base">
          <div className="nav-usuario" title={email ?? undefined}>
            <span className="avatar">{loginAtivo && email ? email.slice(0, 2) : 'LJ'}</span>
            <span className="rotulo-nav">
              <strong>{loginAtivo ? email : 'Modo local'}</strong>
              <small>{loginAtivo ? 'Conectado' : 'Sem login'}</small>
            </span>
          </div>
          {loginAtivo && (
            <button type="button" className="menu-link" onClick={sair} title="Sair">
              <IconeSair /> <span className="rotulo-nav">Sair</span>
            </button>
          )}
        </div>
      </nav>

      <main className="conteudo">
        <div className="conteudo-inner">
          <div key={pathname} className="pagina">{children}</div>
        </div>
        <footer className="rodape-site">
          <span>A Vitoriosa de Angra · Gestão da loja</span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </main>
    </div>
  );
}
