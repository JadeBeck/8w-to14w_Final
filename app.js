const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server);
const moment = require("moment");
const connect = require("./schemas");
connect();
const chats = require("./schemas/chats")

app.use(express.static(path.join(__dirname, "src")));
const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
    socket.on("chatting", (data) => {
        chats.find().then(() => {
            socket.emit()
        })
        const { name, msg } = data;
        const time = moment(new Date()).format("h:mm A")
        const chatData = new chats({name, msg, time});
        chatData.save().then(() => {
            io.emit("chatting", {
                name,
                msg,
                time
            });
        });
    });
});

server.listen(PORT, () => console.log(`"server is running ${PORT}"`));