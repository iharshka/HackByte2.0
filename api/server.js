import "dotenv/config";
import express from "express";
<<<<<<< HEAD
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import axios from "axios";
=======
import bcrypt from "bcrypt";
>>>>>>> 9e8fd1ff27f95c84d77df551be173f8847cac172
import cors from "cors";
import pg from "pg";

const app = express();
<<<<<<< HEAD
app.use(cors({ origin: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
=======
app.use(cors());
app.use(express.json());
>>>>>>> 9e8fd1ff27f95c84d77df551be173f8847cac172
const port = 5173;
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const db = new pg.Client({
  user: "postgres",
  host: "localHost",
  database: "HackByte",
  password: "Aryan^(",
  port: "5432",
});
db.connect();

const mentorRegister = async (
  mentorName,
  mentorEmail,
  mentorPassword,
  profession
) => {
  const hash = bcrypt.hashSync(mentorPassword, salt);
  await db.query(
    "INSERT INTO mentor_data(mentor_name, mentor_email, mentor_password, profession) VALUES($1, $2, $3, $4)",
    [mentorName, mentorEmail, hash, profession]
  );
<<<<<<< HEAD
  res.send("Registered as a mentor");
=======
>>>>>>> 9e8fd1ff27f95c84d77df551be173f8847cac172
};

const register = async (userName, emailId, password) => {
  const hash = bcrypt.hashSync(password, salt);
  await db.query(
    "INSERT INTO user_data(user_name, email_id, password) VALUES($1, $2, $3)",
    [userName, emailId, hash]
  );
<<<<<<< HEAD
  res.send("Registered as a User!");
=======
>>>>>>> 9e8fd1ff27f95c84d77df551be173f8847cac172
};

const mentorLogin = (mentorEmail, mentorPassword) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT mentor_password FROM mentor_data WHERE mentor_email = $1",
      [mentorEmail],
      (err, response) => {
        if (err) {
          console.error("Error in login", err.stack);
          reject(err);
        } else {
          if (response.rows.length > 0) {
            const isMatch = bcrypt.compareSync(
              mentorPassword,
              response.rows[0].mentor_password
            );
            resolve(isMatch);
          } else {
            resolve(false);
          }
        }
      }
    );
  });
};

const login = (emailId, password) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT password FROM user_data WHERE email_id = $1",
      [emailId],
      (err, response) => {
        if (err) {
          console.error("Error in login", err.stack);
          reject(err);
        } else {
          if (response.rows.length > 0) {
            const isMatch = bcrypt.compareSync(
              password,
              response.rows[0].password
            );
            resolve(isMatch);
          } else {
            resolve(false);
          }
        }
      }
    );
  });
};

<<<<<<< HEAD
app.post("/register/:kind", async (req, res) => {
  const kind = req.params.kind;
  if (kind == "mentor") {
    mentorRegister(
      req.body.mentorName,
      req.body.mentorEmail,
      req.body.mentorPassword,
      req.body.profession
    );
  } else if (kind == "user")
    register(req.body.userName, req.body.emailId, req.body.password);
=======
app.get("/", async (req, res) => {
  res.send("Hack IT!");
});

app.post("/register/:kind", async (req, res) => {
  const kind = req.params.kind;
  if (kind === "mentor") {
    mentorRegister("Mohan", "mohan@doc.com", "doc4life", "Conusellor");
  } else register("rat", "rodent@rat.com", "cheese");
>>>>>>> 9e8fd1ff27f95c84d77df551be173f8847cac172
  res.send("Registered");
});

app.post("/login/:kind", async (req, res) => {
  const kind = req.params.kind;
<<<<<<< HEAD
  if (kind == "mentor") {
    mentorLogin(req.body.mentorEmail, req.body.mentorPassword) //"doc4life"
=======
  if (kind === "mentor") {
    mentorLogin("mohan@doc.com", "doc4life")
>>>>>>> 9e8fd1ff27f95c84d77df551be173f8847cac172
      .then((isLoggedIn) => {
        if (isLoggedIn) {
          res.send("mValid");
        } else {
          res.send("mInvalid");
        }
      })
      .catch((error) => {
        res.status(404);
        console.error(error);
      });
<<<<<<< HEAD
  } else if (kind == "user") {
    login(req.body.emailId, req.body.password) // cheese
=======
  } else if (kind === "user") {
    login("rodent@rat.com", "chese")
>>>>>>> 9e8fd1ff27f95c84d77df551be173f8847cac172
      .then((isLoggedIn) => {
        if (isLoggedIn) {
          res.send("Valid");
        } else {
          res.send("Invalid");
        }
      })
      .catch((error) => {
        res.status(404);
        console.error(error);
      });
  }
});

app.get("/confessions", async (req, res) => {
  await db.query("SELECT confession FROM confessions", (err, response) => {
    if (err) console.error("Error getting Confessions", err.stack);
    else {
<<<<<<< HEAD
=======
      console.log(response.rows);
>>>>>>> 9e8fd1ff27f95c84d77df551be173f8847cac172
      res.send(response.rows);
    }
  });
});

app.post("/confess", async (req, res) => {
  await db.query("INSERT INTO confessions (confession) VALUES($1)", [
<<<<<<< HEAD
    req.body.confess,
  ]);
  res.send("Confession Submitted Successfully!");
});

app.post("/auth", async (req, res) => {
  const { username } = req.body;
  try {
    const response = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "private-key": "406a7882-9f1f-422f-84b4-18bc5f692bda" } }
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
=======
    "I'm Gay!",
  ]);
>>>>>>> 9e8fd1ff27f95c84d77df551be173f8847cac172
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
