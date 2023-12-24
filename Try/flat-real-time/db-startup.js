const r = require("rethinkdb");

const dbName = "atelier";

r.connect({ host: "localhost", port: 28015 }, (err, conn) => {
  if (err) throw err;

  r.dbCreate(dbName).run(conn, (err, result) => {
    if (err) throw err;
    console.log("Database created:", result);
  });

  r.db(dbName)
    .tableCreate("messages")
    .run(conn, (err, result) => {
      if (err) throw err;
      console.log("Table created:", result);
    });
});
