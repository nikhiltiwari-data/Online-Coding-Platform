import { createContext, useContext, useState } from 'react';

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cj_user')); } catch { return null; }
  });
  const login = ({ token, user }) => {
    localStorage.setItem('cj_token', token);
    localStorage.setItem('cj_user', JSON.stringify(user));
    setUser(user);
  };
  const logout = () => {
    localStorage.removeItem('cj_token');
    localStorage.removeItem('cj_user');
    setUser(null);
  };
  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>;
}
