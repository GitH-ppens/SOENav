const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const PORT = 3000;
const path = require("path");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve("")));

// DataBase Connection
const db = mysql.createConnection({
  host: "bmu76n1mf2sehxodofjl-mysql.services.clever-cloud.com",
  user: "udaban8ouzufgby5",
  password: "xH67BYKcnsZq9J0vUVvO",
  database: "bmu76n1mf2sehxodofjl",
});

db.connect(err => {
  if (err) return console.error("DB connection failed:", err);
  console.log("Connected to DB");
});

// SIGNUP
app.post("/signup", async (req, res) => {
  const { name, netid, email, password, matric, gradDate, currentYear, major, coursesTaken } = req.body;

  if (!name || !netid || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO soenav_students
      (name, email, netID, password, matricDate, expectedGradDate, currentSchoolYear, major, coursesTaken)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(
      query,
      [name, email, netid, hashedPassword, matric, gradDate, currentYear, major, JSON.stringify(coursesTaken)],
      (err, result) => {
        if (err) {
          console.error("Error inserting user:", err);
          return res.status(500).json({ success: false, message: "Email or NETID already exists" });
        }
        res.status(200).json({ success: true, message: "Registration successful!" });
      }
    );
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Server error" })
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  const { netid, password } = req.body;
  if (!netid || !password) return res.status(400).json({ message: "Missing credentials" });

  db.query("SELECT * FROM soenav_students WHERE netID = ?", [netid], async (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (results.length === 0) return res.status(401).json({ message: "Invalid NetID" });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Wrong password" });

    delete user.password;
    console.log(`${user.netID} logged in successfully`);
    res.status(200).json(user);
  });
});

//For CourseInfo & Courseplanner
app.post("/courseInfo", async (req, res) => {
  const course = req.body;
  if (!course) return res.status(400).json({ message: "Missing credentials" });

  db.query("SELECT * FROM engineering_courses WHERE coursenum = ?", [course], async (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (results.length === 0){
      return res.status(401).json({ message: "Invalid courseNum" });
    }

    const courseinfo = results[0];
    res.status(200).json(courseinfo);
  });
});

//Major requirement
app.post("/requirement", async (req, res) => {
  const major = req.body;
  if (!major) return res.status(400).json({ message: "Missing credentials" });

  db.query(`SELECT * FROM requirements WHERE major LIKE ?`, ['%'+major+'%'], async (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (results.length === 0){
      console.log(`requested for: ${major}, instead of: `);
      return res.status(404).json({ message: "Major not found" });
    }

    const majorinfo = results[0];
    res.status(200).json(majorinfo);
  });
});

app.post("/saverequirements", async (req, res) => {
  const query = `
        INSERT INTO requirements
        (degPt, major, requirements, version)
        VALUES (?, ?, ?, ?)`;

  for (let obj in req.body) {
    const { degreePoint, program, requirements, version } = req.body[obj];
    console.log(req.body[obj]);

    if (!degreePoint || !program || !requirements || !version) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    db.query(
      query,
      [degreePoint, program, JSON.stringify(requirements), version],
      (err, result) => {
        if (err) {
          console.error("Error inserting req:", err + degreePoint);
          return res.status(500).json({ success: false, message: "Server error" });
        }
      }
    );
  }
  res.status(200).json({ success: true, message: "Req Inserted successfully!" });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));

// Course Planner
app.post("/saveEvent", async (req, res) => {
  const { eventName, eventDay, startTime, endTime, netID } = req.body;

  if (!eventName || !eventDay || !startTime || !endTime || !netID) {
    return res.status(400).json({ success: false, message: "Missing event fields" });
  }

  const query = `
    INSERT INTO courseplanner_events (eventName, eventDay, startTime, endTime, netID)
    VALUES (?, ?, ?, ?, ?)`;

  db.query(query, [eventName, eventDay, startTime, endTime, netID], (err, result) => {
    if (err) {
      console.error("Error saving event:", err);
      return res.status(500).json({ success: false, message: "Server error saving event" });
    }
    res.status(200).json({ success: true, message: "Event saved!" });
  });
});

app.post("/getEvents", async (req, res) => {
  const { netID } = req.body;

  if (!netID) {
    return res.status(400).json({ success: false, message: "Missing netID" });
  }

  db.query("SELECT * FROM courseplanner_events WHERE netID = ?", [netID], (err, results) => {
    if (err) {
      console.error("Error fetching events:", err);
      return res.status(500).json({ success: false, message: "Server error fetching events" });
    }
    res.status(200).json(results);
  });
});

app.post("/deleteEvent", async (req, res) => {
  const { eventName, eventDay, startTime, endTime, netID } = req.body;

  if (!eventName || !eventDay || !startTime || !endTime || !netID) {
    return res.status(400).json({ success: false, message: "Missing event fields" });
  }

  const query = `
    DELETE FROM courseplanner_events
    WHERE eventName = ? AND eventDay = ? AND startTime = ? AND endTime = ? AND netID = ?`;

  db.query(query, [eventName, eventDay, startTime, endTime, netID], (err, result) => {
    if (err) {
      console.error("Error deleting event:", err);
      return res.status(500).json({ success: false, message: "Server error deleting event" });
    }
    res.status(200).json({ success: true, message: "Event deleted!" });
  });
});

// Saving Notes
app.post("/saveNote", async (req, res) => {
  const { userEmail, note } = req.body;

  if (!userEmail || !note) {
    return res.status(400).json({ success: false, message: "Missing note fields" });
  }

  const query = `
    INSERT INTO notes (user_email, note_text)
    VALUES (?, ?)`;

  db.query(query, [userEmail, note], (err, result) => {
    if (err) {
      console.error("Error saving note:", err);
      return res.status(500).json({ success: false, message: "Server error saving note" });
    }
    res.status(200).json({ success: true, message: "Note saved!" });
  });
});

// Loading Notes
app.post("/getNotes", async (req, res) => {
  const { userEmail } = req.body;

  if (!userEmail) {
    return res.status(400).json({ success: false, message: "Missing user email" });
  }

  const query = "SELECT * FROM notes WHERE user_email = ? ORDER BY created_at DESC"
  db.query(query, [userEmail], (err, results) => {
    if (err) {
      console.error("Error fetching notes:", err);
      return res.status(500).json({ success: false, message: "Server error fetching notes" });
    }
    res.status(200).json(results);
  });
});

// Delete Note
app.delete("/deleteNote/:id", (req, res) => {
  const noteId = req.params.id;

  const query = "DELETE FROM notes WHERE id = ?";
  db.query(query, [noteId], (err, result) => {
    if (err) {
      console.error("Error deleting note:", err);
      return res.status(500).json({ success: false, message: "Failed to delete note" });
    }
    res.status(200).json({ success: true, message: "Note deleted successfully" });
  });
});

app.get('/Project/bookfinder.html', (req, res) => {
  res.sendFile(__dirname + '/Project/bookfinder.html');
});

app.get('/Project/bookfinder.js', (req, res) => {
  res.sendFile(__dirname + '/Project/bookfinder.js');
});
