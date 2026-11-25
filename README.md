# CodeJudge - Online Coding Judge / Compiler (MERN)

Features: register/login (JWT), problem list, code editor, run with custom input,
submit against hidden test cases (AC / WA / TLE / RE / CE verdicts), submission history,
and a standalone online compiler. Languages: C++, C, Python, JavaScript, Java.

## Requirements
- Node.js 18+
- MongoDB running locally (mongodb://127.0.0.1:27017) - or put your Atlas URI in server/.env
- Compilers you want to use on your machine: g++ / gcc (C, C++), python3, javac + java (Java). Node is already there for JS.

## Run
```bash
npm run install-all
npm run dev
```
Open http://localhost:5173  (API runs on http://localhost:5000)

6 sample problems are auto-seeded on first start.

## Add a problem
Insert into the `problems` collection (see server/seed.js for the shape). Test cases with `hidden: true` are not shown to users.

## Note
Code runs directly on the machine (4s time limit per test). This is fine for local/demo use.
For public deployment, run the runner inside Docker/sandbox.
