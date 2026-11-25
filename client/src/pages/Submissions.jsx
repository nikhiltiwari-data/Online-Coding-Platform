import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { Verdict } from '../components.jsx';

export default function Submissions() {
  const [list, setList] = useState(null);
  const [open, setOpen] = useState(null);
  const [err, setErr] = useState('');
  useEffect(() => { api('/submissions/me').then(setList).catch((e) => setErr(e.message)); }, []);

  if (err) return <p className="error">{err}</p>;
  if (!list) return <p className="muted">Loading...</p>;
  return (
    <>
      <h1>My Submissions</h1>
      <div className="card">
        {list.length === 0 && <p className="muted">Abhi tak koi submission nahi hai.</p>}
        <table>
          <thead><tr><th>Problem</th><th>Language</th><th>Verdict</th><th>Passed</th><th>Time</th></tr></thead>
          <tbody>
            {list.map((s) => (
              <>
                <tr key={s._id} className="click" onClick={() => setOpen(open === s._id ? null : s._id)}>
                  <td>{s.problem?.title || 'Deleted'}</td>
                  <td>{s.language}</td>
                  <td><Verdict v={s.verdict} /></td>
                  <td>{s.passed}/{s.total}</td>
                  <td className="muted">{new Date(s.createdAt).toLocaleString()}</td>
                </tr>
                {open === s._id && (
                  <tr key={s._id + 'c'}><td colSpan="5"><pre>{s.code}</pre></td></tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
