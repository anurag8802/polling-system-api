import express from "express";
import http from "http";
import { Server } from "socket.io";
import { initSocket } from "./modules/socketHandler.mjs";

const app = express();
const server = http.createServer(app);
const io =  new Server(server);

app.use(express.static("public"));

initSocket(io);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}   );
