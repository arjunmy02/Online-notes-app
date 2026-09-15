import { useState } from 'react';
import { NotebookPen, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthScreen() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  const submit = async e => { e.preventDefault(); setError(''); setBusy(true); try { await (mode === 'login' ? login(form) : register(form)); } catch (err) { setError(err.response?.data?.message || 'Something went wrong'); } finally { setBusy(false); } };
  return <main className="auth-page"><section className="auth-card"><div className="brand"><NotebookPen size={30}/><span>NotesFlow</span></div><h1>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1><p className="muted">{mode === 'login' ? 'Sign in to manage your notes.' : 'Start organizing your ideas today.'}</p><form onSubmit={submit}>
    {mode === 'register' && <label><UserRound/>Name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name"/></label>}
    <label><Mail/>Email<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com"/></label>
    <label><LockKeyhole/>Password<input required minLength="6" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Minimum 6 characters"/></label>
    {error && <div className="error">{error}</div>}<button className="primary wide" disabled={busy}>{busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}</button>
  </form><button className="link-btn" onClick={()=>{setMode(mode==='login'?'register':'login');setError('')}}>{mode==='login' ? 'New here? Create an account' : 'Already have an account? Sign in'}</button></section></main>;
}
