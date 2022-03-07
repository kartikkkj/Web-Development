const express = require("express")
const socket = require("socket.io")
const app = express()

app.use(express.static("HTML CSS JS"))

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('start');
})
const io = socket(server)

io.on("connection", (socket) => {
    console.log("connect");
    socket.on("beginPath", (data) => {
        io.sockets.emit("beginPath", data)
    })
    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data)
    })
    socket.on("ru", (data) => {
        io.sockets.emit("ru", data)
    })
    socket.on("clear", () => {
        io.sockets.emit("clear")
    })
})
 



