const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const TIME_LIMIT_MS = 4000;
const COMPILE_LIMIT_MS = 15000;
const MAX_OUT = 100000;
const isWin = process.platform === 'win32';

function exec(cmd, args, { cwd, input = '', timeout }) {
  return new Promise((resolve) => {
    let stdout = '', stderr = '', timedOut = false, done = false;
    const start = Date.now();
    const finish = (r) => { if (done) return; done = true; clearTimeout(timer); resolve({ ...r, timeMs: Date.now() - start }); };
    let child;
    try { child = spawn(cmd, args, { cwd }); } catch (e) { return resolve({ code: -1, stdout, stderr: e.message, timedOut: false, timeMs: 0 }); }
    const timer = setTimeout(() => { timedOut = true; child.kill('SIGKILL'); }, timeout);
    child.stdout.on('data', (d) => { if (stdout.length < MAX_OUT) stdout += d; });
    child.stderr.on('data', (d) => { if (stderr.length < MAX_OUT) stderr += d; });
    child.stdin.on('error', () => {});
    child.on('error', (e) => finish({ code: -1, stdout, stderr: e.code === 'ENOENT' ? `"${cmd}" is not installed on the server` : e.message, timedOut: false }));
    child.on('close', (code) => finish({ code, stdout, stderr, timedOut }));
    child.stdin.end(input);
  });
}

const LANGS = {
  javascript: { file: 'main.js', run: () => ['node', ['main.js']] },
  python: { file: 'main.py', run: () => [isWin ? 'python' : 'python3', ['main.py']] },
  cpp: { file: 'main.cpp', compile: () => ['g++', ['-O2', '-o', isWin ? 'main.exe' : 'main', 'main.cpp']], run: (d) => [path.join(d, isWin ? 'main.exe' : 'main'), []] },
  c: { file: 'main.c', compile: () => ['gcc', ['-O2', '-o', isWin ? 'main.exe' : 'main', 'main.c']], run: (d) => [path.join(d, isWin ? 'main.exe' : 'main'), []] },
  java: { file: 'Main.java', compile: () => ['javac', ['Main.java']], run: () => ['java', ['Main']] },
};

async function prepare(language, code) {
  const cfg = LANGS[language];
  if (!cfg) throw new Error('Unsupported language');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cj-'));
  fs.writeFileSync(path.join(dir, cfg.file), code);
  if (cfg.compile) {
    const [cmd, args] = cfg.compile();
    const r = await exec(cmd, args, { cwd: dir, timeout: COMPILE_LIMIT_MS });
    if (r.code !== 0) return { dir, compileError: (r.stderr || r.stdout || 'Compilation failed').slice(0, 4000) };
  }
  return { dir, cfg };
}

function cleanup(dir) { try { fs.rmSync(dir, { recursive: true, force: true }); } catch {} }

async function runOne(prep, input) {
  const [cmd, args] = prep.cfg.run(prep.dir);
  const r = await exec(cmd, args, { cwd: prep.dir, input, timeout: TIME_LIMIT_MS });
  let status = 'OK';
  if (r.timedOut) status = 'TLE';
  else if (r.code !== 0) status = 'RE';
  return { status, stdout: r.stdout, stderr: r.stderr, timeMs: r.timeMs };
}

// Free run (playground / custom input)
async function runCode(language, code, input) {
  const prep = await prepare(language, code);
  try {
    if (prep.compileError) return { status: 'CE', stdout: '', stderr: prep.compileError, timeMs: 0 };
    return await runOne(prep, input);
  } finally { cleanup(prep.dir); }
}

const norm = (s) => String(s).replace(/\r/g, '').split('\n').map((l) => l.trimEnd()).join('\n').trim();

// Judge against test cases
async function judge(language, code, testCases) {
  const prep = await prepare(language, code);
  try {
    if (prep.compileError) return { verdict: 'Compilation Error', passed: 0, total: testCases.length, results: [], error: prep.compileError };
    const results = [];
    let passed = 0, verdict = 'Accepted', error = '';
    for (const tc of testCases) {
      const r = await runOne(prep, tc.input);
      let status = 'AC';
      if (r.status === 'TLE') status = 'TLE';
      else if (r.status === 'RE') status = 'RE';
      else if (norm(r.stdout) !== norm(tc.output)) status = 'WA';
      if (status === 'AC') passed++;
      else if (verdict === 'Accepted') {
        verdict = { TLE: 'Time Limit Exceeded', RE: 'Runtime Error', WA: 'Wrong Answer' }[status];
        if (status === 'RE') error = (r.stderr || '').slice(0, 2000);
      }
      results.push({ status, timeMs: r.timeMs });
    }
    return { verdict, passed, total: testCases.length, results, error };
  } finally { cleanup(prep.dir); }
}

module.exports = { runCode, judge, LANGS };
