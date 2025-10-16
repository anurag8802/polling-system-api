# Real-time Polling App

A minimal real-time polling demo using Express and Socket.IO. Users can vote for one of two options and see live results update for everyone connected.

## Features

- Real-time vote updates using WebSockets (Socket.IO)
- Simple in-memory vote tally (demo only)
- Static frontend served from `public/`

## Quick start

Prerequisites: Node.js 18+ recommended and npm available.

1. Install dependencies

```powershell
npm install
```

2. Start the server

```powershell
node server.mjs
```

3. Open the frontend

Open http://localhost:3000 in a browser (or multiple browsers/tabs) and click the buttons to vote. Results update in real time.

## Project structure

- `server.mjs` - Express server that creates an HTTP server and attaches Socket.IO. Serves static files from `public/`.
- `modules/socketHandler.mjs` - Socket.IO event handlers and in-memory vote state.
- `public/index.html` - Minimal frontend UI that connects to Socket.IO and emits `vote` events.
- `package.json` - Project metadata and dependencies.

## Socket events

The client and server communicate with these events:

- `updateVotes` (server -> client): sends the current vote totals as an object `{ optionA: number, optionB: number }`.
- `vote` (client -> server): send a string identifying the option to increment. Valid values: `optionA`, `optionB`.

Behavior:
- When a client connects, the server emits `updateVotes` with the current totals.
- When the server receives a `vote` for a valid option, it increments the count and broadcasts `updateVotes` to all clients.

## Notes & limitations

- Votes are stored in-memory (`modules/socketHandler.mjs`). Restarting the server resets counts.
- This project is intentionally minimal for learning/demonstration. For production use, add persistent storage, input validation, rate-limiting, and authentication.

## Extending this project (ideas)

- Persist votes in a database (SQLite, Postgres, Redis).
- Add authentication and per-user vote locking.
- Track more options, add charts to the frontend, or show voter counts.
- Add tests and CI.

## Troubleshooting

- If Socket.IO client fails to load, confirm the server is running and you are opening the correct host/port.
- If ports conflict, set `PORT` environment variable before starting the server:

```powershell
$env:PORT=4000; node server.mjs
```

## License

This repository is provided as-is for learning and demo purposes.
