import { FormEvent, useState } from 'react';
import { useAuth } from '../auth/AuthContext';

export default function LoginPage() {
  const { entrar } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setErro('');
    setEnviando(true);
    try {
      await entrar(email.trim(), senha);
    } catch (e) {
      setErro((e as Error).message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="login">
      <div className="login-palco">
        <div className="login-marca">
          <img src="/logo.png" alt="Logo A Vitoriosa de Angra" />
          <h1>A Vitoriosa<br /><em>de Angra</em></h1>
          <p>Caixa do dia, produtos, estoque e orçamentos da loja em um só lugar.</p>
        </div>
        <div className="caixa">
          <p className="eyebrow">Gestão da loja</p>
          <h2>Entrar</h2>
          <p className="sub">Use o e-mail e a senha cadastrados para você.</p>
          <form className="form" onSubmit={submit}>
            <label>E-mail
              <input type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
            </label>
            <label>Senha
              <input type="password" autoComplete="current-password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </label>
            {erro && <p className="erro">{erro}</p>}
            <button type="submit" disabled={enviando}>{enviando ? 'Entrando…' : 'Entrar'}</button>
          </form>
        </div>
      </div>
      <footer className="rodape-site">
        <span>A Vitoriosa de Angra · Gestão da loja</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
