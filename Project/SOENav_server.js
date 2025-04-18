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
app.use(express.text());//plain texts
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve("")));

// DB Connection
const db = mysql.createConnection({
  host: "bmu76n1mf2sehxodofjl-mysql.services.clever-cloud.com",
  user: "udaban8ouzufgby5",
  password: "xH67BYKcnsZq9J0vUVvO",
  database: "bmu76n1mf2sehxodofjl",
  //\c udaban8ouzufgby5@bmu76n1mf2sehxodofjl-mysql.services.clever-cloud.com
  //USE bmu76n1mf2sehxodofjl
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
    res.status(200).json(user); // sends user data
  });
});

//For CourseInfo & Courseplanner
app.post("/courseInfo", async (req, res) => {
  const course = req.body;
  if (!course) return res.status(400).json({ message: "Missing credentials" });

  db.query("SELECT * FROM engineering_courses WHERE coursenum = ?", [course], async (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (results.length === 0){
      return res.status(401).json({ message: "Invalid courseNum"  });
    }
    
    const courseinfo = results[0];
    
    res.status(200).json(courseinfo); // sends user data
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
      return res.status(404).json({ message: "Major not found"  });
    }
    
    const majorinfo = results[0];
    
    res.status(200).json(majorinfo); // sends user data
  });
});

app.post("/saverequirements", async (req, res) => {
  const query = `
        INSERT INTO requirements
        (degPt, major, requirements, version)
        VALUES (?, ?, ?, ?)`;
  
  for(let obj in req.body){
    const { degreePoint, program, requirements, version} =req.body[obj];//requirements is a list of objects
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
