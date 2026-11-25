import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../auth.jsx';

function AuthForm({ mode }) {
  const isReg = mode === 'register';
  const nav = useNavigate();
  const { login } = useAuth();
  const [f, setF] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      const d = await api('/auth/' + mode, { method: 'POST', body: f });
      login(d);
      nav('/');
    } catch (e) { setErr(e.message); }
    setBusy(false);
  };

  return (
    <form className="card auth" onSubmit={submit}>
      <h2>{isReg ? 'Create account' : 'Welcome back'}</h2>
      {isReg && <input placeholder="Name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />}
      <input type="email" placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
      <input type="password" placeholder="Password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
      {err && <p className="error">{err}</p>}
      <button className="btn" disabled={busy}>{busy ? 'Please wait...' : isReg ? 'Sign up' : 'Login'}</button>
      <p className="muted small">
        {isReg ? <>Account hai? <Link to="/login">Login</Link></> : <>Naya user? <Link to="/register">Sign up</Link></>}
      </p>
    </form>
  );
}

export const Login = () => <AuthForm mode="login" />;
export const Register = () => <AuthForm mode="register" />;
