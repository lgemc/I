const io = require("socket.io")(9001);
const r = require("rethinkdb");

const $conn = require("./conn");

const main = async () => {
  const conn = await $conn.getConn();
  r.db("atelier")
    .table("messages")
    .changes()
    .run(conn, (err, cursor) => {
      cursor.each((err, row) => {
        if (err) throw err;
        console.log("Received message:", row);
        io.emit("message", row);
      });
    });
};

main();

io.on("connection", (socket) => {
  console.log("A user has connected!");

  socket.on("message", (data) => {
    console.log("Received message:", data);
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("A user has disconnected!");
  });
});
