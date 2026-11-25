# CodeJudge – Online Coding Judge & Compiler (MERN Stack)

An online coding platform where users can register, solve programming problems, execute code, submit solutions, and track their coding performance.

## Features

- User registration and login using JWT authentication
- Browse and search coding problems
- Online code editor
- Run code with custom input
- Submit solutions against hidden test cases
- Verdicts: Accepted (AC), Wrong Answer (WA), Time Limit Exceeded (TLE), Runtime Error (RE), Compilation Error (CE)
- Submission history
- Standalone online compiler
- Supports C++, C, Python, JavaScript and Java

## Technology Stack

- Frontend: React.js, Vite
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- Code Editor: Monaco Editor

## Requirements

- Node.js 18+
- MongoDB running locally or MongoDB Atlas
- Required compilers: g++, gcc, Python, Java

## Installation and Setup

Clone the repository:

```bash
git clone https://github.com/nikhiltiwari-data/Online-Coding-Platform.git
cd Online-Coding-Platform
```

Install dependencies:

```bash
npm run install-all
```

Start the application:

```bash
npm run dev
```

Open the application:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Project Structure

```text
Online-Coding-Platform/
├── client/
│   └── src/
├── server/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── package.json
└── README.md
```

## Security Note

For public deployment, execute submitted code inside a secure sandbox or isolated container. Never execute untrusted code directly on a production server.

## Author

Nikhil Tiwari

GitHub: https://github.com/nikhiltiwari-data