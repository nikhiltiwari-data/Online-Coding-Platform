import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';

export default function Problems() {
  const [list, setList] = useState(null);
  const [err, setErr] = useState('');
  useEffect(() => { api('/problems').then(setList).catch((e) => setErr(e.message)); }, []);

  if (err) return <p className="error">{err}</p>;
  if (!list) return <p className="muted">Loading...</p>;
  return (
    <>
      <h1>Problems</h1>
      <div className="card">
        <table>
          <thead><tr><th>#</th><th>Title</th><th>Difficulty</th></tr></thead>
          <tbody>
            {list.map((p, i) => (
              <tr key={p._id}>
                <td>{i + 1}</td>
                <td><Link to={`/problem/${p._id}`}>{p.title}</Link></td>
                <td><span className={'diff ' + p.difficulty}>{p.difficulty}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
