const r = require("rethinkdb");
const $conn = require("./conn");

async function createMessage(msg) {
  const conn = await $conn.getConn();

  const result = await r.db("atelier").table("messages").insert(msg).run(conn);
  return result;
}

module.exports = {
  createMessage,
};
