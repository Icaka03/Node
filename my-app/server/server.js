const express = require("express");
const app = express();
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json({ limit: "10mb" }));

let db = new sqlite3.Database("credentials.db", (err) => {
  if (err) {
    console.error("Failed to connect to the database:", err.message);
    process.exit(1); // Exit the application if the database connection fails
  }
  console.log("Connected to the database.");
});

app.post("/validatePassword", (req, res) => {
  const { username, password } = req.body;
  console.log("Received username:", username);
  console.log("Received password:", password);
  const query = `SELECT * FROM credentials WHERE username = ? AND password = ?`;

  db.get(query, [username, password], (err, row) => {
    if (err) {
      console.error("Error executing query:", err.message);
      res.status(500).send({ error: "Internal Server Error" });
      return;
    }
    if (row) {
      console.log("User found:", row);
      res.send({ validation: true });
    } else {
      console.log("User not found or incorrect password");
      res.send({ validation: false });
    }
  });
});

app.listen(3001, () => console.log("Listening at port 3001"));

// how to console.log tables from databse _______________________
db.serialize(() => {
  db.all("SELECT * FROM Tasks", (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Data from Tasks");
      console.log(rows);
    }
  });
});

// Registter function here _______________________
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  const checkUserQuery = `SELECT * FROM credentials WHERE username = ?`;

  db.get(checkUserQuery, [username], (err, row) => {
    if (err) {
      console.error("Error checking user:", err.message);
      res.status(500).send({ error: "Internal Server Error" });
      return;
    }

    if (row) {
      res.status(400).send({ error: "Username already exists" });
    } else {
      const insertQuery = `INSERT INTO credentials (username, password) VALUES (?, ?)`;
      db.run(insertQuery, [username, password], function (err) {
        if (err) {
          console.error("Error inserting user:", err.message);
          res.status(500).send({ error: "Internal Server Error" });
        } else {
          res.send({ success: true });
        }
      });
    }
  });
});

//creating new data table for taskAdded ____________________
db.run(
  `CREATE TABLE IF NOT EXISTS Tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  task TEXT NOT NULL,
  date TEXT NOT NULL
  )`,
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("created tasks databse or allready exists");
    }
  }
);
//adding data to data table for taskAdded ____________________
app.post("/tasks", (req, res) => {
  const { username, task, date } = req.body;

  db.get(`SELECT * FROM Tasks WHERE username = ?`, [username], (err) => {
    if (err) {
      console.log(err);
    } else {
      db.run(
        `INSERT INTO Tasks (username, task, date) VALUES (? , ? , ?) `,
        [username, task, date],
        function (err) {
          if (err) {
            console.log(err);
          } else {
            res.send({ success: true });
          }
        }
      );
    }
  });
});

// how to make an api to fetch data ____________________________
app.get("/fetchTasks", (req, res) => {
  db.all("SELECT * FROM Tasks", [], (err, rows) => {
    if (err) {
      console.log(err);
    }

    res.json({ data: rows });
  });
});

// db.serialize(() => {
//   db.run(`DROP TABLE IF EXISTS Tasks`, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Table Deleted");
//     }
//   });
// });
