import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { useAuth } from './auth.jsx';
import Problems from './pages/Problems.jsx';
import Problem from './pages/Problem.jsx';
import Playground from './pages/Playground.jsx';
import Submissions from './pages/Submissions.jsx';
import { Login, Register } from './pages/AuthPages.jsx';

export default function App() {
  const { user, logout } = useAuth();
  return (
    <>
      <nav className="nav">
        <NavLink to="/" className="logo">{'</>'} CodeJudge</NavLink>
        <div className="links">
          <NavLink to="/" end>Problems</NavLink>
          <NavLink to="/playground">Compiler</NavLink>
          {user && <NavLink to="/submissions">My Submissions</NavLink>}
        </div>
        <div className="right">
          {user ? (
            <>
              <span className="muted">Hi, {user.name}</span>
              <button className="btn small ghost" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn small ghost">Login</NavLink>
              <NavLink to="/register" className="btn small">Sign up</NavLink>
            </>
          )}
        </div>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<Problems />} />
          <Route path="/problem/:id" element={<Problem />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/submissions" element={user ? <Submissions /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </>
  );
}
