import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const port = 5000;
const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["get", "post"],
        credentials: true
    }
});

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["get", "post"],
    credentials: true
}));

io.on("connection", (socket) => {
    console.log("User connected");
    console.log("id", socket.id);

    socket.on("message", (data) => {
        console.log('message: ' + data);
        io.emit("receive-message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

app.get("/", (req, res) => {
    res.send("Hello world");
});

server.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
