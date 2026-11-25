import { LANGS } from './starters.js';

export function Editor({ value, onChange }) {
  const onKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = e.target;
      const s = el.selectionStart, end = el.selectionEnd;
      const next = value.slice(0, s) + '    ' + value.slice(end);
      onChange(next);
      requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = s + 4; });
    }
  };
  return (
    <textarea
      className="editor"
      spellCheck={false}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
    />
  );
}

export function LangSelect({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {LANGS.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
    </select>
  );
}

export function Verdict({ v }) {
  const cls = v === 'Accepted' || v === 'AC' ? 'ok' : 'bad';
  return <span className={'badge ' + cls}>{v}</span>;
}
