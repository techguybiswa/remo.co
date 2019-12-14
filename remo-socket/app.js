var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(80);
// WARNING: app.listen(80) will NOT work here!

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
let count = 0;
io.on("connection", function(socket) {
  console.log("Socket conn count: " + count++);
  io.emit("user connected");
  socket.on("new user connected", data => {
    console.log("New user data ->", data);
    io.emit("new user", { data: data });
  });
  socket.on("disconnect", function() {
    io.emit("user disconnected");
  });
  socket.on("broadcast started", data => {
    io.emit("show broadcast", { data: data });
  });
  socket.on("broadcast stopped", data => {
    io.emit("stop broadcast", { data: data });
  });
  socket.on("internet issue emit", data => {
    console.log("Internet issue in ");
    io.emit("internet issue", { data: data });
  });
  socket.on("internet issue resolved emit", data => {
    io.emit("internet issue resolved", { data: data });
  });
  socket.on("camera error emit", data => {
    io.emit("camera issue", { data: data });
  });
});

module.exports = app;
