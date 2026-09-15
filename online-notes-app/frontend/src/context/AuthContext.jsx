import { createContext, useContext, useState } from 'react';
import api from '../api/api';

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('notes_user') || 'null'));
  const save = data => { localStorage.setItem('notes_token', data.token); localStorage.setItem('notes_user', JSON.stringify(data.user)); setUser(data.user); };
  const login = async form => save((await api.post('/auth/login', form)).data);
  const register = async form => save((await api.post('/auth/register', form)).data);
  const logout = () => { localStorage.removeItem('notes_token'); localStorage.removeItem('notes_user'); setUser(null); };
  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
