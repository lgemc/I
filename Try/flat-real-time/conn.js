const r = require("rethinkdb");
s;

const conn = undefined;

const getConn = () => {
  return new Promise((resolve, reject) => {
    if (conn) resolve(conn);

    r.connect({ host: "localhost", port: 28015 }, (err, conn) => {
      if (err) reject(err);

      conn = conn;
      resolve(conn);
    });
  });
};

module.exports = {
  getConn,
};
