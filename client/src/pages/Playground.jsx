import { useState } from 'react';
import { api } from '../api.js';
import { STARTERS } from '../starters.js';
import { Editor, LangSelect } from '../components.jsx';
import { RunOutput } from './Problem.jsx';

export default function Playground() {
  const [lang, setLang] = useState('python');
  const [code, setCode] = useState('name = input()\nprint("Hello,", name)\n');
  const [input, setInput] = useState('World');
  const [out, setOut] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const changeLang = (l) => { setLang(l); setCode(STARTERS[l]); };
  const run = async () => {
    setBusy(true); setOut(null); setErr('');
    try { setOut(await api('/run', { method: 'POST', body: { language: lang, code, input } })); }
    catch (e) { setErr(e.message); }
    setBusy(false);
  };

  return (
    <>
      <h1>Online Compiler</h1>
      <div className="card pane">
        <div className="bar">
          <LangSelect value={lang} onChange={changeLang} />
          <div className="grow" />
          <button className="btn" disabled={busy} onClick={run}>{busy ? 'Running...' : '▶ Run'}</button>
        </div>
        <Editor value={code} onChange={setCode} />
        <label className="muted small">Input (stdin)</label>
        <textarea className="io" value={input} onChange={(e) => setInput(e.target.value)} />
        {err && <p className="error">{err}</p>}
        {out && <RunOutput out={out} />}
      </div>
    </>
  );
}
