import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../auth.jsx';
import { STARTERS } from '../starters.js';
import { Editor, LangSelect, Verdict } from '../components.jsx';

export default function Problem() {
  const { id } = useParams();
  const { user } = useAuth();
  const [p, setP] = useState(null);
  const [lang, setLang] = useState(() => localStorage.getItem('cj_lang') || 'cpp');
  const [code, setCode] = useState(() => STARTERS[localStorage.getItem('cj_lang') || 'cpp']);
  const [input, setInput] = useState('');
  const [out, setOut] = useState(null);
  const [sub, setSub] = useState(null);
  const [busy, setBusy] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    api('/problems/' + id).then((d) => { setP(d); setInput(d.testCases[0]?.input || ''); }).catch((e) => setErr(e.message));
  }, [id]);

  const changeLang = (l) => { setLang(l); setCode(STARTERS[l]); localStorage.setItem('cj_lang', l); };

  const run = async () => {
    setBusy('run'); setOut(null); setSub(null); setErr('');
    try { setOut(await api('/run', { method: 'POST', body: { language: lang, code, input } })); }
    catch (e) { setErr(e.message); }
    setBusy('');
  };

  const submit = async () => {
    setBusy('submit'); setOut(null); setSub(null); setErr('');
    try { setSub(await api('/submit', { method: 'POST', body: { problemId: id, language: lang, code } })); }
    catch (e) { setErr(e.message); }
    setBusy('');
  };

  if (err && !p) return <p className="error">{err}</p>;
  if (!p) return <p className="muted">Loading...</p>;

  return (
    <div className="split">
      <section className="card pane">
        <h2>{p.title} <span className={'diff ' + p.difficulty}>{p.difficulty}</span></h2>
        <p className="pre">{p.description}</p>
        <h4>Input</h4><p className="pre">{p.inputFormat}</p>
        <h4>Output</h4><p className="pre">{p.outputFormat}</p>
        <h4>Constraints</h4><p className="pre">{p.constraints}</p>
        {p.testCases.map((t, i) => (
          <div key={i}>
            <h4>Sample {i + 1}</h4>
            <div className="two">
              <div><small className="muted">Input</small><pre>{t.input}</pre></div>
              <div><small className="muted">Output</small><pre>{t.output}</pre></div>
            </div>
          </div>
        ))}
      </section>

      <section className="card pane">
        <div className="bar">
          <LangSelect value={lang} onChange={changeLang} />
          <div className="grow" />
          <button className="btn ghost" disabled={!!busy} onClick={run}>{busy === 'run' ? 'Running...' : '▶ Run'}</button>
          <button className="btn" disabled={!!busy || !user} onClick={submit} title={user ? '' : 'Login to submit'}>
            {busy === 'submit' ? 'Judging...' : 'Submit'}
          </button>
        </div>
        {!user && <p className="muted small">Submit karne ke liye <Link to="/login">login</Link> karo. Run bina login ke chalega.</p>}
        <Editor value={code} onChange={setCode} />
        <label className="muted small">Custom input</label>
        <textarea className="io" value={input} onChange={(e) => setInput(e.target.value)} />

        {err && <p className="error">{err}</p>}
        {out && <RunOutput out={out} />}
        {sub && (
          <div className="result">
            <h3><Verdict v={sub.verdict} /> <span className="muted small">{sub.passed}/{sub.total} test cases passed</span></h3>
            <div className="chips">
              {sub.results.map((r, i) => (
                <span key={i} className={'chip ' + (r.status === 'AC' ? 'ok' : 'bad')}>#{i + 1} {r.status} · {r.timeMs}ms</span>
              ))}
            </div>
            {sub.error && <pre className="errbox">{sub.error}</pre>}
          </div>
        )}
      </section>
    </div>
  );
}

export function RunOutput({ out }) {
  const label = { OK: 'Output', CE: 'Compilation Error', RE: 'Runtime Error', TLE: 'Time Limit Exceeded' }[out.status];
  return (
    <div className="result">
      <h4>{label} <span className="muted small">{out.status !== 'CE' && `${out.timeMs}ms`}</span></h4>
      {out.stdout && <pre>{out.stdout}</pre>}
      {out.stderr && <pre className="errbox">{out.stderr}</pre>}
      {!out.stdout && !out.stderr && <pre className="muted">(no output)</pre>}
    </div>
  );
}
